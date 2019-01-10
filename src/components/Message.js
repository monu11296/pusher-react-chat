import React, { Component } from 'react'
import { Grid, Segment, Label, Header } from 'semantic-ui-react';
import { AutoSizer, List } from 'react-virtualized'

class Message extends Component {

  messageList = ({index, key}) => {
    let message = this.props.messages[index];
    return (
      <Segment padded vertical key={key} style={{'fontSize' : '15px', 'color' : '#ed4b1a', 'padding': '20px'}}>
        <Label attached={ 'bottom right' } color={message.senderId === this.props.currentUser.id ? 'black' : 'orange'} style={{'minWidth': '100px'}}>
          { message.senderId === this.props.currentUser.id ? 'You' :  message.senderId}
        </Label>
        { message.text }
      </Segment>
    )
  };
  
  render() {
    return (
      <Grid.Column width={13} style={{'paddingTop': '50px', 'paddingBottom': '50px'}}>
        <Header as={'h1'} block style={{'width': '100%', 'position': 'relative',  'backgroundColor': '#ffffff', 'border': 'none'}} textAlign={'center'} >
          <Header.Content style={{'color': '#ed4b1a'}}>Messages</Header.Content>
        </Header>
        <AutoSizer>
          { ({height, width}) => <List height={height} width={width} rowCount={this.props.messages.length} rowHeight={60} rowRenderer={this.messageList} style={{'outline': 'none'}}/> }
        </AutoSizer>
        { this.props.children }
      </Grid.Column>
    )
  }

}

export default Message
