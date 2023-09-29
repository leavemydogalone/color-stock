import React, { useContext, useState } from "react";
import styles from "./Main.module.css";
import ChartContainer from "./ChartContainer";
import { ColorsContext } from "../utils/ColorsProvider";
import PopUp from "./PopUp";

export default function Main() {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState } = colorsContextProvider;
  const { marketColors } = colorsState;
  const [popUpVisible, setPopUpVisible] = useState(true);

  return (
    <main className={styles.main}>
      {marketColors ? <ChartContainer /> : "Loading"}
      <PopUp popUpVisible={popUpVisible} setPopUpVisible={setPopUpVisible} />
      <button className={styles.button} onClick={() => setPopUpVisible(true)}>
        Show Instructions
      </button>
    </main>
  );
}
