import COLOR_CONTEXT_ACTIONS from "../helpers/COLOR_CONTEXT_ACTIONS";

//implement payload here too I guess

const useColorsDispatch = (colorsReducerDispatch, payload) => {
  // const dispatch = useColorsDispatch();
  const getMarketColors = async () => {
    try {
      const response = await fetch("/api/colors", {
        method: "GET",
      });
      const data = await response.json();
      colorsReducerDispatch({
        type: COLOR_CONTEXT_ACTIONS.FETCH_MARKET_COLORS,
        payload: { updatedMarketcolors: data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getMarketColors,
  };
};
export default useColorsDispatch;
