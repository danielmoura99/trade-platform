// caminho: src/main/index.ts
import { app, BrowserWindow } from "electron";
import path from "path";

// Adicionar electron-reloader para desenvolvimento
if (process.env.NODE_ENV === "development") {
  try {
    // Evitar erro TypeScript com electron-reloader
    const electronReloader = require("electron-reloader");

    // @ts-ignore - Usamos ts-ignore porque o módulo não tem tipos TypeScript
    electronReloader(module, {
      watchRenderer: true,
      ignore: ["node_modules"],
    });

    console.log("Electron Reloader ativado");
  } catch (err) {
    console.log("Erro ao configurar electron-reloader:", err);
  }
}

// Referência global para evitar que a janela seja fechada automaticamente pelo GC
let mainWindow: BrowserWindow | null = null;

// Função para criar a janela principal
const createWindow = (): void => {
  // Cria a janela principal
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#121212",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // Adicionando estas propriedades para abrir maximizado com boa aparência
    show: false, // Não mostrar até estar pronto
    minWidth: 800, // Largura mínima
    minHeight: 600, // Altura mínima
  });

  // Maximizar antes de mostrar
  mainWindow.maximize();

  // Mostrar janela apenas quando estiver pronta
  mainWindow.once("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });

  // Carrega o arquivo HTML principal
  if (process.env.NODE_ENV === "development") {
    // Em desenvolvimento, carrega do servidor de desenvolvimento
    mainWindow.loadURL("http://localhost:9000");
    // Abre as ferramentas de desenvolvedor
    mainWindow.webContents.openDevTools();
  } else {
    // Em produção, carrega do arquivo dist
    mainWindow.loadFile(path.join(__dirname, "renderer.html"));
    console.log(
      "Carregando arquivo HTML:",
      path.join(__dirname, "renderer.html")
    );
  }

  // Manipulação de eventos de fechamento
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// Quando o Electron estiver pronto
app.whenReady().then(createWindow);

// Finalizar quando todas as janelas estiverem fechadas
app.on("window-all-closed", () => {
  // No macOS é comum que aplicações fiquem ativas até o usuário sair explicitamente
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // No macOS é comum recriar uma janela ao clicar no ícone do dock
  if (mainWindow === null) {
    createWindow();
  }
});
