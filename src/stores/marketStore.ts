import { create } from "zustand";

// Definir tipos
export interface MarketData {
  open: number;
  symbol: string;
  name: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  updated: Date;
}

interface MarketState {
  marketData: Record<string, MarketData>;
  watchlist: string[];
  setMarketData: (symbol: string, data: MarketData) => void;
  updatePrice: (symbol: string, price: number) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
}

// Criar o store
export const useMarketStore = create<MarketState>((set) => ({
  marketData: {},
  watchlist: ["PETR4", "VALE3", "ITUB4"],

  setMarketData: (symbol, data) =>
    set((state) => ({
      marketData: {
        ...state.marketData,
        [symbol]: data,
      },
    })),

  updatePrice: (symbol, price) =>
    set((state) => {
      const symbolData = state.marketData[symbol];
      if (!symbolData) return state;

      const change = price - symbolData.lastPrice;
      const changePercent = (change / symbolData.lastPrice) * 100;

      return {
        marketData: {
          ...state.marketData,
          [symbol]: {
            ...symbolData,
            lastPrice: price,
            change,
            changePercent,
            high: Math.max(symbolData.high, price),
            low: Math.min(symbolData.low, price),
            updated: new Date(),
          },
        },
      };
    }),

  addToWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.includes(symbol)
        ? state.watchlist
        : [...state.watchlist, symbol],
    })),

  removeFromWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.filter((s) => s !== symbol),
    })),
}));
