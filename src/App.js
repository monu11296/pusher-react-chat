import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'

import Login from './components/Login'
import Chat from './components/Chat'

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      offline: false
    };
    window.addEventListener('online', () => this.setState({ offline: false }))
    window.addEventListener('offline', () => this.setState({ offline: true }))
  }

  componentDidMount() {
    let username = localStorage.getItem('username');
    if (username) {
      this.setState({ username: username })
    }
  }

  loginUser = (username) => {
    localStorage.setItem('username', username);
    this.setState({ username: username });
  };

  logoutUser = () => {
    localStorage.removeItem('username');
    this.setState({ username: '' });
  };

  render() {
    return (
      <div className={'chat'}>
      {
        this.state.offline ? 
        <Container textAlign='center' style={{'position': 'absolute', 'left': '0', 'right': '0', 'paddingTop' : '150px'}}>
          <h1 style={{'fontSize':'40px', 'color' : '#ed4b1a'}}>App Is Offline</h1>
          <p style={{'fontSize':'20px', 'color' : '#ed4b1a'}}>Check Your Network Connection</p>
        </Container> :
       
          this.state.username
            ?  <Chat username={this.state.username} />
            :   <Login loginUser={this.loginUser}/>
      }
      </div>

    );
  }
}


export default App
