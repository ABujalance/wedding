import { createGuest } from '@/lib/firebase/guest';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const inviteId = request.headers.get('x-invite-id');

    if (!inviteId) {
      return new Response(JSON.stringify({ error: 'Invite ID required' }), {
        status: 401,
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

    // Ensure the guest is associated with the provided inviteId
    const guestWithInvite = {
      ...guestData,
      inviteId: inviteId,
    };

    const newGuest = await createGuest(guestWithInvite);

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
