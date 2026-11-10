import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'team.json');

function getTeamData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err) {
    console.error('Failed to read team.json:', err);
    return [];
  }
}

function saveTeamData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to save team.json:', err);
    return false;
  }
}

export async function GET() {
  const team = getTeamData();
  return NextResponse.json({ success: true, data: team });
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Support legacy action-based dispatch if passed
    if (body.action) {
      const { action, member, members } = body;
      if (members && Array.isArray(members)) {
        saveTeamData(members);
        return NextResponse.json({ success: true, data: members, message: 'All profiles updated successfully.' });
      }
      let team = getTeamData();
      if (action === 'create') {
        const newMember = {
          ...member,
          id: member.id || (member.name ? member.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : `member-${Date.now()}`),
          order: team.length + 1
        };
        team.push(newMember);
        saveTeamData(team);
        return NextResponse.json({ success: true, data: team, message: 'New member profile added!' });
      }
      if (action === 'update') {
        team = team.map((m) => (m.id === member.id ? { ...m, ...member } : m));
        saveTeamData(team);
        return NextResponse.json({ success: true, data: team, message: 'Profile updated!' });
      }
      if (action === 'delete') {
        team = team.filter((m) => m.id !== member.id);
        saveTeamData(team);
        return NextResponse.json({ success: true, data: team, message: 'Profile deleted!' });
      }
    }

    // Direct REST POST
    const newMember = body;
    let team = getTeamData();
    const created = {
      ...newMember,
      id: newMember.id || (newMember.name ? newMember.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : `member-${Date.now()}`),
      skills: Array.isArray(newMember.skills) ? newMember.skills : [],
      order: team.length + 1
    };
    team.push(created);
    saveTeamData(team);
    return NextResponse.json({ success: true, data: team, member: created }, { status: 201 });
  } catch (err) {
    console.error('API Error in /api/team POST:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedMember = await request.json();
    let team = getTeamData();

    const index = team.findIndex((m) => m.id === updatedMember.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }

    team[index] = {
      ...team[index],
      ...updatedMember,
      skills: Array.isArray(updatedMember.skills) ? updatedMember.skills : team[index].skills
    };
    saveTeamData(team);

    return NextResponse.json({ success: true, data: team, member: team[index] });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID is required' }, { status: 400 });
    }

    let team = getTeamData();
    const originalLength = team.length;
    team = team.filter((m) => m.id !== id);

    if (team.length === originalLength) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }

    saveTeamData(team);
    return NextResponse.json({ success: true, data: team, message: 'Member deleted successfully' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
