import React, { useContext } from "react";
import { UserColorsContext } from "../utils/UserColorsProvider";
import { ColorsContext } from "../utils/ColorsProvider";

import clsx from "clsx";
import styles from "./Footer.module.css";

export default function Footer() {
  const userColorsContextProvider = useContext(UserColorsContext);
  const colorsContextProvider = useContext(ColorsContext);

  const { userColors } = userColorsContextProvider;
  const { updateColors } = colorsContextProvider;

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
                    <button onClick={() => updateColors(color.name, -16)}>
                      Update
                    </button>
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
