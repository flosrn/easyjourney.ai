import type { NextApiRequest, NextApiResponse } from "next";

const text2img = async (prompt: string) => {
  const res = await fetch(
    "https://cb51b1a4-e8f9-46bf.gradio.live/sdapi/v1/txt2img",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    }
  );
  return res.json();
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
