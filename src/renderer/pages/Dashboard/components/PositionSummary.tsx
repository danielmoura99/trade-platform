// caminho: src/renderer/pages/Dashboard/components/PositionSummary.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Badge } from "../../../../components/ui/badge";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Button } from "../../../../components/ui/button";

interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  type: "buy" | "sell";
}

const PositionSummary: React.FC = () => {
  // Mock data - na implementação real, viria de um serviço
  const positions: Position[] = [
    {
      symbol: "PETR4",
      quantity: 200,
      avgPrice: 35.4,
      currentPrice: 36.22,
      pnl: 164,
      pnlPercent: 2.32,
      type: "buy",
    },
    {
      symbol: "VALE3",
      quantity: 100,
      avgPrice: 68.3,
      currentPrice: 67.45,
      pnl: -85,
      pnlPercent: -1.24,
      type: "buy",
    },
    {
      symbol: "ITUB4",
      quantity: 300,
      avgPrice: 32.1,
      currentPrice: 32.8,
      pnl: 210,
      pnlPercent: 2.18,
      type: "buy",
    },
  ];

  // Calcular estatísticas
  const totalInvested = positions.reduce(
    (sum, pos) => sum + pos.avgPrice * pos.quantity,
    0
  );

  const totalValue = positions.reduce(
    (sum, pos) => sum + pos.currentPrice * pos.quantity,
    0
  );

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);

  const totalPnLPercent = (totalPnL / totalInvested) * 100;

  return (
    <Card className="h-full bg-surface border-border overflow-hidden">
      <CardHeader className="p-3 border-b border-border flex flex-row items-center justify-between space-y-0">
        <div className="font-bold">Posições Abertas</div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-muted-foreground mr-1">Total:</span>
            <span className="font-medium">
              R${" "}
              {totalValue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="text-sm">
            <span
              className={`font-medium ${
                totalPnL >= 0 ? "text-primary" : "text-danger"
              }`}
            >
              {totalPnL >= 0 ? "+" : ""}R${" "}
              {totalPnL.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              ({totalPnLPercent >= 0 ? "+" : ""}
              {totalPnLPercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[calc(100%-48px)]">
          <Table>
            <TableHeader className="bg-surfaceHover sticky top-0">
              <TableRow>
                <TableHead className="text-left whitespace-nowrap">
                  Ativo
                </TableHead>
                <TableHead className="text-right whitespace-nowrap">
                  Qtd
                </TableHead>
                <TableHead className="text-right whitespace-nowrap">
                  Preço Médio
                </TableHead>
                <TableHead className="text-right whitespace-nowrap">
                  Preço Atual
                </TableHead>
                <TableHead className="text-right whitespace-nowrap">
                  P&L
                </TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => (
                <TableRow
                  key={position.symbol}
                  className="border-b border-border hover:bg-surfaceHover/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {position.pnl >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-primary mr-2" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-danger mr-2" />
                      )}
                      <div>
                        <div className="font-semibold">{position.symbol}</div>
                        <Badge
                          variant="outline"
                          className={`text-xs font-normal ${
                            position.type === "buy"
                              ? "text-primary"
                              : "text-danger"
                          }`}
                        >
                          {position.type === "buy" ? "Compra" : "Venda"}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {position.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {position.avgPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {position.currentPrice.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium whitespace-nowrap ${
                      position.pnl >= 0 ? "text-primary" : "text-danger"
                    }`}
                  >
                    R$ {position.pnl.toFixed(2)}
                    <div className="text-xs">
                      {position.pnlPercent >= 0 ? "+" : ""}
                      {position.pnlPercent.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Encerrar posição</DropdownMenuItem>
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Alterar stop</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {positions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    Nenhuma posição aberta
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionSummary;
