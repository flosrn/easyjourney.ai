import type { MJMessage } from "midjourney";
import { create } from "zustand";

type MessageState = {
  messages: MJMessage[];
};

type MessageAction = {
  setMessages: (newMessage: MJMessage) => void;
  clearMessages: () => void;
};

export const useMessageStore = create<MessageAction & MessageState>()(
  (set) => ({
    messages: [],
    setMessages: (newMessage) =>
      set((state) => ({ messages: [...state.messages, newMessage] })),
    clearMessages: () => set({ messages: [] }),
  })
);
