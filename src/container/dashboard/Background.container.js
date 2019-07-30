import React from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

function Background() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
  return (
    <div
      class="container"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      style={{ zIndex: 9999 }}
    >
      <animated.div style={{ transform: props.xy.interpolate(trans1) }}>
        <img className="orange-ball" src={`${process.env.PUBLIC_URL}/img/icon_bg_1.svg`} alt="" />
      </animated.div>
      <animated.div style={{ transform: props.xy.interpolate(trans2) }}>
        <img className="orange-ball-2" src={`${process.env.PUBLIC_URL}/img/icon_bg_2.svg`} alt="" />
      </animated.div>
      <animated.div style={{ transform: props.xy.interpolate(trans3) }}>
        <img className="blue-ball" src={`${process.env.PUBLIC_URL}/img/icon_bg_3.svg`} alt="" />
      </animated.div>
      <animated.div style={{ transform: props.xy.interpolate(trans4) }}>
        <img className="sm-ball" src={`${process.env.PUBLIC_URL}/img/icon_sm_1.svg`} alt="" />
      </animated.div>
      <animated.div style={{ transform: props.xy.interpolate(trans1) }}>
        <img className="sm-ball-1" src={`${process.env.PUBLIC_URL}/img/icon_sm_2.svg`} alt="" />
      </animated.div>
      <animated.div style={{ transform: props.xy.interpolate(trans3) }}>
        <img className="md-ball" src={`${process.env.PUBLIC_URL}/img/icon_md_1.svg`} alt="" />
      </animated.div>
      <animated.div style={{ transform: props.xy.interpolate(trans4) }}>
        <img className="md-ball-1" src={`${process.env.PUBLIC_URL}/img/icon_md_2.svg`} alt="" />
      </animated.div>
    </div>
  );
}

export default Background;
