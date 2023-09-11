import React, { useContext, useEffect } from "react";
import { UserColorsContext } from "../utils/UserColorsProvider";
import clsx from "clsx";
import styles from "./Footer.module.css";

export default function Footer() {
  const userColorsContextProvider = useContext(UserColorsContext);
  // console.log(userColorsContextProvider.userColors[0][name]);

  const { userColors } = userColorsContextProvider;

  useEffect(() => {
    console.log(userColors);
  }, [userColors]);

  return (
    <footer>
      {userColors
        ? userColors.map((color) => (
            <div
              className={clsx({
                [color.name]: true,
                [styles.ticker]: true,
              })}
            >
              {color.name}
              {color.count}{" "}
            </div>
          ))
        : "Loading"}
    </footer>
  );
}
