"use client";

import type { ReactNode } from "react";
// eslint-disable-next-line import/named
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "use-shopping-cart";
import { env } from "~/env.mjs";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CartProvider
          cartMode="checkout-session"
          stripe={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          currency="EUR"
          // successUrl="http://localhost:3000/success"
          // cancelUrl="http://localhost:3000/cancel"
          shouldPersist={true}
        >
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </CartProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
