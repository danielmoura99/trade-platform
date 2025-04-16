// src/lib/env.ts
import dotenv from "dotenv";
import path from "path";

// Para desenvolvimento, determinamos manualmente
const isDev = process.env.NODE_ENV === "development";

// Carregar variáveis de ambiente do arquivo .env
try {
  dotenv.config({
    path: isDev
      ? path.resolve(process.cwd(), ".env")
      : path.resolve(process.cwd(), ".env"), // Em produção, ajuste conforme necessário
  });
} catch (error) {
  console.error("Erro ao carregar variáveis de ambiente:", error);
}

// Exportar variáveis de ambiente tipadas
export const env = {
  ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "production",
  isDev,
};

console.log("Ambiente carregado:", env.NODE_ENV);
