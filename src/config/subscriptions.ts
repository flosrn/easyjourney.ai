import { env } from "~/env.mjs";

import type { SubscriptionPlan } from "~/types/subscription";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 5 posters generation per day. Upgrade to PRO to get 500 posters generation per month.",
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan gives you 500 posters generation per month.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
};
