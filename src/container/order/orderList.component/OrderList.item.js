import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";

/**
 * @onClick
 * @onCorrect
 */
export default function SalaryListItem(props) {
  const { cdate, receipt, amount, status_str } = props.parentProps;
  return (
    <tr className="border-bottom">
      <td data-label="Created On" className="items-height align-middle">
        <section className="text-center align-middle hm-main-textColor-sub hm-text-14 ">
          {convertUTCtoLocal(cdate, "YYYY-MM-DD HH:mm")}
        </section>
      </td>
      <td data-label="Updated On" className="items-height align-middle">
        <section className="text-center align-middle hm-main-textColor-sub  hm-text-14">
          {receipt ? receipt : "N/A"}
        </section>
      </td>
      <td data-label="Amount" className="items-height align-middle text-center">
        <section className="d-flex justify-content-center hm-text-14 hm-main-textColor-sub font-weight-bold">
          {status_str === "DISPATCHED" ? (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle success-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">DISPATCHED</div>
            </div>
          ) : status_str === "ON-THE-WAY" ? (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle pending-text-color mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">ON-THE-WAY</div>
            </div>
          ) : (
            <div className="d-flex align-items-center ">
              <i className="fas fa-circle text-purple mr-3 pl-0" style={{ fontSize: "6px" }} />
              <div className="text-modal-color hm-text-14  font-weight-500">{status_str}</div>
            </div>
          )}
        </section>
      </td>
      <td data-label="Amount" className="items-height align-middle text-center">
        <section className="text-center align-middle hm-text-14 hm-main-textColor-sub font-weight-bold">
          <img src={`${process.env.PUBLIC_URL}/img/icon_detail.svg`} alt="error404" />
        </section>
      </td>
    </tr>
  );
}
