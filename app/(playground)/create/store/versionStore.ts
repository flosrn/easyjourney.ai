import { create } from "zustand";

type VersionState = {
  versionValue: string;
};

type VersionAction = {
  setVersionValue: (value: string) => void;
};

export const useVersionStore = create<VersionAction & VersionState>()(
  (set) => ({
    versionValue: "default",
    setVersionValue: (value) => set(() => ({ versionValue: value })),
  })
);
