import React, { useContext } from "react";
import styles from "./Ticker.module.css";
import clsx from "clsx";
import { ColorsContext } from "../utils/ColorsProvider";

export default function Ticker({ color, className }) {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState } = colorsContextProvider;
  const { historyColors } = colorsState;

  let direction = "up";

  if (historyColors[0]) {
    const yesterdaysColors = historyColors[1]
      ? historyColors[1].colors
      : historyColors[0].colors;

    const matchingColor = yesterdaysColors.find(
      (historyColor) => historyColor.name === color.name
    );

    direction = color.count >= matchingColor.count ? "up" : "down";
  }

  return (
    <article
      className={clsx({
        [styles[color.name]]: true,
        [styles.ticker]: true,
        [className]: true,
      })}
    >
      {color.count}
      <span className={styles.arrow}>
        {direction === "up" ? <>➚</> : <>➘</>}
      </span>
      {/* {color.name} */}
    </article>
  );
}
