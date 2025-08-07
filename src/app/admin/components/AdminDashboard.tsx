'use client';
import { Guest } from '@/lib/firebase/guest';
import { Box, Tab, Tabs } from '@mui/material';
import { FC, useState, useCallback } from 'react';
import { GuestList } from './GuestList';
import { StatsPanel } from './StatsPanel';
import { InvitesList } from './InvitesList';

interface AdminDashboardProps {
  guests: Guest[];
  adminTokenId: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

export const AdminDashboard: FC<AdminDashboardProps> = ({
  guests: initialGuests,
  adminTokenId,
}) => {
  const [value, setValue] = useState(0);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    // Si cambiamos a la pestaña de invitados (index 2), verificar si necesitamos refrescar
    if (newValue === 2) {
      refreshGuestsIfNeeded();
    }
  };

  const refreshGuestsIfNeeded = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/guests', {
        headers: {
          'x-admin-token': adminTokenId,
        },
      });

      if (response.ok) {
        const freshGuests = await response.json();
        setGuests(freshGuests);
      }
    } catch (error) {
      console.error('Error refreshing guests:', error);
    }
  }, [adminTokenId]);

  const handleGuestsInvalidation = useCallback(() => {
    // Esta función será llamada desde InvitesList cuando se modifiquen invitados
    // Por ahora solo marcamos que necesitamos refrescar
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="admin dashboard tabs"
        >
          <Tab label="Información Útil" {...a11yProps(0)} />
          <Tab label="Invitaciones" {...a11yProps(1)} />
          <Tab label="Invitados" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <StatsPanel adminTokenId={adminTokenId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InvitesList
          adminTokenId={adminTokenId}
          onGuestsModified={handleGuestsInvalidation}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GuestList guests={guests} adminTokenId={adminTokenId} />
      </TabPanel>
    </Box>
  );
};
