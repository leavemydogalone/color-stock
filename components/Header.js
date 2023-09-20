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
      <section className={styles.slider}>
        {marketColors ? (
          <div className={styles.slideTrack}>
            {marketColors.map((color) => (
              <Ticker
                className={styles.slide}
                color={color}
                key={`${color.name} ticker 1`}
              />
            ))}
            {marketColors.map((color) => (
              <Ticker
                className={styles.slide}
                color={color}
                key={`${color.name} ticker 2`}
              />
            ))}
          </div>
        ) : (
          "Loading"
        )}
      </section>
    </header>
  );
}
