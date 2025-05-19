declare namespace LocalStore {
  interface Store {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => void;
    remove: (key: string) => void;
  }
}

declare module 'localStore' {
  export type Store = LocalStore.Store; 
}