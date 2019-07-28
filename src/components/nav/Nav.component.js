import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutFromSystem } from "../../actions/auth.action";
import "./Nav.css";
class Nav extends Component {
  signIn = () => {
    this.props.history.push("/login");
  };
  handleLogOut = () => {
    this.props.logoutFromSystem();
  };
  render() {
    return (
      <nav
        className={`navbar navbar-expand-lg navbar-light nav-bg p-3 mobile-nav-bacground  ${this.props.outerClass}`}
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
          <img
            src={`${process.env.REACT_APP_LOGO_PATH}`}
            alt={`${process.env.REACT_APP_LOGO_PATH}`}
            className="ml-5"
            style={{ height: "40px" }}
          />
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-5">
            <li className="nav-item mr-5">
              <div
                className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                  this.props.navTextColor
                }`}
                onClick={() => this.props.history.push("/")}
              >
                Book A Trip
              </div>
            </li>
            <li className="nav-item mr-5">
              <div
                className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                  this.props.navTextColor
                }`}
                onClick={() => this.props.history.push("/about")}
              >
                About Us
              </div>
            </li>
            <li className="nav-item mr-5">
              <div
                className={`nav-link text-center hm-main-text-16 mobile-nav-text hm-pointer-cursor ${
                  this.props.navTextColor
                }`}
                onClick={() => this.props.history.push("/contact")}
              >
                Contact Us
              </div>
            </li>
            <li className="nav-item mr-md-5 mr-0 d-flex justify-content-end ">
              {!this.props.login && (
                <button
                  className={`btn ${this.props.outlineButton} px-4 hm-main-text-16 mobile-nav-text ${
                    this.props.navTextColor
                  }`}
                  onClick={this.signIn}
                >
                  Sign In
                </button>
              )}

              {this.props.login && (
                <div className="btn-group mr-2">
                  <button
                    type="button"
                    className="btn dropdown-toggle hm-main-text-16 text-white ml-2 d-flex align-items-center"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("username").toUpperCase()}
                  </button>

                  <div className="dropdown-menu shadow-sm p-3">
                    <div className="pb-2">Welcome!</div>
                    <div>
                      <button
                        className="dropdown-item px-0 d-flex justify-content-center align-items-center"
                        type="button"
                        onClick={() => {
                          this.props.history.push("/order/list");
                        }}
                      >
                        <small>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/icon_history.svg`}
                            alt={`${process.env.PUBLIC_URL}/img/icon_history.svg`}
                            className="mr-3"
                          />
                        </small>
                        Booking history
                      </button>
                    </div>
                    <div>
                      <hr />
                      <button
                        className="dropdown-item p-0"
                        type="button"
                        onClick={() => {
                          this.handleLogOut();
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <small>
                            <img
                              src={`${process.env.PUBLIC_URL}/img/icon_logout.svg`}
                              alt={`${process.env.PUBLIC_URL}/img/icon_logout.svg`}
                              className="mr-3"
                            />
                          </small>
                          Log Out
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.authReducer.login
  };
};

const mapDispatchToProps = {
  logoutFromSystem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Nav));
