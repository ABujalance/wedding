import { getGuestsFromInviteId } from '@/lib/firebase/guest';
import { NextRequest } from 'next/server';
import { getGuest, updateGuest } from '@/lib/firebase/guest';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const inviteId = (await params).inviteId;
  const guests = await getGuestsFromInviteId(inviteId);
  return new Response(JSON.stringify(guests), { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  try {
    const inviteId = (await params).inviteId;
    const body = await request.json();
    const updates: Array<{
      id: string;
      confirmed?: boolean;
      allergies?: string;
      dish?: 'marisco' | 'carne';
    }> = Array.isArray(body?.guests) ? body.guests : [];

    if (!updates.length) {
      return new Response(JSON.stringify({ error: 'No updates provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    for (const u of updates) {
      const g = await getGuest(u.id);
      if (!g || g.inviteId !== inviteId) {
        return new Response(
          JSON.stringify({ error: `Guest ${u.id} not found or not in invite` }),
          { status: 404, headers: { 'Content-Type': 'application/json' } },
        );
      }

      const allowed: Record<string, unknown> = {};
      if (typeof u.confirmed === 'boolean') allowed.confirmed = u.confirmed;
      if (typeof u.allergies === 'string') allowed.allergies = u.allergies;
      if (u.dish === 'marisco' || u.dish === 'carne') allowed.dish = u.dish;

      if (Object.keys(allowed).length > 0) {
        await updateGuest(u.id, allowed);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating guests from invite:', error);
    return new Response(JSON.stringify({ error: 'Failed to update guests' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
