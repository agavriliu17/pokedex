import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeIcon from "@mui/icons-material/Home";
import pokedexLight from "../images/title/pokedexLight.png";
import pokedexDark from "../images/title/pokedexDark.png";

import SwitchMode from "../components/SwitchMode";
import Footer from "./Footer";

import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const selectingGame = location.pathname === "/game";

  const playing =
    location.pathname === "/game/easy" || location.pathname === "/game/hard";

  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: theme.palette.background,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      elevation={3}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          {selectingGame ? (
            <Button
              variant="contained"
              onClick={() => navigate(`/`)}
              sx={{ textTransform: "none" }}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          ) : playing ? (
            <Button
              variant="contained"
              onClick={() => navigate(`/game`)}
              sx={{ textTransform: "none" }}
              startIcon={<ArrowBackIosNewIcon />}
            >
              Back
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate(`/game`)}
              sx={{ textTransform: "none" }}
              startIcon={<VideogameAssetIcon />}
            >
              Play
            </Button>
          )}
          <SwitchMode />
        </Box>

        <Button
          variant="text"
          disableFocusRipple
          disableElevation
          disableRipple
          sx={{
            marginTop: 2,
            marginBottom: 6,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={() => navigate(`/`)}
        >
          <img
            src={theme.palette.mode === "light" ? pokedexLight : pokedexDark}
            alt="pokedex"
          />
        </Button>
        {children}
      </Container>
      <Footer />
    </Paper>
  );
};

export default Layout;
