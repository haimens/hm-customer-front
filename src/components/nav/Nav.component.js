import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Nav.css";
class Nav extends Component {
  render() {
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-light nav-bg p-3 mobile-nav-bacground ${this.props.outerClass}`}
        style={{ zIndex: 1 }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className={`navbar-brand ${this.props.navTextColor}`} href="#">
          Sunshire Logo
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
            <li className="nav-item mr-5">
              <a className={`nav-link haimens-main-text-14 ${this.props.navTextColor}`} href="#">
                Book A Trip
              </a>
            </li>
            <li className="nav-item mr-5">
              <a className={`nav-link haimens-main-text-14 ${this.props.navTextColor}`} href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item mr-5">
              <a className={`nav-link haimens-main-text-14 ${this.props.navTextColor}`} href="#">
                Contact Us
              </a>
            </li>
            <li className="nav-item mr-5">
              <button
                className={`btn haimens-main-button-outline px-4 haimens-main-text-14 ${this.props.navTextColor}`}
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
