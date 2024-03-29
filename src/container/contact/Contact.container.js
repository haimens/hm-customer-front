import React, { Component } from "react";
import GMapFlag from "../../components/shared/GMapFlag";
class Contact extends Component {
  render() {
    return (
      <section className="pb-5">
        <div className="trip-tab ">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "141px" }}>
            <h1 className="text-center text-white trip-header">Contact Us</h1>
          </div>
          <div className="container-fluid pb-5">
            <div className="row pb-5">
              <div className="col-10 px-5 pb-5 bg-white mx-auto custom-shadow">
                <div className={`custom-radius-top tab bg-white`} />

                <div style={{ height: "308px", width: "100%" }}>
                  <GMapFlag />
                </div>
                <h4 className="mt-5 hm-main-text-20 hm-main-textColor font-weight-bold">Sunshire Shuttle Inc</h4>
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex align-items-center hm-header-margin">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/icon_address_contactus.svg`}
                        alt="error404"
                        className="mr-3"
                        style={{ height: "23px", width: "23px" }}
                      />
                      <div>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4 font-weight-bold">Address:</h4>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4">
                          3629 Lynoak Street Unit D, Pomona CA 91767
                        </h4>
                      </div>
                    </div>

                    <div className="d-flex align-items-center hm-header-margin">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/icon_email_contactus.svg`}
                        alt="error404"
                        className="mr-3"
                        style={{ height: "23px", width: "23px" }}
                      />
                      <div>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4 font-weight-bold">Email:</h4>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4" style={{ wordBreak: "break-all" }}>
                          service@sunshireshuttle.com
                        </h4>
                      </div>
                    </div>

                    <div className="d-flex align-items-center hm-header-margin">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/icon_tel_contactus.svg`}
                        alt="error404"
                        className="mr-3"
                        style={{ height: "23px", width: "23px" }}
                      />
                      <div>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4 font-weight-bold">Tel:</h4>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4">8663981138</h4>
                      </div>
                    </div>

                    <div className="d-flex align-items-center hm-header-margin">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/icon_fax_contactus.svg`}
                        alt="error404"
                        className="mr-3"
                        style={{ height: "23px", width: "23px" }}
                      />
                      <div>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4 font-weight-bold">Fax:</h4>
                        <h4 className="hm-main-textColor hm-main-text-14 ml-4">8663981138</h4>
                      </div>
                    </div>
                  </div>
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
