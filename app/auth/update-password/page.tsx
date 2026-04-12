"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSupabaseBrowser } from "@/lib/supabase-browser";
import { SubmitButton } from "@/components/Custom/submitButton";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";

export default function UpdatePasswordPage() {
  const supabase = useSupabaseBrowser();
  const router = useRouter();
  const [canReset, setCanReset] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "PASSWORD_RECOVERY") {
          setCanReset(true);
        }
      }
    );

    if (typeof window === "undefined") {
      return () => subscription.unsubscribe();
    }

    const hash = window.location.hash;
    const search = new URLSearchParams(window.location.search);
    if (
      hash.includes("type=recovery") ||
      search.get("type") === "recovery"
    ) {
      setCanReset(true);
    }

    return () => subscription.unsubscribe();
  }, [supabase]);

  const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
  const passwordFieldClass = `${fieldClass} pr-12`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Please enter a new password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch {
      setError("Something went wrong. Please try again or request a new link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitShell>
      <div className="mb-4 shrink-0">
        <h2 className="font-title text-2xl font-bold text-gray-900 sm:text-3xl">
          Choose a new password
        </h2>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Enter a new password for your account.
        </p>
      </div>

      {!canReset && !success ? (
        <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-4 text-sm text-amber-950">
          <p className="font-medium">Waiting for recovery session…</p>
          <p className="mt-2 text-amber-900/90">
            If this message stays here, open the reset link from your email
            again, or{" "}
            <Link
              href="/forgotPassword"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              request a new link
            </Link>
            .
          </p>
        </div>
      ) : null}

      {success ? (
        <div
          className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-900"
          role="status"
        >
          Password updated. Redirecting you to sign in…
        </div>
      ) : canReset ? (
        <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                  role="alert"
                >
                  <span className="flex items-start gap-2">
                    <AiOutlineWarning className="mt-0.5 shrink-0" aria-hidden />
                    {error}
                  </span>
                </div>
              )}

              <div>
                <label
                  htmlFor="new-password"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  New password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPw ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordFieldClass}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label={showPw ? "Hide password" : "Show password"}
                    onClick={() => setShowPw(!showPw)}
                  >
                    {showPw ? (
                      <AiOutlineEye className="text-xl" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-xl" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-new-password"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    id="confirm-new-password"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className={passwordFieldClass}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label={
                      showConfirm ? "Hide confirm password" : "Show confirm password"
                    }
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? (
                      <AiOutlineEye className="text-xl" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-xl" />
                    )}
                  </button>
                </div>
              </div>

          <SubmitButton
            text="Update password"
            loadingText="Updating…"
            loading={loading}
          />
        </form>
      ) : null}

      <p className="mt-8 text-center text-sm text-gray-600">
        <Link
          href="/auth/login"
          className="font-semibold text-primary underline-offset-2 transition hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </AuthSplitShell>
  );
}
