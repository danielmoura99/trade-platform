import React, { useState } from "react";
import CandlestickChart from "../../components/Chart/CandlestickChart";
import OrderForm from "../../components/Trading/OrderForm";

const ChartView: React.FC = () => {
  const [symbol, setSymbol] = useState("PETR4");
  const [interval, setInterval] = useState("D1");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <h2>{symbol}</h2>
        </div>
        <div>
          {["M5", "M15", "M30", "H1", "D1"].map((int) => (
            <button
              key={int}
              onClick={() => setInterval(int)}
              style={{
                margin: "0 5px",
                background: interval === int ? "#26A69A" : "transparent",
                color: interval === int ? "white" : "inherit",
                border: "1px solid #333",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {int}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100% - 50px)" }}>
        <div style={{ flexGrow: 1 }}>
          <CandlestickChart symbol={symbol} interval={interval} />
        </div>
        <div style={{ width: "300px", marginLeft: "20px" }}>
          <OrderForm symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default ChartView;
