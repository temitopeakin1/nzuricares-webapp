import { createClient } from "@supabase/supabase-js";
import {
  getSupabasePublicAnonKey,
  getSupabasePublicUrl,
} from "@/lib/supabase-env";

export const supabase = createClient(
  getSupabasePublicUrl(),
  getSupabasePublicAnonKey()
);





