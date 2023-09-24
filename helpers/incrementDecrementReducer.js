import ACTIONS from "./ACTIONS";

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INCREMENT:
      if (payload.buyOrSell === "sell") {
        if (state.sellNumber >= payload.count) {
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
          payload.marketColorCount - (state.buyNumber + payload.count) <=
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

    case ACTIONS.ZERO:
      return { buyNumber: 0, sellNumber: 0 };
    case ACTIONS.NONE:
      return { ...state };

    default:
      return { ...state };
      break;
  }
}
