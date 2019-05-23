import * as actionTypes from "./actionTypes";

const URL = "ws://localhost:3030";
let ws = new WebSocket(URL);

export const WebSocketConnection = () => {
  return async dispatch => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log("send");
      const message = JSON.parse(evt.data);
      // this.addMessage(message);
      console.log(message);
      dispatch(addMessage(message));
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      // this.setState({
      //   ws: new WebSocket(URL)
      // });
      ws = new WebSocket(URL);
    };
  };
};
// addMessage = message =>
// this.setState(state => ({ messages: [message, ...state.messages] }));

const addMessage = message => ({
  type: actionTypes.ADD_MESSAGES,
  payload: message
});

export const submitMessage = messageString => {
  return async dispatch => {
    try {
      // on submitting the ChatInput form, send the message, add it to the list and reset the input
      const message = { name: "noh", message: messageString };
      ws.send(JSON.stringify(message));
      // this.addMessage(message);
      await dispatch(addMessage(message));
    } catch (err) {
      console.error(err.response);
    }
  };
};
