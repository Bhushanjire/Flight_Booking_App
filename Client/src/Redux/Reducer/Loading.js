import { LOADING } from "../../Constants";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload;
      break;
    default:
      return state;
      break;
  }
};

export default loadingReducer;
