import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMINS_FILE = path.join(process.cwd(), 'src', 'data', 'admins.json');

function getAdminConfig() {
  try {
    if (fs.existsSync(ADMINS_FILE)) {
      const raw = fs.readFileSync(ADMINS_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (!Array.isArray(data.users)) data.users = [];
      return data;
    }
  } catch (err) {
    console.error('Failed to read admins.json:', err);
  }
  return { googleClientId: '', allowAnyGoogleAccount: true, users: [] };
}

function saveAdminConfig(config) {
  try {
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save admins.json:', err);
  }
}

// Parse JWT without external libraries
function decodeGoogleJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString('binary')
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding Google JWT:', e);
    return null;
  }
}

export async function GET(req) {
  const config = getAdminConfig();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || config.googleClientId || '';

  const cookie = req.cookies.get('driven_admin_session');
  if (cookie && cookie.value) {
    try {
      const user = JSON.parse(cookie.value);
      // Ensure role is up-to-date from config
      const registered = config.users.find(
        (u) => u.email.toLowerCase() === (user.email || '').toLowerCase()
      );
      if (registered) {
        user.role = registered.role || 'admin';
        user.status = registered.status || 'active';
      }
      return NextResponse.json({
        authenticated: true,
        user,
        googleClientId: clientId
      });
    } catch {
      // Invalid cookie
    }
  }

  return NextResponse.json({
    authenticated: false,
    googleClientId: clientId
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const config = getAdminConfig();
    const { action, credential, demoUser } = body;

    // 1. Handle Logout
    if (action === 'logout') {
      const res = NextResponse.json({ success: true, loggedOut: true });
      res.cookies.delete('driven_admin_session');
      return res;
    }

    let rawEmail = '';
    let rawName = '';
    let rawPicture = '';
    let sub = '';

    // 2. Extract User Info
    if (credential) {
      const payload = decodeGoogleJWT(credential);
      if (!payload || !payload.email) {
        return NextResponse.json({ success: false, message: 'Invalid Google Token' }, { status: 400 });
      }
      rawEmail = payload.email;
      rawName = payload.name || payload.email.split('@')[0];
      rawPicture = payload.picture || '';
      sub = payload.sub;
    } else if (action === 'demo_login') {
      rawEmail = demoUser?.email || 'abirshikdar.official@gmail.com';
      rawName = demoUser?.name || 'Abir Shikdar';
      rawPicture = demoUser?.picture || 'https://api.dicebear.com/7.x/bottts/svg?seed=AbirAdmin';
      sub = 'demo-superadmin-sub';
    } else {
      return NextResponse.json({ success: false, message: 'No credential provided' }, { status: 400 });
    }

    const emailLower = rawEmail.toLowerCase();

    // 3. Match or Create in Users Registry
    let targetUser = config.users.find((u) => u.email.toLowerCase() === emailLower);
    const nowIso = new Date().toISOString();

    if (targetUser) {
      if (targetUser.status === 'suspended') {
        return NextResponse.json(
          { success: false, message: 'Your administrative access has been suspended by a Super Admin.' },
          { status: 403 }
        );
      }
      targetUser.lastLogin = nowIso;
      if (rawPicture) targetUser.picture = rawPicture;
      if (rawName && targetUser.name !== rawName) targetUser.name = rawName;
    } else {
      // First user or Abir Shikdar gets Super Admin; subsequent users get Admin
      const isInitialSuperAdmin =
        config.users.length === 0 ||
        emailLower.includes('abir') ||
        emailLower.includes('founder') ||
        emailLower.includes('ceo');

      targetUser = {
        id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: rawName,
        email: rawEmail,
        picture: rawPicture,
        role: isInitialSuperAdmin ? 'super_admin' : 'admin',
        status: 'active',
        createdAt: nowIso,
        lastLogin: nowIso
      };
      config.users.push(targetUser);
    }

    saveAdminConfig(config);

    const sessionUser = {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      picture: targetUser.picture,
      role: targetUser.role, // 'super_admin' | 'admin'
      status: targetUser.status,
      loginTime: nowIso
    };

    const response = NextResponse.json({
      success: true,
      user: sessionUser
    });

    response.cookies.set('driven_admin_session', JSON.stringify(sessionUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Google Auth POST error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
