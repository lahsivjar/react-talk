require("../style/talk-message.scss");

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class TalkMessage extends React.Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    selfPosted: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    };
  }

  onMessageEdit = (msg) => {
    this.setState({ message: msg });
  }

  render() {
    const contentClassName = classNames({
      "talk-message-content": true,
      "self-posted": this.props.selfPosted
    });
    return(
      <div className="talk-message-wrapper">
        <span className={ contentClassName }>
          { this.state.message }
        </span>
      </div>
    );
  }
}

export default TalkMessage;
