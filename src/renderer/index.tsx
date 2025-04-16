// caminho: src/renderer/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Estilos do Tailwind
import "./hmr"; // Configuração do Hot Module Replacement

// Cria a raiz do React
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Renderiza o aplicativo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Aceita atualizações de HMR para o componente App - com verificação segura de tipo
if (typeof module !== "undefined" && module.hot) {
  module.hot.accept("./App", () => {
    console.log("Hot reload: atualizando App");
    // Recarregar o App ao atualizar
    const NextApp = require("./App").default;
    root.render(
      <React.StrictMode>
        <NextApp />
      </React.StrictMode>
    );
  });
}
