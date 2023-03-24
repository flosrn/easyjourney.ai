import type { NextApiRequest, NextApiResponse } from "next/types";

const text2img = async (prompt: string) => {
  const response = await fetch(
    "https://allakhazam-anythingv4.hf.space/run/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [prompt],
      }),
    }
  );
  const data = await response.json();
  console.log("data :", data);
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;
  try {
    const jsonData = await text2img(prompt);
    res.status(200).json(jsonData);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log("🚨 Error", error);
    res.status(500).json(error || "Internal Server Error");
  }
}
