import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'servicesList.json');

function getServices() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading services:', error);
    return [];
  }
}

function saveServices(services) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(services, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving services:', error);
    return false;
  }
}

export async function GET() {
  const services = getServices();
  return NextResponse.json(services);
}

export async function POST(request) {
  try {
    const newService = await request.json();
    const services = getServices();

    const nextIndex = services.length + 1;
    const formattedNum = `/00${nextIndex}/`;

    const created = {
      ...newService,
      id: newService.id || `srv-${Date.now()}`,
      slug: newService.slug || (newService.title ? newService.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : `service-${Date.now()}`),
      num: newService.num || formattedNum,
      features: Array.isArray(newService.features) ? newService.features : [],
      order: nextIndex
    };

    services.push(created);
    saveServices(services);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedService = await request.json();
    const services = getServices();

    const index = services.findIndex((s) => s.id === updatedService.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    services[index] = {
      ...services[index],
      ...updatedService,
      features: Array.isArray(updatedService.features) ? updatedService.features : services[index].features
    };
    saveServices(services);

    return NextResponse.json(services[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    let services = getServices();
    const originalLength = services.length;
    services = services.filter((s) => s.id !== id);

    if (services.length === originalLength) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    saveServices(services);
    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
