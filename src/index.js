import React from "react";
import ReactDOM from "react-dom";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./pages/Pokemon.js";
import Home from "./pages/Home";
import { MenuProvider } from "./resources/context/MenuContext";

ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="pokemon" element={<App />} /> */}
          <Route path="pokemon/:pokemonId" element={<Pokemon />} />
          {/* <Route path="*" element={<App />} /> */}
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
