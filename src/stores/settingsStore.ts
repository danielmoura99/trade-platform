import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  theme: "dark" | "light";
  chartInterval: string;
  defaultSymbol: string;
  updateTheme: (theme: "dark" | "light") => void;
  updateChartInterval: (interval: string) => void;
  updateDefaultSymbol: (symbol: string) => void;
}

// Criar o store com persistência
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      chartInterval: "D1",
      defaultSymbol: "PETR4",

      updateTheme: (theme) => set({ theme }),
      updateChartInterval: (interval) => set({ chartInterval: interval }),
      updateDefaultSymbol: (symbol) => set({ defaultSymbol: symbol }),
    }),
    {
      name: "trading-platform-settings",
    }
  )
);
