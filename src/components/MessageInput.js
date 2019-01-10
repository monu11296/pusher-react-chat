import React, { Component } from 'react'
import { Form } from 'semantic-ui-react';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }

  sendTypingEvent = () => {
    this.props.currentUser
      .isTypingIn({ roomId: this.props.room.id })
      .catch(error => console.error('error', error))
  };

  onMessageChange = (e,) => {
    this.sendTypingEvent();
    this.setState({ message: e.target.value });
  };

  onMessageSubmit = (e) => {
    this.props.currentUser.sendMessage({
      text: this.state.message,
      roomId: this.props.room.id,
    });
    this.setState({ message: '' })
  };

  render() {

    return (
      <div style={{ 'position': 'absolute', 'bottom': '0', 'left': '0', 'padding': '10px', 'width': '100%'}}>
        {this.props.children}
          <Form onSubmit={this.onMessageSubmit}>
            <Form.Input  placeholder={'Type a Message'} value={this.state.message} size={'large'} onChange={this.onMessageChange} />
          </Form>
      </div>
    )
  }

}

export default MessageInput
