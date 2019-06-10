import React, { Component } from "react";
import "./Nav.css";
class Nav extends Component {
  render() {
    return (
      <nav className={`navbar navbar-expand-lg navbar-light nav-bg p-3 ${this.props.outerClass}`}>
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
        <a className="navbar-brand haimens-main-textColor" href="#">
          Sunshire Logo
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
            <li className="nav-item mr-5">
              <a className="nav-link haimens-main-textColor haimens-main-text-14 " href="#">
                Book A Trip
              </a>
            </li>
            <li className="nav-item mr-5">
              <a className="nav-link haimens-main-textColor haimens-main-text-14 " href="#">
                About Us
              </a>
            </li>
            <li className="nav-item mr-5">
              <a className="nav-link haimens-main-textColor haimens-main-text-14 " href="#">
                Contact Us
              </a>
            </li>
            <li className="nav-item mr-5">
              <button className="btn haimens-main-button-outline haimens-main-textColor px-4 haimens-main-text-14">
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
