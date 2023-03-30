import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItemType = {
  id: string;
  prompt: string;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItemType[];
};

type CartActions = {
  addItem: (item: CartItemType) => void;
  removeItem: (item: CartItemType) => void;
  updateItem: (id: string, quantity: number) => void;
  clear: () => void;
};

const useCartStore = create<CartActions & CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item: CartItemType) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },
      removeItem: (item: CartItemType) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            if (existingItem.quantity === 1) {
              return {
                items: state.items.filter((i) => i.id !== item.id),
              };
            }
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },
      updateItem: (id: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clear: () => set(() => ({ items: [] })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCartStore;
