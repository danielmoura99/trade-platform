// caminho: src/renderer/pages/ChartView/index.tsx
import React, { useState } from "react";
import CandlestickChart from "../../components/Chart/CandlestickChart";
import OrderForm from "../../components/Trading/OrderForm";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  LineChart,
  Search,
  Clock,
  Star,
  BarChart3,
  ChevronDown,
  ArrowDownUp,
  Bookmark,
  History,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

const ChartView: React.FC = () => {
  const [symbol, setSymbol] = useState("PETR4");
  const [interval, setInterval] = useState("D1");
  const [activeTab, setActiveTab] = useState("chart");

  const intervals = ["M5", "M15", "M30", "H1", "D1"];

  // Mock data para lista de símbolos recentes
  const recentSymbols = ["VALE3", "ITUB4", "BBDC4", "WEGE3"];

  // Mock data para lista de favoritos
  const favoriteSymbols = ["PETR4", "VALE3", "ITUB4"];

  return (
    <div className="flex flex-col h-full p-4 lg:p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center">
          <div className="relative mr-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9 w-60 bg-surfaceHover border-border"
              placeholder="Buscar símbolo..."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="p-2">
                  <div className="flex items-center mb-2 text-xs font-medium text-muted-foreground">
                    <History className="mr-1 h-3.5 w-3.5" />
                    Recentes
                  </div>
                  {recentSymbols.map((sym) => (
                    <DropdownMenuItem key={sym} onClick={() => setSymbol(sym)}>
                      {sym}
                    </DropdownMenuItem>
                  ))}
                  <div className="flex items-center mt-3 mb-2 text-xs font-medium text-muted-foreground">
                    <Star className="mr-1 h-3.5 w-3.5" />
                    Favoritos
                  </div>
                  {favoriteSymbols.map((sym) => (
                    <DropdownMenuItem
                      key={`fav-${sym}`}
                      onClick={() => setSymbol(sym)}
                    >
                      {sym}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="outline" size="sm" className="mr-2">
            <Bookmark className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Adicionar aos favoritos</span>
            <span className="sm:hidden">Favoritar</span>
          </Button>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-sm text-muted-foreground">Período:</span>
          <div className="flex">
            {intervals.map((int) => (
              <Button
                key={int}
                onClick={() => setInterval(int)}
                variant={interval === int ? "default" : "outline"}
                size="sm"
                className={`text-xs mx-0.5 ${
                  interval === int ? "bg-primary" : ""
                }`}
              >
                {int}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center justify-between mb-2">
          <TabsList>
            <TabsTrigger value="chart" className="flex items-center">
              <LineChart className="h-4 w-4 mr-1.5" />
              <span>Gráfico</span>
            </TabsTrigger>
            <TabsTrigger value="depth" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-1.5" />
              <span>Profundidade</span>
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5" />
              <span>Time & Sales</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chart" className="flex-1 mt-0">
          <div className="flex h-full gap-4">
            <div className="flex-1">
              <CandlestickChart symbol={symbol} interval={interval} />
            </div>
            <div className="w-72 hidden lg:block">
              <OrderForm symbol={symbol} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="depth" className="flex-1 mt-0">
          <Card className="h-full bg-surface border-border">
            <CardContent className="p-4 flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="mb-2">Visualização de profundidade de mercado</p>
                <p className="text-sm">Em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="flex-1 mt-0">
          <Card className="h-full bg-surface border-border">
            <CardContent className="p-4 flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="mb-2">Time & Sales</p>
                <p className="text-sm">Em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Versão mobile do OrderForm */}
      <div className="lg:hidden mt-4">
        <OrderForm symbol={symbol} />
      </div>
    </div>
  );
};

export default ChartView;
