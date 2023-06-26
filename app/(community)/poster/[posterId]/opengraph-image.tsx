import { ImageResponse } from "next/server";
import { env } from "~/env.mjs";

export const runtime = "edge";

// Image metadata
// export const size = {
//   width: 1200,
//   height: 630,
// };

// export const contentType = "image/png";

export default async function PosterImage({
  params: { posterId },
}: {
  params: { posterId: string };
}) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_URL}/api/posters/${posterId}`
  );
  const poster = await response.json();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <img
                src={poster.image}
                width={poster.width}
                height={poster.height}
              />
              <h2 tw="absolute z-10 w-full flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-white text-center justify-end items-center">
                <span>Easyjourney.ai</span>
                <span tw="text-indigo-500">Unlock the power of Midjourney</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
