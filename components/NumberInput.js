import React, { useContext } from "react";
import styles from "./NumberInput.module.css";
import ACTIONS from "../helpers/ACTIONS.js";

import { ColorsContext } from "/utils/ColorsProvider";

export default function NumberInput({ type, number, dispatch, name }) {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState } = colorsContextProvider;
  const { marketColors } = colorsState;

  const thisColor = marketColors.find((color) => color.name === name);

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
