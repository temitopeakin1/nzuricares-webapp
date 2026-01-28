"use client"

import { useSearchParams } from "next/navigation"

export function useCallbackSearch() {
  return useSearchParams()
}
