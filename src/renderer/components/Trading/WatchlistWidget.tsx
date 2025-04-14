// caminho: src/renderer/components/Trading/WatchlistWidget.tsx
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../../../components/ui/card";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Input } from "../../../components/ui/input";
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react";

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  favorite?: boolean;
}

const WatchlistWidget: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("PETR4");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data - na implementação real, viria de um serviço
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([
    {
      symbol: "PETR4",
      name: "Petrobras PN",
      price: 36.22,
      change: 1.2,
      favorite: true,
    },
    { symbol: "VALE3", name: "Vale ON", price: 67.45, change: -0.5 },
    { symbol: "ITUB4", name: "Itaú PN", price: 32.8, change: 0.7 },
    { symbol: "BBDC4", name: "Bradesco PN", price: 16.45, change: -0.2 },
    { symbol: "WEGE3", name: "WEG ON", price: 42.33, change: 1.8 },
  ]);

  const toggleFavorite = (symbol: string) => {
    setWatchlistItems(
      watchlistItems.map((item) =>
        item.symbol === symbol ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const filteredItems = watchlistItems.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                      {item.symbol}
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
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WatchlistWidget;
