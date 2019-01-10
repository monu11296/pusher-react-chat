import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import { Dimmer, Loader, Grid } from 'semantic-ui-react';

import Sidebar from './Sidebar';
import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      messages: [],
      currentUser: {},
      typingUsers: [],
    }
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:b1e9feac-0831-4538-92be-fa529339f77f',
      userId: this.props.username,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: "19394053",
          messageLimit: 100,
          hooks: {
            onMessage: message => this.setState({
              messages: [...this.state.messages, message],
            }),
            onUserStartedTyping: user => this.setState({
              typingUsers: [...this.state.typingUsers, user.name],
            }),
            onUserStoppedTyping: user => this.setState({
              typingUsers: this.state.typingUsers.filter(
                username => username !== user.name
              ),
            }),
            onPresenceChanged: () => this.forceUpdate(),
          },
        })
      })
      .then(room => {
        this.setState({ room })
      })
  }

  render() {

    return (
      this.state.room
        ?
        <Grid padded columns={2} className={'chat'}>
          <Sidebar users={this.state.room.users} currentUser={this.state.currentUser} />
          <Message messages={this.state.messages} currentUser={this.state.currentUser}>
            <MessageInput currentUser={this.state.currentUser} room={this.state.room}>
              <TypingIndicator users={this.state.typingUsers}/>
            </MessageInput>
          </Message>
        </Grid>
        :
        <Dimmer active >
          <Loader size={'medium'}>Loading...</Loader>
        </Dimmer>
    )
  }

}

export default Chat
