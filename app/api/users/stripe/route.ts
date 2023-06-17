import { NextResponse } from "next/server";
import { env } from "~/env.mjs";

// import { getServerAuthSession } from "~/server/auth";
// import { z } from "zod";
//
// import { stripe } from "~/lib/stripe";
// import { getUserSubscriptionPlan } from "~/lib/subscriptions";
// import { proPlan } from "~/config/subscriptions";

console.log("/api/users/stripe/route.ts");

export async function GET(request: Request) {
  console.log("env.NEXT_PUBLIC_URL :", env.NEXT_PUBLIC_URL);
  const subscriptionUrl = `${env.NEXT_PUBLIC_URL}/settings/subscription`;

  return NextResponse.json({ url: subscriptionUrl });

  // try {
  //   const session = await getServerAuthSession();
  //   console.log("session :", session);
  //
  //   if (!session?.user || !session.user.email) {
  //     return NextResponse.json(null, { status: 403 });
  //   }
  //
  //   const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);
  //   console.log("subscriptionPlan :", subscriptionPlan);
  //
  //   console.log("env.NEXT_PUBLIC_URL :", env.NEXT_PUBLIC_URL);
  //   const subscriptionUrl = `${env.NEXT_PUBLIC_URL}/settings/subscription`;
  //
  //   // The user is on the pro plan.
  //   // Create a portal session to manage subscription.
  //   if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
  //     const stripeSession = await stripe.billingPortal.sessions.create({
  //       customer: subscriptionPlan.stripeCustomerId,
  //       return_url: subscriptionUrl,
  //     });
  //
  //     return NextResponse.json({ url: stripeSession.url });
  //   }
  //
  //   // The user is on the free plan.
  //   // Create a checkout session to upgrade.
  //   const stripeSession = await stripe.checkout.sessions.create({
  //     success_url: subscriptionUrl,
  //     cancel_url: subscriptionUrl,
  //     payment_method_types: ["card"],
  //     mode: "subscription",
  //     billing_address_collection: "auto",
  //     customer_email: session.user.email,
  //     line_items: [
  //       {
  //         price: proPlan.stripePriceId,
  //         quantity: 1,
  //       },
  //     ],
  //     metadata: {
  //       userId: session.user.id,
  //     },
  //   });
  //
  //   return NextResponse.json({ url: stripeSession.url });
  // } catch (error: unknown) {
  //   console.log("error :", error);
  //   if (error instanceof z.ZodError) {
  //     return NextResponse.json({ status: 422, error: error.issues });
  //   }
  //
  //   return NextResponse.json({ status: 500, error });
  // }
}
