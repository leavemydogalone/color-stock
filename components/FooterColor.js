import React, { useReducer, useState } from "react";
import styles from "./FooterColor.module.css";
import clsx from "clsx";
import NumberInput from "./NumberInput";
import ACTIONS from "../helpers/ACTIONS";
import { reducer } from "../helpers/buySellReducer";

export default function FooterColor({ color, index }) {
  const [state, dispatch] = useReducer(reducer, {
    sellNumber: 0,
    buyNumber: 0,
    count: color.count,
  });

  function handleConfirm() {}
  return (
    <article
      key={`userColor.${color.name}`}
      className={clsx({
        [color.name]: true,
        [styles.color]: true,
      })}
    >
      <div className={styles.lefty}>
        {/* <h4 className={styles.name}>{color.name}</h4> */}
        <figure
          className={styles.count}
          style={{
            backgroundColor: `var(--color-${color.name})`,
          }}
        >
          {color.count}
        </figure>
      </div>
      {/* <button onClick={() => updateColors(color.name, -16)}>Update</button> */}
      <div className={styles.righty}>
        <NumberInput
          number={state.buyNumber}
          type={ACTIONS.BUY}
          dispatch={dispatch}
          name={color.name}
        />

        <NumberInput
          number={state.sellNumber}
          type={ACTIONS.SELL}
          dispatch={dispatch}
          name={color.name}
        />

        <button
          className={styles.confirm}
          onClick={handleConfirm}
          style={{
            backgroundColor: `var(--color-${color.name})`,
            color: "white",
          }}
        >
          Confirm
        </button>
      </div>
    </article>
  );
}
