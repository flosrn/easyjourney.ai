import removeSpacesFromString from "~/utils/removeSpacesFromString";

import { aspectRatios } from "../data/aspectRatios";
import { useChaosStore } from "../store/chaosStore";
import { useFilterStore } from "../store/filterStore";
import { useMessageStore } from "../store/messageStore";
import { useMidjourneyStore } from "../store/midjourneyStore";
import { usePromptStore } from "../store/promptStore";
import { useQualityStore } from "../store/qualityStore";
import { useRatioStore } from "../store/ratioStore";
import { useSeedStore } from "../store/seedStore";
import { useStopStore } from "../store/stopStore";
import { useStylizeStore } from "../store/stylizeStore";
import { useTileStore } from "../store/tileStore";
import { useVersionStore } from "../store/versionStore";

const useSelectors = () => {
  const [clearMessages] = useMessageStore((state) => [state.clearMessages]);
  const [setMsg, setSelectedImage] = useMidjourneyStore((state) => [
    state.setMsg,
    state.setSelectedImage,
  ]);
  const [chaosValue, setChaosValue, setIsChaosSelectorDisabled] = useChaosStore(
    (state) => [
      state.chaosValue,
      state.setChaosValue,
      state.setIsChaosSelectorDisabled,
      state.isChaosSelectorDisabled,
    ]
  );
  const [qualityValue, setQualityValue, setIsQualitySelectorDisabled] =
    useQualityStore((state) => [
      state.qualityValue,
      state.setQualityValue,
      state.setIsQualitySelectorDisabled,
    ]);
  const [stopValue, setStopValue, setIsStopSelectorDisabled] = useStopStore(
    (state) => [
      state.stopValue,
      state.setStopValue,
      state.setIsStopSelectorDisabled,
    ]
  );
  const [stylizeValue, setStylizeValue, setIsStylizeSelectorDisabled] =
    useStylizeStore((state) => [
      state.stylizeValue,
      state.setStylizeValue,
      state.setIsStylizeSelectorDisabled,
    ]);
  const [tileValue, resetTileValue, setIsTileSelectorDisabled] = useTileStore(
    (state) => [
      state.tileValue,
      state.resetTileValue,
      state.setIsTileSelectorDisabled,
    ]
  );
  const [versionValue, setVersionValue, setIsVersionSelectorDisabled] =
    useVersionStore((state) => [
      state.versionValue,
      state.setVersionValue,
      state.setIsVersionSelectorDisabled,
    ]);
  const [seedValue, setSeedValue, setIsSeedSelectorDisabled] = useSeedStore(
    (state) => [
      state.seedValue,
      state.setSeedValue,
      state.setIsSeedSelectorDisabled,
    ]
  );
  const [
    selectedAspectRatio,
    setSelectedAspectRatio,
    setIsAspectRatioSelectorDisabled,
  ] = useRatioStore((state) => [
    state.selectedAspectRatio,
    state.setSelectedAspectRatio,
    state.setIsAspectRatioSelectorDisabled,
  ]);
  const [selectedFilters, clearFilters, setIsFilterSelectorDisabled] =
    useFilterStore((state) => [
      state.selectedFilters,
      state.clearFilters,
      state.setIsFilterSelectorDisabled,
    ]);
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);

  const handleDisableSelectors = (value: boolean) => {
    setIsChaosSelectorDisabled(value);
    setIsQualitySelectorDisabled(value);
    setIsStopSelectorDisabled(value);
    setIsStylizeSelectorDisabled(value);
    setIsTileSelectorDisabled(value);
    setIsVersionSelectorDisabled(value);
    setIsSeedSelectorDisabled(value);
    setIsAspectRatioSelectorDisabled(value);
    setIsFilterSelectorDisabled(value);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setMsg("");
    clearMessages();
    setPromptValue("");
    setSelectedAspectRatio(aspectRatios[0]);
    setChaosValue(0);
    setQualityValue(1);
    setStopValue(100);
    setStylizeValue(100);
    setVersionValue("--v 5.2");
    setSeedValue(undefined);
    resetTileValue();
    clearFilters();
    handleDisableSelectors(false);
  };

  const hasFilters = selectedFilters.length > 0;
  const { ratio, value: ratioValue } = selectedAspectRatio;
  const styles = selectedFilters
    .map((selectedFilter) => selectedFilter.style)
    .join(", ")
    .toLowerCase();

  // OPTIONS
  const chaos = chaosValue === 0 ? "" : ` --c ${chaosValue}`;
  const stylize = stylizeValue === 100 ? "" : ` --stylize ${stylizeValue}`;
  const stop = stopValue === 100 ? "" : ` --stop ${stopValue}`;
  const quality = qualityValue === 1 ? "" : ` --quality ${qualityValue}`;
  const version = versionValue === "--v 5.2" ? "" : ` ${versionValue}`;
  const tile = tileValue ? ` --tile` : "";
  const ratioTrim = ratio ? ` ${ratio}` : "";
  const seed = seedValue ? ` --seed ${seedValue}` : "";
  const options = {
    textPrompt: promptValue,
    style: styles,
    ratio: ratioValue,
    chaos: chaosValue,
    stylize: stylizeValue,
    stop: stopValue,
    quality: qualityValue,
    model: versionValue,
    tile: tileValue,
    seed: seedValue,
  };

  const hasOption =
    chaos || stylize || stop || quality || version || tile || ratio;

  const trimmedPromptValue = removeSpacesFromString(promptValue);

  // FINAL PROMPT
  const prompt = `${trimmedPromptValue}${
    styles.length > 0 ? `, ${styles}` : ""
  }${
    hasOption ? "," : ""
  }${ratioTrim}${chaos}${quality}${stop}${stylize}${tile}${version}${seed}`;

  const isEmpty = !prompt || prompt.length <= 1;

  return {
    prompt,
    promptValue,
    options,
    hasFilters,
    isEmpty,
    handleClear,
    handleDisableSelectors,
  };
};

export default useSelectors;
