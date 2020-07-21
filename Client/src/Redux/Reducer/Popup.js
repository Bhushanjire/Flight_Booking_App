import { FORGOTPOPUP } from "../../Constants";
const initial = {
  forgotPassword: false
};
const popupReducer = (state = initial, action) => {
  switch (action.type) {
    case FORGOTPOPUP:
      return action.payload;
    default:
      return state;
  }
};

export default popupReducer;
