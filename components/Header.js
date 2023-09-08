import React, { useContext } from "react";
import { ColorsContext } from "../utils/ColorsProvider";

export default function Header() {
  const colorsContextProvider = useContext(ColorsContext);
  console.log(colorsContextProvider.colors);

  const { colors, setColors } = colorsContextProvider;
  return (
    <header>
      Header
      {colors
        ? colors.map((color) => (
            <>
              {color.count} {color.name}
            </>
          ))
        : "Loading"}
    </header>
  );
}
