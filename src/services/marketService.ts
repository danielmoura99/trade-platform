// src/services/marketService.ts
import axios from "axios";
import { MarketData } from "../stores/marketStore";
import { env } from "@/lib/env";

// Chave API para Alpha Vantage - Substitua pela sua própria chave
const ALPHA_VANTAGE_API_KEY = "VMGKHT008WULQGEW";

// Esta função converte os dados da API em nosso formato
const convertToMarketData = (symbol: string, apiData: any): MarketData => {
  // Adaptar os dados da Alpha Vantage para nosso formato
  if (apiData["Global Quote"]) {
    const quote = apiData["Global Quote"];
    const lastPrice = parseFloat(quote["05. price"]);
    const prevClose = parseFloat(quote["08. previous close"]);
    const change = parseFloat(quote["09. change"]);
    const changePercent = parseFloat(
      quote["10. change percent"].replace("%", "")
    );

    return {
      symbol,
      name: symbol.replace(".SA", ""), // Simplificação - em produção buscaríamos o nome real
      lastPrice,
      change,
      changePercent,
      open: parseFloat(quote["02. open"]),
      high: parseFloat(quote["03. high"]),
      low: parseFloat(quote["04. low"]),
      volume: parseInt(quote["06. volume"]),
      updated: new Date(),
    };
  }

  // Dados mockados para fallback/erro
  return {
    symbol,
    name: symbol.replace(".SA", ""),
    lastPrice: 0,
    change: 0,
    changePercent: 0,
    open: 0,
    high: 0,
    low: 0,
    volume: 0,
    updated: new Date(),
  };
};

class MarketService {
  // Obter dados de um símbolo específico
  async getSymbolData(symbol: string): Promise<MarketData> {
    try {
      // Usar o endpoint Global Quote da Alpha Vantage
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;

      // Se não tivermos uma chave API ainda, usamos dados mockados
      if (ALPHA_VANTAGE_API_KEY === "VMGKHT008WULQGEW") {
        console.log("Usando dados mockados por falta de chave API");
        return this.getMockData(symbol);
      }

      const response = await axios.get(url);
      return convertToMarketData(symbol, response.data);
    } catch (error) {
      console.error(`Erro ao buscar dados para ${symbol}:`, error);
      // Em caso de erro, retornamos dados mockados
      return this.getMockData(symbol);
    }
  }

  // Obter dados mockados (para fallback ou desenvolvimento)
  private getMockData(symbol: string): Promise<MarketData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dados mockados para testar a interface
        const mockData: MarketData = {
          symbol: symbol,
          name:
            symbol === "PETR4.SA"
              ? "Petrobras PN"
              : symbol === "VALE3.SA"
              ? "Vale ON"
              : symbol === "ITUB4.SA"
              ? "Itaú PN"
              : symbol.replace(".SA", ""),
          lastPrice:
            symbol === "PETR4.SA"
              ? 36.22
              : symbol === "VALE3.SA"
              ? 67.45
              : symbol === "ITUB4.SA"
              ? 32.8
              : parseFloat((Math.random() * 100 + 10).toFixed(2)),
          change:
            symbol === "PETR4.SA"
              ? 1.2
              : symbol === "VALE3.SA"
              ? -0.5
              : symbol === "ITUB4.SA"
              ? 0.7
              : parseFloat((Math.random() * 2 - 1).toFixed(2)),
          changePercent:
            symbol === "PETR4.SA"
              ? 2.32
              : symbol === "VALE3.SA"
              ? -1.24
              : symbol === "ITUB4.SA"
              ? 2.18
              : parseFloat((Math.random() * 4 - 2).toFixed(2)),
          open:
            symbol === "PETR4.SA"
              ? 36.5
              : symbol === "VALE3.SA"
              ? 68.2
              : symbol === "ITUB4.SA"
              ? 33.1
              : parseFloat(
                  (
                    parseFloat(
                      symbol === "PETR4.SA"
                        ? "36.22"
                        : symbol === "VALE3.SA"
                        ? "67.45"
                        : symbol === "ITUB4.SA"
                        ? "32.8"
                        : (Math.random() * 100 + 10).toFixed(2)
                    ) * 1.02
                  ).toFixed(2)
                ),
          high:
            symbol === "PETR4.SA"
              ? 36.5
              : symbol === "VALE3.SA"
              ? 68.2
              : symbol === "ITUB4.SA"
              ? 33.1
              : parseFloat(
                  (
                    parseFloat(
                      symbol === "PETR4.SA"
                        ? "36.22"
                        : symbol === "VALE3.SA"
                        ? "67.45"
                        : symbol === "ITUB4.SA"
                        ? "32.8"
                        : (Math.random() * 100 + 10).toFixed(2)
                    ) * 1.02
                  ).toFixed(2)
                ),
          low:
            symbol === "PETR4.SA"
              ? 35.8
              : symbol === "VALE3.SA"
              ? 67.1
              : symbol === "ITUB4.SA"
              ? 32.3
              : parseFloat(
                  (
                    parseFloat(
                      symbol === "PETR4.SA"
                        ? "36.22"
                        : symbol === "VALE3.SA"
                        ? "67.45"
                        : symbol === "ITUB4.SA"
                        ? "32.8"
                        : (Math.random() * 100 + 10).toFixed(2)
                    ) * 0.98
                  ).toFixed(2)
                ),
          volume: Math.floor(Math.random() * 10000000),
          updated: new Date(),
        };

