import React, { Component } from 'react'

class TypingIndicator extends Component {
  render() {
    if (this.props.users.length > 0) {
      return (
        <div style={{'margin': '10px'}}>
          {`${this.props.users
            .slice(0, 2)
            .join(' and ')} is typing...`}
        </div>
      )
    }
    return <div />
  }
}

export default TypingIndicator
