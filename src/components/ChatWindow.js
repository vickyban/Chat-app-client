import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ChatWindow extends Component {
  render() {
    return (
      <div>
        <h2>Message window</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow)
