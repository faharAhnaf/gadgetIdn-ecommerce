import { create } from "zustand";

interface SearchStore {
  text: string;
  setText: (text: string) => void;
}

export const useSearchProduct = create<SearchStore>((set) => ({
  text: "",
  setText: (text) => set({ text }),
}));
