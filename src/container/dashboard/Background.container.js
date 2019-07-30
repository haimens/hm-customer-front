import React from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";

function Background() {
  const props = useSpring({
    to: [{ opacity: 1, color: "#ffaaee" }],
    from: { opacity: 0, color: "red" }
  });
  return (
    <div class="container">
      <animated.div style={props}>
        <img className="orange-ball" src={`${process.env.PUBLIC_URL}/img/icon_bg_1.svg`} alt="" />
      </animated.div>
      <animated.div style={props}>
        <img className="orange-ball-2" src={`${process.env.PUBLIC_URL}/img/icon_bg_2.svg`} alt="" />
      </animated.div>
      <animated.div style={props}>
        <img className="blue-ball" src={`${process.env.PUBLIC_URL}/img/icon_bg_3.svg`} alt="" />
      </animated.div>
      <animated.div style={props}>
        <img className="sm-ball" src={`${process.env.PUBLIC_URL}/img/icon_sm_1.svg`} alt="" />
      </animated.div>
      <animated.div style={props}>
        <img className="sm-ball-1" src={`${process.env.PUBLIC_URL}/img/icon_sm_2.svg`} alt="" />
      </animated.div>
      <animated.div style={props}>
        <img className="md-ball" src={`${process.env.PUBLIC_URL}/img/icon_md_1.svg`} alt="" />
      </animated.div>
      <animated.div style={props}>
        <img className="md-ball-1" src={`${process.env.PUBLIC_URL}/img/icon_md_2.svg`} alt="" />
      </animated.div>
    </div>
  );
}

export default Background;
