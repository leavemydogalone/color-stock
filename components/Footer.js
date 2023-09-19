import React, { useContext } from "react";
import { ColorsContext } from "../utils/ColorsProvider";

import styles from "./Footer.module.css";
import FooterColor from "./FooterColor";

export default function Footer() {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState } = colorsContextProvider;
  const { userColors } = colorsState;

  return (
    <footer>
      <section className={styles.container}>
        <h3 className={styles.title}>Your Color Count</h3>
        <div className={styles.colorsContainer}>
          {userColors
            ? userColors.map((color, index) => (
                <>
                  <FooterColor
                    color={color}
                    key={`footerColor${color}`}
                    index={index}
                  />
                </>
              ))
            : "Loading"}
        </div>
      </section>
    </footer>
  );
}
