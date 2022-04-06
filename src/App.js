import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pokemon from "./pages/Pokemon.js";
import Home from "./pages/Home";
import EasyGame from "./pages/game/EasyGame";
import HardGame from "./pages/game/HardGame.js";
import GamePresentation from "./pages/game/GamePresentation.js";
import useMediaQuery from "@mui/material/useMediaQuery";

import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout.js";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./resources/theme.js";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");
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
              <Route path="game/easy" element={<EasyGame />} />
              <Route path="game/hard" element={<HardGame />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
