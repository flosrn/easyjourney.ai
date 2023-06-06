import React from "react";
import Image from "next/image";
import { ExpandIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

type ExpandedPosterDialogProps = {
  posterImage: string;
  width: number | null;
  height: number | null;
  prompt: string;
  children: React.ReactNode;
};

const ExpandedPosterDialog = ({
  posterImage,
  width,
  height,
  prompt,
  children,
}: ExpandedPosterDialogProps) => {
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
          src={posterImage}
          alt={prompt}
          width={width ?? 500}
          height={height ?? 500}
          quality={100}
          className="h-full w-full rounded-lg object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedPosterDialog;
