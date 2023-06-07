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
    versionValue: "--v 5.1",
    isVersionSelectorDisabled: false,
    setVersionValue: (value) => set(() => ({ versionValue: value })),
    setIsVersionSelectorDisabled: (value) =>
      set(() => ({ isVersionSelectorDisabled: value })),
  })
);
