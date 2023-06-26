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
          <img
            src={poster.image}
            width={poster.width}
            height={poster.height}
            alt={poster.title}
          />
        </div>
      </div>
    )
  );
}
