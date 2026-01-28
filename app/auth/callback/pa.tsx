"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallbackSearch } from "./use-callback-search"
import { Spinner } from "@/components/UI/Spinner"
import EmailAvatar from "@/components/UI/EmailAvatar"

const AuthCallback = () => {
  const router = useRouter()
  const searchParams = useCallbackSearch()
  const supabase = createClientComponentClient()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const handleConfirmation = async () => {
      const access_token = searchParams.get("access_token")
      const refresh_token = searchParams.get("refresh_token")

      if (!access_token || !refresh_token) {
        setStatus("error")
        setErrorMessage("Invalid confirmation link. Please try registering again.")
        setTimeout(() => router.push("/auth/login"), 3000)
        return
      }

      // Set session in Supabase
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      })

      if (error) {
        setStatus("error")
        setErrorMessage("Failed to confirm email. Please try again.")
        setTimeout(() => router.push("/auth/login"), 3000)
        return
      }

      setStatus("success")
      // After email is confirmed, send user to register profile
      setTimeout(() => router.push("/register-profile"), 2000)
    }

    handleConfirmation()
  }, [searchParams, router, supabase])

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {status === "loading" && (
          <div className="animate-fadeIn space-y-8 text-center">
            <EmailAvatar status="loading" />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Confirming Your Email</h1>
              <p className="text-lg text-gray-600">Please wait while we verify your email address...</p>
            </div>
            <div className="flex justify-center pt-4">
              <Spinner className="size-6 text-emerald-600" />
            </div>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="animate-fadeIn space-y-8 text-center">
            <EmailAvatar status="success" />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Email Confirmed</h1>
              <p className="text-lg text-gray-600">Your email has been verified successfully.. Redirecting you now</p>
            </div>
            <div className="flex justify-center pt-4">
              <Spinner className="size-6 text-emerald-600" />
            </div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="animate-fadeIn space-y-8 text-center">
            <EmailAvatar status="error" />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Confirmation Failed</h1>
              <p className="text-lg text-gray-600 mb-4">{errorMessage}</p>
              <p className="text-sm text-gray-500">You will be redirected to login shortly...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthCallback
