import { getAllInvites } from '@/lib/firebase/invites';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
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

    const invites = await getAllInvites();
    return new Response(JSON.stringify(invites), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching invites:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch invites' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
