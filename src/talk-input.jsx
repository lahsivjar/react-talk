require("../style/talk-input.scss");

import React from "react";
import PropTypes from "prop-types";

const isBlank = require("is-blank");

class TalkInput extends React.Component {

  static propTypes = {
    onSendMessage: PropTypes.func.isRequired
  }

  static defaultProps = {
    placeHolder: "Send a message"
  }

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  onEnterPress = () => {
    if (!isBlank(this.state.message)) {
      this.props.onSendMessage(this.state.message);
      this.setState({ message: "" });
    }
  }

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  }

  catchReturn = (e) => {
    if (e.key === "Enter") {
      this.onEnterPress();
    }
  }

  render() {
    return(
      <div className="talk-input-wrapper">
        <input className="talk-input-raw" onChange={ this.handleOnChange }
          value={ this.state.message } onKeyPress={ this.catchReturn }
          placeholder={ this.props.placeHolder }/>
      </div>
    );
  }
}

export default TalkInput;
