import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/db';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings, { headers: NO_CACHE_HEADERS });
}

export async function PUT(request) {
  try {
    const updatedSettings = await request.json();
    const current = await getSettings();

    const merged = {
      ...current,
      ...updatedSettings,
      socials: {
        ...current.socials,
        ...(updatedSettings.socials || {})
      }
    };

    await saveSettings(merged);
    return NextResponse.json(merged, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function POST(request) {
  // Support POST as alias for PUT for settings
  return PUT(request);
}
