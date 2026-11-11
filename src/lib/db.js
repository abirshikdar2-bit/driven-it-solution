// src/lib/db.js
// Unified Data Layer for Driven IT Solution
// Automatically supports Supabase PostgreSQL with seamless fallback to bundled JSON data

import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

import initialTeam from '@/data/team.json';
import initialProjects from '@/data/projects.json';
import initialServices from '@/data/servicesList.json';
import initialProducts from '@/data/products.json';
import initialReviews from '@/data/reviews.json';
import initialSettings from '@/data/settings.json';
import initialAdmins from '@/data/admins.json';

const BUNDLED_DATA = {
  'team.json': initialTeam,
  'projects.json': initialProjects,
  'servicesList.json': initialServices,
  'products.json': initialProducts,
  'reviews.json': initialReviews,
  'settings.json': initialSettings,
  'admins.json': initialAdmins
};

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const TMP_DIR = path.join('/tmp', 'driven_it_data');

// In-memory runtime cache for serverless environments
const MEMORY_CACHE = {};

function ensureTmpDir() {
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
  } catch (err) {}
}

/**
 * Read data safely from JSON file, with memory and serverless /tmp fallback
 */
function readLocalJson(filename, fallback = []) {
  if (MEMORY_CACHE[filename]) {
    return MEMORY_CACHE[filename];
  }

  try {
    const tmpPath = path.join(TMP_DIR, filename);
    if (fs.existsSync(tmpPath)) {
      const data = fs.readFileSync(tmpPath, 'utf8');
      const parsed = JSON.parse(data);
      MEMORY_CACHE[filename] = parsed;
      return parsed;
    }

    const localPath = path.join(DATA_DIR, filename);
    if (fs.existsSync(localPath)) {
      const data = fs.readFileSync(localPath, 'utf8');
      const parsed = JSON.parse(data);
      MEMORY_CACHE[filename] = parsed;
      return parsed;
    }
  } catch (err) {
    // Silent fallback to bundled data
  }

  const defaultData = BUNDLED_DATA[filename] || fallback;
  MEMORY_CACHE[filename] = defaultData;
  return defaultData;
}

/**
 * Write data safely to JSON file, with memory and serverless /tmp fallback
 */
function writeLocalJson(filename, data) {
  MEMORY_CACHE[filename] = data;

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
      console.warn(`Local file write fallback for ${filename}:`, tmpErr);
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
      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getTeam error, using local fallback:', err);
    }
  }
  return readLocalJson('team.json', initialTeam);
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
  const filtered = current.filter((m) => String(m.id) !== String(id));
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
      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getProjects error, using local fallback:', err);
    }
  }
  return readLocalJson('projects.json', initialProjects);
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
  const filtered = current.filter((p) => String(p.id) !== String(id));
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
      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getServices error, using local fallback:', err);
    }
  }
  return readLocalJson('servicesList.json', initialServices);
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
  const filtered = current.filter((s) => String(s.id) !== String(id));
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
      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getProducts error, using local fallback:', err);
    }
  }
  return readLocalJson('products.json', initialProducts);
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
  const filtered = current.filter((p) => String(p.id) !== String(id));
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
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase getReviews error, using local fallback:', err);
    }
  }
  return readLocalJson('reviews.json', initialReviews);
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
  const filtered = current.filter((r) => String(r.id) !== String(id));
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
  return readLocalJson('settings.json', initialSettings);
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
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && Array.isArray(data)) {
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

export async function deleteAdminUser(id, email) {
  const config = await getAdminsConfig();
  config.users = (config.users || []).filter((u) => {
    if (id && String(u.id) === String(id)) return false;
    if (email && u.email?.toLowerCase() === email?.toLowerCase()) return false;
    return true;
  });
  writeLocalJson('admins.json', config);

  if (isSupabaseConfigured && supabase) {
    try {
      if (id) {
        await supabase.from('admins').delete().eq('id', id);
      } else if (email) {
        await supabase.from('admins').delete().eq('email', email);
      }
    } catch (err) {
      console.warn('Supabase deleteAdminUser error:', err);
    }
  }
  return config;
}
