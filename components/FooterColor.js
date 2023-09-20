import React, { useReducer, useContext } from "react";
import styles from "./FooterColor.module.css";
import clsx from "clsx";
import NumberInput from "./NumberInput";
import ACTIONS from "../helpers/ACTIONS";
import COLOR_CONTEXT_ACTIONS from "../helpers/COLOR_CONTEXT_ACTIONS";
import { reducer } from "../helpers/incrementDecrementReducer";
import { ColorsContext } from "../utils/ColorsProvider";
import { ACTION } from "next/dist/client/components/app-router-headers";

export default function FooterColor({ color, index }) {
  const colorsContextProvider = useContext(ColorsContext);

  const { handleSell, handleBuy } = colorsContextProvider;

  const initState = () => {
    return { sellNumber: 0, buyNumber: 0 };
  };
  ///I think the error is coming from a bad set state of the color count in here somewhere
  const [state, dispatch] = useReducer(reducer, initState());

  function sell() {
    handleSell(color.name, state.sellNumber);
    dispatch({ type: ACTIONS.ZERO });
  }
  function buy() {
    handleBuy(color.name, state.buyNumber);
    dispatch({ type: ACTIONS.ZERO });
  }
  function handleSubmit() {
    state.buyNumber > 0 ? buy() : state.sellNumber > 0 ? sell() : ACTIONS.NONE;
  }

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

      <div className={styles.righty}>
        <NumberInput
          number={state.buyNumber}
          type={ACTIONS.BUY}
          dispatch={dispatch}
          color={color}
          key={`colorInputOne ${color.name} `}
        />

        <NumberInput
          number={state.sellNumber}
          type={ACTIONS.SELL}
          dispatch={dispatch}
          color={color}
          key={`colorInputTwo ${color.name} `}
        />

        <button
          className={styles.confirm}
          onClick={() => handleSubmit()}
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
