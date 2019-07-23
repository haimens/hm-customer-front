import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { processLogin, processLogout } from "../../actions/auth.action";
import { clearUserInfo } from "../../actions/localStorage.action";
import "./Login.container.css";

export class Login extends React.Component {
  state = {
    username: "",
    passcode: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.props.processLogin(
      {
        username: this.state.username,
        passcode: this.state.passcode
      },
      this.props.history
    );
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleForgetPass = e => {
    e.preventDefault();
    window.location.href = `${process.env.REACT_APP_HAVANA_FRONT}/forget/${process.env.REACT_APP_APP_TOKEN}`;
  };

  handleCreateNewAccount = e => {
    e.preventDefault();
    this.props.history.push("/create");
  };

  componentWillMount = () => {
    clearUserInfo();
  };

  componentDidMount() {
    let newImage = new Image();
    newImage.onload = function(img) {
      document.getElementById("login-image").classList.remove("login-image-init");
      document.getElementById("login-image").classList.add("login-image-loaded");
    };
    newImage.src = `${process.env.PUBLIC_URL}/img/genos_bg.png`;
  }

  render() {
    return (
      <main className="login-container">
        <section className="login-image login-image-bg login-image-init" id="login-image" style={{ zIndex: "1" }} />
        {/* <img
          src={`${process.env.PUBLIC_URL}/img/logo-white.svg`}
          alt="Logo"
          className="login-logo"
          style={{ zIndex: "2" }}
        /> */}
        <p className="text-white welcome font-weight-bold text-center" style={{ fontSize: "26px", zIndex: "2" }}>
          Welcome!
        </p>
        <section className="p-3 login-content text-center rounded-custom" style={{ zIndex: "2" }}>
          <div className="hm-text-12 text-secondary-color mt-4 mb-5">Sign in with credentials</div>

          <form onSubmit={this.handleSubmit} className="container-fluid">
            <div className="input-group shadow-sm mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text border-0 bg-white text-secondary-color" id="basic-addon1">
                  <i className="fas fa-envelope text-secondary-color" />
                </span>
              </div>
              <input
                required
                type="text"
                className="form-control hm-input-height hm-input-login border-0 p-2"
                placeholder="Username"
                aria-label="Username"
                id="username"
                aria-describedby="basic-addon1"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group shadow-sm mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text border-0 bg-white text-secondary-color" id="basic-addon2">
                  <i className="fas fa-unlock-alt text-secondary-color" />
                </span>
              </div>
              <input
                required
                type="password"
                className="form-control hm-input-height hm-input-login border-0 p-2"
                placeholder="Password"
                aria-label="Password"
                id="passcode"
                aria-describedby="basic-addon2"
                value={this.state.passcode}
                onChange={this.handleChange}
              />
            </div>

            <div className="text-center" style={{ marginTop: "55px" }}>
              <button
                type="submit"
                className="btn bg-purple button-main-size shadow text-white "
                style={{ height: "43px", width: "90px" }}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-between" style={{ marginTop: "60px" }}>
            <p
              className="text-left hm-pointer-cursor px-0"
              style={{ color: "#ced4da" }}
              onClick={this.handleForgetPass}
            >
              Forgot Password?
            </p>
            <p
              className="text-left hm-pointer-cursor px-0"
              style={{ color: "#ced4da" }}
              onClick={this.handleCreateNewAccount}
            >
              Create new account
            </p>
          </div>
        </section>
        <section className="login-image login-image-bg-2" />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loadReducer.loading,
    isSuccess: state.loadReducer.is_success
  };
};

export default connect(
  mapStateToProps,
  {
    processLogin,
    processLogout
  }
)(withRouter(Login));
