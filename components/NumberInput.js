import React, { useState, useContext, useEffect } from "react";
import styles from "./NumberInput.module.css";
import ACTIONS from "../helpers/ACTIONS.js";
// import { UserColorsContext } from "/utils/UserColorsProvider";
import { ColorsContext } from "/utils/ColorsProvider";

export default function NumberInput({ type, number, dispatch, name }) {
  //   const userColorsContextProvider = useContext(UserColorsContext);
  const colorsContextProvider = useContext(ColorsContext);

  const { colors } = colorsContextProvider;

  const thisColor = colors.find((color) => color.name === name);

  return (
    <div className={styles.container}>
      <h5>{type}</h5>
      <div
        className={styles.roundedRow}
        style={{
          borderColor: `var(--color-${name})`,
        }}
      >
        <button
          style={{
            backgroundColor: `var(--color-${name})`,
          }}
          onClick={() =>
            dispatch({
              type: ACTIONS.DECREMENT,
              payload: { buyOrSell: type },
            })
          }
        >
          -
        </button>

        <span className={styles.number}>{number}</span>
        <button
          style={{
            backgroundColor: `var(--color-${name})`,
          }}
          onClick={() =>
            dispatch({
              type: ACTIONS.INCREMENT,
              payload: { buyOrSell: type, marketColorCount: thisColor.count },
            })
          }
        >
          +
        </button>
      </div>
    </div>
  );
}
