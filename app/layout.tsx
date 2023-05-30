import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import Providers from "./providers";

import "~/styles/globals.css";

import React, { Suspense } from "react";

import NavigationEvents from "~/components/events/NavigationEvents";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
