import React from "react";
import { ArrowBigUpIcon, SaveIcon } from "lucide-react";

import { useMidjourneyStore } from "../../store/midjourneyStore";
import ActionButton from "./action-button";

type ActionButtonsContainerProps = {
  clickHandler: () => void;
};

const ActionButtonsContainer = ({
  clickHandler,
}: ActionButtonsContainerProps) => {
  const [generationType, { isLoading }] = useMidjourneyStore((state) => [
    state.generationType,
    state.requestState,
    state.setRequestState,
  ]);

  const isEmpty = generationType === null;
  const isImagine = generationType === "imagine";
  const isUpscale = generationType === "upscale";

  return (
    <div className="mt-4 grid grid-flow-col justify-center gap-2">
      <ActionButton
        type="upscale"
        label="Upscale"
        variant="secondary"
        Icon={ArrowBigUpIcon}
        clickHandler={clickHandler}
        isDisabled={isEmpty || isUpscale || isLoading}
      />
      <ActionButton
        type="save"
        label="Save"
        variant="success"
        Icon={SaveIcon}
        clickHandler={clickHandler}
        isDisabled={isEmpty || !isUpscale || isLoading}
      />
    </div>
  );
};

export default ActionButtonsContainer;
