import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { MenuProvider } from "./resources/context/MenuContext";

ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
