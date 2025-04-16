// caminho: src/renderer/hmr.ts
// Este arquivo é apenas para configurar o Hot Module Replacement no modo de desenvolvimento

// Verificação segura de tipo para module.hot
if (module.hot) {
  module.hot.accept();

  // Log quando ocorrerem atualizações
  module.hot.addStatusHandler((status: any) => {
    if (status === "prepare") console.log("Hot reload: preparando atualização");
    if (status === "ready") {
      console.log("Hot reload: aplicando atualização");

      // Forçar um refresh da página se necessário
      // Descomente a linha abaixo se preferir atualizar a página completamente em vez de usar HMR
      // window.location.reload();
    }
    if (status === "idle") console.log("Hot reload: aguardando mudanças");
    if (status === "fail") console.log("Hot reload: falha na atualização");
  });
}
