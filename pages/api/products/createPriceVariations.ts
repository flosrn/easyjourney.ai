import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const productID = "prod_NdcHlg01WVYZHA"; // Remplacez par l'ID de votre produit
const currency = "eur";

const sizes = [
  { name: "M", dimensions: "45cm x 32cm", price: 4900 },
  { name: "L", dimensions: "67,5cm x 48cm", price: 8900 },
];

const frames = [
  { material: "Aluminum", color: "Black" },
  { material: "Aluminum", color: "Silver" },
  { material: "Aluminum", color: "White" },
  { material: "Wood", color: "Walnut" },
  { material: "Wood", color: "Oak" },
  { material: "Wood", color: "White" },
];

const createPriceVariations = async () => {
  for (const size of sizes) {
    for (const frame of frames) {
      // eslint-disable-next-line no-await-in-loop
      await stripe.prices.create({
        unit_amount: size.price,
        currency,
        product: productID,
        metadata: {
          size: size.name,
          dimensions: size.dimensions,
          frame_material: frame.material,
          frame_color: frame.color,
        },
      });
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await createPriceVariations();
      res
        .status(200)
        .json({ message: "Price variations created successfully." });
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error("Error creating price variations:", error);
      res.status(500).json({ error: "Failed to create price variations." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
