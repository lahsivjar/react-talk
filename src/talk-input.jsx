require("../style/talk-input.scss");

import React from "react";
import PropTypes from "prop-types";
import MdSend from "react-icons/lib/md/send";

class TalkInput extends React.Component {

  static propTypes = {
    onSendMessage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }

  onSendClick = () => {
    this.props.onSendMessage(this.state.message);
    this.setState({ message: "" });
  }

  updateMessage = (msg) => {
    this.setState({ message: msg })
  }

  render() {
    return(
      <div className="talk-input-wrapper">
        <input className="talk-input-raw" value={ this.state.message }
          onChange={e => this.updateMessage(e.target.value)}/>
        <MdSend onClick={e => this.onSendClick()}/>
      </div>
    );
  }
}

export default TalkInput;
