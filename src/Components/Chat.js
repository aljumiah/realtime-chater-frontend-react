import React, { Component } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { connect } from "react-redux";
// Actions
import * as actionCreators from "../store/actions";

class Chat extends Component {
  async componentDidMount() {
    await this.props.WebSocketConnection();
  }

  render() {
    return (
      <div>
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={"name"}
            placeholder={"Enter your name..."}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <ChatInput
          onSubmitMessage={message =>
            this.props.submitMessage(message, this.state.name)
          }
        />
        {this.props.messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messagesReducer.messages,
    name: state.messagesReducer.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    WebSocketConnection: () => dispatch(actionCreators.WebSocketConnection()),
    submitMessage: (message, name) =>
      dispatch(actionCreators.submitMessage(message, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
