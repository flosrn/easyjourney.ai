import Image from "next/image";
import type { Poster } from "@prisma/client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

type PosterInfoDialogProps = {
  poster: Poster | null;
  open: boolean;
  dialogOpenChangeHandler: (open: boolean) => void;
};

const PosterInfoDialog = ({
  poster,
  open,
  dialogOpenChangeHandler,
}: PosterInfoDialogProps) => {
  console.log("poster :", poster);
  return (
    <Dialog open={open} onOpenChange={dialogOpenChangeHandler}>
      <DialogContent className="max-h-[calc(100vh-20%)] sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>{poster?.title}</DialogTitle>
          <DialogDescription>{poster?.prompt}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid-cols-1">
            {poster?.image && (
              <Image
                src={poster.image}
                alt={poster.prompt}
                width={poster.width ?? 500}
                height={poster.height ?? 500}
                className="h-full w-full rounded-md object-contain"
              />
            )}
          </div>
          <div className="grid-cols-1">
            <div className="">Ratio: {poster?.ratio}</div>
            <div className="">
              {poster?.width}px / {poster?.height}px
            </div>
            <a href={poster?.image} className="break-words hover:underline">
              {poster?.image}
            </a>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PosterInfoDialog;