        resolve(mockData);
      }, 800); // Simular atraso de rede
    });
  }

  // Obter dados de vários símbolos
  async getMultipleSymbols(
    symbols: string[]
  ): Promise<Record<string, MarketData>> {
    try {
      const results: Record<string, MarketData> = {};

      // Alpha Vantage tem limite de 5 chamadas por minuto no plano gratuito
      // Então precisamos limitar a quantidade de chamadas paralelas
      const batchSize = 5;
      for (let i = 0; i < symbols.length; i += batchSize) {
        const batch = symbols.slice(i, i + batchSize);

        // Processar um lote de símbolos por vez
        const promises = batch.map((symbol) =>
          this.getSymbolData(symbol)
            .then((data) => {
              results[symbol] = data;
            })
            .catch((error) => {
              console.error(`Erro ao buscar ${symbol}:`, error);
            })
        );

        await Promise.all(promises);

        // Se não for o último lote, aguardar antes do próximo para evitar
        // estouro do limite de taxa (5 por minuto)
        if (i + batchSize < symbols.length) {
          await new Promise((resolve) => setTimeout(resolve, 15000)); // 15 segundos
        }
      }

      return results;
    } catch (error) {
      console.error("Erro ao buscar múltiplos símbolos:", error);
      throw error;
    }
  }

  // Simulação de WebSocket para atualizações em tempo real
  setupWebSocket() {
    console.log("WebSocket setup - simulando atualizações em tempo real");

    return {
      subscribe: (symbol: string, callback: (data: any) => void) => {
        console.log(`Subscribed to ${symbol}`);
        // Mock: atualizar preços aleatoriamente a cada 2 segundos
        const interval = setInterval(async () => {
          try {
            // Buscar dados atuais do símbolo
            const data = await this.getSymbolData(symbol);

            // Gerar pequena variação aleatória
            const priceDelta = Math.random() * 0.2 - 0.1;
            const newPrice = parseFloat(
              (data.lastPrice + priceDelta).toFixed(2)
            );

            // Calcular novos valores
            const change = parseFloat(
              (newPrice - data.lastPrice + data.change).toFixed(2)
            );
            const changePercent = parseFloat(
              (
                (newPrice / data.lastPrice - 1) * 100 +
                data.changePercent
              ).toFixed(2)
            );

            // Preparar objeto de atualização
            const update = {
              symbol,
              lastPrice: newPrice,
              change,
              changePercent,
            };

            // Enviar para o callback
            callback(update);
          } catch (error) {
            console.error(`Erro ao atualizar ${symbol}:`, error);
          }
        }, 2000);

        // Retornar função para cancelar subscription
        return () => clearInterval(interval);
      },
    };
  }
}

export default new MarketService();
