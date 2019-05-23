import { combineReducers } from "redux";

// Reducers
import messagesReducer from "./messages";

export default combineReducers({
  messagesReducer: messagesReducer
});
