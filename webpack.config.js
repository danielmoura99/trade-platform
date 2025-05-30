const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Configuração comum para ambos os processos
const commonConfig = {
  mode: process.env.NODE_ENV || "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/main": path.resolve(__dirname, "src/main"),
      "@/renderer": path.resolve(__dirname, "src/renderer"),
      "@/shared": path.resolve(__dirname, "src/shared"),
      "@/styles": path.resolve(__dirname, "src/styles"),
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};

// Configuração para o processo principal
const mainConfig = {
  ...commonConfig,
  target: "electron-main",
  entry: {
    main: "./src/main/index.ts",
  },
};

// Configuração para o processo de renderização
const rendererConfig = {
  ...commonConfig,
  target: "electron-renderer",
  entry: {
    renderer: "./src/renderer/index.tsx",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/renderer/index.html"),
      filename: "renderer.html", // Nome do arquivo de saída
    }),
  ],
  // Configurações para o servidor de desenvolvimento
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true, // Habilitar Hot Module Replacement
    liveReload: true, // Recarregar a página em caso de alterações
    watchFiles: ["src/**/*"], // Arquivos a serem observados para alterações
    compress: true, // Comprimir
    port: 9000, // Porta especificada no seu script npm run dev
    historyApiFallback: true,
  },
};

module.exports = [mainConfig, rendererConfig];
