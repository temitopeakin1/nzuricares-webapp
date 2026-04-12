import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const Prompt = dynamic(() => import("@/components/Pages/Home/prompt"), {
  ssr: false,
  loading: () => null,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nzuri Healthcare - Your Pathway to Professional Health Care Staffing",
  description: "Your wellbeing is our priority!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <main className="pt-24">{children}</main> {/* pt-24 to offset fixed header */}
        <Prompt />
      </body>
    </html>
  );
}
