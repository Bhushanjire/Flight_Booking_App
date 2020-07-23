import { FLIGHT_SEARCH } from "../../Constants";
const initial = {
  filter: {},
  data: [],
  other: {}
}
const filterReducer = (state = initial, action) => {

  console.log('state in reducer',state);
  
  switch (action.type) {
    case FLIGHT_SEARCH:
      return {...state,...action.payload };
    default:
      return state;
  }
};

export default filterReducer;
