import { NextResponse } from 'next/server';
import { getAdminsConfig, saveAdminsConfig, deleteAdminUser } from '@/lib/db';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0'
};

// Helper: check if caller has super_admin role
async function isSuperAdmin(req) {
  const cookie = req.cookies.get('driven_admin_session');
  if (!cookie || !cookie.value) return false;
  try {
    const user = JSON.parse(cookie.value);
    const config = await getAdminsConfig();
    const found = config.users.find(
      (u) => u.email.toLowerCase() === (user.email || '').toLowerCase()
    );
    return found?.role === 'super_admin';
  } catch {
    return false;
  }
}

// 1. GET: List all registered admin users
export async function GET() {
  const config = await getAdminsConfig();
  return NextResponse.json({
    success: true,
    data: config.users || []
  }, { headers: NO_CACHE_HEADERS });
}

// 2. POST: Add / Pre-authorize a new admin user
export async function POST(req) {
  if (!(await isSuperAdmin(req))) {
    return NextResponse.json(
      { success: false, message: 'Permission Denied: Only Super Admins can add new administrators.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, role } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Valid email is required.' }, { status: 400 });
    }

    const config = await getAdminsConfig();
    const emailLower = email.trim().toLowerCase();

    const exists = config.users.find((u) => u.email.toLowerCase() === emailLower);
    if (exists) {
      return NextResponse.json({ success: false, message: 'User with this email already exists.' }, { status: 409 });
    }

    const newUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: name?.trim() || emailLower.split('@')[0],
      email: email.trim(),
      picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || email)}`,
      role: role === 'super_admin' ? 'super_admin' : 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    config.users.push(newUser);
    await saveAdminsConfig(config);

    return NextResponse.json({ success: true, data: newUser });
  } catch (err) {
    console.error('Error adding admin user:', err);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

// 3. PUT: Update Role (super_admin <-> admin) or Status (active <-> suspended)
export async function PUT(req) {
  if (!(await isSuperAdmin(req))) {
    return NextResponse.json(
      { success: false, message: 'Permission Denied: Only Super Admins can change user roles or permissions.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { id, role, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 });
    }

    const config = await getAdminsConfig();
    const userIndex = config.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    const targetUser = config.users[userIndex];

    // Prevent demoting the last super_admin
    if (targetUser.role === 'super_admin' && role === 'admin') {
      const superAdminCount = config.users.filter((u) => u.role === 'super_admin').length;
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { success: false, message: 'Cannot demote the only remaining Super Admin.' },
          { status: 400 }
        );
      }
    }

    if (role && (role === 'admin' || role === 'super_admin')) {
      targetUser.role = role;
    }

    if (status && (status === 'active' || status === 'suspended')) {
      targetUser.status = status;
    }

    await saveAdminsConfig(config);

    return NextResponse.json({ success: true, data: targetUser });
  } catch (err) {
    console.error('Error updating admin user:', err);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

// 4. DELETE: Remove user from admin panel
export async function DELETE(req) {
  if (!(await isSuperAdmin(req))) {
    return NextResponse.json(
      { success: false, message: 'Permission Denied: Only Super Admins can remove administrators.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 });
    }

    const config = await getAdminsConfig();
    const user = config.users.find((u) => u.id === id);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    // Prevent deleting the only super admin
    if (user.role === 'super_admin') {
      const superAdminCount = config.users.filter((u) => u.role === 'super_admin').length;
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { success: false, message: 'Cannot delete the only remaining Super Admin.' },
          { status: 400 }
        );
      }
    }

    await deleteAdminUser(id, user.email);

    return NextResponse.json({ success: true, message: 'User removed successfully.' });
  } catch (err) {
    console.error('Error removing admin user:', err);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
