import Image from "next/image";
import type { Poster } from "@prisma/client";

import PosterImageContainer from "~/components/posters/poster-image-container";
import PosterInfoContainer from "~/components/posters/poster-info-container";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";

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
      <DialogContent className="max-h-[calc(100vh-20%)] sm:max-w-5xl">
        <ScrollArea className="h-[calc(100vh-30%)]">
          <div className="grid grid-cols-2 gap-5">
            {poster && (
              <>
                <PosterImageContainer {...poster} />
                <PosterInfoContainer {...poster}>
                  <div className="mt-8 border-t border-gray-500 pt-4">
                    <a
                      href={poster.image}
                      className="break-words hover:underline"
                    >
                      {poster.image}
                    </a>
                  </div>
                </PosterInfoContainer>
              </>
            )}
          </div>
        </ScrollArea>

        {/*<DialogFooter className="bg-gray-600">*/}
        {/*  <Button href={`/poster/${poster?.id}`}>Go to poster page</Button>*/}
        {/*</DialogFooter>*/}
      </DialogContent>
    </Dialog>
  );
};

export default PosterInfoDialog;
