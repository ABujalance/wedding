import { getAllGuests } from '@/lib/firebase/guest';
import { Stack, Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import { PageLayout } from '../PageLayout';
import { GuestList } from './components/GuestList';

interface AdminPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Admin({ searchParams }: AdminPageProps) {
  const adminTokenId = await searchParams?.adminTokenId;

  if (process.env.ADMIN_TOKEN_ID !== adminTokenId) {
    redirect('/');
  }

  const guests = await getAllGuests();

  return (
    <div>
      <PageLayout>
        <Stack color="black">
          <Typography>Administrador</Typography>
          <GuestList guests={guests} />
        </Stack>
      </PageLayout>
    </div>
  );
}
