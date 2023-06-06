import React from "react";
import Image from "next/image";
import { ExpandIcon } from "lucide-react";
import { getPlaiceholder } from "plaiceholder";

import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

type ExpandedPosterDialogProps = {
  posterImage: string;
  width: number | null;
  height: number | null;
  prompt: string;
  children: React.ReactNode;
};

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

const ExpandedPosterDialog = async ({
  posterImage,
  width,
  height,
  prompt,
  children,
}: ExpandedPosterDialogProps) => {
  const { base64, img } = await getImage(posterImage);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group cursor-pointer">
          <button className="absolute right-2 top-2 pb-3 pl-3 opacity-20 group-hover:opacity-100">
            <ExpandIcon className="h-4 w-4" />
          </button>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="h-fit max-h-[90vh] w-fit max-w-[90vw] scale-110">
        <Image
          {...img}
          alt={prompt}
          // width={width ?? 500}
          // height={height ?? 500}
          quality={100}
          blurDataURL={base64}
          placeholder="blur"
          className="h-full w-full rounded-lg object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedPosterDialog;
