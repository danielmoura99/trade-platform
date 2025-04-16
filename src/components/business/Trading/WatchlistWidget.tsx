// caminho: src/components/business/Trading/WatchlistWidget.tsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, Star, Loader2 } from "lucide-react";
import { useMarketStore } from "@/stores/marketStore";
import { marketService } from "@/services";

const WatchlistWidget: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("PETR4.SA");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Obter dados do marketStore
  const { marketData, watchlist, addToWatchlist, removeFromWatchlist } =
    useMarketStore();

  // Efeito para carregar dados iniciais dos símbolos no watchlist
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        // Adicionar sufixo ".SA" para símbolos brasileiros (Yahoo Finance)
        const symbolsToFetch = watchlist.map((s) =>
          s.endsWith(".SA") ? s : `${s}.SA`
        );

        // Buscar dados para os símbolos na watchlist
        const data = await marketService.getMultipleSymbols(symbolsToFetch);

        // Dados já foram adicionados ao store pelo service
        console.log("Dados carregados:", data);
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Configurar WebSocket para atualizações em tempo real
    const ws = marketService.setupWebSocket();

    // Subscrever para atualizações de cada símbolo
    const subscriptions = watchlist.map((symbol) => {
      const symbolWithSuffix = symbol.endsWith(".SA") ? symbol : `${symbol}.SA`;
      return ws.subscribe(symbolWithSuffix, (update) => {
        // Atualizar o preço no store
        useMarketStore
          .getState()
          .updatePrice(symbolWithSuffix, update.lastPrice);
      });
    });

    // Limpar subscrições quando o componente desmontar
    return () => {
      subscriptions.forEach((unsub) => unsub && unsub());
    };
  }, [watchlist]); // Re-executar quando a watchlist mudar

  // Filtrar itens com base na pesquisa
  const filteredItems = watchlist
    .filter((symbol) => {
      const symbolData = marketData[symbol] || marketData[`${symbol}.SA`];
      return (
        symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (symbolData?.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    })
    .map((symbol) => {
      const symbolWithSuffix = symbol.endsWith(".SA") ? symbol : `${symbol}.SA`;
      const data = marketData[symbolWithSuffix] ||
        marketData[symbol] || {
          name: symbol,
          lastPrice: 0,
          change: 0,
        };

      return {
        symbol: symbol,
        displaySymbol: symbol.replace(".SA", ""),
        name: data.name || symbol,
        price: data.lastPrice || 0,
        change: data.changePercent || 0,
        favorite: true, // Se está na watchlist, é favorito
      };
    });

  const toggleFavorite = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  return (
    <Card className="h-full bg-surface border-border overflow-hidden">
      <CardHeader className="p-3 border-b border-border space-y-0">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-base">Watchlist</h3>
          <div className="flex gap-1">
            <button className="text-sm px-2 py-1 bg-surfaceHover hover:bg-primary/20 transition-colors rounded">
              Todos
            </button>
            <button className="text-sm px-2 py-1 hover:bg-surfaceHover transition-colors rounded">
              Favoritos
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 bg-surfaceHover border-border h-9"
            placeholder="Buscar ativos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-86px)]">
          {isLoading ? (
            <div className="p-4 text-center flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
              <span>Carregando dados...</span>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filteredItems.map((item) => (
                <li
                  key={item.symbol}
                  className={`flex justify-between p-3 cursor-pointer transition-colors duration-150 ${
                    selectedSymbol === item.symbol ? "bg-surfaceHover" : ""
                  } hover:bg-surfaceHover group`}
                >
                  <div
                    className="flex items-center"
                    onClick={() => setSelectedSymbol(item.symbol)}
                  >
                    <div className="mr-3 flex-shrink-0">
                      {item.change >= 0 ? (
                        <TrendingUp className="h-5 w-5 text-primary" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-danger" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold flex items-center gap-1">
                        {item.displaySymbol}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="font-medium">{item.price.toFixed(2)}</div>
                    <div
                      className={`text-sm flex items-center ${
                        item.change >= 0 ? "text-primary" : "text-danger"
                      }`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)}%
                    </div>
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 ml-2 flex-shrink-0 transition-opacity"
                    onClick={() => toggleFavorite(item.symbol)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        item.favorite
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </li>
              ))}
              {filteredItems.length === 0 && (
                <li className="p-4 text-center text-muted-foreground">
                  Nenhum ativo encontrado
                </li>
              )}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WatchlistWidget;
