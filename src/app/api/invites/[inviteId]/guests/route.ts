import { getGuestsFromInviteId } from '@/lib/firebase/guest';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const inviteId = (await params).inviteId;
  const guests = await getGuestsFromInviteId(inviteId);
  return new Response(JSON.stringify(guests), { status: 200 });
}
