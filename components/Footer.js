import React, { useContext } from "react";
import { UserColorsContext } from "../utils/UserColorsProvider";
import { ColorsContext } from "../utils/ColorsProvider";

import clsx from "clsx";
import styles from "./Footer.module.css";
import FooterColor from "./FooterColor";

export default function Footer() {
  const userColorsContextProvider = useContext(UserColorsContext);
  const colorsContextProvider = useContext(ColorsContext);

  const { userColors } = userColorsContextProvider;
  const { updateColors } = colorsContextProvider;

  function handleClick() {
    try {
      //try the update colors
      // and then the update userColors
    } catch (error) {}
  }
  return (
    <footer>
      <section className={styles.container}>
        <h3 className={styles.title}>Your Color Count</h3>
        <div className={styles.colorsContainer}>
          {userColors
            ? userColors.map((color, index) => (
                <>
                  <FooterColor color={color} index={index} />
                </>
              ))
            : "Loading"}
        </div>
      </section>
    </footer>
  );
}
