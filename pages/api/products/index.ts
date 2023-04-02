import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const getProductAndPrices = async (productId: string) => {
  const product = await stripe.products.retrieve(productId);
  const prices = await stripe.prices.list({ product: productId });
  const defaultPrice = await stripe.prices.retrieve(
    "price_1MsL2hDihjnBYBGUDISLYpDj"
  );

  return {
    product,
    prices: prices.data,
    defaultPrice,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getProductAndPrices("prod_NdcHlg01WVYZHA");
    res.status(200).json(data);
  } catch (error: unknown) {
    res.status(500).json(error || "Internal Server Error");
  }
}
