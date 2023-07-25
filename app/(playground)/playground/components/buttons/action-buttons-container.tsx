import React from "react";
import { ArrowBigUpIcon, RefreshCcwIcon, SaveIcon } from "lucide-react";
import type { MJMessage } from "midjourney";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
import ActionButton from "./action-button";
import DownloadButton from "./download-button";
import MoreOptions from "./more-options";

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
  const isUpscale = currentGenerationType === "upscale";
  const isSave = currentGenerationType === "save";

  return (
    <div className="my-2 grid flex-wrap gap-2 sm:flex sm:justify-between">
      <div className="flex flex-wrap justify-center gap-2">
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
          tourAction="destroy"
          Icon={ArrowBigUpIcon}
          clickHandler={clickHandler}
          isDisabled={isUpscale || isEmpty || isSave || isLoading}
        />
        <MoreOptions clickHandler={clickHandler} />
      </div>
      <div
        id="save-or-download"
        className="flex flex-wrap justify-center gap-2"
      >
        <ActionButton
          id="save"
          type="save"
          label="Save"
          variant="success"
          tourAction="moveNext"
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
