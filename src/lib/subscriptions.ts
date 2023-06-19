import { prisma } from "~/server/db/prisma";

import { freePlan, proPlan } from "~/config/subscriptions";
import type { UserSubscriptionPlan } from "~/types/subscription";

export const getUserSubscriptionPlan = async (
  userId: string
): Promise<UserSubscriptionPlan> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;
  const stripeCurrentPeriodEnd = user.stripeCurrentPeriodEnd?.getTime() ?? 0;

  // @ts-expect-error: TODO: Fix this.
  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd,
    isPro: !!isPro,
  };
};
