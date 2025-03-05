import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";

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

  // Configurações de cores baseadas no modo escuro/claro
  const chartOptions = {
    width,
    height,
    layout: {
      backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
      textColor: darkMode ? "#D9D9D9" : "#191919",
    },
    grid: {
      vertLines: {
        color: darkMode ? "#2B2B43" : "#E6E6E6",
      },
      horzLines: {
        color: darkMode ? "#2B2B43" : "#E6E6E6",
      },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    timeScale: {
      borderColor: darkMode ? "#545454" : "#C8C8C8",
    },
    rightPriceScale: {
      borderColor: darkMode ? "#545454" : "#C8C8C8",
    },
  };

  // Inicialização do gráfico
  useEffect(() => {
    if (chartContainerRef.current) {
      // Limpa gráfico anterior se existir
      if (chart) {
        chart.remove();
      }

      // Cria novo gráfico
      const newChart = createChart(chartContainerRef.current, chartOptions);

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
          const { clientWidth } = chartContainerRef.current;
          newChart.applyOptions({ width: clientWidth });
        }
      };

      // Adiciona listener de resize
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        newChart.remove();
      };
    }
  }, [darkMode]);

  // Carrega dados de exemplo (em produção, seria da API)
  useEffect(() => {
    if (candleSeries) {
      // Simulação de dados
      setIsLoading(true);

      // Em produção, isso seria substituído por uma chamada real à API
      setTimeout(() => {
        const data: CandleData[] = generateSampleData();
        candleSeries.setData(data);
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
    <div
      className="chart-container"
      style={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
      }}
    >
      <div
        className="chart-header"
        style={{
          padding: "10px",
          fontWeight: "bold",
          color: darkMode ? "#D9D9D9" : "#191919",
          borderBottom: `1px solid ${darkMode ? "#2B2B43" : "#E6E6E6"}`,
        }}
      >
        <h3>
          {symbol} - {interval}
        </h3>
      </div>
      <div ref={chartContainerRef} />
      {isLoading && (
        <div
          className="loading-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: darkMode
              ? "rgba(30, 30, 30, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            color: darkMode ? "#D9D9D9" : "#191919",
          }}
        >
          <span>Carregando dados...</span>
        </div>
      )}
    </div>
  );
};

export default CandlestickChart;
