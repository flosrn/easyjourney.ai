/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";

let stripePromise: Promise<Stripe | null>;

const getStripe = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!stripePromise) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;
