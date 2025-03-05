import React from "react";

interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

const PositionSummary: React.FC = () => {
  // Mock data - na implementação real, viria de um serviço
  const positions: Position[] = [
    {
      symbol: "PETR4",
      quantity: 200,
      avgPrice: 35.4,
      currentPrice: 36.22,
      pnl: 164,
      pnlPercent: 2.32,
    },
    {
      symbol: "VALE3",
      quantity: 100,
      avgPrice: 68.3,
      currentPrice: 67.45,
      pnl: -85,
      pnlPercent: -1.24,
    },
    {
      symbol: "ITUB4",
      quantity: 300,
      avgPrice: 32.1,
      currentPrice: 32.8,
      pnl: 210,
      pnlPercent: 2.18,
    },
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
        Posições Abertas
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#2A2A2A" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Ativo</th>
            <th style={{ padding: "8px", textAlign: "right" }}>Qtd</th>
            <th style={{ padding: "8px", textAlign: "right" }}>Preço Médio</th>
            <th style={{ padding: "8px", textAlign: "right" }}>Preço Atual</th>
            <th style={{ padding: "8px", textAlign: "right" }}>P&L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr
              key={position.symbol}
              style={{ borderBottom: "1px solid #333" }}
            >
              <td style={{ padding: "8px" }}>{position.symbol}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                {position.quantity}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                R$ {position.avgPrice.toFixed(2)}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                R$ {position.currentPrice.toFixed(2)}
              </td>
              <td
                style={{
                  padding: "8px",
                  textAlign: "right",
                  color: position.pnl >= 0 ? "#26A69A" : "#EF5350",
                }}
              >
                R$ {position.pnl.toFixed(2)} (
                {position.pnlPercent >= 0 ? "+" : ""}
                {position.pnlPercent.toFixed(2)}%)
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionSummary;
