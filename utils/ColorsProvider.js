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

  const updateColors = async () => {
    const response = await fetch("/api/colors/update/red", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });
  };

  const value = { colors, setColors, updateColors };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
}
