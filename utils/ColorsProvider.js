import React, { createContext, useEffect, useReducer, useState } from "react";
import COLOR_CONTEXT_ACTIONS from "../helpers/COLOR_CONTEXT_ACTIONS";
import colorsReducer from "../helpers/colorsReducer";

export const ColorsContext = createContext({
  marketColors: [],
  setMarketColors: () => {},
  updateMarketColors: () => {},
  colorsState: {},
});

export default function ColorsProvider({ children }) {
  const [marketColors, setMarketColors] = useState([]);

  const [colorsState, dispatch] = useReducer(colorsReducer, {
    marketColors: [],
    userColors: [],
  });

  const fetchMarketColors = async () => {
    const response = await fetch("/api/colors", {
      method: "GET",
    });
    const data = await response.json();
    setMarketColors(data);
    return data;
  };

  // const updateMarketColors = async (colorStr, adjustment) => {
  //   try {
  //     const response = await fetch(`/api/${colorStr}/update/`, {
  //       method: "POST",
  //       body: JSON.stringify({ count: adjustment }),
  //     });
  //     const newColors = await response.json();
  //     setMarketColors(newColors);
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // };

  const value = {
    colorsState,
  };

  console.log(colorsState);

  useEffect(() => {
    fetchMarketColors().then((data) => {
      dispatch({
        type: COLOR_CONTEXT_ACTIONS.FETCH_MARKET_COLORS,
        payload: { updatedMarketcolors: data },
      });
    });
    dispatch({ type: COLOR_CONTEXT_ACTIONS.FETCH_USER_COLORS });
  }, []);

  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
}
