"use client";

import type { ReactNode } from "react";
// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { env } from "~/env.mjs";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "use-shopping-cart";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CartProvider
          cartMode="checkout-session"
          stripe={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          currency="EUR"
          language="fr"
          shouldPersist={true}
        >
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </CartProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
