// caminho: src/renderer/components/Chart/CandlestickChart.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  LineStyle,
} from "lightweight-charts";
import { Card, CardHeader, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Loader2 } from "lucide-react";

interface ChartComponentProps {
  symbol: string;
  interval: string;
  height?: number;
  width?: number;
  darkMode?: boolean;
}

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

const CandlestickChart: React.FC<ChartComponentProps> = ({
  symbol,
  interval,
  height = 500,
  width = 800,
  darkMode = true,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [candleSeries, setCandleSeries] =
    useState<ISeriesApi<"Candlestick"> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [priceInfo, setPriceInfo] = useState<{
    last: number;
    open: number;
    high: number;
    low: number;
    change: number;
  }>({
    last: 0,
    open: 0,
    high: 0,
    low: 0,
    change: 0,
  });

  // Inicialização do gráfico
  useEffect(() => {
    if (chartContainerRef.current) {
      // Limpa gráfico anterior se existir
      if (chart) {
        chart.remove();
      }

      // Cria novo gráfico com opções corretamente tipadas
      const newChart = createChart(chartContainerRef.current, {
        width,
        height,
        layout: {
          backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
          textColor: darkMode ? "#D9D9D9" : "#191919",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        },
        grid: {
          vertLines: {
            color: darkMode ? "#2B2B43" : "#E6E6E6",
            style: LineStyle.Solid,
            visible: true,
          },
          horzLines: {
            color: darkMode ? "#2B2B43" : "#E6E6E6",
            style: LineStyle.Solid,
            visible: true,
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          // Simplificando as propriedades de crosshair para evitar problemas de tipo
          vertLine: {
            color: darkMode ? "#6A6A6A" : "#9B9B9B",
            style: LineStyle.Solid,
            labelBackgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF",
          },
          horzLine: {
            color: darkMode ? "#6A6A6A" : "#9B9B9B",
            style: LineStyle.Solid,
            labelBackgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF",
          },
        },
        timeScale: {
          borderColor: darkMode ? "#545454" : "#C8C8C8",
          timeVisible: true,
          secondsVisible: false,
        },
        rightPriceScale: {
          borderColor: darkMode ? "#545454" : "#C8C8C8",
          scaleMargins: {
            top: 0.1,
            bottom: 0.2,
          },
        },
        handleScroll: true,
        handleScale: true,
      });

      // Adiciona série de candles
      const newCandleSeries = newChart.addCandlestickSeries({
        upColor: "#26A69A",
        downColor: "#EF5350",
        borderVisible: false,
        wickUpColor: "#26A69A",
        wickDownColor: "#EF5350",
      });

      setChart(newChart);
      setCandleSeries(newCandleSeries);

      // Função para lidar com redimensionamento
      const handleResize = () => {
        if (chartContainerRef.current) {
          const { clientWidth, clientHeight } = chartContainerRef.current;
          newChart.applyOptions({
            width: clientWidth,
            height: clientHeight - 20, // Compensar pelo padding
          });
        }
      };

      // Adiciona listener de resize
      window.addEventListener("resize", handleResize);
      handleResize(); // Aplica tamanho inicial

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        newChart.remove();
      };
    }
  }, [darkMode, height, width]);

  // Carrega dados de exemplo (em produção, seria da API)
  useEffect(() => {
    if (candleSeries) {
      // Simulação de dados
      setIsLoading(true);

      // Em produção, isso seria substituído por uma chamada real à API
      setTimeout(() => {
        const data: CandleData[] = generateSampleData();
        candleSeries.setData(data);

        // Atualizar informações de preço
        if (data.length > 0) {
          const lastCandle = data[data.length - 1];
          const firstCandle = data[0];
          const highestPrice = Math.max(...data.map((d) => d.high));
          const lowestPrice = Math.min(...data.map((d) => d.low));
          const priceChange =
            ((lastCandle.close - firstCandle.open) / firstCandle.open) * 100;

          setPriceInfo({
            last: lastCandle.close,
            open: firstCandle.open,
            high: highestPrice,
            low: lowestPrice,
            change: priceChange,
          });
        }

        setIsLoading(false);
      }, 500);
    }
  }, [candleSeries, symbol, interval]);

  // Função para gerar dados de amostra
  const generateSampleData = (): CandleData[] => {
    const data: CandleData[] = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let basePrice = 100;
    const volatility = 2;

    for (let i = 0; i < 100; i++) {
      const time = new Date(now);
      time.setDate(time.getDate() - (100 - i));

      const open = basePrice + (Math.random() - 0.5) * volatility;
      const high = open + Math.random() * volatility;
      const low = open - Math.random() * volatility;
      const close =
        (open + high + low) / 3 + (Math.random() - 0.5) * volatility;

      data.push({
        // Formato de data compatível com a versão 3.8.0
        time: time.toISOString().split("T")[0],
        open,
        high,
        low,
        close,
        volume: Math.round(Math.random() * 10000),
      });

      basePrice = close;
    }

    return data;
  };

  return (
    <Card className="h-full bg-surface border-border overflow-hidden">
      <CardHeader className="p-3 border-b border-border flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold">{symbol}</h3>
          <Badge variant="outline" className="text-xs font-normal">
            {interval}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm">
            <span className="text-muted-foreground mr-1">Último:</span>
            <span className="font-semibold">{priceInfo.last.toFixed(2)}</span>
          </div>

          <div className="text-sm">
            <span
              className={`font-semibold ${
                priceInfo.change >= 0 ? "text-primary" : "text-danger"
              }`}
            >
              {priceInfo.change >= 0 ? "+" : ""}
              {priceInfo.change.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 relative h-[calc(100%-48px)]">
        <div className="w-full h-full" ref={chartContainerRef} />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
              <span>Carregando dados...</span>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 text-xs bg-surface/80 backdrop-blur-sm p-2 rounded border border-border">
          <div className="grid grid-cols-2 gap-x-3">
            <span className="text-muted-foreground">Abertura:</span>
            <span className="font-medium">{priceInfo.open.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <span className="text-muted-foreground">Máxima:</span>
            <span className="font-medium text-primary">
              {priceInfo.high.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <span className="text-muted-foreground">Mínima:</span>
            <span className="font-medium text-danger">
              {priceInfo.low.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <span className="text-muted-foreground">Último:</span>
            <span className="font-medium">{priceInfo.last.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandlestickChart;
