import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./pages/Pokemon.js";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="pokemon" element={<App />} /> */}
        <Route path="pokemon/:pokemonId" element={<Pokemon />} />
        {/* <Route path="*" element={<App />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
