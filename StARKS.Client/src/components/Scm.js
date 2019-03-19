import React, { Component } from 'react'

export class Scm extends Component {
  render() {
    return (
      <div>
        <p> {this.props.scm.name} </p>
      </div>
    )
  }
}

export default Scm
