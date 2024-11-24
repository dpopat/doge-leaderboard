import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CSPostHogProvider } from '@/app/providers/posthog-provider'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "DOGE Leaderboard",
  description: "View how the government wastes your tax dollars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
      <body
        className={`${inter.className}`}
      >
        {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
