import { FLIGHT_SEARCH, FLIGHT_SCHEDULE_LIST } from "../../Constants";
const initial = {
  flightSearch: {},
  flightList: [],
};

const flightReducer = (state = initial, action) => {
  switch (action.type) {
    case FLIGHT_SEARCH:
      state.flightSearch = action.payload;
      // console.log("searchData", searchData);
      // return [...state, action.payload];
      return { ...state };

      break;

    case FLIGHT_SCHEDULE_LIST:
      // let listData = action.payload;
      state.flightList = action.payload;
      return { ...state };
      break;
    default:
      return state;
  }
};

export default flightReducer;
