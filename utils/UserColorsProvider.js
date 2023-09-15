import React, { createContext, useEffect, useState } from "react";

export const UserColorsContext = createContext({
  userColors: [],
  setUserColors: () => {},
  updateUserColors: () => {},
});

export default function UserColorsProvider({ children }) {
  const [userColors, setUserColors] = useState([]);
  const value = { userColors, setUserColors, updateUserColors };

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

  function updateUserColors(colorStr, adjustment) {
    //maybe the bad set state is in here
    setUserColors((prevColors) =>
      prevColors.map((color) => {
        console.log(color.name + "  " + colorStr);
        if (color.name === colorStr) {
          let adjusted = color.count + adjustment;
          return { ...color, count: adjusted };
        } else {
          return color;
        }
      })
    );
    console.log(userColors);
  }

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
