import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import "./Home.css";

class HomePage extends Component {
  static propTypes = {
    env: PropTypes.string
  };

  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <p>
            This page was rendered on{" "}
            <span className="Home-env">
              {this.props.env}
              -side
            </span>
            .
          </p>
          <Link to="/comments" className="Home-link">
            Go & Comment →
          </Link>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    env: state.home.env
  };
};

export default connect(
  mapStateToProps,
  null
)(HomePage);
