"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

type PricingCardButtonProps = {
  disabled?: boolean;
};

const PricingCardButton = ({ disabled }: PricingCardButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(!isLoading);

    if (!session?.user) {
      router.push("/api/auth/signin");
    }

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe");

    if (!response.ok) {
      return toast.error(
        "Something went wrong. Please refresh the page and try again."
      );
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const stripeSession = await response.json();
    if (session) {
      window.location.href = stripeSession.url;
    }
  };

  return (
    <Button
      onClick={onSubmit}
      className={cn(buttonVariants({ variant: "default", size: "lg" }), {
        "pointer-events-none": disabled,
      })}
    >
      Choose this plan
    </Button>
  );
};

export default PricingCardButton;
