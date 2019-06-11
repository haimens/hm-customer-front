import React, { Component } from "react";
import "./About.container.css";
import Card from "./About.component/Card";
class About extends Component {
  render() {
    return (
      <section>
        <div className="col-10 mx-auto">
          <h1 className="haimens-main-text-60 haimens-header-margin haimens-main-textColor align-items-center">
            About Us
          </h1>
        </div>
        <hr className="haimens-main-bgColor" />
        <div className="col-10 mx-auto my-5">
          <p className="mt-4">
            SUNSHIRE strives to the best passenger experience no matter you are going to the airport, from the airport
            or just in town point to point.
          </p>
          <p className="mt-4">
            With our proudly in house developed computer information system and mobile technology, we have on time
            guranteed pickup going to the airport or your trip is free.
          </p>
          <p className="mt-4">
            We make a full commitment to provide superior customer service experience. No matter you are on the phone,
            on our Website, or on the road with our drivers, your safety and satisfactory is always our top priority.
            The service excellence is back by intensive staff training and strict quality control.
          </p>
          <p className="mt-4">
            Sunshire Enterprise Inc. is licensed by California Public Utilities Commission Operating Authority with TCP
            number 33893.
          </p>
          <p className="mt-4">
            We currently focus on shuttle service going and coming back from LAX, SNA, ONT, LGB, San Pedro Cruise
            terminal and Long Beach Cruise terminal.
          </p>
        </div>

        <div className="col-10 mx-auto my-5">
          <Card
            number={1}
            title={"For airport drop off:"}
            paragraph={"We guarantee we will pick you up at specified time frame."}
          />
          <Card
            number={2}
            title={"For airport pickup:"}
            paragraph={"Non stop coming back home. 90% of our customers wait 10 minutes or less at the curb."}
          />
          <Card
            number={3}
            title={"Phone Support:"}
            paragraph={"Feel free to call us for questions you may have before, on or after the trip."}
          />
          <Card
            number={4}
            title={"Reliable and Safe:"}
            paragraph={"Experienced and service oriented drivers serving you with higher standards."}
          />
        </div>
      </section>
    );
  }
}
export default About;
