import { getInvite } from '@/lib/firebase/invites';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const inviteId = searchParams.get('inviteId');
  if (!inviteId) {
    return new Response('Parameter error', { status: 400 });
  }
  const invite = await getInvite(inviteId);
  return new Response(JSON.stringify(invite), { status: 200 });
}
