import React, { useContext } from "react";
import styles from "./Ticker.module.css";
import clsx from "clsx";
import { ColorsContext } from "../utils/ColorsProvider";

export default function Ticker({ color, className }) {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState } = colorsContextProvider;
  const { historyColors } = colorsState;

  let countDisplay = color.count;

  if (historyColors && historyColors[0]) {
    const yesterdaysColors = historyColors[1]
      ? historyColors[1].colors
      : historyColors[0].colors;

    const matchingColor = yesterdaysColors.find(
      (historyColor) => historyColor.name === color.name
    );

    countDisplay = color.count - matchingColor.count;
  }

  return (
    <article
      className={clsx({
        [styles[color.name]]: true,
        [styles.ticker]: true,
        [className]: true,
      })}
    >
      {countDisplay}
      <span className={styles.arrow}>
        {countDisplay >= 0 ? <>➚</> : <>➘</>}
      </span>
      {/* {color.name} */}
    </article>
  );
}
