import COLOR_CONTEXT_ACTIONS from "./COLOR_CONTEXT_ACTIONS";

export default function colorsReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case COLOR_CONTEXT_ACTIONS.FETCH_MARKET_COLORS:
      return {
        ...state,
        marketColors: payload.updatedMarketcolors,
      };
      break;
    case COLOR_CONTEXT_ACTIONS.FETCH_USER_COLORS:
      console.log(payload);
      // const fetchUserColors = () => {
      //   if (!localStorage.getItem("userColors")) {
      //     localStorage.setItem(
      //       "userColors",
      //       JSON.stringify([
      //         { name: "red", count: 5 },
      //         { name: "blue", count: 5 },
      //         { name: "black", count: 5 },
      //         { name: "green", count: 5 },
      //         { name: "purple", count: 5 },
      //       ])
      //     );
      //   }
      //   return JSON.parse(localStorage.getItem("userColors"));
      // };

      return {
        ...state,
        userColors: payload.userColors,
      };
      break;
    case COLOR_CONTEXT_ACTIONS.HANDLE_SELL:
      console.log(payload);
      return {
        marketColors: payload.updatedMarketColors,
        userColors: state.userColors.map((color) =>
          color.name === payload.colorName
            ? { ...color, count: color.count - payload.adjustment }
            : color
        ),
      };

    case ACTIONS.BUY:
      payload.updateColors(payload.colorName, -state.buyNumber);
      payload.updateUserColors(payload.colorName, state.buyNumber);
      return { ...state, buyNumber: 0 };
      break;
    case ACTIONS.NONE:
      return { ...state };
    default:
      return { ...state };
      break;
  }
}
