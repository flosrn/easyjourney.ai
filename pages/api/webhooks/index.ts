import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Cors from "micro-cors";
import Stripe from "stripe";
import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const webhookSecret: string = env.STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      // On error, log and return the error message.
      if (error! instanceof Error) console.log(error);
      // eslint-disable-next-line no-console
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    console.log("event :", event);

    // Successfully constructed event.
    // eslint-disable-next-line no-console
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object.
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);

        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
        );

        break;
      }
      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💵 Charge id: ${charge.id}`);

        break;
      }
      default: {
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
      }
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
