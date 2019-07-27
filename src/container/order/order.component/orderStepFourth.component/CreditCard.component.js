import React, { Component } from "react";
import alertify from "alertifyjs";
export default class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonce: undefined
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
  }
  handleInputChange = e => {
    const { id, value } = e.target;
    this.props.handleInputChange(id, value);
  };
  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }

  handleGoBack = () => {
    this.props.handleChangePosition(-1);
  };

  handleNoneReceived = (nonce, data) => {
    const { finalizeOrder, handleSubmitAPaymentInLord, order_token, history } = this.props;
    Promise.all([
      finalizeOrder(order_token),
      handleSubmitAPaymentInLord(order_token, { card_nonce: nonce, type: 1 }, history)
    ]);
  };
  componentDidMount() {
    const config = {
      applicationId: this.props.all_payment_resource.payment_resource_info.square_application_id,
      locationId: this.props.all_payment_resource.payment_resource_info.square_location_id,
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: "16px",
          fontFamily: "Helvetica Neue",
          padding: "16px",
          color: "#373F4A",
          backgroundColor: "transparent",
          lineHeight: "1.15em",
          placeholderColor: "#000",
          _webkitFontSmoothing: "antialiased",
          _mozOsxFontSmoothing: "grayscale"
        }
      ],
      cardNumber: {
        elementId: "sq-card-number",
        placeholder: "• • • •  • • • •  • • • •  • • • •"
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV"
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM/YY"
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "Zip"
      },
      callbacks: {
        // createPaymentRequest: () => {
        //   return {
        //     requestShippingAddress: false,
        //     requestBillingInfo: true,
        //     currencyCode: "USD",
        //     countryCode: "US",
        //     total: {
        //       label: "MERCHANT NAME",
        //       amount: "1",
        //       pending: false
        //     },
        //     lineItems: [
        //       {
        //         label: "Subtotal",
        //         amount: "1",
        //         pending: false
        //       }
        //     ]
        //   };
        // },

        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            errors.forEach(function(error) {
              alertify.alert("  " + error.message);
            });

            return;
          }
          this.setState({ creditCardButton: true, cashButton: false });

          this.handleNoneReceived(nonce, cardData);

          // TODO: Connect to pay back end
        },
        unsupportedBrowserDetected: () => {},
        inputEventReceived: inputEvent => {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              break;
            case "focusClassRemoved":
              break;
            case "errorClassAdded":
              alertify.alert("Error", "Please fix card information errors before continuing.");
              break;
            case "cardBrandChanged":
              if (inputEvent.cardBrand !== "unknown") {
                this.setState({
                  cardBrand: inputEvent.cardBrand
                });
              } else {
                this.setState({
                  cardBrand: ""
                });
              }
              break;
            case "postalCodeChanged":
              break;
            default:
              break;
          }
        }
      }
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }
  render() {
    return (
      <section>
        <div id="sq-ccbox">
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
          <div className="px-2 py-3 border">
            <div id="cc-field-wrapper">
              <div className="col-12 my-2">
                <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold">
                  Card Number
                </label>
                <div id="sq-card-number" className="border" />
                <input type="hidden" id="card-nonce" name="nonce" />
              </div>
              <div className="d-flex">
                <div className="col-4">
                  <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold">
                    Expiration Date (MM/YY)
                  </label>
                  <div id="sq-expiration-date" className="border" />
                </div>
                <div className="col-4">
                  <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold">
                    CVV (3 digits)
                  </label>
                  <div id="sq-cvv" className="border" />
                </div>
                <div className="col-4">
                  <label htmlFor="card" className="hm-text-14 text-main-color font-weight-bold">
                    Zip Code
                  </label>
                  <div id="sq-postal-code" className="border" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5">
          <div className="row">
            <div className="col-md-4 col-12 mt-3">
              <button
                type="button"
                className="btn back-button w-100 hm-input-height hm-main-textColor hm-text-main-14 font-weigh-bold d-flex justify-content-between align-items-center"
                onClick={this.handleGoBack}
              >
                <img src={`${process.env.PUBLIC_URL}/img/icon_back.svg`} alt="roundTrip" />
                <div>Back</div>
                <div style={{ width: "20px" }} />
              </button>
            </div>
            <div className="col-md-4 col-12 mt-3">
              <button
                type="button"
                className="btn contact-sales-button text-white w-100 hm-input-height d-flex justify-content-between align-items-center"
              >
                <img src={`${process.env.PUBLIC_URL}/img/icon_phone_white.svg`} alt="roundTrip" />
                <div> Contact Sales</div>
                <div style={{ width: "20px" }} />
              </button>
            </div>
            <div className="col-md-4 col-12 mt-3">
              <button
                type="button"
                className="btn round-trip-button text-white w-100 hm-input-height hm-text-main-14 font-weigh-bold d-flex justify-content-between align-items-center"
                onClick={this.requestCardNonce}
              >
                <div style={{ width: "20px" }} />
                <div>Place order</div>
                <img src={`${process.env.PUBLIC_URL}/img/icon_continue.svg`} alt="roundTrip" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
