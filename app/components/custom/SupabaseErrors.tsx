interface SupabaseErrorsProps {
    message: string | null;
    name: string;
    status: string | null;
  }
  
  export function SupabaseErrors( { error }: { readonly error: SupabaseErrorsProps }) {
    if (!error?.message) return null;
    return <div className="text-red-500 text-md italic py-2">{error.message}</div>;
  }