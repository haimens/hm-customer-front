import React, { Component } from "react";

export default class CreditCard extends Component {
  handleInputChange = e => {
    const { id, value } = e.target;
    this.props.handleInputChange(id, value);
  };
  render() {
    const { expiration_date, cvv, postal_code, card_number } = this.props.parentProps;
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
              <input
                type="text"
                className="form-control haimens-input-height"
                id="card_number"
                value={card_number}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-md-4 col-12 ">
              <label for="basic-url">Expiration Date</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="expiration_date"
                  className="form-control haimens-input-height"
                  value={expiration_date}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4 col-12">
              <label for="basic-url">CVV</label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  id="cvv"
                  className="form-control haimens-input-height"
                  value={cvv}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-4 col-12">
              <label for="basic-url">Postal Code</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="postal_code"
                  className="form-control haimens-input-height"
                  value={postal_code}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
