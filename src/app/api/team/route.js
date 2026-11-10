import { NextResponse } from 'next/server';
import { getTeam, saveTeam, deleteTeamMember } from '@/lib/db';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  const team = await getTeam();
  return NextResponse.json({ success: true, data: team }, { headers: NO_CACHE_HEADERS });
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Support legacy action-based dispatch if passed
    if (body.action) {
      const { action, member, members } = body;
      if (members && Array.isArray(members)) {
        await saveTeam(members);
        return NextResponse.json(
          { success: true, data: members, message: 'All profiles updated successfully.' },
          { headers: NO_CACHE_HEADERS }
        );
      }
      let team = await getTeam();
      if (action === 'create') {
        const newMember = {
          ...member,
          id: member.id || (member.name ? member.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : `member-${Date.now()}`),
          order: team.length + 1
        };
        team.push(newMember);
        await saveTeam(team);
        return NextResponse.json(
          { success: true, data: team, message: 'New member profile added!' },
          { status: 201, headers: NO_CACHE_HEADERS }
        );
      }
      if (action === 'update') {
        team = team.map((m) => (m.id === member.id ? { ...m, ...member } : m));
        await saveTeam(team);
        return NextResponse.json(
          { success: true, data: team, message: 'Profile updated!' },
          { headers: NO_CACHE_HEADERS }
        );
      }
      if (action === 'delete') {
        team = await deleteTeamMember(member.id);
        return NextResponse.json(
          { success: true, data: team, message: 'Profile deleted!' },
          { headers: NO_CACHE_HEADERS }
        );
      }
    }

    // Direct REST POST
    const newMember = body;
    let team = await getTeam();
    const created = {
      ...newMember,
      id: newMember.id || (newMember.name ? newMember.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : `member-${Date.now()}`),
      skills: Array.isArray(newMember.skills) ? newMember.skills : [],
      order: team.length + 1
    };
    team.push(created);
    await saveTeam(team);
    return NextResponse.json(
      { success: true, data: team, member: created },
      { status: 201, headers: NO_CACHE_HEADERS }
    );
  } catch (err) {
    console.error('API Error in /api/team POST:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function PUT(request) {
  try {
    const updatedMember = await request.json();
    let team = await getTeam();

    const index = team.findIndex((m) => m.id === updatedMember.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    team[index] = {
      ...team[index],
      ...updatedMember,
      skills: Array.isArray(updatedMember.skills) ? updatedMember.skills : team[index].skills
    };
    await saveTeam(team);

    return NextResponse.json({ success: true, data: team, member: team[index] }, { headers: NO_CACHE_HEADERS });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required' }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    const filtered = await deleteTeamMember(id);
    return NextResponse.json(
      { success: true, data: filtered, message: 'Member deleted successfully' },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
