import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {

  static propTypes = {
    userName: PropTypes.string,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    userName: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      userName: props.userName,
      content: ''
    }
  }

  handleUserNameChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      const { userName, content } = this.state
      this.props.onSubmit({ userName, content })
    }
    this.setState({ content: '' })
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">User Name</span>
          <div className="comment-field-input">
            <input
              value={this.state.userName}
              onChange={this.handleUserNameChange}/>
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">Comment Content</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content} 
              onChange={this.handleContentChange}/>
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit}>
            Comment
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput