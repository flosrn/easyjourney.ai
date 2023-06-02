import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import Stripe from "stripe";
import { validateCartItems } from "use-shopping-cart/utilities";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  posterIds: string[];
  images: string[];
};

type FormattedBody = Record<string, CartItem>;

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // eslint-disable-next-line unicorn/no-array-reduce
      const formattedBody = Object.keys(req.body).reduce<FormattedBody>(
        (acc, key) => {
          const priceId = key.split("-")[0];
          const posterId = key.split("-").slice(1).join("-");
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (acc[priceId]) {
            acc[priceId].quantity += req.body[key].quantity; // Incrémente la quantité pour les éléments ayant le même ID de prix
            acc[priceId].posterIds.push(posterId); // Ajoute l'ID du poster au tableau des IDs de posters correspondants
            acc[priceId].images.push(req.body[key].image); // Ajoute l'image au tableau des images correspondantes
          } else {
            acc[priceId] = {
              id: priceId,
              name: req.body[key].name,
              quantity: req.body[key].quantity,
              posterIds: [posterId],
              images: [req.body[key].image],
            };
          }
          return acc;
        },
        {}
      );

      const inventory = await stripe.prices.list();

      const formattedInventory = inventory.data
        .map((item) => {
          const cartItem = formattedBody[item.id];
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (!cartItem) {
            return null;
          }
          return {
            ...item,
            name: cartItem.name,
            price: item.unit_amount,
            product_data: {
              name: cartItem.name,
              images: cartItem.images,
              metadata: {
                posterIds: cartItem.posterIds.join(","),
              },
            },
          };
        })
        .filter(Boolean);

      // Vérifie que les entrées du panier correspondent à des produits existants
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const line_items = validateCartItems(formattedInventory, formattedBody);

      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: { allowed_countries: ["FR"] },
        line_items,
        success_url: `${req.headers.origin}/checkout/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}`,
        mode: "payment",
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

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
