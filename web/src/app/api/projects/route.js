import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

function getProjects() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

function saveProjects(projects) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving projects:', error);
    return false;
  }
}

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request) {
  try {
    const newProject = await request.json();
    const projects = getProjects();

    const nextIndex = projects.length + 1;
    const formattedNum = `/00${nextIndex}/`;

    const created = {
      ...newProject,
      id: newProject.id || `proj-${Date.now()}`,
      num: newProject.num || formattedNum,
      liveUrl: newProject.liveUrl || ''
    };

    projects.push(created);
    saveProjects(projects);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedProject = await request.json();
    const projects = getProjects();

    const index = projects.findIndex((p) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    projects[index] = { ...projects[index], ...updatedProject };
    saveProjects(projects);

    return NextResponse.json(projects[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    let projects = getProjects();
    projects = projects.filter((p) => p.id !== id);
    saveProjects(projects);

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
