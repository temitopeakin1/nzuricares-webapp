"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@headlessui/react";


function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 items-center justify-center h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  className,
  disabled
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      className={cn(
        "mt-2 w-full rounded-xl bg-gradient-to-r from-blue-900 to-primary px-4 py-3.5 text-base font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4",
        className
      )}
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  );
}

// interface SubmitButtonProps {
//   className: string;
//   text: string;
//   loadingText: string;
//   loading: boolean;
//   disabled?: boolean;  // Add disabled prop
// }

// export const SubmitButton: React.FC<SubmitButtonProps> = ({
//   className,
//   text,
//   loadingText,
//   loading,
//   disabled,
// }) => {
//   return (
//     <button
//       className={`${className} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//       disabled={loading || disabled}  // Set button disabled state
//     >
//       {loading ? loadingText : text}
//     </button>
//   );
// };
