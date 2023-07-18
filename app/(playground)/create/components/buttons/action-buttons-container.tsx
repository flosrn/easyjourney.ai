import React from "react";
import {
  ArrowBigUpIcon,
  DownloadIcon,
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
    <div className="my-2 flex flex-wrap justify-center gap-2">
      {!isUpscale && !isSave && (
        <>
          <ActionButton
            id="variation"
            type="variation"
            label="Variation"
            Icon={RefreshCcwIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            id="upscale"
            type="upscale"
            label="Upscale"
            Icon={ArrowBigUpIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
        </>
      )}
      {(isUpscale || isSave) && (
        <>
          <ActionButton
            id="vary-strong"
            type="vary"
            label="Vary (Strong)"
            dataOption="strong"
            Icon={Wand2Icon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            id="vary-subtle"
            type="vary"
            label="Vary (Subtle)"
            dataOption="subtle"
            Icon={Wand2Icon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            id="zoom-out-2x"
            type="zoomOut"
            label="Zoom Out 2x"
            dataOption="2x"
            Icon={ZoomOutIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            id="zoom-out-1.5x"
            type="zoomOut"
            label="Zoom Out 1.5x"
            dataOption="1.5x"
            Icon={ZoomOutIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            id="save"
            type="save"
            label="Save"
            variant="success"
            Icon={SaveIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isSave || isLoading}
          />
          <DownloadButton isDisabled={isEmpty || isLoading} />
        </>
      )}
    </div>
  );
};

export default ActionButtonsContainer;
