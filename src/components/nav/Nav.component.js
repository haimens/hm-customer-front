import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Nav.css";
class Nav extends Component {
  signIn = () => {
    console.log("hi");
    this.props.history.push("/account");
  };
  render() {
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-light nav-bg p-3 mobile-nav-bacground ${this.props.outerClass}`}
        style={{ zIndex: 1 }}
      >
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className={`navbar-brand text-purple`} href="/">
          Sunshire Logo
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-5">
            <li className="nav-item mr-5">
              <a className={`nav-link hm-main-text-16 text-white ${this.props.navTextColor}`} href="/">
                Book A Trip
              </a>
            </li>
            <li className="nav-item mr-5">
              <a className={`nav-link hm-main-text-16 text-white ${this.props.navTextColor}`} href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item mr-5">
              <a className={`nav-link hm-main-text-16 text-white ${this.props.navTextColor}`} href="/contact">
                Contact Us
              </a>
            </li>
            <li className="nav-item mr-5">
              <button
                className={`btn ${this.props.outlineButton} px-4 hm-main-text-16 text-white ${this.props.navTextColor}`}
                onClick={this.signIn}
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
