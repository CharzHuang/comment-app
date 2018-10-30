import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  };

  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{ this.props.comment.userName } </span>-
        </div>
        <p> { this.props.comment.content }</p>
        <span
          onClick={ this.handleDeleteComment.bind(this) }
          className="comment-delete">
          Delete
        </span>
      </div>
    );
  }
}

export default Comment;