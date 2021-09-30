import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./jsx/pages/Home";
import Architektura from "./jsx/pages/Gallery/Architektura";
import { Provider } from "react-redux";
import store from "./jsx/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-photoswipe/lib/photoswipe.css";
import "./scss/style.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/gallery/architektura" component={Architektura} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
