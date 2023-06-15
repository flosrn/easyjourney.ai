import { env } from "~/env.mjs";

import type { SubscriptionPlan } from "~/types/subscription";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 5 image generation per day. Upgrade to PRO to get unlimited image generation.",
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan gives you 50 image generation per day.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
};
