import type { NextApiRequest, NextApiResponse } from "next/types";

const BASE_STABLE_DIFFUSION_URL = "https://339767cc-1693-4523.gradio.live";

const text2img = async (prompt: string) => {
  const response = await fetch(
    `${BASE_STABLE_DIFFUSION_URL}/sdapi/v1/txt2img`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    }
  );
  return response.json();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;
  try {
    const jsonData = await text2img(prompt);
    // console.log("jsonData :", jsonData);
    res.status(200).json(jsonData);
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log("🚨 Error", error);
    res.status(500).json(error || "Internal Server Error");
  }
}
