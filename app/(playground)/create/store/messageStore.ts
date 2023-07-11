import type { MJMessage } from "midjourney";
import { create } from "zustand";

type MessageState = {
  messages: MJMessage[];
  currentMessageIndex: number;
};

type MessageAction = {
  addMessage: (newMessage: MJMessage) => void;
  setMessage: (index: number, newMessage: MJMessage) => void;
  setMessages: (messages: MJMessage[]) => void;
  clearMessages: () => void;
  setCurrentMessageIndex: (index: number) => void;
};

export const useMessageStore = create<MessageAction & MessageState>()(
  (set) => ({
    messages: [],
    currentMessageIndex: 0,
    addMessage: (newMessage) =>
      set((state) => ({
        messages: [...state.messages, newMessage],
        currentMessageIndex: state.messages.length,
      })),
    setMessage: (index, newMessage) =>
      set((state) => {
        const messages = [...state.messages];
        messages[index] = newMessage;
        return {
          messages,
          currentMessageIndex: index,
        };
      }),
    setMessages: (messages) =>
      set(() => ({
        messages,
        currentMessageIndex: messages.length,
      })),
    setCurrentMessageIndex: (index) => set({ currentMessageIndex: index }),
    clearMessages: () => set({ messages: [] }),
  })
);
