import type { MJMessage } from "midjourney";
import { create } from "zustand";

type MessageState = {
  messages: MJMessage[];
  currentMessageIndex: number;
};

type MessageAction = {
  setMessages: (newMessage: MJMessage) => void;
  clearMessages: () => void;
  setCurrentMessageIndex: (index: number) => void;
};

export const useMessageStore = create<MessageAction & MessageState>()(
  (set) => ({
    messages: [],
    currentMessageIndex: 0,
    setMessages: (newMessage) =>
      set((state) => ({
        messages: [...state.messages, newMessage],
        currentMessageIndex: state.messages.length,
      })),
    setCurrentMessageIndex: (index) => set({ currentMessageIndex: index }),
    clearMessages: () => set({ messages: [] }),
  })
);
