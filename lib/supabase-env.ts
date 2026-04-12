/**
 * Public Supabase URL + anon key (NEXT_PUBLIC_*).
 * Documented fallbacks let `next build` succeed without a local `.env` (CI / misconfigured Preview).
 * Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` on Vercel for production.
 */
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

export function getSupabasePublicUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? PLACEHOLDER_URL;
}

export function getSupabasePublicAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? PLACEHOLDER_ANON_KEY;
}
