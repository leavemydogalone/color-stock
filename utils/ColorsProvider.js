import React, { createContext, useEffect, useState } from "react";

export const ColorsContext = createContext({
  colors: [],
  setColors: () => {},
  updateColors: () => {},
});

export default function ColorsProvider({ children }) {
  const [colors, setColors] = useState([]);

  const fetchColors = async () => {
    const response = await fetch("/api/colors", {
      method: "GET",
    });
    const data = await response.json();
    setColors(data);
  };

  const updateColors = async (colorStr, adjustment) => {
    const response = await fetch(`/api/${colorStr}/update/`, {
      method: "POST",
      body: JSON.stringify({ count: adjustment }),
    });
    const newColors = await response.json();
    setColors(newColors);
  };

  const value = { colors, setColors, updateColors };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
}
