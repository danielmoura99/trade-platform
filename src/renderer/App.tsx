// caminho: src/renderer/App.tsx
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ChartView from "./pages/ChartView";

// Importações de componentes shadcn
import { Button } from "../components/ui/button";
import { LayoutDashboard, LineChart, Settings, User } from "lucide-react";

type Page = "dashboard" | "chart" | "settings";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  // Função para renderizar a página atual
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "chart":
        return <ChartView />;
      case "settings":
        return <div className="p-6">Configurações</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text">
      {/* Header */}
      <header className="flex items-center justify-between px-4 lg:px-6 h-14 bg-surface border-b border-border shadow-sm">
        <div className="flex items-center">
          <div className="text-lg font-bold mr-2 lg:mr-8 hidden sm:block">
            Trading Platform
          </div>
          <div className="text-lg font-bold sm:hidden">TP</div>

          <nav className="flex">
            <Button
              onClick={() => setCurrentPage("dashboard")}
              variant="ghost"
              className={`h-14 px-3 rounded-none transition-colors ${
                currentPage === "dashboard" ? "border-b-2 border-primary" : ""
              }`}
            >
              <LayoutDashboard className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
            <Button
              onClick={() => setCurrentPage("chart")}
              variant="ghost"
              className={`h-14 px-3 rounded-none transition-colors ${
                currentPage === "chart" ? "border-b-2 border-primary" : ""
              }`}
            >
              <LineChart className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline">Gráficos</span>
            </Button>
            <Button
              onClick={() => setCurrentPage("settings")}
              variant="ghost"
              className={`h-14 px-3 rounded-none transition-colors ${
                currentPage === "settings" ? "border-b-2 border-primary" : ""
              }`}
            >
              <Settings className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline">Configurações</span>
            </Button>
          </nav>
        </div>

        <div>
          <Button variant="outline" size="sm" className="gap-2">
            <User size={16} />
            <span className="hidden sm:inline">Usuário</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-auto">{renderPage()}</main>

      {/* Footer */}
      <footer className="flex justify-between items-center px-4 py-2 bg-surface border-t border-border text-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full mr-1.5 animate-pulse"></div>
          <span>Conectado</span>
        </div>
        <div className="text-muted-foreground">v0.1.0</div>
      </footer>
    </div>
  );
};

export default App;
