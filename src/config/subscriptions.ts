import { SubscriptionPlan } from "@prisma/client";
import { env } from "~/env.mjs";

import type { SubscriptionPlanInfo } from "~/types/subscription";

export const freePlan: SubscriptionPlanInfo = {
  name: SubscriptionPlan.FREE,
  description:
    "The free plan is limited to 5 posters generation per day. Upgrade to PRO to get 500 posters generation per month.",
  stripePriceId: "",
  credits: 5,
  freeCredits: 10,
};

export const proPlan: SubscriptionPlanInfo = {
  name: SubscriptionPlan.PRO,
  description: "The PRO plan gives you 500 posters generation per month.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
  credits: 500,
  freeCredits: 20,
};
