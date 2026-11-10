import { NextResponse } from 'next/server';
import { getProjects, saveProjects, deleteProjectItem } from '@/lib/db';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects, { headers: NO_CACHE_HEADERS });
}

export async function POST(request) {
  try {
    const newProject = await request.json();
    const projects = await getProjects();

    const nextIndex = projects.length + 1;
    const formattedNum = `/00${nextIndex}/`;

    const created = {
      ...newProject,
      id: newProject.id || `proj-${Date.now()}`,
      num: newProject.num || formattedNum,
      liveUrl: newProject.liveUrl || '',
      isFeatured: newProject.isFeatured !== undefined ? newProject.isFeatured : true
    };

    projects.push(created);
    await saveProjects(projects);

    return NextResponse.json(created, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function PUT(request) {
  try {
    const updatedProject = await request.json();
    const projects = await getProjects();

    const index = projects.findIndex((p) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    projects[index] = { ...projects[index], ...updatedProject };
    await saveProjects(projects);

    return NextResponse.json(projects[index], { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    await deleteProjectItem(id);
    return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
