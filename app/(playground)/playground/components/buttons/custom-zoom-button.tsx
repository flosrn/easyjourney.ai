import React from "react";
import { SearchCodeIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

import ActionButton from "./action-button";

type CustomZoomProps = {
  clickHandler: (option?: string) => void;
  isDisabled?: boolean;
};

const CustomZoom = ({ clickHandler, isDisabled }: CustomZoomProps) => {
  const [newPrompt, setNewPrompt] = React.useState(
    "A framed picture on the wall"
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full space-x-1"
          disabled={isDisabled}
        >
          <SearchCodeIcon className="h-4 w-4" />
          <span>Custom Zoom</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Custom Zoom</DialogTitle>
          <DialogDescription>
            Custom Zoom allows you to change the prompt before you expand your
            image, giving you finer control over the finished image.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="newPrompt" className="text-right">
              New prompt
            </Label>
            <Textarea
              id="newPrompt"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <ActionButton
            id="zoom-custom"
            type="zoomOut"
            label="Custom Zoom"
            dataOption="Custom Zoom"
            dataOptionValue={newPrompt}
            Icon={SearchCodeIcon}
            clickHandler={clickHandler}
            isDisabled={isDisabled}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomZoom;
