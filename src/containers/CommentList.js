import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentList from "../components/CommentList";
import { deleteComment } from "../store/reducers/comments";

class CommentListContainer extends Component {
  static PropTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  };

  handleDeleteComment = index => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  };

  render() {
    return (
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteComment: commentIndex => {
      dispatch(deleteComment(commentIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer);
