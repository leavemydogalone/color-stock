import React, { createContext, useEffect, useState } from "react";

export const ColorsContext = createContext({
  colors: [],
  setColors: () => {},
});

export default function ColorsProvider({ children }) {
  const [colors, setColors] = useState([]);
  const value = { colors, setColors };

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

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
}
