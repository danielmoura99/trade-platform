import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ChartView from "./pages/ChartView";

type Page = "dashboard" | "chart" | "settings";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [darkMode] = useState<boolean>(true);

  // Função para renderizar a página atual
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "chart":
        return <ChartView />;
      case "settings":
        return <div>Configurações</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: darkMode ? "#121212" : "#F5F5F5",
        color: darkMode ? "#E1E1E1" : "#333",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          height: "50px",
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          borderBottom: `1px solid ${darkMode ? "#333" : "#DDD"}`,
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginRight: "30px",
          }}
        >
          Trading Platform
        </div>

        <nav style={{ display: "flex", flexGrow: 1 }}>
          <button
            onClick={() => setCurrentPage("dashboard")}
            style={{
              background: "none",
              border: "none",
              color: darkMode ? "#D9D9D9" : "#555",
              padding: "0 15px",
              height: "50px",
              cursor: "pointer",
              borderBottom:
                currentPage === "dashboard" ? "2px solid #26A69A" : "none",
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage("chart")}
            style={{
              background: "none",
              border: "none",
              color: darkMode ? "#D9D9D9" : "#555",
              padding: "0 15px",
              height: "50px",
              cursor: "pointer",
              borderBottom:
                currentPage === "chart" ? "2px solid #26A69A" : "none",
            }}
          >
            Gráficos
          </button>
          <button
            onClick={() => setCurrentPage("settings")}
            style={{
              background: "none",
              border: "none",
              color: darkMode ? "#D9D9D9" : "#555",
              padding: "0 15px",
              height: "50px",
              cursor: "pointer",
              borderBottom:
                currentPage === "settings" ? "2px solid #26A69A" : "none",
            }}
          >
            Configurações
          </button>
        </nav>

        <div>
          <button
            style={{
              background: "none",
              border: `1px solid ${darkMode ? "#666" : "#DDD"}`,
              color: darkMode ? "#D9D9D9" : "#555",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Usuário
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {renderPage()}
      </main>

      {/* Footer */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          borderTop: `1px solid ${darkMode ? "#333" : "#DDD"}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#26A69A",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          ></div>
          Conectado
        </div>
        <div style={{ color: "#888" }}>v0.1.0</div>
      </footer>
    </div>
  );
};

export default App;
