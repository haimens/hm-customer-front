import React, { Component, Suspense } from "react";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import LoaderAlt from "./components/shared/LoaderAlt";

import Dashboard from "./container/dashboard/Dashboard.container";
import Order from "./container/order/Order.container";

class App extends Component {
  componentDidMount() {
    Promise.all([
      import("bootstrap/dist/css/bootstrap.min.css"),
      import("jquery/dist/jquery.min"),
      import("bootstrap/dist/js/bootstrap.min"),
      import("@fortawesome/fontawesome-free/css/all.css"),
      import("antd/dist/antd.css"),
      import("./alertify.css")
    ]);
  }
  render() {
    alertify.defaults.transition = "zoom";
    alertify.defaults.theme.ok = "btn st-bg-green text-white";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";

    return (
      <Suspense fallback={<LoaderAlt />}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/order" component={Order} />
          <Route component={Page404} />
        </Switch>
      </Suspense>
    );
  }
}

//PAGE NOT FOUND
function Page404(props) {
  return (
    <main style={styles.container} className="text-center">
      <img style={styles.imageContainer} src={`${process.env.PUBLIC_URL}/img/404/error404-head.png`} alt="error404" />
      <div className="d-flex mt-3">
        <img style={styles.imageContainerSub} src={`${process.env.PUBLIC_URL}/img/404/4.png`} alt="error404" />
        <img style={styles.imageContainerSub} src={`${process.env.PUBLIC_URL}/img/404/0.png`} alt="error404" />
        <img style={styles.imageContainerSub} src={`${process.env.PUBLIC_URL}/img/404/4.png`} alt="error404" />
      </div>
      <img
        style={styles.imageContainerText}
        src={`${process.env.PUBLIC_URL}/img/404/sorry.png`}
        alt="error404"
        className="mt-4"
      />
      <a className="btn mr-bg-darkblue text-white mt-4" href="/dashboard">
        返回
      </a>
    </main>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "5vh auto",
    width: "300px",
    // height: '300px',
    overflowY: "auto"
  },
  imageContainer: {
    width: "300px",
    margin: "0 auto"
  },
  imageContainerSub: {
    width: "100px",
    margin: "0 auto",
    height: "10vh"
  },
  imageContainerText: {
    width: "300px",
    margin: "0 auto",
    height: "5vh"
  }
};

export default App;
