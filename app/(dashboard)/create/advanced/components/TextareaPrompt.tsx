import React from "react";

import { Textarea } from "~/components/ui/Textarea";

import { usePromptStore } from "../store/promptStore";

type TextareaPromptProps = {};

const TextareaPrompt = ({}: TextareaPromptProps) => {
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);
  return (
    <Textarea
      value={promptValue}
      onChange={(event) => setPromptValue(event.target.value)}
      placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
      className="my-5"
    />
  );
};

export default TextareaPrompt;
