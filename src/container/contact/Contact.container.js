import React, { Component } from "react";
import GMapFlag from "../../components/shared/GMapFlag";
class Contact extends Component {
  render() {
    return (
      <section>
        <div className="col-10 mx-auto">
          <h1 className="hm-main-text-60 hm-main-textColor align-items-center">Contact Us</h1>
        </div>
        <hr className="hm-main-bgColor" />
        <div className="col-10 mx-auto my-5">
          <div style={{ height: "308px", width: "100%" }}>
            <GMapFlag />
          </div>

          <h4 className="mt-5">Sunshire Shuttle Inc</h4>
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center hm-header-margin">
                <i className="fas fa-map-marker-alt hm-main-text-16" />
                <div>
                  <h4 className="hm-main-text-16 ml-4">Address:</h4>
                  <h4 className="hm-main-text-16 ml-4">3629 Lynoak Street Unit D, Pomona CA 91767</h4>
                </div>
              </div>

              <div className="d-flex align-items-center hm-header-margin">
                <i className="fas fa-map-marker-alt hm-main-text-16" />
                <div>
                  <h4 className="hm-main-text-16 ml-4">Email:</h4>
                  <h4 className="hm-main-text-16 ml-4">service@sunshireshuttle.com</h4>
                </div>
              </div>

              <div className="d-flex align-items-center hm-header-margin">
                <i className="fas fa-map-marker-alt hm-main-text-16" />
                <div>
                  <h4 className="hm-main-text-16 ml-4">Tel:</h4>
                  <h4 className="hm-main-text-16 ml-4">8663981138</h4>
                </div>
              </div>

              <div className="d-flex align-items-center hm-header-margin">
                <i className="fas fa-map-marker-alt hm-main-text-16" />
                <div>
                  <h4 className="hm-main-text-16 ml-4">Fax:</h4>
                  <h4 className="hm-main-text-16 ml-4">8663981138</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Contact;
