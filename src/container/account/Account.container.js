import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createNewAddressInstance } from "../../actions/address.action";
import { createACustomerIn } from "../../actions/customer.action";
import { clearUserInfo } from "../../actions/localStorage.action";
import "./Account.container.css";
import GAutoComplete from "../../components/shared/GAutoComplete";
import alertify from "alertifyjs";
export class Account extends React.Component {
  state = {
    name: "",
    passcode: "",
    email: "",
    area: "",
    cell: "",
    confirm_password: "",
    address: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, email, area, cell, address } = this.state;
    const { createNewAddressInstance, createACustomerIn, history } = this.props;
    if (name && email && area && cell && address) {
      let token = await createNewAddressInstance({ address_str: address });
      await createACustomerIn(
        {
          customer_info: { name, email, cell: `${area} ${cell}` },
          address_info: {
            address_token: token.address_token
          }
        },
        history
      );
    } else {
      alertify.alert("Warning", "Please Finish The Form Before Signin");
    }
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleForgetPass = e => {
    e.preventDefault();
    window.location.href = `${process.env.REACT_APP_HAVANA_FRONT}/forget/${process.env.REACT_APP_APP_TOKEN}`;
  };

  handleSignIn = e => {
    e.preventDefault();
    this.props.history.push("/login");
  };

  componentWillMount = () => {
    clearUserInfo();
  };

  getAddress = address => {
    this.setState({ address: address[0].formatted_address });
  };

  componentDidMount() {
    let newImage = new Image();
    newImage.onload = function(img) {
      document.getElementById("account-image").classList.remove("account-image-init");
      document.getElementById("account-image").classList.add("account-image-loaded");
    };
    newImage.src = `${process.env.PUBLIC_URL}/img/genos_bg.png`;
  }

  render() {
    const { name, email, area, cell } = this.props;
    return (
      <main className="account-container">
        <section
          className="account-image account-image-bg account-image-init"
          id="account-image"
          style={{ zIndex: "1" }}
        />
        {/* <img
          src={`${process.env.PUBLIC_URL}/img/logo-white.svg`}
          alt="Logo"
          className="account-logo"
          style={{ zIndex: "2" }}
        /> */}
        <p className="text-white welcome font-weight-bold text-center" style={{ fontSize: "26px", zIndex: "2" }}>
          Create an account!
        </p>
        <section className="p-3 account-content text-center rounded-custom" style={{ zIndex: "2" }}>
          <div className="hm-text-12 text-secondary-color mt-4 mb-5">Sign up with credentials</div>

          <form onSubmit={this.handleSubmit} className="container-fluid">
            <div className="input-group shadow-sm mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text border-0 bg-white text-secondary-color" id="basic-addon1">
                  <i className="fas fa-user text-secondary-color" />
                </span>
              </div>
              <input
                required
                type="text"
                className="form-control hm-input-height hm-input-account border-0 p-2"
                placeholder="Name"
                aria-label="name"
                id="name"
                aria-describedby="basic-addon1"
                value={name}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group shadow-sm mb-4 d-flex">
              <div className="input-group-prepend">
                <span className="input-group-text border-0 bg-white text-secondary-color" id="basic-addon2">
                  <i className="fas fa-phone-alt text-secondary-color" />
                </span>
              </div>
              <input
                required
                type="Phone"
                className="form-control hm-input-height hm-input-account border-0 p-2 col-2"
                placeholder="Area"
                aria-label="Area"
                id="area"
                aria-describedby="basic-addon2"
                value={area}
                onChange={this.handleChange}
              />
              <input
                required
                type="Phone"
                className="form-control hm-input-height hm-input-account border-0 p-2"
                placeholder="Cell"
                aria-label="Cell"
                id="cell"
                aria-describedby="basic-addon2"
                value={cell}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group shadow-sm mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text border-0 bg-white text-secondary-color" id="basic-addon1">
                  <i className="fas fa-envelope text-secondary-color" />
                </span>
              </div>
              <input
                required
                type="email"
                className="form-control hm-input-height hm-input-account border-0 p-2"
                placeholder="Email"
                aria-label="Email"
                id="email"
                aria-describedby="basic-addon1"
                value={email}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group shadow-sm mb-4">
              <GAutoComplete getAddress={this.getAddress} iconFront={true} placeholder={"Address"} />
            </div>

            <div className="text-center" style={{ marginTop: "55px" }}>
              <button
                type="submit"
                className="btn button-main-size shadow text-white "
                style={{ height: "43px", width: "134px", backgroundColor: "#12ccef" }}
              >
                Create account
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-end" style={{ marginTop: "40px" }}>
            <p className="text-left hm-pointer-cursor px-0" style={{ color: "#ced4da" }} onClick={this.handleSignIn}>
              Sign in
            </p>
          </div>
        </section>
        <section className="account-image account-image-bg-2" />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {
  createNewAddressInstance,
  createACustomerIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Account));
