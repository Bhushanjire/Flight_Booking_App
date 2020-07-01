const flightReducer = (state = [], action) => {
  switch (action.type) {
    case "SCHEDULE_FLIGHTS":
      return [...state, action];
    default:
      return state;
  }
};

export default flightReducer;
