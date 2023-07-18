import React from "react";
import { saveAs } from "file-saver";
import { DownloadIcon, Loader2Icon } from "lucide-react";
import type { MJMessage } from "midjourney";

import { Button } from "~/components/ui/button";

import { useMessageStore } from "../../store/messageStore";

type DownloadButtonProps = { isDisabled?: boolean };

const DownloadButton = ({ isDisabled }: DownloadButtonProps) => {
  const [messages, currentMessageIndex] = useMessageStore((state) => [
    state.messages,
    state.currentMessageIndex,
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fakeDownload = async () => {
    setIsLoading(true);
    const currentMessage = messages[currentMessageIndex] as
      | MJMessage
      | undefined;
    const imageInPng = currentMessage?.attachment?.url;
    const filename = currentMessage?.attachment?.filename;
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          imageInPng && saveAs(imageInPng, filename ?? "poster.png");
          resolve(true);
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
