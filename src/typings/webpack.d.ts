// caminho: src/typings/webpack.d.ts

// Declaração de tipos para o Hot Module Replacement do webpack
interface WebpackHotModule {
  hot?: {
    accept(
      dependencies: string | string[],
      callback?: (updatedDependencies: any[]) => void
    ): void;
    accept(errHandler?: (err: Error) => void): void;
    decline(dependencies: string | string[]): void;
    decline(): void;
    dispose(callback: (data: any) => void): void;
    addDisposeHandler(callback: (data: any) => void): void;
    removeDisposeHandler(callback: (data: any) => void): void;
    status(): string;
    addStatusHandler(callback: (status: string) => void): void;
    removeStatusHandler(callback: (status: string) => void): void;
  };
}

// Estender o objeto module para incluir a propriedade hot
declare const module: WebpackHotModule & NodeModule;
