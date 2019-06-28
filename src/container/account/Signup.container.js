import React, { Component } from "react";

class Signup extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    password: "",
    confirm_password: ""
  };
  handleInputChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  render() {
    const { name, phone, email, street_address, city, state, zip_code, password, confirm_password } = this.state;
    return (
      <section>
        <div className="col-10 mx-auto">
          <h1 className="hm-main-text-60 hm-main-textColor align-items-center">Signup</h1>
        </div>
        <hr className="hm-main-bgColor" />
        <div className="col-10 mx-auto my-5">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-md-4 col-12">
                  <label className="font-weight-bold" for="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="form-control mt-1 hm-input-height"
                    value={name}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4 col-12">
                  <label className="font-weight-bold" for="phone">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    class="form-control mt-1 hm-input-height"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4 col-12">
                  <label className="font-weight-bold" for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    class="form-control mt-1 hm-input-height"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <label className="font-weight-bold mt-3" for="street_address">
                Street Address
              </label>
              <input
                type="text"
                id="street_address"
                value={street_address}
                class="form-control mt-1 hm-input-height"
                onChange={this.handleInputChange}
              />

              <div className="row mt-3">
                <div className="col-md-4 col-12">
                  <label className="font-weight-bold" for="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    class="form-control mt-1 hm-input-height"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4 col-12">
                  <label className="font-weight-bold" for="state">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    class="form-control mt-1 hm-input-height"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4 col-12">
                  <label className="font-weight-bold" for="zip_code">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    id="zip_code"
                    value={zip_code}
                    class="form-control mt-1 hm-input-height"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-6">
                  <label className="font-weight-bold" for="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    class="form-control mt-1 hm-input-height"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label className="font-weight-bold" for="confirm_password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    value={confirm_password}
                    class="form-control mt-1 hm-input-height"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <button className="mt-5 text-white hm-main-bgColor col-md-3 col-12 p-3 offset-md-9 offset-0 ">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Signup;
