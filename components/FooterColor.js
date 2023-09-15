import React, { useReducer, useContext } from "react";
import styles from "./FooterColor.module.css";
import clsx from "clsx";
import NumberInput from "./NumberInput";
import ACTIONS from "../helpers/ACTIONS";
import { reducer } from "../helpers/buySellReducer";
import { ColorsContext } from "utils/ColorsProvider";
import { UserColorsContext } from "utils/UserColorsProvider";

export default function FooterColor({ color, index }) {
  let initCount = color.count;
  const initState = () => {
    return { sellNumber: 0, buyNumber: 0, count: initCount };
  };

  ///I think the error is coming from a bad set state of the color count in here somewhere
  const [state, dispatch] = useReducer(reducer, initState());

  const colorsContextProvider = useContext(ColorsContext);
  const userColorsContextProvider = useContext(UserColorsContext);

  const { updateColors } = colorsContextProvider;
  const { updateUserColors } = userColorsContextProvider;

  const confirmButtonAction =
    state.buyNumber > 0
      ? ACTIONS.BUY
      : state.sellNumber > 0
      ? ACTIONS.SELL
      : ACTIONS.NONE;

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
          onClick={() =>
            dispatch({
              type: confirmButtonAction,
              payload: {
                colorName: color.name,
                updateColors: updateColors,
                updateUserColors: updateUserColors,
              },
            })
          }
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
