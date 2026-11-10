import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

const defaultSettings = {
  whatsappNumber: "8801909711808",
  displayPhone: "+880 1909-711808",
  officialEmail: "drivenitsolution@gmail.com",
  workingHours: "Mon-Fri from 8am to 6pm (Official WhatsApp Active)",
  officeAddress: "Dhaka, Bangladesh · Remote-First Worldwide",
  tagline: "Your Growth Our Mission",
  ctaText: "Book Free Call",
  socials: {
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    github: "https://github.com",
    twitter: "https://x.com",
    instagram: "https://instagram.com"
  }
};

function getSettings() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return defaultSettings;
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading settings:', error);
    return defaultSettings;
  }
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(settings, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request) {
  try {
    const updatedSettings = await request.json();
    const current = getSettings();

    const merged = {
      ...current,
      ...updatedSettings,
      socials: {
        ...current.socials,
        ...(updatedSettings.socials || {})
      }
    };

    saveSettings(merged);
    return NextResponse.json(merged);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
