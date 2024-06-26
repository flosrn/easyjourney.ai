import { create } from "zustand";

type VersionState = {
  versionValue: string;
  isVersionSelectorDisabled: boolean;
};

type VersionAction = {
  setVersionValue: (value: string) => void;
  setIsVersionSelectorDisabled: (value: boolean) => void;
};

export const useVersionStore = create<VersionAction & VersionState>()(
  (set) => ({
    versionValue: "--v 6.0",
    isVersionSelectorDisabled: false,
    setVersionValue: (value) => set(() => ({ versionValue: value })),
    setIsVersionSelectorDisabled: (value) =>
      set(() => ({ isVersionSelectorDisabled: value })),
  })
);
