"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";
import { getSupabasePublicAnonKey, getSupabasePublicUrl } from "@/lib/supabase-env";

/** Single browser Supabase client per component tree mount (App Router + @supabase/ssr). */
export function useSupabaseBrowser() {
  return useMemo(
    () =>
      createBrowserClient(
        getSupabasePublicUrl(),
        getSupabasePublicAnonKey()
      ),
    []
  );
}
