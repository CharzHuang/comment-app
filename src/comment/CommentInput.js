import React, { Component } from 'react';

class CommentInput extends Component {

  constructor() {
    super();
    this.state = {
      userName: '',
      content: ''
    };
  }

  handleUserNameChange(event) {
    this.setState({
      userName: event.target.value
    });
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      const { userName, content } = this.state;
      this.props.onSubmit({ userName, content });
    }
    this.setState({ content: '' });
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">User Name</span>
          <div className="comment-field-input">
            <input
              value={this.state.userName}
              onChange={this.handleUserNameChange.bind(this)}/>
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">Comment Content</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content} 
              onChange={this.handleContentChange.bind(this)}/>
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>
            Comment
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput;