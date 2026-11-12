// src/lib/supabase.js
// Supabase Client for Driven IT Solution
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  (supabaseServiceKey || supabaseAnonKey) && 
  supabaseUrl.startsWith('http') && 
  (supabaseServiceKey || supabaseAnonKey).length > 20
);

// Server-side administrative client (uses Service Role Key when available for full admin DB privileges)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
      auth: { persistSession: false }
    })
  : null;

// Browser client with OAuth session detection and persistence
let browserClient = null;
export function getBrowserSupabase() {
  if (typeof window === 'undefined') return null;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return browserClient;
}
