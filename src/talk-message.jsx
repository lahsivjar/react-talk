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
    const topWrapper = classNames({
      "talk-message-wrapper": true,
      "right": this.props.selfPosted,
      "left": !this.props.selfPosted
    });
    const contentWrapper = classNames({
      "talk-message-content-wrapper": true,
      "right": this.props.selfPosted,
      "left": !this.props.selfPosted
    });
    return(
      <div className={ topWrapper }>
        <div className={ contentWrapper }>
          <span className="talk-message-content-span">
            { this.state.message }
          </span>
        </div>
      </div>
    );
  }
}

export default TalkMessage;
