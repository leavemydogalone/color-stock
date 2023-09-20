import React from "react";
import styles from "./Ticker.module.css";
import clsx from "clsx";

export default function Ticker({ color, className }) {
  return (
    <article
      className={clsx({
        [styles[color.name]]: true,
        [styles.ticker]: true,
        [className]: true,
      })}
    >
      {color.count}

      {color.name}
    </article>
  );
}
