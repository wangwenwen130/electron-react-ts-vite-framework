declare namespace LocalStore {
  interface StoreKey {
    use_temp_pw: boolean
  }
  interface Store {
    get: <T extends keyof StoreKey>(key: T) => Promise<StoreKey[T]>
    set: <T extends keyof StoreKey>(key: keyof StoreKey, value: StoreKey[T]) => void
    remove: <T extends keyof StoreKey>(key: keyof StoreKey) => void
  }
}

declare module 'localStore' {
  export type Store = LocalStore.Store
}
