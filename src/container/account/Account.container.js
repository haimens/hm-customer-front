import React, { Component } from "react";
import "./Account.container.css";

class Account extends Component {
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
              <input type="email" id="email" class="form-control mt-1 haimens-input-height" />
              <label className="haimens-margin-top-35 font-weight-bold" for="password">
                Password
              </label>
              <input type="password" id="password" class="form-control mt-1 haimens-input-height" />
              <div className="col-8 p-0">
                <button className="mt-5 account-marginBottom text-white haimens-main-bgColor p-3 w-100">Login</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Account;
