import { createContext } from "react";

export const PasienContext = createContext({
  activePasien: "",
  setActivePasien: () => {}
})