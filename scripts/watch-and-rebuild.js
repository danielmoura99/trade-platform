// caminho: scripts/watch-and-rebuild.js
const { spawn } = require("child_process");
const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");

console.log("Iniciando watcher para reconstrução...");

// Variáveis para controlar os processos
let electronProcess = null;
let webpackProcess = null;
let debounceTimer = null;
const DEBOUNCE_TIME = 500; // ms

// Função para iniciar o webpack
function startWebpack() {
  console.log("Iniciando webpack...");
  webpackProcess = spawn("npm", ["run", "dev"], {
    stdio: "inherit",
    shell: true,
  });

  webpackProcess.on("error", (error) => {
    console.error("Erro ao iniciar webpack:", error);
  });
}

// Função para iniciar o Electron
function startElectron() {
  if (electronProcess) {
    electronProcess.kill();
    electronProcess = null;
  }

  console.log("Iniciando Electron...");
  electronProcess = spawn("npm", ["run", "electron-dev"], {
    stdio: "inherit",
    shell: true,
  });

  electronProcess.on("error", (error) => {
    console.error("Erro ao iniciar Electron:", error);
  });

  electronProcess.on("close", (code) => {
    console.log(`Electron encerrado com código ${code}`);
  });
}

// Função para reconstruir e reiniciar
function rebuildAndRestart() {
  console.log("Reconstruindo e reiniciando...");

  // Limpar o timer de debounce
  clearTimeout(debounceTimer);

  // Configurar um novo timer de debounce
  debounceTimer = setTimeout(() => {
    // Iniciar Electron (o webpack já está sendo executado)
    startElectron();
  }, DEBOUNCE_TIME);
}

// Iniciar o webpack e o Electron pela primeira vez
startWebpack();
setTimeout(() => {
  startElectron();
}, 3000); // Esperar 3 segundos para o webpack iniciar

// Configurar o watcher
const watcher = chokidar.watch(["src/**/*.{ts,tsx,js,jsx,css,html}"], {
  ignored: /(^|[\/\\])\../, // ignorar arquivos ocultos
  persistent: true,
});

console.log("Observando alterações nos arquivos...");
watcher.on("change", (path) => {
  console.log(`Arquivo alterado: ${path}`);
  rebuildAndRestart();
});

// Limpar ao encerrar
process.on("SIGINT", () => {
  console.log("Encerrando processos...");

  if (webpackProcess) webpackProcess.kill();
  if (electronProcess) electronProcess.kill();

  process.exit();
});
