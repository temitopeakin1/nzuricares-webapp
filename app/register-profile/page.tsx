"use client";

import type React from "react";
import { type FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/app/supabaseClient";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import { SubmitButton } from "@/components/Custom/submitButton";
import { type User } from "@supabase/supabase-js";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  jobType: string;
  postCode: string;
  resume: File | null;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    jobType: "",
    postCode: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address.trim())
      newErrors.address = "Home address is required";
    if (!formData.jobType.trim()) newErrors.jobType = "Job type is required";
    if (!formData.postCode.trim()) newErrors.postCode = "Post code is required";
    if (!formData.resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        setFormData((prev) => ({ ...prev, email: data.user?.email || "" }));
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    const profileId = `NZ${Math.floor(Math.random() * 1000)}`;
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const fileName = `${user.id}-${Date.now()}-${formData.resume?.name}`;
      const { data: resumeData, error: resumeError } = await supabase.storage
        .from("resumes")
        .upload(fileName, formData.resume as File);

      if (resumeError) {
        setErrors({ general: "Failed to upload resume. Please try again." });
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        onboarding_completed: true,
      });

      // ignore duplicate profile error
      if (profileError && profileError.code !== "23505") {
        throw profileError;
      }

      const resumePath = resumeData?.path ?? null;

      const { error: profileDataError } = await supabase
        .from("profileData")
        .insert({
          user_id: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: user.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          jobType: formData.jobType,
          postCode: formData.postCode,
          resume: resumePath,
        });

      if (profileDataError) {
        throw profileDataError;
      }
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setIsModalVisible(true);
      setErrors({
        general:
          "An error occurred while registering your profile. Please try again later.",
      });
    } finally {
      setLoading(false);
    }

    console.log("Profile ID:", profileId);
  };

  return (
    <div className="min-h-screen bg-white flex items-stretch">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-50 to-emerald-50 flex-col items-center px-2 py-12 pt-24">
        <div className="max-w-lg">
          <div className="mb-8">
            <Image
              src="/images/nurse.jpg"
              alt="Healthcare professional"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full h-96"
            />
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Connect with leading healthcare professionals and advance your
            career in a secure, supportive environment.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-500 text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure Data Protection
                </h3>
                <p className="text-gray-600">
                  Your personal data will be handled securely and in accordance
                  with data protection regulations including GDPR compliance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-500 text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verified Professionals
                </h3>
                <p className="text-gray-600">
                  All profiles are verified to ensure a trusted community of
                  qualified healthcare professionals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-500 text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Confidentiality Assured
                </h3>
                <p className="text-gray-600">
                  Your information is protected with industry-leading encryption
                  and security protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col px-4 py-12 md:px-8 lg:px-12 pt-24">
        {/* Logo Section */}
        <div className="w-full max-w-lg mx-auto flex flex-col h-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Create Your Profile
            </h2>
            <p className="text-gray-600 mt-2">
              Join our community of healthcare professionals
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Input your phone number"
                pattern="^\+44\d{10}$"
                maxLength={11}
                title="Enter a valid UK phone number starting with +44"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="postCode"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Post Code
              </label>
              <input
                type="text"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
              {errors.postCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Home Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white"
                required
              >
                <option value="" disabled>
                  Select a job type
                </option>
                <option value="cleaners">Cleaner</option>
                <option value="carers">Carer</option>
                <option value="nurses">Registered Nurse</option>
                <option value="support workers">Support Worker</option>
              </select>
              {errors.jobType && (
                <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Upload Resume
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              />
              {errors.resume && (
                <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}

            <SubmitButton
              className="w-full"
              text="Register Profile"
              loadingText="Registering..."
              loading={loading}
            />

            <p className="text-xs text-gray-600 text-center mt-6">
              By registering, you agree to our data protection practices. Your
              personal data will be handled securely and in accordance with
              applicable data protection regulations.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
