require("../style/talk-box.scss");

import React from "react";
import PropTypes from "prop-types";
import TalkMessage from "./talk-message.jsx";
import TalkInput from "./talk-input.jsx";
import { animateScroll as scroll } from "react-scroll";

const similarity = require("similarity");
const htmlId = require("react-html-id");

class TalkBox extends React.Component {

  static propTypes = {
    topic: PropTypes.string.isRequired,
    currentUser: PropTypes.string.isRequired,
    onSendMessage: PropTypes.func.isRequired,
    messages: PropTypes.array
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
      message: msg
    };
    this.props.onSendMessage(msg, selfMessage);
    this.scrollToBottom();
  }

  render() {
    return(
      <div className="talk-box-wrapper">
        <div className="talk-box-header">
          <span className="talk-box-header-topic">{ this.state.topic }</span>
        </div>
        <div className="talk-box-body" id={ this.talkBoxId }>
          {this.props.messages.map((item, i) => <TalkMessage key={i}
            message={ item.message } author={ item.author }
            selfPosted={ similarity(item.author, this.props.currentUser) === 1 } />)}
        </div>
        <TalkInput onSendMessage={ this.onSendMessage }/>
      </div>
    );
  }
}

export default TalkBox;
