import React, { useContext, useEffect } from "react";
import { UserColorsContext } from "../utils/UserColorsProvider";
import clsx from "clsx";
import styles from "./Footer.module.css";

export default function Footer() {
  const userColorsContextProvider = useContext(UserColorsContext);

  const { userColors } = userColorsContextProvider;

  return (
    <footer>
      <section className={styles.container}>
        <h3 className={styles.title}>Your Color Count</h3>
        <div className={styles.colorsContainer}>
          {userColors
            ? userColors.map((color, index) => (
                <>
                  <div
                    key={`userColor.${color.name}`}
                    className={clsx({
                      [color.name]: true,
                      [styles.color]: true,
                    })}
                  >
                    <h4 className={styles.name}>{color.name}</h4>
                    <figure className={styles.count}>{color.count}</figure>
                  </div>
                  {index < 4 && <hr className={styles.hr} />}
                </>
              ))
            : "Loading"}
        </div>
      </section>
    </footer>
  );
}
