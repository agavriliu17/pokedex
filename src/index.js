import React from "react";
import ReactDOM from "react-dom";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./pages/Pokemon.js";
import Home from "./pages/Home";
import Game from "./pages/Game.js";
import GamePresentation from "./components/game/GamePresentation.js";
import { MenuProvider } from "./resources/context/MenuContext";
import NotFound from "./pages/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="pokemon" element={<App />} /> */}
          <Route path="pokemon/:pokemonId" element={<Pokemon />} />
          <Route path="game" element={<GamePresentation />} />
          <Route path="game/easy" element={<Game />} />
          <Route path="game/hard" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
