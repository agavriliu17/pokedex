import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import introSound from "../../sounds/who-that-pokemon-sound.mp3";
import PokemonContext from "../../resources/context/PokemonContext";

const GamePresentation = () => {
  const { gameGreetPlayed, setGameGreetPlayed } =
    React.useContext(PokemonContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!gameGreetPlayed) {
      const audio = new Audio(introSound);
      audio.play();

      setGameGreetPlayed(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        fontFamily="monospace"
        fontWeight="700"
        variant="h4"
        mt={1}
        mb={8}
      >
        Welcome to Guess the Pokemon!
      </Typography>
      <Typography
        fontFamily="monospace"
        fontSize="20px"
        m="10px"
        sx={{ width: "80%" }}
        align="center"
      >
        Let's pretend it's the end of an episode of Pokémon. There's only one
        question to answer during the ad break, and that is:
      </Typography>
      <Typography
        fontFamily="monospace"
        fontSize="20px"
        m="10px"
        sx={{ width: "80%" }}
        align="center"
      >
        WHO ON EARTH IS THAT POKÉMON? <br />
      </Typography>
      <Typography
        fontFamily="monospace"
        fontSize="20px"
        m="10px"
        sx={{ width: "80%" }}
        align="center"
      >
        Do you know them all? Well, now's the time to prove it with our guess
        the Pokémon quiz:
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate(`/game/easy`)}
        sx={{
          textTransform: "none",
          width: "200px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
        color="success"
      >
        Easy mode
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate(`/game/hard`)}
        sx={{ textTransform: "none", width: "200px" }}
        color="error"
      >
        Hard mode
      </Button>

      <Typography></Typography>
    </Box>
  );
};

export default GamePresentation;
