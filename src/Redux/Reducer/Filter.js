import { FILTER } from "../../Constants";
const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER:
      return [...state, action.payload];
      break;
    default:
      return state;
      break;
  }
};

export default filterReducer;
