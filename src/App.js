import React, { Component } from 'react'
import CommentInput from './containers/CommentInput'
import CommentList from './containers/CommentList'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <CommentInput />
        <CommentList />
      </div>
    )
  }
}

export default App
