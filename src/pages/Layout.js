import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const playing = location.pathname.includes("game");

  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fff7e8",
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
          <IconButton href="https://github.com/agavriliu17/fiipractic-bytex-pokedex">
            <GitHubIcon sx={{ color: "#000", fontSize: "40px" }} />
          </IconButton>
        </Box>

        <Typography variant="h1" mt={2} mb={5}>
          Pokedex
        </Typography>
        {children}
      </Container>
    </Paper>
  );
};

export default Layout;
