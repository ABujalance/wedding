import { createGuest, getAllGuests } from '@/lib/firebase/guest';
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

    const guests = await getAllGuests();
    return new Response(JSON.stringify(guests), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch guests' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: NextRequest) {
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

    const guestData = await request.json();

    // Validate required fields
    if (!guestData.fullName) {
      return new Response(JSON.stringify({ error: 'fullName is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newGuest = await createGuest(guestData);

    return new Response(JSON.stringify(newGuest), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating guest:', error);
    return new Response(JSON.stringify({ error: 'Failed to create guest' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
