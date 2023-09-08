import React, { useContext } from "react";
import Ticker from "./Ticker";
import { ColorsContext } from "../utils/ColorsProvider";
import styles from "./Header.module.css";

export default function Header() {
  const colorsContextProvider = useContext(ColorsContext);
  console.log(colorsContextProvider.colors);

  const { colors } = colorsContextProvider;

  return (
    <header>
      <section className={styles.scroller}>
        {colors
          ? colors.map((color) => <Ticker color={color} key={color.name} />)
          : "Loading"}
      </section>
    </header>
  );
}
