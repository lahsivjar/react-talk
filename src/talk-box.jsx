require("../style/talk-box.scss");

import React from "react";
import PropTypes from "prop-types";
import TalkMessage from "./talk-message.jsx";
import TalkInput from "./talk-input.jsx";
import classNames from "classnames";
import { animateScroll as scroll } from "react-scroll";

const similarity = require("similarity");
const htmlId = require("react-html-id");
const isBlank = require("is-blank");

class TalkBox extends React.Component {

  static defaultProps = {
    // If connected is not used then we assume always connected
    connected: true
  }

  static propTypes = {
    topic: PropTypes.string.isRequired,
    // Display user name of the current user
    currentUser: PropTypes.string.isRequired,
    // User id of the current user
    currentUserId: PropTypes.string.isRequired,
    // Returns boolean to indicate message send status
    onSendMessage: PropTypes.func.isRequired,
    connected: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.shape({
      authorId: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })),
    // Custom style
    style: PropTypes.object
  }

  constructor(props) {
    super(props);
    htmlId.enableUniqueIds(this);
    this.talkBoxId = this.nextUniqueId();
    this.state = {
      topic: this.props.topic
    };
  }

  scrollToBottom = () => {
    scroll.scrollToBottom({ containerId: this.talkBoxId });
  }

  onTopicChange = (newTopic) => {
    this.setState({ topic: newTopic });
  }

  onSendMessage = (msg) => {
    const selfMessage = {
      author: this.props.currentUser,
      authorId: this.props.currentUserId,
      message: msg
    };
    var sendStatus = this.props.onSendMessage(msg, selfMessage);
    this.scrollToBottom();
    return sendStatus;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    const connectStatus = classNames({
      "talk-box-status": true,
      "connected": this.props.connected
    });
    return(
      <div className="talk-box-wrapper custom" style={ this.props.style }>
        <div className="talk-box-header">
          <span className={ connectStatus }></span>
          <span className="talk-box-topic">{ this.state.topic }</span>
        </div>
        <div className="talk-box-body" id={ this.talkBoxId }>
          {this.props.messages.map((item, i) => <TalkMessage key={i} timestamp={ parseInt(item.timestamp) }
            message={ item.message } author={ item.author } authorId={ item.authorId }
            selfPosted={ similarity(item.authorId, this.props.currentUserId) === 1 } />)}
        </div>
        <TalkInput onSendMessage={ this.onSendMessage } disabled={ !this.props.connected }/>
      </div>
    );
  }
}

export default TalkBox;
