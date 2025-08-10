import { getAllGuests } from '@/lib/firebase/guest';
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

    // Estadísticas básicas
    const totalGuests = guests.length;
    const confirmedGuests = guests.filter((g) => g.confirmed === true).length;
    const pendingGuests = totalGuests - confirmedGuests;

    // Estadísticas de buses
    const busCounts = guests.reduce((acc, guest) => {
      if (guest.busOrigin) {
        acc[guest.busOrigin] = (acc[guest.busOrigin] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Estadísticas de platos (solo invitados confirmados)
    const dishCounts = guests
      .filter((guest) => guest.confirmed === true)
      .reduce((acc, guest) => {
        if (guest.dish) {
          acc[guest.dish] = (acc[guest.dish] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

    // Alergias agrupadas
    const allergies = guests
      .filter((g) => g.allergies && g.allergies.trim() !== '')
      .map((g) => ({
        name: g.fullName,
        allergies: g.allergies,
      }));

    // Últimos 10 invitados actualizados
    const recentlyUpdated = guests
      .sort((a, b) => b.lastUpdate.getTime() - a.lastUpdate.getTime())
      .slice(0, 10)
      .map((g) => ({
        id: g.id,
        name: g.fullName,
        lastUpdate: g.lastUpdate,
        confirmed: g.confirmed,
      }));

    const stats = {
      totalGuests,
      confirmedGuests,
      pendingGuests,
      busCounts,
      dishCounts,
      allergies,
      recentlyUpdated,
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
