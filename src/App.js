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
    const comments = [...this.state.comments, comment];
    this.setState({ comments });
  }

  handleDeleteComment(index) {
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments });
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={ this.handleDeleteComment.bind(this) } />
      </div>
    );
  }
}

export default App;
