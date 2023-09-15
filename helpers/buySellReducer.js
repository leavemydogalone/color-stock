import ACTIONS from "./ACTIONS";

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INCREMENT:
      if (payload.buyOrSell === "sell") {
        if (state.sellNumber >= state.count) {
          return { ...state };
        } else {
          return {
            ...state,
            buyNumber: 0,
            sellNumber: state.sellNumber + 1,
          };
        }
      } else if (payload.buyOrSell === "buy") {
        if (
          payload.marketColorCount - (state.buyNumber + state.count) <=
          -100
        ) {
          return { ...state };
        } else {
          return { ...state, sellNumber: 0, buyNumber: state.buyNumber + 1 };
        }
      }
      break;
    case ACTIONS.DECREMENT:
      if (payload.buyOrSell === "sell") {
        if (state.sellNumber <= 0) {
          return { ...state, sellNumber: 0 };
        } else {
          return { ...state, sellNumber: state.sellNumber - 1 };
        }
      } else if (payload.buyOrSell === "buy") {
        if (state.buyNumber <= 0) {
          return { ...state, buyNumber: 0 };
        } else {
          return { ...state, buyNumber: state.buyNumber - 1 };
        }
      }
      break;

    //I should just move the two contexts together and then move these functions to the reducer for it
    case ACTIONS.SELL:
      payload.updateColors(payload.colorName, state.sellNumber);
      payload.updateUserColors(payload.colorName, -Math.abs(state.sellNumber));
      return { ...state, sellNumber: 0 };
      break;
    case ACTIONS.BUY:
      payload.updateColors(payload.colorName, -state.buyNumber);
      payload.updateUserColors(payload.colorName, state.buyNumber);
      return { ...state, buyNumber: 0 };
      break;
    case ACTIONS.NONE:
      return { ...state };
    default:
      break;
  }
}
