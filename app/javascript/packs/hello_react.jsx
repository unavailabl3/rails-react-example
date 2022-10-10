import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
