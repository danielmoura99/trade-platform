import { app, BrowserWindow } from "electron";
import path from "path";

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
