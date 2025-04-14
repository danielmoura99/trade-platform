// caminho: src/renderer/components/Trading/OrderForm.tsx
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Slider } from "../../../components/ui/slider";
import { ArrowDownUp, Wallet, DollarSign, BarChart3 } from "lucide-react";

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

  // Dados mockados para exibição
  const accountBalance = 10000;
  const buyingPower = 25000;
  const lastPrice = 36.22;

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

  // Calcular o percentual do saldo que seria usado na ordem
  const totalPercentage = Math.min(
    100,
    (calculateTotal() / accountBalance) * 100
  );

  return (
    <Card className="bg-surface border-border shadow-md h-full">
      <CardHeader className="pb-2 border-b border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center">
            <ArrowDownUp className="mr-2 h-5 w-5" />
            Nova Ordem
          </h3>
          <span className="text-lg font-bold">{symbol}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Wallet className="h-4 w-4 mr-1" />
            <span>Saldo: R$ {accountBalance.toLocaleString("pt-BR")}</span>
          </div>
          <div className="flex items-center justify-end">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>Último: R$ {lastPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs
            value={orderType}
            onValueChange={(value) => setOrderType(value as OrderType)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full h-10">
              <TabsTrigger
                value="buy"
                className={`data-[state=active]:shadow-sm text-white ${
                  orderType === "buy"
                    ? "bg-primary hover:bg-primary/90 data-[state=active]:bg-primary"
                    : "bg-surface hover:bg-surfaceHover"
                }`}
              >
                Compra
              </TabsTrigger>
              <TabsTrigger
                value="sell"
                className={`data-[state=active]:shadow-sm text-white ${
                  orderType === "sell"
                    ? "bg-danger hover:bg-danger/90 data-[state=active]:bg-danger"
                    : "bg-surface hover:bg-surfaceHover"
                }`}
              >
                Venda
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            value={orderMode}
            onValueChange={(value) => setOrderMode(value as OrderMode)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full h-9">
              <TabsTrigger value="market">Mercado</TabsTrigger>
              <TabsTrigger value="limit">Limite</TabsTrigger>
            </TabsList>
          </Tabs>

          {orderMode === "limit" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="price" className="text-sm">
                  Preço:
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1 text-xs hover:bg-surfaceHover"
                    onClick={() => setPrice((Number(price) - 0.1).toFixed(2))}
                  >
                    -0.10
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1 text-xs hover:bg-surfaceHover"
                    onClick={() => setPrice((Number(price) + 0.1).toFixed(2))}
                  >
                    +0.10
                  </Button>
                </div>
              </div>
              <Input
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-surfaceHover border-border font-medium"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm">
              Quantidade:
            </Label>
            <Input
              id="quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-surfaceHover border-border font-medium"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span className="font-bold">
                R${" "}
                {calculateTotal().toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="w-full bg-surfaceHover h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  orderType === "buy" ? "bg-primary" : "bg-danger"
                }`}
                style={{ width: `${totalPercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>{totalPercentage.toFixed(0)}% do saldo</span>
              <span>100%</span>
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full font-bold ${
              orderType === "buy"
                ? "bg-primary hover:bg-primary/90"
                : "bg-danger hover:bg-danger/90"
            }`}
          >
            {orderType === "buy" ? "Comprar" : "Vender"} {symbol}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
