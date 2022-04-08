import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { PokemonProvider } from "./resources/context/PokemonContext";

ReactDOM.render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
