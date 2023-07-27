import React from "react";
import wait from "~/utils/wait";
import { saveAs } from "file-saver";
import { DownloadIcon, Loader2Icon } from "lucide-react";
import type { MJMessage } from "midjourney";

import { Button } from "~/components/ui/button";

import { useMessageStore } from "../../store/messageStore";
import { useTourStore } from "../../store/tourStore";

type DownloadButtonProps = { isDisabled?: boolean };

const DownloadButton = ({ isDisabled }: DownloadButtonProps) => {
  const [messages, currentMessageIndex] = useMessageStore((state) => [
    state.messages,
    state.currentMessageIndex,
  ]);
  const [driverJs, isTourActive] = useTourStore((state) => [
    state.driverJs,
    state.isTourActive,
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fakeDownload = async () => {
    setIsLoading(true);
    if (isTourActive) {
      driverJs?.destroy();
    }
    const currentMessage = messages[currentMessageIndex] as
      | MJMessage
      | undefined;
    const imageInPng = currentMessage?.attachment?.url;
    const filename = currentMessage?.attachment?.filename;
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          imageInPng && saveAs(imageInPng, filename ?? "poster.png");
          resolve(true);
          const tourSteps = driverJs?.getConfig().steps;
          const stepIndex = tourSteps?.findIndex(
            (tourStep) => tourStep.element === "#slider-arrows"
          );
          await wait(1000);
          driverJs?.drive(stepIndex);
        } catch {
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };
  return (
    <Button
      id="download"
      variant="outline"
      onClick={fakeDownload}
      disabled={isDisabled}
    >
      {isLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <DownloadIcon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default DownloadButton;
