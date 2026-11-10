-- ====================================================================
-- DRIVEN IT SOLUTION - COMPLETE SUPABASE POSTGRESQL SCHEMA & SEEDING
-- Run this script in the Supabase SQL Editor to initialize your database.
-- ====================================================================

-- 1. TEAM TABLE
CREATE TABLE IF NOT EXISTS public.team (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT DEFAULT 'Driven IT Solution',
  department TEXT,
  photo TEXT,
  tagline TEXT,
  quote TEXT,
  bio TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  experience TEXT,
  projectsCompleted INT DEFAULT 0,
  rating TEXT DEFAULT '5.0/5',
  socials JSONB DEFAULT '{}'::jsonb,
  isHighlighted BOOLEAN DEFAULT true,
  "order" INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROJECTS (CASE STUDIES) TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  num TEXT,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  liveUrl TEXT DEFAULT '',
  isFeatured BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  slug TEXT,
  num TEXT,
  title TEXT NOT NULL,
  shortTitle TEXT,
  icon TEXT DEFAULT 'Code2',
  pricing TEXT,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  "order" INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PRODUCTS (SAAS SOFTWARE) TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  banglaName TEXT,
  tag TEXT,
  image TEXT,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  liveUrl TEXT,
  status TEXT DEFAULT 'Active Product',
  "order" INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. REVIEWS (CLIENT STORIES) TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  clientName TEXT NOT NULL,
  role TEXT,
  company TEXT,
  country TEXT,
  rating INT DEFAULT 5,
  quote TEXT NOT NULL,
  avatar TEXT,
  metrics TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. SETTINGS TABLE (GLOBAL CONFIGURATION)
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  settings_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. ADMINS TABLE (USER ROLES & AUTH)
CREATE TABLE IF NOT EXISTS public.admins (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  picture TEXT,
  role TEXT DEFAULT 'admin', -- 'super_admin' or 'admin'
  status TEXT DEFAULT 'active',
  createdAt TIMESTAMPTZ DEFAULT now(),
  lastLogin TIMESTAMPTZ
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- ALLOW PUBLIC READ ACCESS FOR HOMEPAGE
CREATE POLICY "Public Read Team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public Read Admins" ON public.admins FOR SELECT USING (true);

-- ALLOW FULL ACCESS WITH SERVICE ROLE / API
CREATE POLICY "Full Access Team" ON public.team FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Admins" ON public.admins FOR ALL USING (true) WITH CHECK (true);

-- ====================================================================
-- INITIAL DATA SEEDING
-- ====================================================================

-- Insert Default Settings
INSERT INTO public.settings (id, settings_data)
VALUES (
  'global',
  '{
    "whatsappNumber": "8801909711808",
    "displayPhone": "+880 1909-711808",
    "officialEmail": "drivenitsolution@gmail.com",
    "workingHours": "Mon-Fri from 8am to 6pm (Official WhatsApp Active)",
    "officeAddress": "Dhaka, Bangladesh · Remote-First Worldwide",
    "tagline": "Your Growth Our Mission",
    "ctaText": "Book Free Call",
    "socials": {
      "linkedin": "https://linkedin.com",
      "facebook": "https://facebook.com",
      "github": "https://github.com",
      "twitter": "https://x.com",
      "instagram": "https://instagram.com"
    }
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Insert Admins
INSERT INTO public.admins (id, name, email, picture, role, status)
VALUES 
  ('usr-abir-001', 'Abir Shikdar', 'abirshikdar2@gmail.com', 'https://api.dicebear.com/7.x/bottts/svg?seed=Abir', 'super_admin', 'active'),
  ('usr-rezhone-002', 'Rezhone Hossain', 'rezhone@drivenitsolution.com', 'https://api.dicebear.com/7.x/bottts/svg?seed=Rezhone', 'super_admin', 'active')
ON CONFLICT (email) DO NOTHING;
