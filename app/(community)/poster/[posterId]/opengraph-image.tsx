import { ImageResponse } from "next/server";
import { env } from "~/env.mjs";

export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function PosterImage({
  params: { posterId },
}: {
  params: { posterId: string };
}) {
  // const clashData = await fetch(
  //   new URL("../fonts/ClashDisplay-Semibold.otf", import.meta.url)
  // ).then(async (res) => res.arrayBuffer());

  // const poster = await prisma.poster.findUnique({
  //   where: { id: posterId },
  // });

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
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
          fontFamily: "Clash",
          backgroundColor: "white",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>{poster.title}</span>
                <span tw="text-indigo-600">Start your free trial today.</span>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                <div tw="flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                    Get started
                  </a>
                </div>
                <div tw="ml-3 flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      emoji: "blobmoji",
    }
  );
}
