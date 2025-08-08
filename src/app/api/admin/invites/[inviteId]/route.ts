import { updateInvite, deleteInvite, getInvite } from '@/lib/firebase/invites';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  try {
    const { inviteId } = await params;
    const adminTokenId = request.headers.get('x-admin-token');

    if (!adminTokenId) {
      return new Response(JSON.stringify({ error: 'Admin token required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate admin token against environment variable
    if (process.env.ADMIN_TOKEN_ID !== adminTokenId) {
      return new Response(JSON.stringify({ error: 'Invalid admin token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const invite = await getInvite(inviteId);
    if (!invite) {
      return new Response(JSON.stringify({ error: 'Invite not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(invite), {
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
    const { inviteId } = await params;
    const adminTokenId = request.headers.get('x-admin-token');

    if (!adminTokenId) {
      return new Response(JSON.stringify({ error: 'Admin token required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate admin token against environment variable
    if (process.env.ADMIN_TOKEN_ID !== adminTokenId) {
      return new Response(JSON.stringify({ error: 'Invalid admin token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    await updateInvite(inviteId, body);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating invite:', error);
    return new Response(JSON.stringify({ error: 'Failed to update invite' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  try {
    const { inviteId } = await params;
    const adminTokenId = request.headers.get('x-admin-token');

    if (!adminTokenId) {
      return new Response(JSON.stringify({ error: 'Admin token required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate admin token against environment variable
    if (process.env.ADMIN_TOKEN_ID !== adminTokenId) {
      return new Response(JSON.stringify({ error: 'Invalid admin token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await deleteInvite(inviteId);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting invite:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete invite' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
