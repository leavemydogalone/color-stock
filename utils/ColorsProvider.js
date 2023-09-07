import React, { createContext } from "react";

const ColorsContext = createContext(null);

export default function ColorsProvider({ children }) {
  return <ColorsContext.Provider>{children}</ColorsContext.Provider>;
}
