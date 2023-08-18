"use client";

import * as React from "react";
import { useState } from "react";
import { formatDateToString } from "~/utils/formatDate";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

import ProPlanText from "~/components/text/pro-plan-text";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { cn } from "~/lib/classNames";
import type { UserSubscriptionPlan } from "~/types/subscription";

type BillingFormProps = React.HTMLAttributes<HTMLFormElement> & {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
};

const BillingForm = ({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(!isLoading);

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
    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the{" "}
            <ProPlanText>{subscriptionPlan.name}</ProPlanText> plan.
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
          </button>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDateToString(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
};

export default BillingForm;
