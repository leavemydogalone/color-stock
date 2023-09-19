import React, { useContext } from "react";
import Ticker from "./Ticker";
import { ColorsContext } from "../utils/ColorsProvider";
import styles from "./Header.module.css";

export default function Header() {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState } = colorsContextProvider;
  const { marketColors } = colorsState;

  return (
    <header>
      <section className={styles.scroller}>
        {marketColors
          ? marketColors.map((color) => (
              <Ticker color={color} key={color.name} />
            ))
          : "Loading"}
      </section>
    </header>
  );
}
