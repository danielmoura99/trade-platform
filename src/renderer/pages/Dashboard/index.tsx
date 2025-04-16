// caminho: src/renderer/pages/Dashboard/index.tsx
import React from "react";
import WatchlistWidget from "../../../components/business/Trading/WatchlistWidget";
import PositionSummary from "./components/PositionSummary";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  LayoutDashboard,
  LineChart,
  PieChart,
  TrendingUp,
  Activity,
} from "lucide-react";

const Dashboard: React.FC = () => {
  // Dados fictícios para o gráfico de desempenho
  const performanceData = {
    positive: 68, // porcentagem de operações positivas
    totalProfit: 2450.78, // lucro total
    dayProfit: 420.35, // lucro do dia
  };

  return (
    <div className="p-4 lg:p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center">
          <LayoutDashboard className="mr-2 h-6 w-6" />
          Dashboard
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Atualizado: </span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Resumo rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-surface border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Patrimônio Total</p>
              <p className="text-2xl font-bold">R$ 25.450,75</p>
              <p className="text-sm text-primary flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5,2% este mês
              </p>
            </div>
            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
              <PieChart className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resultado Dia</p>
              <p className="text-2xl font-bold text-primary">
                +R$ {performanceData.dayProfit.toFixed(2)}
              </p>
              <p className="text-sm text-primary flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1,7% hoje
              </p>
            </div>
            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
              <Activity className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface border-border">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Performance</p>
              <p className="text-2xl font-bold">{performanceData.positive}%</p>
              <p className="text-sm text-muted-foreground">
                de trades positivos
              </p>
            </div>
            <div className="w-14 h-14 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-muted-foreground/20"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeDasharray={`${performanceData.positive} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-180px)]">
        <Tabs defaultValue="positions" className="h-full">
          <div className="flex items-center justify-between mb-2">
            <TabsList>
              <TabsTrigger value="positions" className="text-sm">
                Posições
              </TabsTrigger>
              <TabsTrigger value="history" className="text-sm">
                Histórico
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="positions" className="h-[calc(100%-40px)] mt-0">
            <PositionSummary />
          </TabsContent>

          <TabsContent value="history" className="h-[calc(100%-40px)] mt-0">
            <Card className="h-full bg-surface border-border">
              <CardHeader className="p-3 border-b border-border">
                Histórico de Operações
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-center text-muted-foreground py-8">
                  Histórico de operações será implementado em breve.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <WatchlistWidget />
      </div>
    </div>
  );
};

export default Dashboard;
