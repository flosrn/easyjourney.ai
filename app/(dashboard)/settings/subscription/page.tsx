import { redirect } from "next/navigation";
import { authOptions, getCurrentUser } from "~/server/auth";

import { BillingForm } from "~/components/billing/billing-form";
import { Separator } from "~/components/ui/separator";

import { stripe } from "~/lib/stripe";
import { getUserSubscriptionPlan } from "~/lib/subscriptions";

export default async function SettingsAccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage billing and your subscription plan.
        </p>
      </div>
      <Separator />
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </div>
  );
}
