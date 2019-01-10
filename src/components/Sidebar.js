import React, { Component } from 'react'
import { Grid, Label, Header, Icon } from 'semantic-ui-react';
import { AutoSizer, List } from 'react-virtualized'


class Sidebar extends Component {

  allUsers = ({index, key, style}) => {
    let user = this.props.users[index];
    return (
      <div key={key} style={style}>
        <Label size={'big'} style={{'width': '100%', 'position': 'relative'}} color='black'>
          {/* user.name */}
          {/* user.id === this.props.currentUser.id && <span> (you)</span> */}
          { user.id === this.props.currentUser.id ? <span> You</span> : user.name }
          { user.presence.state === 'online' &&
          <Icon name={'circle'} color={'green'} style={{'position': 'absolute', 'right': '5px'}}/>
          }
        </Label>
      </div>
    )
  };

  render() {
    return (
      <Grid.Column width={3} style={{ 'paddingTop': '50px', 'backgroundColor': '#ed4b1a'}}>
        <Header as={'h3'} block style={{'width': '100%', 'position': 'relative',  'backgroundColor': '#ffffff'}}>
          <Header.Content  style={{'color': '#ed4b1a'}}>All Users</Header.Content>
        </Header>
        <AutoSizer>
          { ({ height, width }) => <List height={height} width={width} rowCount={this.props.users.length} rowHeight={50} rowRenderer={this.allUsers} style={{'outline': 'none'}}/>}
        </AutoSizer>
        <div style={{'position': 'absolute', 'bottom': '0', 'left': '0'}}>
        </div>
      </Grid.Column>
    )
  }

}

export default Sidebar
