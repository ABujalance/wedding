'use client';
import { Guest } from '@/lib/firebase/guest';
import { Cancel, Edit, Save } from '@mui/icons-material';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { FC, useState } from 'react';

type GuestListProps = { guests: Guest[] };

const saveGuest = (guest: Guest) => {
  console.log('Guardando cambios para el invitado:', guest.fullName);
  // Aquí harías tu llamada a la API con los datos actualizadosO
  // Ejemplo: await fetch(`/api/guests/${guest.id}`, { method: 'PUT', body: JSON.stringify(guest) });
};

export const GuestList: FC<GuestListProps> = ({ guests }) => {
  const [rows, setRows] = useState(guests);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // Esta función es necesaria para que el modo de edición de fila funcione
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Esta función se ejecuta automáticamente cuando se finaliza la edición de una fila
  const processRowUpdate = (newRow: Guest) => {
    // Aquí actualizamos el estado local
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));

    // Llamamos a tu función de guardado con la fila actualizada
    saveGuest(newRow);

    // El DataGrid espera que se devuelva la fila actualizada
    return newRow;
  };

  return (
    <DataGrid
      rows={rows}
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
          field: 'lastUpdate',
          flex: 1,
          headerName: 'Última actualización',
          type: 'dateTime',
        },
      ]}
    />
  );
};
