"use client";

import type React from "react";
import { FormEvent, useState } from "react";
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

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const supabase = useSupabaseBrowser();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { username: formData.username.trim() },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error("Signup failed");

      setSuccessMessage(
        "Check your inbox — we sent a link to confirm your email before you sign in."
      );

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      if (message.toLowerCase().includes("already registered")) {
        setErrors({
          email: "This email is already registered. Try signing in instead.",
        });
      } else {
        setErrors({ general: message });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
  const passwordFieldClass = `${fieldClass} pr-12`;

  return (
    <AuthSplitShell>
      <div className="relative mb-4 shrink-0">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="absolute right-0 top-0 z-10 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Close and return home"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="pr-12 font-title text-2xl font-bold text-gray-900 sm:text-3xl">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Join Nzuri Healthcare to register your profile and explore
          opportunities
        </p>
      </div>

      {errors.general && (
        <div
          className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          role="alert"
        >
          {errors.general}
        </div>
      )}

      {successMessage && (
        <div
          className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900"
          role="status"
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSignUp} className="flex min-h-0 flex-1 flex-col space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a display name"
                className={fieldClass}
              />
              {errors.username && (
                <p className="mt-2 flex items-start gap-2 text-sm text-red-600">
                  <AiOutlineWarning className="mt-0.5 shrink-0" aria-hidden />
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={fieldClass}
              />
              {errors.email && (
                <p className="mt-2 flex items-start gap-2 text-sm text-red-600">
                  <AiOutlineWarning className="mt-0.5 shrink-0" aria-hidden />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={passwordFieldClass}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? (
                    <AiOutlineEye className="text-xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-xl" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 flex items-start gap-2 text-sm text-red-600">
                  <AiOutlineWarning className="mt-0.5 shrink-0" aria-hidden />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={passwordFieldClass}
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label={
                    confirmPasswordVisible
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {confirmPasswordVisible ? (
                    <AiOutlineEye className="text-xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-xl" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 flex items-start gap-2 text-sm text-red-600">
                  <AiOutlineWarning className="mt-0.5 shrink-0" aria-hidden />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <SubmitButton
              className="mt-4"
              text="Create account"
              loadingText="Creating account…"
              loading={loading}
            />

        <p className="pt-2 text-center text-sm text-gray-600 sm:text-base">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary underline-offset-2 transition hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthSplitShell>
  );
};

export default Signup;
