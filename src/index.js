import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { PokemonProvider } from "./resources/context/PokemonContext";

ReactDOM.render(
  <PokemonProvider>
    <App />
  </PokemonProvider>,
  document.getElementById("root")
);
