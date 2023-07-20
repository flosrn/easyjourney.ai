import { useEffect } from "react";
import type { MJMessage } from "midjourney";

import { useMessageStore } from "../store/messageStore";
import { useMidjourneyStore } from "../store/midjourneyStore";

const useMsg = () => {
  const [messages, currentMessageIndex] = useMessageStore((state) => [
    state.messages,
    state.currentMessageIndex,
  ]);
  const [{ isLoading, isSuccess }, setMsg, setSelectedImage] =
    useMidjourneyStore((state) => [
      state.requestState,
      state.setMsg,
      state.setSelectedImage,
    ]);

  useEffect(() => {
    if (isLoading) return;
    const message = messages[currentMessageIndex] as MJMessage | undefined;
    const msgGenerationType = message?.generationType;
    setSelectedImage(null);
    switch (msgGenerationType) {
      case "imagine":
        setMsg("Click on one of the 4 images and upscale it!");
        break;
      case "variation":
        setMsg("Click on one of the 4 images and upscale it!");
        break;
      case "upscale":
        setMsg("Poster upscaled!");
        break;
      case "save":
        setMsg("Poster saved!");
        break;
      case "zoomOut":
        setMsg("Poster unZoomed! Click on one of the 4 images and upscale it!");
        break;
      case "vary":
        setMsg("Poster varied! Click on one of the 4 images and upscale it!");
        break;
      default:
        setMsg("");
        break;
    }
  }, [
    messages,
    currentMessageIndex,
    setSelectedImage,
    setMsg,
    isLoading,
    isSuccess,
  ]);
};

export default useMsg;
