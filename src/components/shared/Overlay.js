import React from "react";
import "./Overlay.css";
export default function Overlay(props) {
  return (
    <main className="over-lay">
      <section className={`message ${props.className}`} style={props.style}>
        {props.children}
      </section>
    </main>
  );
}
