import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

class CommentInputContainer extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      userName: ''
    }
  }

  handleSubmitComment(comment) {
    if (!comment) return
    if (!comment.userName) return
    if (!comment.content) return

    if (this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }

  render() {
    return (
      <CommentInput 
        userName={this.state.userName}
        onSubmit={this.handleSubmitComment.bind(this)} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentInputContainer)