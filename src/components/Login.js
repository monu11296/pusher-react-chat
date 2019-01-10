import React, { Component } from 'react'
import { Button, Form, Container, Divider } from 'semantic-ui-react'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      error: null,
      loading: false,
    }
  }

  onError = (message) => {
    this.setState({
      loading: false,
      error: message
    })
  };

  onSubmit = (e) => {
    this.setState({ loading: true });
    let username = this.state.username;
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
            this.props.loginUser(username)
        }
      )
      .catch(this.onError);
  };

  onChange = (e) => {
    this.setState({ username: e.target.value })
  };

  render() {
    return (
      <div>
      <Container textAlign='center' style={{'position': 'absolute', 'left': '0', 'right': '0', 'paddingTop' : '150px'}}>
        <h1 style={{'fontSize':'40px', 'color' : '#ed4b1a'}}>Welcome!</h1>
        <Divider />
              <br />
              <Form onSubmit={this.onSubmit} 
              loading={this.state.loading}>

                <div className={"ui centered grid"}>
                <Form.Input label='Enter Your Username' onChange={this.onChange} width={5} />
                  <div className={"row"}>
                    <Button type='submit' color={'orange'}>Log In</Button>
                  </div>
                </div>

              </Form>
              </Container>
      </div>
    )
  }
}

export default Login
