import React from "react";
import "./Loader.css";

function Loader(props) {
  return (
    <main
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: "8889",
        backgroundColor: "rgba(15,15,15,0.1)"
      }}
    >
      <section
        className="bg-dark d-flex align-items-center justify-content-center rounded"
        style={{
          width: "200px",
          height: "200px",
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto"
        }}
      >
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </section>
    </main>
  );
}

export default Loader;
