# react-chat-box

React component for chat box UI with pluggable support for SockJS client via [react-stomp](https://github.com/lahsivjar/react-stomp)

## Installation

```
npm install --save react-talk
```

## Example Usage

```
// Using ES6

import React from "react";
import ReactDom from "react-dom";
import { TalkBox } from "react-talk";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
          "message": "How you doin'!",
          "author": "pong"
      }]
    };
  }

  onMessageReceive = (msg) => {
    this.setState(prevState => ({
        messages: [...prevState.messages, msg]
    }));
  }

  sendMessage = (msg, selfMsg) => {
    // selfMsg is the message object constructed from the message typed by the current user
    this.setState(prevState => ({
        messages: [...prevState.messages, selfMsg]
    }));
    // Insert code to send the message below
    ...
  }

  render() {
    return (
      <div>
        <TalkBox topic="react-websocket-template" currentUser="ping" messages={ this.state.messages }
          onSendMessage={ this.sendMessage } />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
```

A complete implementation using SockJs, STOMP and springboot can be found at: https://github.com/lahsivjar/spring-websocket-template/tree/master/with-sockjs

## Parameters

* `topic`: The topic of the chat. Will be displayed in the chat box header
* `currentUser`: User id for the current user who is using the chat box
* `messages`: An array of messages. Each message object should be with the following schema:
        ```
        {
          "author": "string",
          "message": "string"
        }
        ```

## Issues

Report any issues or bugs to https://github.com/lahsivjar/react-talk/issues

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
