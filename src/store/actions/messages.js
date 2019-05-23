import * as actionTypes from "./actionTypes";

const URL = "ws://localhost:3030";
let socket = new WebSocket(URL);

export const WebSocketConnection = () => {
  return async dispatch => {
    socket.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    socket.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log("send");
      const message = JSON.parse(evt.data);
      dispatch(addMessage(message));
    };

    socket.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      socket = new WebSocket(URL);
    };
  };
};

const addMessage = message => ({
  type: actionTypes.ADD_MESSAGES,
  payload: message
});

export const submitMessage = (messageString, name) => {
  return async dispatch => {
    try {
      // on submitting the ChatInput form, send the message, add it to the list and reset the input
      const message = { name: name, message: messageString };
      socket.send(JSON.stringify(message));
      await dispatch(addMessage(message));
    } catch (err) {
      console.error(err.response);
    }
  };
};
