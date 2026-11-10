// src/lib/db.js
// Unified Data Layer for Driven IT Solution
// Automatically supports Supabase PostgreSQL with seamless fallback to JSON files

import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const TMP_DIR = path.join('/tmp', 'driven_it_data');

function ensureTmpDir() {
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
  } catch (err) {}
}

/**
 * Read data safely from JSON file, with serverless /tmp fallback
 */
function readLocalJson(filename, fallback = []) {
  try {
    const tmpPath = path.join(TMP_DIR, filename);
    if (fs.existsSync(tmpPath)) {
      const data = fs.readFileSync(tmpPath, 'utf8');
      return JSON.parse(data);
    }

    const localPath = path.join(DATA_DIR, filename);
    if (fs.existsSync(localPath)) {
      const data = fs.readFileSync(localPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Failed to read ${filename}:`, err);
  }
  return fallback;
}

/**
 * Write data safely to JSON file, with serverless /tmp fallback
 */
function writeLocalJson(filename, data) {
  try {
    const localPath = path.join(DATA_DIR, filename);
    fs.writeFileSync(localPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    try {
      ensureTmpDir();
      const tmpPath = path.join(TMP_DIR, filename);
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (tmpErr) {
      console.error(`Failed to write ${filename}:`, tmpErr);
      return false;
    }
  }
}

// ================= 1. TEAM MEMBERS =================
export async function getTeam() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('team')
        .select('*')
        .order('order', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getTeam error, using local fallback:', err);
    }
  }
  return readLocalJson('team.json', []);
}

export async function saveTeam(teamList) {
  writeLocalJson('team.json', teamList);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('team').upsert(teamList, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveTeam error:', err);
    }
  }
  return true;
}

export async function deleteTeamMember(id) {
  const current = await getTeam();
  const filtered = current.filter((m) => m.id !== id);
  writeLocalJson('team.json', filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('team').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteTeamMember error:', err);
    }
  }
  return filtered;
}

// ================= 2. CASE STUDIES / PROJECTS =================
export async function getProjects() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getProjects error, using local fallback:', err);
    }
  }
  return readLocalJson('projects.json', []);
}

export async function saveProjects(projectsList) {
  writeLocalJson('projects.json', projectsList);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').upsert(projectsList, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveProjects error:', err);
    }
  }
  return true;
}

export async function deleteProjectItem(id) {
  const current = await getProjects();
  const filtered = current.filter((p) => p.id !== id);
  writeLocalJson('projects.json', filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteProjectItem error:', err);
    }
  }
  return filtered;
}

// ================= 3. SERVICES =================
export async function getServices() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getServices error, using local fallback:', err);
    }
  }
  return readLocalJson('servicesList.json', []);
}

export async function saveServices(servicesList) {
  writeLocalJson('servicesList.json', servicesList);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('services').upsert(servicesList, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveServices error:', err);
    }
  }
  return true;
}

export async function deleteServiceItem(id) {
  const current = await getServices();
  const filtered = current.filter((s) => s.id !== id);
  writeLocalJson('servicesList.json', filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteServiceItem error:', err);
    }
  }
  return filtered;
}

// ================= 4. SOFTWARE PRODUCTS =================
export async function getProducts() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('order', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getProducts error, using local fallback:', err);
    }
  }
  return readLocalJson('products.json', []);
}

export async function saveProducts(productsList) {
  writeLocalJson('products.json', productsList);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').upsert(productsList, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveProducts error:', err);
    }
  }
  return true;
}

export async function deleteProductItem(id) {
  const current = await getProducts();
  const filtered = current.filter((p) => p.id !== id);
  writeLocalJson('products.json', filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteProductItem error:', err);
    }
  }
  return filtered;
}

// ================= 5. REVIEWS =================
export async function getReviews() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getReviews error, using local fallback:', err);
    }
  }
  return readLocalJson('reviews.json', []);
}

export async function saveReviews(reviewsList) {
  writeLocalJson('reviews.json', reviewsList);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('reviews').upsert(reviewsList, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveReviews error:', err);
    }
  }
  return true;
}

export async function deleteReviewItem(id) {
  const current = await getReviews();
  const filtered = current.filter((r) => r.id !== id);
  writeLocalJson('reviews.json', filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('reviews').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteReviewItem error:', err);
    }
  }
  return filtered;
}

// ================= 6. COMPANY SETTINGS =================
const DEFAULT_SETTINGS = {
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

export async function getSettings() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 'global')
        .single();
      if (!error && data && data.settings_data) {
        return data.settings_data;
      }
    } catch (err) {
      console.warn('Supabase getSettings error, using local fallback:', err);
    }
  }
  return readLocalJson('settings.json', DEFAULT_SETTINGS);
}

export async function saveSettings(settingsData) {
  writeLocalJson('settings.json', settingsData);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('settings').upsert({
        id: 'global',
        settings_data: settingsData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase saveSettings error:', err);
    }
  }
  return true;
}

// ================= 7. ADMIN USERS & ROLES =================
export async function getAdminsConfig() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        return { googleClientId: '', allowAnyGoogleAccount: true, users: data };
      }
    } catch (err) {
      console.warn('Supabase getAdminsConfig error, using local fallback:', err);
    }
  }
  return readLocalJson('admins.json', { googleClientId: '', allowAnyGoogleAccount: true, users: [] });
}

export async function saveAdminsConfig(config) {
  writeLocalJson('admins.json', config);

  if (isSupabaseConfigured && supabase && Array.isArray(config.users)) {
    try {
      await supabase.from('admins').upsert(config.users, { onConflict: 'email' });
    } catch (err) {
      console.warn('Supabase saveAdminsConfig error:', err);
    }
  }
  return true;
}
