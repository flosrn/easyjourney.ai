import React, { Suspense } from "react";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ServerThemeProvider } from "next-themes";

import NavigationEvents from "~/components/events/navigation-events";

import Providers from "./providers";

import "~/styles/globals.css";

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
    <ServerThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body className="h-screen bg-background font-sans text-foreground antialiased transition-all duration-200 ease-in-out">
          <Providers>{children}</Providers>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
