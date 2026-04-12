import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Split layout: left image + copy (lg+), right form.
 * Height = viewport minus fixed header (`main` uses pt-24 = 6rem) so the
 * document does not scroll. Right column scrolls internally if the form is tall.
 */
export function AuthSplitShell({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <div className="flex h-[calc(100dvh-6rem)] max-h-[calc(100dvh-6rem)] w-full min-h-0 flex-col overflow-hidden bg-white lg:flex-row">
      <div className="relative hidden min-h-0 w-full shrink-0 flex-col overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 px-4 pb-4 pt-28 md:px-6 lg:flex lg:w-1/2 lg:pb-5">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-lg flex-col gap-2 overflow-hidden lg:gap-3">
          <div className="relative h-96 w-full shrink-0 overflow-hidden rounded-md shadow-lg">
            <Image
              src="/images/nurse.jpg"
              alt="Healthcare professional"
              fill
              sizes="(max-width: 1024px) 0px, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <p className="shrink-0 text-sm leading-snug text-gray-700">
            Connect with leading healthcare professionals and advance your
            career in a secure, supportive environment.
          </p>

          <div className="flex min-h-0 shrink-0 flex-col gap-1.5 md:gap-2">
            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="mb-0.5 text-sm font-semibold text-gray-900">
                  Secure Data Protection
                </h3>
                <p className="text-xs leading-snug text-gray-600">
                  Your personal data will be handled securely and in accordance
                  with data protection regulations including GDPR compliance.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="mb-0.5 text-sm font-semibold text-gray-900">
                  Verified Professionals
                </h3>
                <p className="text-xs leading-snug text-gray-600">
                  All profiles are verified to ensure a trusted community of
                  qualified healthcare professionals.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="mb-0.5 text-sm font-semibold text-gray-900">
                  Confidentiality Assured
                </h3>
                <p className="text-xs leading-snug text-gray-600">
                  Your information is protected with industry-leading encryption
                  and security protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-4 pt-28 md:px-8 lg:w-1/2 lg:px-10 lg:pb-5">
        <div className="mx-auto flex w-full max-w-lg flex-col">{children}</div>
      </div>
    </div>
  );
}
