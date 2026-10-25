import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SizeId } from "@/data/cakes";

export type CartLine = {
  cakeId: string;
  size: SizeId;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (cakeId: string, size: SizeId, qty?: number) => void;
  setQty: (cakeId: string, size: SizeId, qty: number) => void;
  remove: (cakeId: string, size: SizeId) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (cakeId, size, qty = 1) =>
        set((state) => {
          const index = state.lines.findIndex(
            (line) => line.cakeId === cakeId && line.size === size,
          );
          if (index === -1) {
            return { lines: [...state.lines, { cakeId, size, qty }] };
          }
          const lines = state.lines.slice();
          const current = lines[index];
          if (!current) return state;
          lines[index] = { ...current, qty: current.qty + qty };
          return { lines };
        }),
      setQty: (cakeId, size, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((line) => !(line.cakeId === cakeId && line.size === size))
              : state.lines.map((line) =>
                  line.cakeId === cakeId && line.size === size ? { ...line, qty } : line,
                ),
        })),
      remove: (cakeId, size) =>
        set((state) => ({
          lines: state.lines.filter((line) => !(line.cakeId === cakeId && line.size === size)),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "bangert-cart",
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);
