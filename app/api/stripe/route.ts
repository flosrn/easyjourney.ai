import { NextResponse } from "next/server";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import { stripe } from "~/lib/stripe";
import { getUserSubscriptionPlan } from "~/lib/subscriptions";
import { proPlan } from "~/config/subscriptions";

export async function GET(request: Request) {
  const session = await getServerAuthSession();
  console.log("session :", session);

  if (!session?.user || !session.user.email) {
    return NextResponse.json(null, { status: 403 });
  }
  const subscriptionUrl =
    "https://myposter-preview.vercel.app/settings/subscription";

  try {
    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);
    console.log("subscriptionPlan :", subscriptionPlan);

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: subscriptionUrl,
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: subscriptionUrl,
      cancel_url: subscriptionUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: unknown) {
    console.log("error :", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
