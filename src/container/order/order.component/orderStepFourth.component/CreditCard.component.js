import React, { Component } from "react";

export default class CreditCard extends Component {
  render() {
    return (
      <section>
        <div className="mt-4 p-3 border rounded-top">
          <div className="d-flex justify-content-between">
            <div>
              <i className="far fa-credit-card mr-4" />
              Pay with Card
            </div>
            <div>
              <i className="fab fa-cc-visa " />
              <i className="fab mr-4 fa-cc-masterjcb" />
              <i className="fab mr-4 fa-cc-mastercard" />
              <i className="fab mr-4 fa-cc-discover" />
              <i className="fab fa-cc-amex" />
            </div>
          </div>
        </div>
        <div className="p-3 border rounded-bottom ">
          <div>
            <label for="basic-url">Card Number</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control haimens-input-height" id="basic-url" value="card_number" />
            </div>
          </div>

          <div className="row ">
            <div className="col-4">
              <label for="basic-url">Expiration Date</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value="expiration_date"
                  className="form-control haimens-input-height"
                  id="basic-url"
                />
              </div>
            </div>
            <div className="col-4">
              <label for="basic-url">CVV</label>
              <div className="input-group mb-3">
                <input type="password" value="cvv" className="form-control haimens-input-height" id="basic-url" />
              </div>
            </div>
            <div className="col-4">
              <label for="basic-url">Postal Code</label>
              <div className="input-group mb-3">
                <input type="text" value="postal_code" className="form-control haimens-input-height" id="basic-url" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
