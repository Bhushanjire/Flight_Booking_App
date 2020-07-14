import { LOADING } from "../../Constants";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING:
        console.log('Value in reducer',action);
        
      return action.payload;
      break;
    default:
      return state;
      break;
  }
};

export default loadingReducer;
