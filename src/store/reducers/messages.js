import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "",
  messages: []
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGES:
      return {
        ...state,
        messages: [action.payload, ...state.messages]
      };
    default:
      return state;
  }
};

export default messagesReducer;
