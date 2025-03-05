import React, { useState } from "react";

interface OrderFormProps {
  symbol: string;
}

type OrderType = "buy" | "sell";
type OrderMode = "market" | "limit";

const OrderForm: React.FC<OrderFormProps> = ({ symbol }) => {
  const [orderType, setOrderType] = useState<OrderType>("buy");
  const [orderMode, setOrderMode] = useState<OrderMode>("limit");
  const [price, setPrice] = useState<string>("36.22");
  const [quantity, setQuantity] = useState<string>("100");

  const calculateTotal = (): number => {
    const priceValue = parseFloat(price) || 0;
    const quantityValue = parseFloat(quantity) || 0;
    return priceValue * quantityValue;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ordem enviada:", {
      symbol,
      type: orderType,
      mode: orderMode,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
    });
    // Aqui iríamos chamar o serviço de envio de ordens
  };

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        borderRadius: "4px",
        padding: "15px",
      }}
    >
      <h3 style={{ margin: "0 0 15px 0" }}>Nova Ordem - {symbol}</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", marginBottom: "15px" }}>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "4px 0 0 4px",
              backgroundColor: orderType === "buy" ? "#26A69A" : "#333",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setOrderType("buy")}
          >
            Compra
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "0 4px 4px 0",
              backgroundColor: orderType === "sell" ? "#EF5350" : "#333",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setOrderType("sell")}
          >
            Venda
          </button>
        </div>

        <div style={{ display: "flex", marginBottom: "15px" }}>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "4px 0 0 4px",
              backgroundColor: orderMode === "market" ? "#555" : "#333",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setOrderMode("market")}
          >
            Mercado
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "0 4px 4px 0",
              backgroundColor: orderMode === "limit" ? "#555" : "#333",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setOrderMode("limit")}
          >
            Limite
          </button>
        </div>

        {orderMode === "limit" && (
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Preço:
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#2A2A2A",
                border: "1px solid #444",
                color: "white",
                borderRadius: "4px",
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Quantidade:
          </label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#2A2A2A",
              border: "1px solid #444",
              color: "white",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Total:
          </label>
          <div
            style={{
              padding: "8px",
              backgroundColor: "#2A2A2A",
              border: "1px solid #444",
              borderRadius: "4px",
            }}
          >
            R${" "}
            {calculateTotal().toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: orderType === "buy" ? "#26A69A" : "#EF5350",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {orderType === "buy" ? "Comprar" : "Vender"} {symbol}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
