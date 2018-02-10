require("../style/talk-message.scss");

import React from "react";
import PropTypes from "prop-types";
import Linkify from "linkifyjs/react";
import ClassNames from "classnames";
import RelativeDate from "relative-date";

const isBlank = require("is-blank");

class TalkMessage extends React.Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
    // author is for name of the author, 2 can be same
    author: PropTypes.string.isRequired,
    // unique id of the author
    authorId: PropTypes.string.isRequired,
    // is the message self posted
    selfPosted: PropTypes.bool.isRequired,
    // timestamp of the message
    timestamp: PropTypes.number.isRequired
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
    const authorMetadata = ClassNames({
      "talk-message-metadata-author": true,
      "self-posted": this.props.selfPosted
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
        <div className="talk-message-metadata">
          <span className={ authorMetadata} >
            { this.props.author }
            <span className="talk-message-metadata-author-separator"> • </span>
          </span>
          <span className="talk-message-metadata-timestamp">
            { RelativeDate(this.props.timestamp) }
          </span>
        </div>
      </div>
    );
  }
}

export default TalkMessage;
