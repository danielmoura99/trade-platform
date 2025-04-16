import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Iniciando renderização do React...");

try {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  console.log("Elemento root encontrado, renderizando App...");

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log("App renderizado com sucesso!");
} catch (error) {
  console.error("Erro ao renderizar a aplicação:", error);
}
