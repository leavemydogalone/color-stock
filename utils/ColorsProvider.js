import React, { createContext, useEffect, useReducer, useState } from "react";
import COLOR_CONTEXT_ACTIONS from "../helpers/COLOR_CONTEXT_ACTIONS";
import colorsReducer from "../helpers/colorsReducer";

export const ColorsContext = createContext({
  colorsState: {},
  colorsReducerDispatch: () => {},
  handleSell: () => {},
  handleBuy: () => {},
});

export default function ColorsProvider({ children }) {
  const [colorsState, colorsReducerDispatch] = useReducer(colorsReducer, {
    marketColors: [],
    userColors: [],
    historyColors: [],
  });

  function fetchUserColors() {
    if (!localStorage.getItem("userColors")) {
      localStorage.setItem(
        "userColors",
        JSON.stringify([
          { name: "red", count: 30 },
          { name: "blue", count: 30 },
          { name: "black", count: 30 },
          { name: "green", count: 30 },
          { name: "purple", count: 30 },
        ])
      );
      console.log("updating");
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

  const fetchHistory = async () => {
    const response = await fetch("/api/history/get", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const buyColor = async (payload) => {
    const { colorName, adjustment } = payload;
    try {
      const response = await fetch(`/api/${colorName}/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adjustment: adjustment, type: "buy" }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  function handleBuy(colorName, adjustment) {
    const userColors = JSON.parse(localStorage.getItem("userColors"));
    const updatedUserColors = userColors.map((color) =>
      color.name === colorName
        ? { ...color, count: color.count + adjustment }
        : color
    );
    localStorage.setItem("userColors", JSON.stringify(updatedUserColors));
    buyColor({ colorName: colorName, adjustment: adjustment }).then((data) => {
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.HANDLE_SELL,
        payload: {
          updatedMarketColors: data,
          updatedUserColors: updatedUserColors,
          colorName: colorName,
          adjustment: adjustment,
        },
      });
    });
  }

  const sellColor = async (payload) => {
    const { colorName, adjustment, type } = payload;
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
    const userColors = JSON.parse(localStorage.getItem("userColors"));
    const updatedUserColors = userColors.map((color) =>
      color.name === colorName
        ? { ...color, count: color.count - adjustment }
        : color
    );
    localStorage.setItem("userColors", JSON.stringify(updatedUserColors));
    sellColor({ colorName: colorName, adjustment: adjustment }).then((data) => {
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.HANDLE_SELL,
        payload: {
          updatedMarketColors: data,
          updatedUserColors: updatedUserColors,
          colorName: colorName,
          adjustment: adjustment,
        },
      });
    });
  }
  console.log(colorsState);

  useEffect(() => {
    fetchMarketColors().then((data) => {
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.FETCH_MARKET_COLORS,
        payload: { updatedMarketcolors: data },
      });
    });

    fetchHistory().then((data) => {
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.FETCH_HISTORY_COLORS,
        payload: { historyColors: data },
      });
    });

    colorsReducerDispatch({
      type: COLOR_CONTEXT_ACTIONS.FETCH_USER_COLORS,
      payload: { userColors: fetchUserColors() },
    });
  }, []);

  const value = {
    colorsState,
    colorsReducerDispatch,
    handleSell,
    handleBuy,
  };

  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
}
