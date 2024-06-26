import React, { Suspense } from "react";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ServerThemeProvider } from "next-themes";

import NavigationEvents from "~/components/events/navigation-events";

import { siteConfig } from "~/config/site";

import Providers from "./providers";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const image = `${siteConfig.url}/og.png`;

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    "Midjourney",
    "AI",
    "Artificial Intelligence",
    "Image",
    "Image Processing",
    "Image Generation",
  ],
  authors: [
    {
      name: "flosrn",
      url: "https://github.com/flosrn",
    },
  ],
  creator: "flosrn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [image],
    creator: "@flosrn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(siteConfig.url),
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
          <Analytics />
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
