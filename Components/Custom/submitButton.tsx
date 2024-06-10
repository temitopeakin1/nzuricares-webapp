"use client";

import { useFormStatus } from "react-dom";
// import { cn } from "@/lib/utils";
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
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  className,
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
    //   className={cn(className)}
      className="w-full mt-8 py-2 px-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"

    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  );
}