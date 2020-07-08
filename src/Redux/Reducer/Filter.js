import { FILTER } from "../../Constants";
const initial = {
    price : '',
    company : ''
}
const filterReducer = (state=initial , action) => {
    console.log('In reducer',action);
  switch (action.type) {
    case FILTER:
      return action.payload;
      break;
    default:
      return state;
      break;
  }
};

export default filterReducer;
