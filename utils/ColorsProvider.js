import React, { createContext, useEffect, useReducer, useState } from "react";
import COLOR_CONTEXT_ACTIONS from "../helpers/COLOR_CONTEXT_ACTIONS";
import colorsReducer from "../helpers/colorsReducer";

export const ColorsContext = createContext({
  marketColors: [],
  colorsState: {},
  colorsReducerDispatch: () => {},
  handleSell: () => {},
});

export default function ColorsProvider({ children }) {
  const [colorsState, colorsReducerDispatch] = useReducer(colorsReducer, {
    marketColors: [],
    userColors: [],
  });

  function fetchUserColors() {
    if (!localStorage.getItem("userColors")) {
      localStorage.setItem(
        "userColors",
        JSON.stringify([
          { name: "red", count: 5 },
          { name: "blue", count: 5 },
          { name: "black", count: 5 },
          { name: "green", count: 5 },
          { name: "purple", count: 5 },
        ])
      );
    }
    return JSON.parse(localStorage.getItem("userColors"));
  }

  const fetchMarketColors = async () => {
    const response = await fetch("/api/colors", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  const sellColor = async (payload) => {
    const { colorName, adjustment } = payload;
    try {
      const response = await fetch(`/api/${colorName}/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adjustment: adjustment, type: "sell" }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  function handleSell(colorName, adjustment) {
    sellColor({ colorName: colorName, adjustment: adjustment }).then((data) => {
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.HANDLE_SELL,
        payload: {
          updatedMarketColors: data,
          colorName: colorName,
          adjustment: adjustment,
        },
      });
    });
  }

  const value = {
    colorsState,
    colorsReducerDispatch,
  };

  console.log(colorsState);

  useEffect(() => {
    fetchMarketColors().then((data) => {
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.FETCH_MARKET_COLORS,
        payload: { updatedMarketcolors: data },
      });
    });

    colorsReducerDispatch({
      type: COLOR_CONTEXT_ACTIONS.FETCH_USER_COLORS,
      payload: { userColors: fetchUserColors() },
    });

    // colorsReducerDispatch({ type: COLOR_CONTEXT_ACTIONS.FETCH_USER_COLORS });
  }, []);

  return (
    <ColorsContext.Provider value={value}>
      <button onClick={() => handleSell("red", 5)}>button</button>
      {children}
    </ColorsContext.Provider>
  );
}
