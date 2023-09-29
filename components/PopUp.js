import React from "react";
import styles from "./PopUp.module.css";
import { useState } from "react";

export default function PopUp({ popUpVisible, setPopUpVisible }) {
  let display = popUpVisible ? "flex" : "none";
  return (
    <div style={{ display: display }} className={styles.popUp}>
      <div
        className={styles.background}
        onClick={() => setPopUpVisible(false)}
      ></div>
      <section className={styles.popUpMain}>
        <div className={styles.title}>
          Instructions{" "}
          <span className={styles.x} onClick={() => setPopUpVisible(false)}>
            X
          </span>
        </div>
        <p className={styles.subtitle}>
          Welcome to the wonderful world of color trading!
        </p>
        <p className={styles.text}>
          Along the top of the screen you can see the increase and decrease in
          the market count of each color since yesterday. Trades happen daily
          with the help of our handy automated trading helper that buys and
          sells colors every day around 4pm PST.
        </p>
        <p className={styles.text}>
          In the center of the screen, you can see the current market count of
          each color. This market is the same for every one who everyone who
          visits, and so any action you take will affect the market for everyone
          else.
        </p>
        <p className={styles.text}>
          At the bottom, you can see your wallet of colors. You have been gifted
          30 of each color. Using the buy and sell sections for each color, you
          can buy and sell the colors from and to the market in real time.
        </p>
      </section>
    </div>
  );
}
