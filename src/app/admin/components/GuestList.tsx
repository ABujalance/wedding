/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Guest, Group } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Stack,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRenderEditCellParams,
} from '@mui/x-data-grid';
import { FC, useCallback, useState, useEffect, useMemo } from 'react';

type GuestListProps = {
  guests: Guest[];
  adminTokenId: string;

  onGuestsUpdate?: (guests: Guest[]) => void;
  selectedInviteId?: string; // Para cuando se añaden invitados desde una invitación específica
};
const saveGuest = async (
  guestId: string,
  updates: Record<string, unknown>,
  adminTokenId: string,
) => {
  try {
    const response = await fetch(`/api/admin/guests/${guestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminTokenId,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update guest');
    }

    console.log('Invitado actualizado exitosamente con campos:', updates);
  } catch (error) {
    console.error('Error actualizando invitado:', error);
    // Optionally show error to user
  }
};

const createNewGuest = async (
  newGuest: Omit<Guest, 'id'>,
  adminTokenId: string,
  selectedInviteId?: string,
) => {
  try {
    // Si tenemos un inviteId seleccionado, lo incluimos en el invitado
    const guestData = selectedInviteId
      ? { ...newGuest, inviteId: selectedInviteId }
      : newGuest;

    const response = await fetch('/api/admin/guests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminTokenId,
      },
      body: JSON.stringify(guestData),
    });

    if (response.ok) {
      const createdGuest = await response.json();
      console.log('Nuevo invitado creado:', createdGuest);
      return createdGuest;
    } else {
      console.error('Error creando invitado');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

const deleteGuest = async (guestId: string, adminTokenId: string) => {
  try {
    const response = await fetch(`/api/admin/guests/${guestId}`, {
      method: 'DELETE',
      headers: {
        'x-admin-token': adminTokenId,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete guest');
    }

    console.log('Invitado eliminado exitosamente');
    return true;
  } catch (error) {
    console.error('Error eliminando invitado:', error);
    return false;
  }
};

// Componente de edición personalizado para la columna de invitación
const InviteEditCell = ({
  id,
  value,
  api,
  field,
  adminTokenId,
}: GridRenderEditCellParams & { adminTokenId: string }) => {
  const [invites, setInvites] = useState<Invite[]>([]);

  // Cargar invitaciones
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await fetch('/api/admin/invites', {
          headers: {
            'x-admin-token': adminTokenId,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setInvites(data);
        }
      } catch (error) {
        console.error('Error fetching invites:', error);
      }
    };
    fetchInvites();
  }, [adminTokenId]);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: Invite | null,
  ) => {
    api.setEditCellValue({ id, field, value: newValue?.id || '' });
  };

  const currentInvite = invites.find((inv) => inv.id === value) || null;

  return (
    <Autocomplete
      fullWidth
      size="small"
      options={invites}
      getOptionLabel={(invite) => `${invite.id} - ${invite.displayName}`}
      value={currentInvite}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Buscar invitación..."
          variant="outlined"
        />
      )}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
    />
  );
};

// Componente para el formulario de detalle del invitado
const GuestDetailForm: FC<{
  guest: Guest;
  invites: Invite[];
  onSave: (guest: Guest) => void;
  onCancel: () => void;
}> = ({ guest, invites, onSave, onCancel }) => {
  const [editedGuest, setEditedGuest] = useState<Guest>({ ...guest });

  const handleInputChange = (field: keyof Guest, value: any) => {
    setEditedGuest((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedGuest);
  };

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <TextField
        label="Nombre completo"
        value={editedGuest.fullName}
        onChange={(e) => handleInputChange('fullName', e.target.value)}
        fullWidth
      />

      <Autocomplete
        options={invites}
        getOptionLabel={(invite) => `${invite.id} - ${invite.displayName}`}
        value={invites.find((inv) => inv.id === editedGuest.inviteId) || null}
        onChange={(_, newValue) =>
          handleInputChange('inviteId', newValue?.id || '')
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Invitación"
            placeholder="Buscar invitación..."
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
      />

      <TextField
        label="Alergias"
        value={editedGuest.allergies || ''}
        onChange={(e) => handleInputChange('allergies', e.target.value)}
        fullWidth
        multiline
        rows={2}
      />

      <TextField
        label="Canción"
        value={editedGuest.song || ''}
        onChange={(e) => handleInputChange('song', e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Bus</InputLabel>
        <Select
          value={editedGuest.busOrigin || ''}
          onChange={(e) => handleInputChange('busOrigin', e.target.value)}
          label="Bus"
        >
          <MenuItem value="">Sin bus</MenuItem>
          <MenuItem value="Sevilla">Sevilla</MenuItem>
          <MenuItem value="Huelva">Huelva</MenuItem>
          <MenuItem value="Lucena">Lucena</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Plato</InputLabel>
        <Select
          value={editedGuest.dish || ''}
          onChange={(e) => handleInputChange('dish', e.target.value)}
          label="Plato"
        >
          <MenuItem value="">Sin especificar</MenuItem>
          <MenuItem value="marisco">Marisco</MenuItem>
          <MenuItem value="carne">Carne</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Grupo</InputLabel>
        <Select
          value={editedGuest.group || ''}
          onChange={(e) => handleInputChange('group', e.target.value as Group)}
          label="Grupo"
        >
          <MenuItem value="">Sin grupo</MenuItem>
          <MenuItem value="Novios">Novios</MenuItem>
          <MenuItem value="Familia Alberto Bujalance Muñoz">
            Familia Alberto Bujalance Muñoz
          </MenuItem>
          <MenuItem value="Familia Verónica">Familia Verónica</MenuItem>
          <MenuItem value="Sevilla">Sevilla</MenuItem>
          <MenuItem value="Amigos Alberto Bujalance Muñoz">
            Amigos Alberto Bujalance Muñoz
          </MenuItem>
          <MenuItem value="Amigos comunes">Amigos comunes</MenuItem>
          <MenuItem value="Amigos Padres Alberto">
            Amigos Padres Alberto
          </MenuItem>
          <MenuItem value="Amigos Padres Vero">Amigos Padres Vero</MenuItem>
          <MenuItem value="Amigos Verónica">Amigos Verónica</MenuItem>
          <MenuItem value="Marchanes">Marchanes</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={editedGuest.confirmed}
              onChange={(e) => handleInputChange('confirmed', e.target.checked)}
            />
          }
          label="Confirmado"
        />
        <FormControlLabel
          control={
            <Switch
              checked={editedGuest.isChild}
              onChange={(e) => handleInputChange('isChild', e.target.checked)}
            />
          }
          label="Es niño"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={onCancel} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained">
          Guardar Cambios
        </Button>
      </Box>
    </Stack>
  );
};

export const GuestList: FC<GuestListProps> = ({
  guests,
  adminTokenId,
  onGuestsUpdate,
  selectedInviteId,
}) => {
  const [rows, setRows] = useState(guests);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isCreating, setIsCreating] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | ''>('');
  const [invites, setInvites] = useState<Invite[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [guestDetailOpen, setGuestDetailOpen] = useState(false);

  // Breakpoints para responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // Actualizar rows cuando cambien los guests del prop
  useEffect(() => {
    setRows(guests);
  }, [guests]);

  // Cargar invitaciones para el selector
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await fetch('/api/admin/invites', {
          headers: { 'x-admin-token': adminTokenId },
        });
        if (response.ok) {
          const data = await response.json();
          setInvites(data);
        }
      } catch (error) {
        console.error('Error fetching invites:', error);
      }
    };
    fetchInvites();
  }, [adminTokenId]);

  // Filtrar filas basado en búsqueda y grupo
  const filteredRows = useMemo(() => {
    let filtered = rows;

    // Filtro por texto de búsqueda
    if (searchText) {
      filtered = filtered.filter(
        (row) =>
          row.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          row.allergies?.toLowerCase().includes(searchText.toLowerCase()) ||
          row.song?.toLowerCase().includes(searchText.toLowerCase()) ||
          row.busOrigin?.toLowerCase().includes(searchText.toLowerCase()) ||
          row.group?.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Filtro por grupo seleccionado
    if (selectedGroup) {
      filtered = filtered.filter((row) => row.group === selectedGroup);
    }

    return filtered;
  }, [rows, searchText, selectedGroup]);

  // Función para añadir una nueva fila en modo edición
  const handleAddNewGuest = () => {
    const newId = `temp-${Date.now()}`; // ID temporal
    const newGuest: Guest = {
      id: newId,
      fullName: '',
      allergies: '',
      song: '',
      busOrigin: undefined,
      confirmed: false,
      isChild: false,
      lastUpdate: new Date(), // Asegurar que siempre sea un Date válido
      inviteId: selectedInviteId || '', // Usar selectedInviteId si está disponible
    };

    setRows((prevRows) => [newGuest, ...prevRows]);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [newId]: { mode: GridRowModes.Edit },
    }));
    setIsCreating(true);
  };

  // Función para eliminar un invitado con confirmación
  const handleDeleteGuest = useCallback(
    async (guestId: string, guestName: string) => {
      const confirmed = window.confirm(
        `¿Estás seguro de que quieres eliminar a "${guestName}"? Esta acción no se puede deshacer.`,
      );

      if (confirmed) {
        const success = await deleteGuest(guestId, adminTokenId);
        if (success) {
          // Eliminar la fila del estado local
          const updatedRows = rows.filter((row) => row.id !== guestId);
          setRows(updatedRows);
          // Notificar al componente padre si existe el callback
          if (onGuestsUpdate) {
            onGuestsUpdate(updatedRows);
          }
        }
      }
    },
    [adminTokenId, rows, onGuestsUpdate],
  );

  // Funciones para el modal de detalle
  const handleViewGuestDetail = (guest: Guest) => {
    setSelectedGuest(guest);
    setGuestDetailOpen(true);
  };

  const handleCloseGuestDetail = () => {
    setGuestDetailOpen(false);
    setSelectedGuest(null);
  };

  const handleSaveGuestDetail = async (updatedGuest: Guest) => {
    try {
      // Guardar los cambios en el backend
      await saveGuest(updatedGuest.id, { ...updatedGuest }, adminTokenId);

      // Actualizar la lista local
      const updatedRows = rows.map((row) =>
        row.id === updatedGuest.id ? updatedGuest : row,
      );
      setRows(updatedRows);

      // Notificar al componente padre
      if (onGuestsUpdate) {
        onGuestsUpdate(updatedRows);
      }

      // Cerrar el modal
      handleCloseGuestDetail();
    } catch (error) {
      console.error('Error saving guest details:', error);
    }
  };

  // Función para quitar la asignación de invitación
  const handleRemoveFromInvite = useCallback(
    async (guestId: string, guestName: string) => {
      const confirmed = window.confirm(
        `¿Estás seguro de que quieres quitar a "${guestName}" de esta invitación? El invitado quedará sin asignar.`,
      );

      if (confirmed) {
        try {
          const response = await fetch(`/api/admin/guests/${guestId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'x-admin-token': adminTokenId,
            },
            body: JSON.stringify({ inviteId: '' }),
          });

          if (response.ok) {
            // Actualizar la fila en el estado local
            const updatedRows = rows.map((row) =>
              row.id === guestId
                ? { ...row, inviteId: '', lastUpdate: new Date() }
                : row,
            );
            setRows(updatedRows);
            // Notificar al componente padre
            if (onGuestsUpdate) {
              onGuestsUpdate(updatedRows);
            }
          } else {
            console.error('Error removing guest from invite');
          }
        } catch (error) {
          console.error('Error removing guest from invite:', error);
        }
      }
    },
    [adminTokenId, rows, onGuestsUpdate],
  );

  // Esta función es necesaria para que el modo de edición de fila funcione
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Esta función se ejecuta automáticamente cuando se finaliza la edición de una fila
  const processRowUpdate = async (newRow: Guest) => {
    // Si es una fila nueva (ID temporal)
    if (newRow.id.startsWith('temp-')) {
      try {
        const createdGuest = await createNewGuest(
          newRow,
          adminTokenId,
          selectedInviteId,
        );
        if (createdGuest) {
          // Reemplazar la fila temporal con la nueva con ID real
          const guestWithValidDate = {
            ...createdGuest,
            lastUpdate: new Date(), // Asegurar que siempre sea un Date válido
          };
          const updatedRows = rows.map((row) =>
            row.id === newRow.id ? guestWithValidDate : row,
          );
          setRows(updatedRows);
          setIsCreating(false);
          // Notificar al componente padre
          if (onGuestsUpdate) {
            onGuestsUpdate(updatedRows);
          }
          return guestWithValidDate;
        }
      } catch (error) {
        console.error('Error creando nuevo invitado:', error);
        throw error;
      }
    } else {
      // Actualizar invitado existente - encontrar la fila original
      const oldRow = rows.find((row) => row.id === newRow.id);

      if (oldRow) {
        const changedFields: Record<string, unknown> = {};

        // Comparar cada campo y solo incluir los que han cambiado
        (Object.keys(newRow) as Array<keyof Guest>).forEach((key) => {
          if (
            key !== 'id' &&
            key !== 'lastUpdate' &&
            newRow[key] !== oldRow[key]
          ) {
            changedFields[key] = newRow[key];
          }
        });

        // Solo hacer la llamada si hay campos que han cambiado
        if (Object.keys(changedFields).length > 0) {
          const updatedRowWithValidDate = {
            ...newRow,
            lastUpdate: new Date(), // Asegurar que siempre sea un Date válido
          };
          const updatedRows = rows.map((row) =>
            row.id === newRow.id ? updatedRowWithValidDate : row,
          );
          setRows(updatedRows);
          await saveGuest(newRow.id, changedFields, adminTokenId);
          // Notificar al componente padre
          if (onGuestsUpdate) {
            onGuestsUpdate(updatedRows);
          }
        }
      } else {
        // Fallback: enviar toda la fila si no encontramos la original
        const updatedRowWithValidDate = {
          ...newRow,
          lastUpdate: new Date(), // Asegurar que siempre sea un Date válido
        };
        const updatedRows = rows.map((row) =>
          row.id === newRow.id ? updatedRowWithValidDate : row,
        );
        setRows(updatedRows);
        await saveGuest(newRow.id, { ...newRow }, adminTokenId);
        // Notificar al componente padre
        if (onGuestsUpdate) {
          onGuestsUpdate(updatedRows);
        }
      }
    }

    return { ...newRow, lastUpdate: new Date() }; // Asegurar que siempre devolvemos un Date válido
  };

  // Generar columnas según el breakpoint
  const getColumns = (): any[] => {
    const baseColumns: any[] = [
      {
        field: 'fullName',
        flex: 1,
        headerName: 'Nombre completo',
        editable: true,
      },
      {
        field: 'inviteId',
        flex: 1,
        headerName: 'Invitación',
        editable: true,
        renderEditCell: (params: GridRenderEditCellParams) => (
          <InviteEditCell {...params} adminTokenId={adminTokenId} />
        ),
        valueFormatter: (value: string) => {
          const invite = invites.find((inv) => inv.id === value);
          return invite ? `${invite.id} - ${invite.displayName}` : value || '';
        },
      },
      {
        field: 'confirmed',
        flex: 1,
        headerName: 'Confirmado',
        editable: true,
        type: 'boolean',
      },
    ];

    const tabletColumns: any[] = [
      {
        field: 'busOrigin',
        flex: 1,
        headerName: 'Bus',
        editable: true,
        type: 'singleSelect',
        valueOptions: ['Sevilla', 'Huelva', 'Lucena'],
      },
    ];

    const desktopColumns: any[] = [
      {
        field: 'allergies',
        flex: 1,
        headerName: 'Alergias',
        editable: true,
      },
      {
        field: 'song',
        flex: 1,
        headerName: 'Canción',
        editable: true,
      },
      {
        field: 'isChild',
        flex: 1,
        headerName: 'Niño',
        editable: true,
        type: 'boolean',
      },
      {
        field: 'dish',
        flex: 1,
        headerName: 'Plato',
        editable: true,
        type: 'singleSelect',
        valueOptions: ['marisco', 'carne'],
      },
      {
        field: 'group',
        flex: 1,
        headerName: 'Grupo',
        editable: true,
        type: 'singleSelect',
        valueOptions: [
          'Novios',
          'Familia Alberto Bujalance Muñoz',
          'Familia Verónica',
          'Sevilla',
          'Amigos Alberto Bujalance Muñoz',
          'Amigos comunes',
          'Amigos Padres Alberto',
          'Amigos Padres Vero',
          'Amigos Verónica',
          'Marchanes',
        ],
      },
      {
        field: 'lastUpdate',
        flex: 1,
        headerName: 'Última actualización',
        type: 'dateTime',
        editable: false,
        valueGetter: (value: Date | string | number | null | undefined) => {
          if (!value) return null;
          if (value instanceof Date) return value;
          if (typeof value === 'string' || typeof value === 'number') {
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : date;
          }
          return null;
        },
      },
    ];

    // Construir columnas según el breakpoint
    let columns = [...baseColumns];

    if (!isMobile) {
      columns.splice(3, 0, ...tabletColumns); // Añadir columnas de tablet después de 'confirmed'
    }

    if (!isMobile && !isTablet) {
      columns = [...columns, ...desktopColumns]; // Añadir columnas de desktop al final
    }

    // Columna de acciones (siempre presente)
    columns.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      cellClassName: 'actions',

      getActions: ({ id, row }: { id: any; row: Guest }) => {
        const actions = [
          <GridActionsCellItem
            key="view"
            icon={<VisibilityIcon />}
            label="Ver Detalle"
            onClick={() => handleViewGuestDetail(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleDeleteGuest(id as string, row.fullName)}
            color="inherit"
          />,
        ];

        // Solo mostrar el botón de quitar de invitación si estamos en el contexto de una invitación específica
        if (selectedInviteId && row.inviteId === selectedInviteId) {
          actions.splice(
            1,
            0,
            <GridActionsCellItem
              key="remove"
              icon={<RemoveCircleIcon />}
              label="Quitar de invitación"
              onClick={() => handleRemoveFromInvite(id as string, row.fullName)}
              color="inherit"
            />,
          );
        }

        return actions;
      },
    });

    return columns;
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewGuest}
          disabled={isCreating}
        >
          Añadir Nuevo Invitado
        </Button>

        <TextField
          label="Buscar invitados"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ minWidth: 250 }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filtrar por grupo</InputLabel>
          <Select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value as Group | '')}
            label="Filtrar por grupo"
          >
            <MenuItem value="">Todos los grupos</MenuItem>
            <MenuItem value="Novios">Novios</MenuItem>
            <MenuItem value="Familia Alberto Bujalance Muñoz">
              Familia Alberto Bujalance Muñoz
            </MenuItem>
            <MenuItem value="Familia Verónica">Familia Verónica</MenuItem>
            <MenuItem value="Sevilla">Sevilla</MenuItem>
            <MenuItem value="Amigos Alberto Bujalance Muñoz">
              Amigos Alberto Bujalance Muñoz
            </MenuItem>
            <MenuItem value="Amigos comunes">Amigos comunes</MenuItem>
            <MenuItem value="Amigos Padres Alberto">
              Amigos Padres Alberto
            </MenuItem>
            <MenuItem value="Amigos Padres Vero">Amigos Padres Vero</MenuItem>
            <MenuItem value="Amigos Verónica">Amigos Verónica</MenuItem>
            <MenuItem value="Marchanes">Marchanes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        rows={filteredRows}
        editMode="row" // Habilita la edición por fila
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        // Conectamos la función de guardado al evento de actualización de fila
        processRowUpdate={processRowUpdate}
        // Manejo de errores de actualización si lo necesitas (opcional)
        // onProcessRowUpdateError={(error) => console.error(error)}
        columns={getColumns()}
      />

      {/* Modal de detalle del invitado */}
      <Dialog
        open={guestDetailOpen}
        onClose={handleCloseGuestDetail}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">
              Detalle del Invitado: {selectedGuest?.fullName}
            </Typography>
            <IconButton onClick={handleCloseGuestDetail}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedGuest && (
            <GuestDetailForm
              guest={selectedGuest}
              invites={invites}
              onSave={handleSaveGuestDetail}
              onCancel={handleCloseGuestDetail}
            />
          )}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
