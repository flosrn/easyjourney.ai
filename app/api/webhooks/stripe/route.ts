import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db/prisma";
import type Stripe from "stripe";

import { stripe } from "~/lib/stripe";
import { proPlan } from "~/config/subscriptions";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = await request.headers.get("stripe-signature");

  if (!signature) {
    console.log("Error: stripe-signature header not found");
    return NextResponse.json(
      "Webhook Error: stripe-signature header not found",
      {
        status: 400,
      }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: unknown) {
    console.log("error :", error);
    if (error instanceof Error) {
      return NextResponse.json(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }
    return NextResponse.json(`Webhook Error: an unknown error occurred`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await prisma.user.update({
      where: {
        id: session.metadata?.userId,
      },
      data: {
        plan: proPlan.name,
        credits: proPlan.credits,
        freeCredits: proPlan.freeCredits,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the price id and set the new period end.
    await prisma.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return NextResponse.json({ status: 200 });
}
