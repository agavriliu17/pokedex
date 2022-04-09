import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CustomCircularProgress from "../../components/CustomLoading";
import { useStreaksNotification } from "../../resources/hooks/useNotification";

import { getPokemon } from "../../resources/apiHelper";

const easyPokemons = [
  9, 143, 7, 1, 4, 13, 6, 19, 25, 41, 52, 133, 94, 150, 129, 39, 68,
];

const EasyGame = () => {
  const [pokemon, setPokemon] = React.useState({});
  const [input, setInput] = React.useState("");
  const [availablePokemons, setAvailablePokemons] =
    React.useState(easyPokemons);

  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);

  const [loading, setLoading] = React.useState(true);
  const [loadedPokemons, setLoadedPokemons] = React.useState(1);
  const [error, setError] = React.useState(false);

  const [openStreakNotification] = useStreaksNotification();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  React.useEffect(() => {
    const lastHighScore = localStorage.getItem("highScore_easy");

    if (lastHighScore) {
      setHighScore(JSON.parse(lastHighScore));
    }
  }, []);

  React.useEffect(() => {
    (async function () {
      try {
        const randomIndex =
          availablePokemons[
            Math.floor(Math.random() * availablePokemons.length)
          ];
        setAvailablePokemons(
          availablePokemons.filter((el) => el !== randomIndex)
        );

        const newPokemon = await getPokemon(randomIndex);

        setPokemon(newPokemon);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedPokemons]);

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      validateAnswer();
    }
  };

  const validateAnswer = () => {
    if (input.toLowerCase() === pokemon.name) {
      if ((streak + 1) % 5 === 0) {
        openStreakNotification(streak + 1);
      }

      setScore(score + 1);
      setStreak(streak + 1);

      setLoadedPokemons(loadedPokemons + 1);
      setError(false);

      if (score === highScore) {
        setHighScore(score + 1);
        localStorage.setItem("highScore_easy", JSON.stringify(score + 1));
      }
    } else {
      setStreak(0);
      setError(true);
    }
    setInput("");
  };

  const handleSkip = () => {
    setStreak(0);
    setLoadedPokemons(loadedPokemons + 1);
    setError(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <LocalFireDepartmentIcon />
          <Typography fontFamily="monospace" fontSize="25px" ml="5px">
            Streaks:{streak}
          </Typography>
        </Box>

        <Box>
          <Typography fontFamily="monospace" fontSize="25px">
            HighScore:{highScore}
          </Typography>

          <Typography fontFamily="monospace" fontSize="20px">
            Score:{score}
          </Typography>
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            width: "475px",
            height: "475px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomCircularProgress size={150} />
        </Box>
      ) : availablePokemons.length !== 0 ? (
        <>
          <img
            src={pokemon.sprites?.other["official-artwork"]?.front_default}
            alt="pokemon"
            onLoad={() => setLoading(false)}
          />
          <Paper
            sx={{
              width: "250px",
              borderRadius: "30px",
              height: "50px",
              marginBottom: "10px",
            }}
          >
            <OutlinedInput
              sx={{
                width: "250px",
                height: "50px",
                borderRadius: "30px",
              }}
              error={error}
              value={input}
              onChange={handleInput}
              onKeyDown={handleSubmit}
            />
          </Paper>
          <Typography
            fontFamily="monospace"
            fontSize="20px"
            onClick={handleSkip}
            mt="15px"
            sx={{ cursor: "pointer" }}
          >
            Skip this Pokemon
          </Typography>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "400px",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          <Typography fontFamily="monospace" fontSize="40px">
            Congrats!
          </Typography>
          <Typography fontFamily="monospace" fontSize="25px">
            Seems like you know some pokemons, you finished this mode!
            <br />
            Would you like a bigger challenge? Checkout the Hard mode:
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ textTransform: "none", width: "fit-content" }}
          >
            Go to hard mode
          </Button>
        </Box>
      )}
    </>
  );
};

export default EasyGame;
