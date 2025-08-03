import { getInvite } from '@/lib/firebase/invites';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ inviteId: string }> },
) {
  const inviteId = (await params).inviteId;
  const invite = await getInvite(inviteId);
  return new Response(JSON.stringify(invite), { status: 200 });
}
