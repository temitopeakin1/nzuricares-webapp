import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'default-url';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'default-anon-key';

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing environment variables for Supabase: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
