import { updateGuest, getGuest } from '@/lib/firebase/guest';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ guestId: string }> },
) {
  try {
    const inviteId = request.headers.get('x-invite-id');

    if (!inviteId) {
      return new Response(JSON.stringify({ error: 'Invite ID required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { guestId } = await params;
    const guest = await getGuest(guestId);

    if (!guest) {
      return new Response(JSON.stringify({ error: 'Guest not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate that the guest belongs to the provided invite
    if (guest.inviteId !== inviteId) {
      return new Response(
        JSON.stringify({ error: 'Guest does not belong to this invite' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(JSON.stringify(guest), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching guest:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch guest' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ guestId: string }> },
) {
  try {
    const inviteId = request.headers.get('x-invite-id');

    if (!inviteId) {
      return new Response(JSON.stringify({ error: 'Invite ID required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { guestId } = await params;
    const updates = await request.json();

    // Get the existing guest
    const existingGuest = await getGuest(guestId);
    if (!existingGuest) {
      return new Response(JSON.stringify({ error: 'Guest not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate that the guest belongs to the provided invite
    if (existingGuest.inviteId !== inviteId) {
      return new Response(
        JSON.stringify({ error: 'Guest does not belong to this invite' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Create the updated guest object (only update provided fields)
    // Don't allow changing inviteId through this endpoint
    const allowedUpdates = { ...updates };
    delete allowedUpdates.inviteId;

    // Clean undefined values (Firebase doesn't like them)
    const cleanUpdates = Object.fromEntries(
      Object.entries(allowedUpdates).filter(
        ([, value]) => value !== undefined && value !== null,
      ),
    );

    await updateGuest(guestId, cleanUpdates);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating guest:', error);
    return new Response(JSON.stringify({ error: 'Failed to update guest' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
