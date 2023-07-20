import { useMutation } from "@tanstack/react-query";
import type { MJMessage } from "midjourney";
import { toast } from "react-hot-toast";

import { generate, savePoster } from "../lib/request";
import { useMessageStore } from "../store/messageStore";
import { useMidjourneyStore } from "../store/midjourneyStore";
import useMsg from "./useMsg";
import useSelectors from "./useSelectors";

type MutationParams = {
  option?: string;
  newPrompt?: string;
};

const useGeneration = () => {
  const [messages, addMessage, setMessage, currentMessageIndex] =
    useMessageStore((state) => [
      state.messages,
      state.addMessage,
      state.setMessage,
      state.currentMessageIndex,
    ]);

  const [
    generationType,
    setRequestState,
    selectedImage,
    setGenerationType,
    setMsg,
    setSelectedImage,
  ] = useMidjourneyStore((state) => [
    state.generationType,
    state.setRequestState,
    state.selectedImage,
    state.setGenerationType,
    state.setMsg,
    state.setSelectedImage,
  ]);
  const { prompt, options } = useSelectors();
  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  useMsg();

  const generationMutation = useMutation<
    MJMessage | undefined,
    Error,
    MutationParams
  >({
    mutationFn: async ({ option, newPrompt }) => {
      const result = await (currentMessage && generationType === "save"
        ? savePoster({
            poster: currentMessage,
            options,
            selectedImage,
          })
        : generate({
            generationType,
            prompt,
            content: currentMessage,
            index: selectedImage,
            option,
            newPrompt,
            loading: (data: MJMessage) => {
              if (data.progress === "waiting") return;
              setMsg(`Generating poster ${data.progress}`);
              if (generationType === "imagine") {
                addMessage(data);
              } else if (data.progress === "done") {
                addMessage(data);
              }
            },
          }));
      return result;
    },
    onMutate: () => {
      console.log("onMutate");
      setRequestState({ isLoading: true, isSuccess: false, isError: false });
    },
    onError: (error) => {
      console.log("onError:", error);
      setMsg(`Error: ${error.message}`);
      setRequestState({ isError: true, isLoading: false });
      setGenerationType(null);
      toast.error("An error occurred, please try again.");
    },
    onSuccess: (data) => {
      console.log("onSuccess:", data);
      setSelectedImage(null);
      setRequestState({ isSuccess: true, isLoading: false });
      let actionWord = "generated";
      const isDataImagine = data?.generationType === "imagine";
      const isDataUpscale = data?.generationType === "upscale";
      const isDataVariation = data?.generationType === "variation";
      const isDataSave = data?.generationType === "save";
      if (isDataImagine || isDataVariation) {
        actionWord = "generated";
      } else if (isDataUpscale) {
        actionWord = "upscaled";
      } else if (isDataSave) {
        actionWord = "saved";
      }
      data && toast.success(`Poster successfully ${actionWord}!`);
      if (!data) setMsg("Something went wrong, please try again.");
      if (isDataSave) {
        const savedMessage = messages.find(
          (message) => message.jobId === data.jobId
        );
        const index = savedMessage && messages.indexOf(savedMessage);
        index && setMessage(index, { ...savedMessage, generationType: "save" });
      }
    },
    onSettled: () => {
      console.log("onSettled");
      setRequestState({ isLoading: false });
    },
  });

  return {
    generationMutation,
  };
};

export default useGeneration;