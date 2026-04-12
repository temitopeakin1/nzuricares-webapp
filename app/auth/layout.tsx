export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <>{children}</>;
}
