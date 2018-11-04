import React, { Component } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import "./CommentPage.css";

class CommentPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <CommentInput />
        <CommentList />
      </div>
    );
  }
}

export default CommentPage;
