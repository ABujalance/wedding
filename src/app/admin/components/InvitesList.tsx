'use client';
import { Invite } from '@/lib/firebase/invites';
import { Guest } from '@/lib/firebase/guest';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { FC, useEffect, useState, useCallback } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GuestList } from './GuestList';

interface InvitesListProps {
  adminTokenId: string;
  onGuestsModified?: () => void;
}

export const InvitesList: FC<InvitesListProps> = ({
  adminTokenId,
  onGuestsModified,
}) => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const [inviteGuests, setInviteGuests] = useState<Guest[]>([]);
  const [loadingGuests, setLoadingGuests] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isCreating, setIsCreating] = useState(false);

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
        } else {
          console.error('Error fetching invites');
        }
      } catch (error) {
        console.error('Error fetching invites:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllGuests = async () => {
      try {
        const response = await fetch('/api/admin/guests', {
          headers: {
            'x-admin-token': adminTokenId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllGuests(data);
        } else {
          console.error('Error fetching all guests');
        }
      } catch (error) {
        console.error('Error fetching all guests:', error);
      }
    };

    fetchInvites();
    fetchAllGuests();
  }, [adminTokenId]);

  // Funciones para manejar CRUD de invitaciones
  const saveInvite = async (
    inviteId: string,
    updates: Record<string, unknown>,
  ) => {
    try {
      const response = await fetch(`/api/admin/invites/${inviteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminTokenId,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update invite');
      }

      console.log('Invitación actualizada exitosamente:', updates);
    } catch (error) {
      console.error('Error actualizando invitación:', error);
    }
  };

  const createNewInvite = async (
    newInvite: Omit<Invite, 'id' | 'lastUpdate'>,
  ) => {
    try {
      const response = await fetch('/api/admin/invites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminTokenId,
        },
        body: JSON.stringify(newInvite),
      });

      if (response.ok) {
        const createdInvite = await response.json();
        console.log('Nueva invitación creada:', createdInvite);
        return createdInvite;
      } else {
        console.error('Error creando invitación');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const deleteInvitation = useCallback(
    async (inviteId: string) => {
      try {
        const response = await fetch(`/api/admin/invites/${inviteId}`, {
          method: 'DELETE',
          headers: {
            'x-admin-token': adminTokenId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete invite');
        }

        console.log('Invitación eliminada exitosamente');
        return true;
      } catch (error) {
        console.error('Error eliminando invitación:', error);
        return false;
      }
    },
    [adminTokenId],
  );

  // Función para añadir una nueva invitación
  const handleAddNewInvite = () => {
    const newId = `temp-${Date.now()}`;
    const newInvite: Invite = {
      id: newId,
      displayName: '',
      notes: '',
      email: '',
      phone: '',
      address: '',
      lastUpdate: new Date(),
    };

    setInvites((prevInvites) => [newInvite, ...prevInvites]);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [newId]: { mode: GridRowModes.Edit },
    }));
    setIsCreating(true);
  };

  // Función para eliminar una invitación
  const handleDeleteInvite = useCallback(
    async (inviteId: string, inviteName: string) => {
      const confirmed = window.confirm(
        `¿Estás seguro de que quieres eliminar la invitación "${inviteName}"? Esta acción no se puede deshacer.`,
      );

      if (confirmed) {
        const success = await deleteInvitation(inviteId);
        if (success) {
          setInvites((prevInvites) =>
            prevInvites.filter((invite) => invite.id !== inviteId),
          );
        }
      }
    },
    [deleteInvitation],
  );

  // Función para manejar cambios en el modo de edición
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Función para procesar actualizaciones de filas
  const processRowUpdate = async (newRow: Invite) => {
    if (newRow.id.startsWith('temp-')) {
      // Crear nueva invitación
      try {
        const createdInvite = await createNewInvite(newRow);
        if (createdInvite) {
          const inviteWithValidDate = {
            ...createdInvite,
            lastUpdate: new Date(),
          };
          setInvites((prevInvites) =>
            prevInvites.map((invite) =>
              invite.id === newRow.id ? inviteWithValidDate : invite,
            ),
          );
          setIsCreating(false);
          return inviteWithValidDate;
        }
      } catch (error) {
        console.error('Error creando nueva invitación:', error);
        throw error;
      }
    } else {
      // Actualizar invitación existente
      const oldRow = invites.find((invite) => invite.id === newRow.id);
      if (oldRow) {
        const changedFields: Record<string, unknown> = {};
        (Object.keys(newRow) as Array<keyof Invite>).forEach((key) => {
          if (
            key !== 'id' &&
            key !== 'lastUpdate' &&
            newRow[key] !== oldRow[key]
          ) {
            changedFields[key] = newRow[key];
          }
        });

        if (Object.keys(changedFields).length > 0) {
          const updatedRowWithValidDate = {
            ...newRow,
            lastUpdate: new Date(),
          };
          setInvites((prevInvites) =>
            prevInvites.map((invite) =>
              invite.id === newRow.id ? updatedRowWithValidDate : invite,
            ),
          );
          await saveInvite(newRow.id, changedFields);
        }
      }
    }

    return { ...newRow, lastUpdate: new Date() };
  };

  const handleViewGuests = useCallback(
    async (invite: Invite) => {
      setLoadingGuests(true);
      setSelectedInvite(invite);

      try {
        const response = await fetch(`/api/admin/invites/${invite.id}/guests`, {
          headers: {
            'x-admin-token': adminTokenId,
          },
        });

        if (response.ok) {
          const guests = await response.json();
          setInviteGuests(guests);
        } else {
          console.error('Error fetching guests for invite');
          setInviteGuests([]);
        }
      } catch (error) {
        console.error('Error fetching guests:', error);
        setInviteGuests([]);
      } finally {
        setLoadingGuests(false);
      }
    },
    [adminTokenId],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedInvite(null);
    setInviteGuests([]);
    setSelectedGuest(null);
  }, []);

  const handleViewGuestDetail = useCallback((guest: Guest) => {
    setSelectedGuest(guest);
  }, []);

  const handleBackToInviteGuests = useCallback(() => {
    setSelectedGuest(null);
  }, []);

  const handleAssignExistingGuest = useCallback(
    async (guestId: string) => {
      if (!selectedInvite) return;

      try {
        const response = await fetch(`/api/admin/guests/${guestId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-token': adminTokenId,
          },
          body: JSON.stringify({ inviteId: selectedInvite.id }),
        });

        if (response.ok) {
          // Refrescar la lista de invitados de esta invitación
          await handleViewGuests(selectedInvite);
          // Refrescar la lista de todos los invitados
          const allGuestsResponse = await fetch('/api/admin/guests', {
            headers: { 'x-admin-token': adminTokenId },
          });
          if (allGuestsResponse.ok) {
            const updatedAllGuests = await allGuestsResponse.json();
            setAllGuests(updatedAllGuests);
          }
        } else {
          console.error('Error assigning guest to invite');
        }
      } catch (error) {
        console.error('Error assigning guest:', error);
      }
    },
    [selectedInvite, adminTokenId, handleViewGuests],
  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'displayName',
      headerName: 'Nombre de la Invitación',
      flex: 2,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      flex: 1,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Dirección',
      flex: 2,
      editable: true,
    },
    {
      field: 'notes',
      headerName: 'Notas',
      flex: 2,
      editable: true,
    },
    {
      field: 'lastUpdate',
      headerName: 'Última actualización',
      flex: 1,
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 150,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            key="view"
            icon={<VisibilityIcon />}
            label="Ver Invitados"
            onClick={() => handleViewGuests(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Eliminar"
            onClick={() => handleDeleteInvite(row.id, row.displayName)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4">Invitaciones</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewInvite}
          disabled={isCreating}
        >
          Añadir Nueva Invitación
        </Button>
      </Box>

      <DataGrid
        rows={invites}
        columns={columns}
        loading={loading}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
      />

      {/* Modal para mostrar invitados de una invitación */}
      <Dialog
        open={!!selectedInvite}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {selectedGuest
                ? `Detalle: ${selectedGuest.fullName}`
                : `Invitados de: ${selectedInvite?.displayName}`}
            </Typography>
            <Stack direction="row" spacing={1}>
              {selectedGuest && (
                <IconButton onClick={handleBackToInviteGuests}>
                  <ArrowBackIcon />
                </IconButton>
              )}
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedGuest ? (
            <Box>
              <Typography variant="h6">Detalle del invitado</Typography>
              <Typography>
                <strong>Nombre:</strong> {selectedGuest.fullName}
              </Typography>
              <Typography>
                <strong>Alergias:</strong>{' '}
                {selectedGuest.allergies || 'Ninguna'}
              </Typography>
              <Typography>
                <strong>Bus:</strong>{' '}
                {selectedGuest.busOrigin || 'No especificado'}
              </Typography>
              <Typography>
                <strong>Confirmado:</strong>{' '}
                {selectedGuest.confirmed ? 'Sí' : 'No'}
              </Typography>
              <Typography>
                <strong>Niño:</strong> {selectedGuest.isChild ? 'Sí' : 'No'}
              </Typography>
              <Typography>
                <strong>Plato:</strong>{' '}
                {selectedGuest.dish || 'No especificado'}
              </Typography>
            </Box>
          ) : (
            <>
              {loadingGuests ? (
                <Typography>Cargando invitados...</Typography>
              ) : (
                <Stack spacing={2}>
                  {/* Selector para añadir invitados existentes */}
                  <Box>
                    <FormControl fullWidth size="small">
                      <InputLabel>Añadir invitado existente</InputLabel>
                      <Select
                        label="Añadir invitado existente"
                        value=""
                        onChange={(e) =>
                          handleAssignExistingGuest(e.target.value)
                        }
                      >
                        {allGuests
                          .filter(
                            (guest) => guest.inviteId !== selectedInvite?.id,
                          )
                          .map((guest) => (
                            <MenuItem key={guest.id} value={guest.id}>
                              {guest.fullName}
                              {guest.inviteId && guest.inviteId !== '' && (
                                <Typography
                                  variant="caption"
                                  sx={{ ml: 1, opacity: 0.7 }}
                                >
                                  (actualmente en: {guest.inviteId})
                                </Typography>
                              )}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Lista de invitados de esta invitación */}
                  <GuestList
                    guests={inviteGuests}
                    adminTokenId={adminTokenId}
                    onGuestDetail={handleViewGuestDetail}
                    selectedInviteId={selectedInvite?.id}
                    onGuestsUpdate={(updatedGuests) => {
                      setInviteGuests(updatedGuests);
                      // Notificar al dashboard que los invitados han sido modificados
                      if (onGuestsModified) {
                        onGuestsModified();
                      }
                    }}
                  />
                </Stack>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
