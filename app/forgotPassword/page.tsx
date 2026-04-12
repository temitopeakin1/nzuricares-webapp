"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AiOutlineWarning } from "react-icons/ai";
import { useSupabaseBrowser } from "@/lib/supabase-browser";
import { SubmitButton } from "@/components/Custom/submitButton";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";

export default function ForgotPasswordPage() {
  const supabase = useSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const origin = window.location.origin;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        trimmed,
        { redirectTo: `${origin}/auth/update-password` }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitShell>
      <div className="mb-4 shrink-0">
        <h2 className="font-title text-2xl font-bold text-gray-900 sm:text-3xl">
          Reset your password
        </h2>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Enter the email you use for your account. We&apos;ll send you a link
          to choose a new password.
        </p>
      </div>

      {error && (
        <div
          className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          role="alert"
        >
          <span className="flex items-start gap-2">
            <AiOutlineWarning className="mt-0.5 shrink-0" aria-hidden />
            {error}
          </span>
        </div>
      )}

      {success ? (
        <div
          className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-4 text-sm leading-relaxed text-emerald-900"
          role="status"
        >
          If an account exists for{" "}
          <strong className="break-all">{email.trim()}</strong>, you will
          receive an email shortly with instructions. Check your spam folder if
          you don&apos;t see it.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="reset-email"
              className="mb-1.5 block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={fieldClass}
            />
          </div>

          <SubmitButton
            text="Send reset link"
            loadingText="Sending…"
            loading={loading}
          />
        </form>
      )}

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
