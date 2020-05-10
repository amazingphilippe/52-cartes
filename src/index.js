import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { IntlProvider } from "react-intl";
import "./typical/radnika/ical.css";
import "./typical/lemurmure/ical.css";
import "./typical/sportingGrotesque/ical.css";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale="fr-CA">
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
