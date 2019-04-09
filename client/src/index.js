import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Root from "./Root/Root";
import AuthContext from "./context/AuthContext";

ReactDOM.render(
  <AuthContext>
    <Root>
      <App />
    </Root>
  </AuthContext>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
