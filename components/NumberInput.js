import React, { useContext } from "react";
import styles from "./NumberInput.module.css";
import ACTIONS from "../helpers/ACTIONS.js";

import { ColorsContext } from "/utils/ColorsProvider";

export default function NumberInput({ type, number, dispatch, color }) {
  const colorsContextProvider = useContext(ColorsContext);

  const { colorsState, handleSell } = colorsContextProvider;
  const { marketColors } = colorsState;

  const { name, count } = color;

  const thisColor = marketColors?.find((color) => color.name === name);

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
              payload: { buyOrSell: type, count: count },
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
              payload: {
                buyOrSell: type,
                marketColorCount: thisColor.count,
                count: count,
              },
            })
          }
        >
          +
        </button>
      </div>
    </div>
  );
}
