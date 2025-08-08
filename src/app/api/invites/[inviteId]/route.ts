import { getInvite, updateInvite } from '@/lib/firebase/invites';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  try {
    const inviteId = (await params).inviteId;
    const invite = await getInvite(inviteId);
    
    if (!invite) {
      return new Response(JSON.stringify({ error: 'Invite not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Para la ruta pública, solo devolvemos información básica
    const publicInviteData = {
      id: invite.id,
      displayName: invite.displayName,
      notes: invite.notes,
    };

    return new Response(JSON.stringify(publicInviteData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching invite:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch invite' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  try {
    const inviteId = (await params).inviteId;
    const body = await request.json();
    
    // Solo permitir actualizar las notas en la ruta pública
    const allowedUpdates = {
      notes: body.notes,
    };

    // Validar que el inviteId existe
    const existingInvite = await getInvite(inviteId);
    if (!existingInvite) {
      return new Response(JSON.stringify({ error: 'Invite not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await updateInvite(inviteId, allowedUpdates);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating invite notes:', error);
    return new Response(JSON.stringify({ error: 'Failed to update invite notes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
