import { getAllGuests } from '@/lib/firebase/guest';
import { Stack, Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import { PageLayout } from '../PageLayout';
import { AdminDashboard } from './components/AdminDashboard';
import { PageProps } from '../../../.next/types/app/layout';

export default async function Admin({ searchParams }: PageProps) {
  const adminTokenId = ((await searchParams) as { adminTokenId: string })
    .adminTokenId;

  if (process.env.ADMIN_TOKEN_ID !== adminTokenId) {
    redirect('/');
  }

  const guests = await getAllGuests();

  return (
    <div>
      <PageLayout>
        <Stack color="black">
          <Typography variant="h3" gutterBottom>
            Panel de Administración
          </Typography>
          <AdminDashboard guests={guests} adminTokenId={adminTokenId} />
        </Stack>
      </PageLayout>
    </div>
  );
}
