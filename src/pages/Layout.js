import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import SwitchMode from "../components/SwitchMode";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const playing = location.pathname.includes("game");

  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: theme.palette.background,
        display: "flex",
        justifyContent: "center",
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
          {playing ? (
            <Button
              variant="contained"
              onClick={() => navigate(`/`)}
              sx={{ textTransform: "none" }}
            >
              Home
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate(`/game`)}
              sx={{ textTransform: "none" }}
            >
              Play GTP
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
            marginBottom: 5,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={() => navigate(`/`)}
        >
          <Typography variant="h1" sx={{ textDecoration: "none" }}>
            Pokedex
          </Typography>
        </Button>
        {children}
      </Container>
    </Paper>
  );
};

export default Layout;
