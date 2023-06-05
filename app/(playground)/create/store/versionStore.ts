import { create } from "zustand";

type VersionState = {
  versionValue: string;
};

type VersionAction = {
  setVersionValue: (value: string) => void;
};

export const useVersionStore = create<VersionAction & VersionState>()(
  (set) => ({
    versionValue: "--v 5.1",
    setVersionValue: (value) => set(() => ({ versionValue: value })),
  })
);
