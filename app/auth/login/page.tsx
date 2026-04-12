"use client";

import type React from "react";
import { type FormEvent, useState } from "react";
import { useSupabaseBrowser } from "@/lib/supabase-browser";
import Link from "next/link";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/Custom/submitButton";
import { AuthSplitShell } from "@/components/auth/AuthSplitShell";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    general?: string;
    email?: string;
    password?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const supabase = useSupabaseBrowser();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ general: error.message });
        return;
      }

      const user = data.user;
      if (!user) {
        setErrors({ general: "Login failed. Please try again." });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile || !profile.onboarding_completed) {
        router.push("/register-profile");
        return;
      }

      router.push("/");
    } catch {
      setErrors({
        general: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
  const passwordFieldClass = `${fieldClass} pr-12`;

  return (
    <AuthSplitShell>
      <div className="mb-4 shrink-0">
        <h2 className="font-title text-2xl font-bold text-gray-900 sm:text-3xl">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Sign in to your account to continue
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

      <form onSubmit={handleSignIn} className="flex min-h-0 flex-1 flex-col space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                placeholder="you@example.com"
                onChange={handleChange}
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
                  type={passwordVisibility ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={passwordFieldClass}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label={
                    passwordVisibility ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisibility ? (
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

            <div className="flex justify-end">
              <Link
                href="/forgotPassword"
                className="text-sm font-semibold text-primary underline-offset-4 transition hover:text-primary/80 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <SubmitButton
              className="mt-4"
              text="Sign in"
              loadingText="Signing in…"
              loading={loading}
            />

        <p className="pt-2 text-center text-sm text-gray-600 sm:text-base">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-primary underline-offset-2 transition hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthSplitShell>
  );
};

export default Login;
