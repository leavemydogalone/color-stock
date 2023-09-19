import React, { useContext } from "react";
import styles from "./Main.module.css";
import ChartContainer from "./ChartContainer";
import { ColorsContext } from "../utils/ColorsProvider";

export default function Main() {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState } = colorsContextProvider;
  const { marketColors } = colorsState;

  return (
    <main className={styles.main}>
      {marketColors ? <ChartContainer /> : "Loading"}
    </main>
  );
}
