'use client';
import { Guest, Group } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button, Stack, TextField, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { FC, useCallback, useState, useEffect, useMemo } from 'react';

type GuestListProps = {
  guests: Guest[];
  adminTokenId: string;
  onGuestDetail?: (guest: Guest) => void;
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

export const GuestList: FC<GuestListProps> = ({
  guests,
  adminTokenId,
  onGuestDetail,
  onGuestsUpdate,
  selectedInviteId,
}) => {
  const [rows, setRows] = useState(guests);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isCreating, setIsCreating] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | ''>('');
  const [invites, setInvites] = useState<Invite[]>([]);

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
            <MenuItem value="Familia Alberto Bujalance Muñoz">Familia Alberto Bujalance Muñoz</MenuItem>
            <MenuItem value="Familia Verónica">Familia Verónica</MenuItem>
            <MenuItem value="Sevilla">Sevilla</MenuItem>
            <MenuItem value="Amigos Alberto Bujalance Muñoz">Amigos Alberto Bujalance Muñoz</MenuItem>
            <MenuItem value="Amigos comunes">Amigos comunes</MenuItem>
            <MenuItem value="Amigos Padres Alberto">Amigos Padres Alberto</MenuItem>
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
        columns={[
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
            type: 'singleSelect',
            valueOptions: invites.map((invite) => ({
              value: invite.id,
              label: `${invite.id} - ${invite.displayName}`,
            })),
            valueFormatter: (value: string) => {
              const invite = invites.find((inv) => inv.id === value);
              return invite
                ? `${invite.id} - ${invite.displayName}`
                : value || '';
            },
          },
          {
            field: 'allergies',
            flex: 1,
            headerName: 'Alergias',
            editable: true,
          },
          {
            field: 'busOrigin',
            flex: 1,
            headerName: 'Bus',
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Sevilla', 'Huelva', 'Lucena'],
          },
          {
            field: 'confirmed',
            flex: 1,
            headerName: 'Confirmado',
            editable: true,
            type: 'boolean',
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
              'Marchanes'
            ],
          },
          {
            field: 'lastUpdate',
            flex: 1,
            headerName: 'Última actualización',
            type: 'dateTime',
            valueGetter: (value: Date | string | number | null | undefined) => {
              // Asegurar que siempre devolvemos un Date válido o null
              if (!value) return null;
              if (value instanceof Date) return value;
              if (typeof value === 'string' || typeof value === 'number') {
                const date = new Date(value);
                return isNaN(date.getTime()) ? null : date;
              }
              return null;
            },
          },
          {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
              const actions = [
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
                actions.unshift(
                  <GridActionsCellItem
                    key="remove"
                    icon={<RemoveCircleIcon />}
                    label="Quitar de invitación"
                    onClick={() =>
                      handleRemoveFromInvite(id as string, row.fullName)
                    }
                    color="inherit"
                  />,
                );
              }

              if (onGuestDetail) {
                actions.unshift(
                  <GridActionsCellItem
                    key="view"
                    icon={<VisibilityIcon />}
                    label="Ver Detalle"
                    onClick={() => onGuestDetail(row)}
                    color="inherit"
                  />,
                );
              }

              return actions;
            },
          },
        ]}
      />
    </Stack>
  );
};
