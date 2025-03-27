"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: string[];
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: async (productId: string) => {
        set((state: CartStore) => ({
          items: [...state.items, productId],
        }));
      },
      removeItem: (productId: string) =>
        set((state: CartStore) => ({
          items: state.items.filter((id: string) => id !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
); 