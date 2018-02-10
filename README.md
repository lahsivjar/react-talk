# react-talk

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
          "author": "Ponger",
          "authorId": "pong",
          "message": "How you doin'!",
          "timestamp": Date.now().toString()
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
    // NOTE: selfMsg doesn't include timestamp and needs to be added by the user of the module
    // in client or server side as required
    selfMsg["timestamp"] = Date.now().toString();
    this.setState(prevState => ({
        messages: [...prevState.messages, selfMsg]
    }));
    // If message sending failed return false otherwise return true
    try {
      // Insert code to send the message below
      ...
      return true;
    } catch (e) {
      return false;
    }
  }

  render() {
    return (
      <div>
        <TalkBox topic="react-websocket-template" currentUserId="ping" currentUser="Pinger"
          messages={ this.state.messages } onSendMessage={ this.sendMessage } />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
```

## Demonstration
https://react-websocket.herokuapp.com/index

A complete implementation using SockJs, STOMP and springboot can be found at: https://github.com/lahsivjar/spring-websocket-template/tree/master/with-sockjs

## Parameters

* `topic`: The topic of the chat. Will be displayed in the chat box header
* `currentUserId`: User id for the current user who is using the chat box
* `currentUser`: Display user name for the current user who is using the chat box
* `messages`: An array of messages. Each message object should be with the following schema:
        ```
        {
          "authorId": <unique author id for the author>,
          "author": <author or user diplay name for the message>,
          "message": <message>
          "timestamp": <the difference, measured in milliseconds, between the current time and midnight, January 1, 1970 UTC"
        }
        ```

## Issues

Report any issues or bugs to https://github.com/lahsivjar/react-talk/issues

## Major changes in version 1.0.0

* `currentUserId` property added to `TalkBox` which refers to the unique id of the current user
* `onSendMessage` callback must return a boolean indicating send status
* Message object has been modified with following changes:
  1. `timestamp` is added to indicate message time (unit is in milliseconds)
  2. `authoId` is added to indicate a unique id for the author
  3. `author` has been changed to refer to the display name of the user

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
