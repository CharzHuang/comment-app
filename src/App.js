import React, { Component } from 'react';
import CommentInput from './comment/CommentInput';
import CommentList from './comment/CommentList';

class App extends Component {

  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.userName) return;
    if (!comment.content) return;
    const newList = [...this.state.comments, comment];
    this.setState({
      comments: newList
    });
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

export default App;
