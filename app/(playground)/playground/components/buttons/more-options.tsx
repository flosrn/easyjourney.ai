import React, { useEffect, useState } from "react";
import {
  ChevronDownSquareIcon,
  ChevronLeftSquareIcon,
  ChevronRightSquareIcon,
  ChevronsLeftRightIcon,
  ChevronUpSquareIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  SearchIcon,
  Wand2Icon,
  ZoomOutIcon,
} from "lucide-react";
import type { MJMessage } from "midjourney";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
import { Option, useOptionStore } from "../../store/optionStore";
import { useTutorialStore } from "../../store/tutorialStore";
import LabelWithTooltip from "../sidebar/label-with-tooltip";
import ActionButton from "./action-button";
import CustomZoom from "./custom-zoom-button";

type MoreOptionsProps = {
  clickHandler: () => void;
};

const MoreOptions = ({ clickHandler }: MoreOptionsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [option, setOption] = useOptionStore((state) => [
    state.option,
    state.setOption,
  ]);
  const [messages, currentMessageIndex] = useMessageStore((state) => [
    state.messages,
    state.currentMessageIndex,
  ]);
  const [{ isLoading, isSuccess }, generationType] = useMidjourneyStore(
    (state) => [state.requestState, state.generationType]
  );
  const [isTutorialEnabled, moveNextTutorialStep] = useTutorialStore(
    (state) => [state.isTutorialEnabled, state.moveNextTutorialStep]
  );

  useEffect(() => {
    isSuccess && setIsOpen(false);
  }, [isSuccess]);

  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  const currentGenerationType = currentMessage?.generationType;
  const isEmpty = !currentGenerationType;
  const isImagine = currentGenerationType === "imagine";
  const isUpscale = currentGenerationType === "upscale";
  const isSave = currentGenerationType === "save";
  const isNotUpscale = !isUpscale && !isSave;
  const isPan = generationType === "pan";
  const isZoom = generationType === "zoomOut";
  const isVary = generationType === "vary";
  const isSquare = generationType === "square";
  const isSquareImage =
    currentMessage?.attachment?.width === currentMessage?.attachment?.height;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id="more-options"
          variant="outline"
          onClick={() => {
            moveNextTutorialStep({
              elDestination: "div[data-id='more-options']",
              timeout: 800,
            });
          }}
        >
          {isLoading && (isPan || isZoom || isVary || isSquare) ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontalIcon className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        data-id="more-options"
        align="end"
        sideOffset={20}
        onFocusOutside={(event) => event.preventDefault()}
        className="h-56 w-screen sm:w-96"
      >
        <Tabs
          value={option}
          onValueChange={(opt) => setOption(opt as Option)}
          className="flex-1"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value={Option.ZOOM} className="space-x-2">
              <SearchIcon className="h-4 w-4" />
              <span>Zoom</span>
            </TabsTrigger>
            <TabsTrigger value={Option.PAN} className="space-x-2">
              <ChevronLeftSquareIcon className="h-4 w-4" />
              <span>Pan</span>
            </TabsTrigger>
            <TabsTrigger value={Option.VARY} className="space-x-2">
              <Wand2Icon className="h-4 w-4" />
              <span>Vary</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={Option.ZOOM}>
            <LabelWithTooltip
              title="ZoomOut options"
              size="xs"
              description="The Zoom Out option allows you to extend the canvas of an upscaled image beyond its original boundaries without changing the content of the original image."
              className="py-4"
            />
            <div className="grid grid-cols-2 gap-1">
              <ActionButton
                id="zoom-out-2x"
                type="zoomOut"
                label="Zoom Out 2x"
                dataOption="2x"
                Icon={ZoomOutIcon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
              <ActionButton
                id="zoom-out-1.5x"
                type="zoomOut"
                label="Zoom Out 1.5x"
                dataOption="1.5x"
                Icon={ZoomOutIcon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
              <CustomZoom
                clickHandler={clickHandler}
                isDisabled={
                  isTutorialEnabled || isNotUpscale || isEmpty || isLoading
                }
              />
              <ActionButton
                id="square"
                type="square"
                label="Make Square"
                dataOption="Make Square"
                Icon={ChevronsLeftRightIcon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={
                  isNotUpscale || isSquareImage || isEmpty || isLoading
                }
              />
            </div>
          </TabsContent>
          <TabsContent value={Option.PAN}>
            <LabelWithTooltip
              title="Pan options"
              size="xs"
              description="The Pan option allows you to expand the canvas of an image in a chosen direction without changing the content of the original image. The newly expanded canvas will be filled in using guidance from the prompt and the original image."
              className="py-4"
            />
            <div className="grid grid-cols-2 gap-1">
              <ActionButton
                id="pan-left"
                type="pan"
                label="Pan left"
                dataOption="pan_left"
                Icon={ChevronLeftSquareIcon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
              <ActionButton
                id="pan-right"
                type="pan"
                label="Pan right"
                dataOption="pan_right"
                Icon={ChevronRightSquareIcon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
              <ActionButton
                id="pan-up"
                type="pan"
                label="Pan up"
                dataOption="pan_up"
                Icon={ChevronUpSquareIcon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
              <ActionButton
                id="pan-down"
                type="pan"
                label="Pan down"
                dataOption="pan_down"
                Icon={ChevronDownSquareIcon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
            </div>
          </TabsContent>
          <TabsContent value={Option.VARY}>
            <LabelWithTooltip
              title="Vary options"
              size="xs"
              description="Generates four new images with slight variations but an overall style similar to the upscaled image. There are two options:
              Vary(Strong) which give more different output, and Vary(Subtle) which give less different output."
              className="py-4"
            />
            <div className="grid grid-cols-2 gap-1">
              <ActionButton
                id="vary-strong"
                type="vary"
                label="Vary (Strong)"
                dataOption="Strong"
                Icon={Wand2Icon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
              <ActionButton
                id="vary-subtle"
                type="vary"
                label="Vary (Subtle)"
                dataOption="Subtle"
                Icon={Wand2Icon}
                tourAction="moveNext"
                clickHandler={clickHandler}
                isDisabled={isNotUpscale || isEmpty || isLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptions;
