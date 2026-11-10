import { NextResponse } from 'next/server';
import { getServices, saveServices, deleteServiceItem } from '@/lib/db';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  const services = await getServices();
  return NextResponse.json(services, { headers: NO_CACHE_HEADERS });
}

export async function POST(request) {
  try {
    const newService = await request.json();
    const services = await getServices();

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
    await saveServices(services);

    return NextResponse.json(created, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function PUT(request) {
  try {
    const updatedService = await request.json();
    const services = await getServices();

    const index = services.findIndex((s) => s.id === updatedService.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    services[index] = {
      ...services[index],
      ...updatedService,
      features: Array.isArray(updatedService.features) ? updatedService.features : services[index].features
    };
    await saveServices(services);

    return NextResponse.json(services[index], { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    await deleteServiceItem(id);
    return NextResponse.json({ success: true, message: 'Service deleted successfully' }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
