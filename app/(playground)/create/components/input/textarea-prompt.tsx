"use client";

import React from "react";
import { motion } from "framer-motion";

import { Textarea } from "~/components/ui/textarea";

import { cn } from "~/lib/classNames";

import { useChaosStore } from "../../store/chaosStore";
import { usePromptStore } from "../../store/promptStore";
import { useQualityStore } from "../../store/qualityStore";
import { useRatioStore } from "../../store/ratioStore";
import { useSeedStore } from "../../store/seedStore";
import { useStopStore } from "../../store/stopStore";
import { useStylizeStore } from "../../store/stylizeStore";
import { useTileStore } from "../../store/tileStore";
import { useVersionStore } from "../../store/versionStore";

type TextareaPromptProps = {
  generateHandler: () => void;
  collapse?: boolean;
};

const TextareaPrompt = ({ generateHandler, collapse }: TextareaPromptProps) => {
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);

  const [setSelectedRatio, setIsAspectRatioSelectorDisabled] = useRatioStore(
    (state) => [state.setSelectedRatio, state.setIsAspectRatioSelectorDisabled]
  );

  const [versionValue, setVersionValue, setIsVersionSelectorDisabled] =
    useVersionStore((state) => [
      state.versionValue,
      state.setVersionValue,
      state.setIsVersionSelectorDisabled,
    ]);

  const [setQualityValue, setIsQualitySelectorDisabled] = useQualityStore(
    (state) => [state.setQualityValue, state.setIsQualitySelectorDisabled]
  );

  const [setSeedValue, setIsSeedSelectorDisabled] = useSeedStore((state) => [
    state.setSeedValue,
    state.setIsSeedSelectorDisabled,
  ]);

  const [setChaosValue, setIsChaosSelectorDisabled] = useChaosStore((state) => [
    state.setChaosValue,
    state.setIsChaosSelectorDisabled,
  ]);

  const [setStylizeValue, setIsStylizeSelectorDisabled] = useStylizeStore(
    (state) => [state.setStylizeValue, state.setIsStylizeSelectorDisabled]
  );

  const [setStopValue, setIsStopSelectorDisabled] = useStopStore((state) => [
    state.setStopValue,
    state.setIsStopSelectorDisabled,
  ]);

  const [setTileValue, setIsTileSelectorDisabled] = useTileStore((state) => [
    state.setTileValue,
    state.setIsTileSelectorDisabled,
  ]);

  const handlePromptValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    // ACCEPT --ar xx:xx
    const aspectRatioPattern = /--ar\s+(\d{1,2}:\d{1,2})\b/g;
    const aspectRatioMatches = [...inputValue.matchAll(aspectRatioPattern)];
    const aspectRatioMatch = aspectRatioMatches.at(-1);
    // ACCEPT --v 4 5 5.1 --niji 5
    const versionPattern = /(--v\s+(4|5(\.1)?)|--niji\s(5)?)\b/g;
    const versionMatches = [...inputValue.matchAll(versionPattern)];
    const versionMatch = versionMatches.at(-1);
    // ACCEPT --seed 1-999999999
    const seedPattern = /--seed\s+([1-9]\d{0,8}|0)\b/g;
    const seedMatches = [...inputValue.matchAll(seedPattern)];
    const seedMatch = seedMatches.at(-1);
    // ACCEPT --quality 1 .5 .25
    const qualityPattern = /--quality\s+(1|\.5|\.25)\b/g;
    const qualityMatches = [...inputValue.matchAll(qualityPattern)];
    const qualityMatch = qualityMatches.at(-1);
    // ACCEPT --c 0-100
    const chaosPattern = /--c\s+(100|[1-9]\d?|0)\b/g;
    const chaosMatches = [...inputValue.matchAll(chaosPattern)];
    const chaosMatch = chaosMatches.at(-1);
    // ACCEPT --stylize 0-1000
    const stylizePattern = /--stylize\s+([1-9]\d{0,2}|1000|0)\b/g;
    const stylizeMatches = [...inputValue.matchAll(stylizePattern)];
    const stylizeMatch = stylizeMatches.at(-1);
    // ACCEPT --stop 10 20 30 40 50 60 70 80 90 100
    const stopPattern = /--stop\s+(100|[1-9]0)\b/g;
    const stopMatches = [...inputValue.matchAll(stopPattern)];
    const stopMatch = stopMatches.at(-1);
    // ACCEPT --tile
    const tilePattern = /--tile\b/g;
    const tileMatch = inputValue.match(tilePattern);

    if (aspectRatioMatch?.[1]) {
      setSelectedRatio(aspectRatioMatch[1]);
    }
    setIsAspectRatioSelectorDisabled(!!aspectRatioMatch?.[1]);

    if (versionMatch?.[1]) {
      setVersionValue(versionMatch[1]);
    }
    setIsVersionSelectorDisabled(!!versionMatch?.[1]);

    if (seedMatch?.[1]) {
      setSeedValue(Number(seedMatch[1]));
    }
    setIsSeedSelectorDisabled(!!seedMatch?.[1]);

    if (qualityMatch?.[1]) {
      setQualityValue(Number(qualityMatch[1]));
    }
    setIsQualitySelectorDisabled(!!qualityMatch?.[1]);

    if (chaosMatch?.[1]) {
      setChaosValue(Number(chaosMatch[1]));
    }
    setIsChaosSelectorDisabled(!!chaosMatch?.[1]);

    if (stylizeMatch?.[1]) {
      setStylizeValue(Number(stylizeMatch[1]));
    }
    setIsStylizeSelectorDisabled(!!stylizeMatch?.[1]);

    if (stopMatch?.[1]) {
      setStopValue(Number(stopMatch[1]));
    }
    setIsStopSelectorDisabled(!!stopMatch?.[1]);

    if (versionValue !== "--v 4") {
      setTileValue(!!tileMatch?.[0]);
      setIsTileSelectorDisabled(!!tileMatch?.[0]);
    }

    setPromptValue(inputValue);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (promptValue.length > 0) {
        generateHandler();
      }
    }
  };

  return (
    <motion.div layout>
      <Textarea
        value={promptValue}
        onChange={handlePromptValue}
        onKeyDown={handleKeyDown}
        placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
        className={cn("my-5", collapse ? "h-16" : "h-24")}
      />
    </motion.div>
  );
};

export default TextareaPrompt;
