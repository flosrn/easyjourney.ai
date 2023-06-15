import type { User } from "@prisma/client";

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = Pick<
  User,
  "stripeCustomerId" | "stripeSubscriptionId"
> &
  SubscriptionPlan & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };
