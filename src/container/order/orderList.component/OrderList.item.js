import React from "react";
import { convertUTCtoLocal, parseAmount } from "../../../actions/utilities.action";

/**
 * @onClick
 * @onCorrect
 */
export default function SalaryListItem(props) {
  const { cdate, udate, amount } = props.parentProps;
  return (
    <tr className="border-bottom">
      <td data-label="Created On" className="items-height align-middle">
        <section className="text-center align-middle text-main-color hm-text-14 ">
          {convertUTCtoLocal(cdate, "YYYY-MM-DD HH:mm")}
        </section>
      </td>
      <td data-label="Updated On" className="items-height align-middle">
        <section className="text-center align-middle text-main-color  hm-text-14">
          {convertUTCtoLocal(udate, "YYYY-MM-DD HH:mm")}
        </section>
      </td>

      <td data-label="Amount" className="items-height align-middle text-center">
        <section className="text-center align-middle hm-text-14 text-main-color font-weight-bold">
          {parseAmount(amount)}
        </section>
      </td>
    </tr>
  );
}
