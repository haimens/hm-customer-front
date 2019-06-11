import React, { Component } from "react";
import "./Account.container.css";

class Account extends Component {
  render() {
    return (
      <section>
        <div className="col-10 mx-auto">
          <h1 className="haimens-main-text-60 haimens-main-textColor align-items-center py-4">My Account</h1>
        </div>
        <hr className="haimens-main-bgColor" />
        <div className="col-10 mx-auto my-4">
          <div className="row">
            <div className="col-6">
              <h4 className="mt-3">New Client</h4>
              <p className="haimens-main-text-14 account-marginTop">
                By creating an account you will be able to order faster, be up to date on an order's status, and keep
                track of the orders you have previously made.
              </p>
              <div className="col-10 p-0">
                <button className="account-marginTop text-white haimens-main-bgColor p-3 w-100">Signup</button>
              </div>
            </div>

            <div className="col-6">
              <h4 className="mt-3">Returning Client</h4>
              <label className="account-marginTop font-weight-bold" for="email">
                Email
              </label>
              <input type="email" id="email" class="form-control mt-1 account-input" />
              <label className="account-marginTop font-weight-bold" for="password">
                Password
              </label>
              <input type="password" id="password" class="form-control mt-1 account-input" />
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
