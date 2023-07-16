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
            type="variation"
            label="Variation"
            variant="secondary"
            Icon={RefreshCcwIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            type="upscale"
            label="Upscale"
            variant="secondary"
            Icon={ArrowBigUpIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
        </>
      )}
      {(isUpscale || isSave) && (
        <>
          <ActionButton
            type="vary"
            label="Vary (Strong)"
            dataOption="strong"
            variant="secondary"
            Icon={Wand2Icon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            type="vary"
            label="Vary (Subtle)"
            dataOption="subtle"
            variant="secondary"
            Icon={Wand2Icon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            type="zoomOut"
            label="Zoom Out 2x"
            dataOption="2x"
            variant="secondary"
            Icon={ZoomOutIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            type="zoomOut"
            label="Zoom Out 1.5x"
            dataOption="1.5x"
            variant="secondary"
            Icon={ZoomOutIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isLoading}
          />
          <ActionButton
            type="save"
            label="Save"
            variant="success"
            Icon={SaveIcon}
            clickHandler={clickHandler}
            isDisabled={isEmpty || isSave || isLoading}
          />
        </>
      )}
    </div>
  );
};

export default ActionButtonsContainer;
