import React from "react";
import ReactDOM from "react-dom";

import { Provider as StoreProvider } from "react-redux";

import App from "./App";
import "./index.scss";

import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("app-root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
