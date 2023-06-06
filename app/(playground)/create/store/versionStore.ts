import { create } from "zustand";

type VersionState = {
  versionValue: string;
  disabledVersionSelector: boolean;
};

type VersionAction = {
  setVersionValue: (value: string) => void;
  setDisabledVersionSelector: (value: boolean) => void;
};

export const useVersionStore = create<VersionAction & VersionState>()(
  (set) => ({
    versionValue: "--v 5.1",
    disabledVersionSelector: false,
    setVersionValue: (value) => set(() => ({ versionValue: value })),
    setDisabledVersionSelector: (value) =>
      set(() => ({ disabledVersionSelector: value })),
  })
);
