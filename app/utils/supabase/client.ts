import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabasePublicAnonKey,
  getSupabasePublicUrl,
} from "@/lib/supabase-env";

export function createClient() {
  return createBrowserClient(
    getSupabasePublicUrl(),
    getSupabasePublicAnonKey()
  );
}
