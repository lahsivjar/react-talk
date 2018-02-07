require("../style/talk-message.scss");

import React from "react";
import PropTypes from "prop-types";
import Linkify from "linkifyjs/react";
import ClassNames from "classnames";

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
    const topWrapper = ClassNames({
      "talk-message-wrapper": true,
      "right": this.props.selfPosted,
      "left": !this.props.selfPosted
    });
    const contentWrapper = ClassNames({
      "talk-message-content-wrapper": true,
      "right": this.props.selfPosted,
      "left": !this.props.selfPosted
    });
    const linkifyOptions = {
      "nl2br": true
    };
    return(
      <div className={ topWrapper }>
        <div className={ contentWrapper }>
          <Linkify className="talk-message-content-span" options={ linkifyOptions } >
            { this.state.message }
          </Linkify>
        </div>
      </div>
    );
  }
}

export default TalkMessage;
