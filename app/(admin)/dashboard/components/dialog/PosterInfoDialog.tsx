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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{poster?.title}</DialogTitle>
          <DialogDescription>{poster?.prompt}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PosterInfoDialog;
