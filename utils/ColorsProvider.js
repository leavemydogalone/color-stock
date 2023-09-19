import React, { createContext, useEffect, useReducer, useState } from "react";
import COLOR_CONTEXT_ACTIONS from "../helpers/COLOR_CONTEXT_ACTIONS";
import colorsReducer from "../helpers/colorsReducer";
import useColorsDispatch from "./useColorsDispatch";

export const ColorsContext = createContext({
  marketColors: [],
  colorsState: {},
  colorsReducerDispatch: () => {},
});

export default function ColorsProvider({ children }) {
  const [colorsState, colorsReducerDispatch] = useReducer(colorsReducer, {
    marketColors: [],
    userColors: [],
  });

  const fetchMarketColors = async () => {
    const response = await fetch("/api/colors", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  const value = {
    colorsState,
    colorsReducerDispatch,
  };

  console.log(colorsState);

  const { getMarketColors } = useColorsDispatch();

  useEffect(() => {
    fetchMarketColors().then((data) => {
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.FETCH_MARKET_COLORS,
        payload: { updatedMarketcolors: data },
      });
    });
    // getMarketColors(colorsReducerDispatch);
    colorsReducerDispatch({ type: COLOR_CONTEXT_ACTIONS.FETCH_USER_COLORS });
  }, [colorsReducerDispatch]);

  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
}
