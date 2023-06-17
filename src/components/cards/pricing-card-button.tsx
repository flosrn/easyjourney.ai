"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

type PricingCardButtonProps = {
  disabled?: boolean;
};

const PricingCardButton = ({ disabled }: PricingCardButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch("/api/stripe");

    if (!response.ok) {
      return toast.error(
        "Something went wrong. Please refresh the page and try again."
      );
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json();
    console.log("session :", session);
    if (session) {
      // window.location.href = session.url;
    }
  }

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
