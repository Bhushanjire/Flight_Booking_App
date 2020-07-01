import {FLIGHT_SEARCH,FLIGHT_SCHEDULE_LIST} from '../../Constants';

const flightReducer = (state = [], action) => {
  switch (action.type) {
    case FLIGHT_SEARCH:
      return [...state, action.payload];
      break;

    case FLIGHT_SCHEDULE_LIST:
      return [...state, action.payload];
      break;
    default:
      return state;
  }
};

export default flightReducer;
