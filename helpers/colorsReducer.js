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
