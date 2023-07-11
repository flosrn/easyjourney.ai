import React from "react";
import { ArrowBigUpIcon, SaveIcon } from "lucide-react";
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
    <div className="my-2 grid grid-flow-col justify-center gap-2">
      <ActionButton
        type="upscale"
        label="Upscale"
        variant="secondary"
        Icon={ArrowBigUpIcon}
        clickHandler={clickHandler}
        isDisabled={isEmpty || isUpscale || isSave || isLoading}
      />
      <ActionButton
        type="save"
        label="Save"
        variant="success"
        Icon={SaveIcon}
        clickHandler={clickHandler}
        isDisabled={isEmpty || !isUpscale || isSave || isLoading}
      />
    </div>
  );
};

export default ActionButtonsContainer;
