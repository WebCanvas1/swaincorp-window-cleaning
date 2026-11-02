import { createClient } from '@supabase/supabase-js';

// Cloudflare builds do not automatically receive the local Bolt .env file.
// Keep the public website renderable until the project is configured.
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(url && key);

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'not-configured',
);
