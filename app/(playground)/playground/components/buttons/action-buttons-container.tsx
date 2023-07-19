import React from "react";
import {
  ArrowBigUpIcon,
  RefreshCcwIcon,
  SaveIcon,
  Wand2Icon,
  ZoomOutIcon,
} from "lucide-react";
import type { MJMessage } from "midjourney";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
import ActionButton from "./action-button";
import DownloadButton from "./download-button";

type ActionButtonsContainerProps = {
  clickHandler: () => void;
};

const ActionButtonsContainer = ({
  clickHandler,
}: ActionButtonsContainerProps) => {
  const [messages, currentMessageIndex] = useMessageStore((state) => [
    state.messages,
    state.currentMessageIndex,
  ]);
  const [{ isLoading }] = useMidjourneyStore((state) => [state.requestState]);

  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  const currentGenerationType = currentMessage?.generationType;
  const isEmpty = !currentGenerationType;
  const isImagine = currentGenerationType === "imagine";
  const isUpscale = currentGenerationType === "upscale";
  const isSave = currentGenerationType === "save";

  return (
    <div className="my-2 flex flex-wrap justify-center gap-2 xl:justify-between">
      <div className="flex gap-2">
        <ActionButton
          id="variation"
          type="variation"
          label="Variation"
          Icon={RefreshCcwIcon}
          clickHandler={clickHandler}
          isDisabled={isUpscale || isEmpty || isSave || isLoading}
        />
        <ActionButton
          id="upscale"
          type="upscale"
          label="Upscale"
          Icon={ArrowBigUpIcon}
          clickHandler={clickHandler}
          isDisabled={isUpscale || isEmpty || isSave || isLoading}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <ActionButton
          id="vary-strong"
          type="vary"
          label="Vary (Strong)"
          dataOption="strong"
          Icon={Wand2Icon}
          clickHandler={clickHandler}
          isDisabled={!isUpscale || isEmpty || isLoading}
        />
        <ActionButton
          id="vary-subtle"
          type="vary"
          label="Vary (Subtle)"
          dataOption="subtle"
          Icon={Wand2Icon}
          clickHandler={clickHandler}
          isDisabled={!isUpscale || isEmpty || isLoading}
        />
        <ActionButton
          id="zoom-out-2x"
          type="zoomOut"
          label="Zoom Out 2x"
          dataOption="2x"
          Icon={ZoomOutIcon}
          clickHandler={clickHandler}
          isDisabled={!isUpscale || isEmpty || isLoading}
        />
        <ActionButton
          id="zoom-out-1.5x"
          type="zoomOut"
          label="Zoom Out 1.5x"
          dataOption="1.5x"
          Icon={ZoomOutIcon}
          clickHandler={clickHandler}
          isDisabled={!isUpscale || isEmpty || isLoading}
        />
      </div>
      <div className="flex gap-2">
        <ActionButton
          id="save"
          type="save"
          label="Save"
          variant="success"
          Icon={SaveIcon}
          clickHandler={clickHandler}
          isDisabled={!isUpscale || isEmpty || isSave || isLoading}
        />
        <DownloadButton isDisabled={!isUpscale || isEmpty || isLoading} />
      </div>
    </div>
  );
};

export default ActionButtonsContainer;
