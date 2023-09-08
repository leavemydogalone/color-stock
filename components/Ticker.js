import React from "react";
import styles from "./Ticker.module.css";
import clsx from "clsx";

export default function Ticker({ color }) {
  return (
    <article
      className={clsx({ [styles[color.name]]: true, [styles.ticker]: true })}
    >
      {color.count}

      {color.name}
    </article>
  );
}
