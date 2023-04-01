import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { validateCartItems } from "use-shopping-cart/utilities";
import inventory from "~/data/products";
import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

const products = {
  cartDetails: {
    sku_GBJ2Ep8246qeeT: {
      name: "Bananas",
      description: "Yummy yellow fruit",
      sku: "sku_GBJ2Ep8246qeeT",
      price: 400,
      image:
        "https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80",
      attribution: "Photo by Priscilla Du Preez on Unsplash",
      currency: "USD",
      quantity: 4,
      value: 1600,
      formattedValue: "16,00 $US",
    },
  },
  totalPrice: 2100,
  cartCount: 9,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // console.log("req.body", req.body);
      // const cart = JSON.parse(products);
      // console.log("cart :", cart);
      // Validate the cart details that were sent from the client.
      // const line_items = validateCartItems(inventory as any, req.body);
      const line_items = validateCartItems(
        inventory as any,
        products.cartDetails
      );
      console.log("line_items :", line_items);
      // const line_items = products;
      // const hasSubscription = line_items.find((item) => {
      //   return !!item.price_data.recurring;
      // });
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/use-shopping-cart`,
        // mode: hasSubscription ? "subscription" : "payment",
        mode: "payment",
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      console.log("checkoutSession :", checkoutSession);

      res.status(200).json(checkoutSession);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
