import { create } from "zustand";

type ZoomState = {
  isZoomOpen: boolean;
};

type ZoomAction = {
  setIsZoomed: (isZoomed: boolean) => void;
  toggleZoom: () => void;
  closeZoom: () => void;
};

export const useZoomStore = create<ZoomAction & ZoomState>()((set) => ({
  isZoomOpen: false,
  setIsZoomed: (isZoomed) => set({ isZoomOpen: isZoomed }),
  toggleZoom: () => set((state) => ({ isZoomOpen: !state.isZoomOpen })),
  closeZoom: () => set({ isZoomOpen: false }),
}));
