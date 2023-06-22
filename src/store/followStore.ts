import { create } from "zustand";

type FollowState = {
  isFollowing: boolean;
};

type FollowAction = {
  setIsFollowing: (isFollowed?: boolean) => void;
};

export const useFollowStore = create<FollowAction & FollowState>()((set) => ({
  isFollowing: false,
  setIsFollowing: (isFollowing) => set({ isFollowing }),
}));
