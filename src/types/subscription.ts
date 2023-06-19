import type { SubscriptionPlan, User } from "@prisma/client";

export type SubscriptionPlanInfo = {
  name: SubscriptionPlan;
  description: string;
  stripePriceId: string;
  credits: number;
  freeCredits: number;
};

export type UserSubscriptionPlan = Pick<
  User,
  "stripeCustomerId" | "stripeSubscriptionId"
> &
  SubscriptionPlanInfo & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };
