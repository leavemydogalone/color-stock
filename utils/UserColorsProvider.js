import React, { createContext, useEffect, useState } from "react";

export const UserColorsContext = createContext({
  userColors: [],
  setUserColors: () => {},
});

export default function UserColorsProvider({ children }) {
  const [userColors, setUserColors] = useState([]);
  const value = { userColors, setUserColors };

  const fetchUserColors = async () => {
    if (!localStorage.getItem("userColors")) {
      localStorage.setItem(
        "userColors",
        JSON.stringify([
          { name: "red", count: 5 },
          { name: "blue", count: 5 },
          { name: "black", count: 5 },
          { name: "green", count: 5 },
          { name: "purple", count: 5 },
        ])
      );
    }
    const colors = JSON.parse(localStorage.getItem("userColors"));
    setUserColors(colors);
  };

  useEffect(() => {
    fetchUserColors();

    return () => {
      localStorage.setItem("newUser", false);
    };
  }, []);

  return (
    <UserColorsContext.Provider value={value}>
      {children}
    </UserColorsContext.Provider>
  );
}
