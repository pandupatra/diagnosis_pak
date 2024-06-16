import { createContext, useEffect, useState } from "react";

import Store from "./Store";

let _store;

export function getStoreInstance(initialData) {

  if (!_store) {
    _store = new Store();
  }

  return _store;
}

export const StoreContext = createContext();

export function InjectStoreContext({ children, initialData }) {
  const [store, setStore] = useState();

  useEffect(() => {
    const newStore = getStoreInstance(initialData);
    setStore(newStore);
  }, [initialData]);

  useEffect(() => {
    window.__store = store;
  }, [store]);

  return store ? (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  ) : null;
}