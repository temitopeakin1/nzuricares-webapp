"use client";

type EmailAvatarProps = {
  status: "loading" | "success" | "error";
};

export default function EmailAvatar({ status }: EmailAvatarProps) {
  return (
    <div className="relative w-48 h-48 mx-auto mb-8">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 animate-pulse"></div>

      <div
        className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-300 animate-spin"
        style={{ animationDuration: "3s" }}
      ></div>

      {/* Middle pulsing ring */}
      <div
        className="absolute inset-4 rounded-full border-2 border-emerald-200 animate-pulse"
        style={{ animationDuration: "2s" }}
      ></div>

      {/* Inner avatar container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden">
          {/* Email envelope SVG */}
          <svg
            className="w-24 h-24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {status === "loading" && (
              <g className="animate-pulse">
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                  className="stroke-emerald-500"
                />
                <path d="M2 6l10 7 10-7" className="stroke-emerald-500" />
              </g>
            )}

            {status === "success" && (
              <>
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                  className="stroke-emerald-500 animate-fadeIn"
                />
                <path
                  d="M2 6l10 7 10-7"
                  className="stroke-emerald-500 animate-fadeIn"
                />
                <path
                  d="M6 12l3 3 9-9"
                  className="stroke-emerald-600 stroke-2 fill-none animate-drawCheck"
                  style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
                />
              </>
            )}

            {status === "error" && (
              <>
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                  className="stroke-red-500"
                />
                <path d="M2 6l10 7 10-7" className="stroke-red-500" />
                <circle
                  cx="12"
                  cy="12"
                  r="6"
                  className="stroke-red-500 fill-none"
                />
                <path
                  d="M9 15l6-6M15 15l-6-6"
                  className="stroke-red-600 stroke-2"
                  style={{ strokeLinecap: "round" }}
                />
              </>
            )}
          </svg>
        </div>
      </div>

      {status === "success" && (
        <>
          <div
            className="absolute top-0 left-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-float"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1/4 right-0 w-2 h-2 bg-teal-400 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-0 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </>
      )}
    </div>
  );
}
