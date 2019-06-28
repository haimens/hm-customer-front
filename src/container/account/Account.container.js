import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { processLogin, processLogout } from "../../actions/auth.action";
import { clearUserInfo } from "../../actions/localStorage.action";
import alertify from "alertifyjs";
import "./Account.container.css";

class Account extends Component {
  state = {
    email: "",
    passcode: ""
  };

  handleLoginSubmit = async e => {
    e.preventDefault();
    this.props.processLogin(
      {
        username: this.state.email,
        passcode: this.state.passcode
      },
      this.props.history
    );
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleForgetPass = e => {
    e.preventDefault();
    window.location.href = `${process.env.REACT_APP_HAVANA_FRONT}/forget/${process.env.REACT_APP_APP_TOKEN}`;
  };

  componentWillMount = () => {
    clearUserInfo();
  };
  render() {
    return (
      <section>
        <div className="col-10 mx-auto">
          <h1 className="haimens-main-text-60 haimens-main-textColor align-items-center">My Account</h1>
        </div>
        <hr className="haimens-main-bgColor" />
        <div className="col-10 mx-auto my-5">
          <div className="row">
            <div className="col-12 col-lg-6">
              <h4>New Client</h4>
              <p className="haimens-main-text-14 haimens-margin-top-35">
                By creating an account you will be able to order faster, be up to date on an order's status, and keep
                track of the orders you have previously made.
              </p>
              <div className="col-10 p-0">
                <button className="haimens-margin-top-35 text-white haimens-main-bgColor p-3 w-100">Signup</button>
              </div>
            </div>

            <div className="col-12 mt-5 mt-lg-0 col-lg-6">
              <h4>Returning Client</h4>
              <label className="haimens-margin-top-35 font-weight-bold" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                class="form-control mt-1 haimens-input-height"
                onChange={this.handleInputChange}
              />
              <label className="haimens-margin-top-35 font-weight-bold" for="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                class="form-control mt-1 haimens-input-height"
                onChange={this.handleInputChange}
              />
              <div className="col-8 p-0">
                <button
                  className="mt-5 account-marginBottom text-white haimens-main-bgColor p-3 w-100"
                  onClick={this.handleLoginSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    // isLoading: state.loadReducer.loading,
    // isSuccess: state.loadReducer.is_success
  };
};

export default connect(
  mapStateToProps,
  {
    processLogin,
    processLogout
  }
)(withRouter(Account));
