import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./pages/Pokemon.js";
import Home from "./pages/Home";
import Game from "./pages/Game.js";
import GamePresentation from "./components/game/GamePresentation.js";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout.js";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./resources/theme.js";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = () => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="pokemon/:pokemonId" element={<Pokemon />} />
              <Route path="game" element={<GamePresentation />} />
              <Route path="game/easy" element={<Game />} />
              <Route path="game/hard" element={<Game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
