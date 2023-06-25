import { create } from "zustand";

type MobileMenuState = {
  isMobileMenuOpen: boolean;
};

type MobileMenuActions = {
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

export const useMobileMenuStore = create<MobileMenuActions & MobileMenuState>(
  (set) => ({
    isMobileMenuOpen: false,
    toggleMobileMenu: () =>
      set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  })
);
