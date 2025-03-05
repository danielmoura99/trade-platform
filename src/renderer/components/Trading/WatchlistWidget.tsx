import React, { useState } from "react";

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const WatchlistWidget: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("PETR4");

  // Mock data - na implementação real, viria de um serviço
  const watchlistItems: WatchlistItem[] = [
    { symbol: "PETR4", name: "Petrobras PN", price: 36.22, change: 1.2 },
    { symbol: "VALE3", name: "Vale ON", price: 67.45, change: -0.5 },
    { symbol: "ITUB4", name: "Itaú PN", price: 32.8, change: 0.7 },
    { symbol: "BBDC4", name: "Bradesco PN", price: 16.45, change: -0.2 },
    { symbol: "WEGE3", name: "WEG ON", price: 42.33, change: 1.8 },
  ];

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        borderRadius: "4px",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #333",
          fontWeight: "bold",
        }}
      >
        Watchlist
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          maxHeight: "calc(100% - 40px)",
          overflowY: "auto",
        }}
      >
        {watchlistItems.map((item) => (
          <li
            key={item.symbol}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #333",
              backgroundColor:
                selectedSymbol === item.symbol ? "#2A2A2A" : "transparent",
              cursor: "pointer",
            }}
            onClick={() => setSelectedSymbol(item.symbol)}
          >
            <div>
              <div style={{ fontWeight: "bold" }}>{item.symbol}</div>
              <div style={{ fontSize: "0.8em", color: "#AAA" }}>
                {item.name}
              </div>
            </div>
            <div>
              <div style={{ textAlign: "right" }}>{item.price.toFixed(2)}</div>
              <div
                style={{
                  fontSize: "0.9em",
                  color: item.change >= 0 ? "#26A69A" : "#EF5350",
                  textAlign: "right",
                }}
              >
                {item.change >= 0 ? "+" : ""}
                {item.change.toFixed(2)}%
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistWidget;
