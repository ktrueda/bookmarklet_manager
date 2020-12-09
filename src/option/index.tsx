import * as React from "react";
import * as ReactDOM from "react-dom";
import Option from "./Option";

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  ReactDOM.render(<Option />, document.getElementById("option"));
});
