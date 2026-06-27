import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DropAI - AI-Powered Dropshipping OS",
  description:
    "The all-in-one AI-powered dropshipping operating system. Replace 12+ tools with one unified platform.",
  keywords: [
    "dropshipping",
    "AI dropshipping",
    "ecommerce",
    "product research",
    "dropshipping automation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-surface-bg text-text-primary antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}