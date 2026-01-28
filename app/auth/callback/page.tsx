"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EmailAvatar from "@/components/UI/EmailAvatar";
import Spinner from "@/components/UI/Spinner";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      /**
       * This call tells Supabase:
       * "If this email link is valid, confirm the user"
       * We DO NOT store or rely on the session here
       */
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setStatus("error");
        setErrorMessage(
          "This confirmation link is invalid or has expired. Please sign up or log in again."
        );
        setTimeout(() => router.push("/auth/login"), 3000);
        return;
      }

      // Email confirmed successfully
      setStatus("success");

      // Force user to log in manually
      setTimeout(() => router.push("/auth/login"), 2000);
    };

    verifyEmail();
  }, [router, supabase, searchParams]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {status === "loading" && (
          <div className="space-y-8 text-center">
            <EmailAvatar status="loading" />
            <h1 className="text-4xl font-semibold">Confirming your email…</h1>
            <Spinner className="mx-auto" />
          </div>
        )}

        {status === "success" && (
          <div className="space-y-8 text-center">
            <EmailAvatar status="success" />
            <h1 className="text-4xl font-semibold">Email confirmed successfully 🎉</h1>
            <p>You can now log in to continue</p>
            <Spinner className="mx-auto" />
          </div>
        )}

        {status === "error" && (
          <div className="space-y-8 text-center">
            <EmailAvatar status="error" />
            <h1 className="text-4xl font-semibold">Confirmation failed</h1>
            <p>{errorMessage}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthCallback;
