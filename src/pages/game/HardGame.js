import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import CustomCircularProgress from "../../components/CustomLoading";
import { getPokemon } from "../../resources/apiHelper";
import { getRandomPokemon } from "../../resources/pokemonHelper";

const HardGame = () => {
  const [pokemon, setPokemon] = React.useState({});
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [input, setInput] = React.useState("");
  const [streak, setStreak] = React.useState(0);
  const [loadedPokemons, setLoadedPokemons] = React.useState(1);
  const [error, setError] = React.useState(false);

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const lastHighScore = localStorage.getItem("highScore_hard");

    if (lastHighScore) {
      setHighScore(JSON.parse(lastHighScore));
    }
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const draw = (ctx) => {
    const canvas = canvasRef.current;
    var img = new Image();
    img.onload = function () {
      // set the canvas' size
      canvas.width = this.width;
      canvas.height = this.height;

      // first fill a rect
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // set the gCO
      maskPokemon(this);
    };
    img.crossOrigin = "anonymous";
    img.src = pokemon?.sprites?.other["official-artwork"]?.front_default;

    function maskPokemon(img) {
      // first remove our black rectangle
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //draw the image
      ctx.drawImage(img, 0, 0);

      // get the image data
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var d = imgData.data;

      // loop through all pixels, each pixel is decomposed in its 4 rgba values
      for (let i = 0; i < d.length; i += 4) {
        // set it to each value to black
        d[i] = d[i + 1] = d[i + 2] = 0;
      }

      // redraw the new computed image
      ctx.putImageData(imgData, 0, 0);
    }
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //Our draw come here
    draw(context);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  React.useEffect(() => {
    (async function () {
      try {
        const randomIndex = getRandomPokemon();
        const newPokemon = await getPokemon(randomIndex);

        setPokemon(newPokemon);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
  }, [loadedPokemons]);

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      validateAnswer();
    }
  };

  const validateAnswer = () => {
    if (input === pokemon.name) {
      setScore(score + 1);
      setStreak(streak + 1);

      setLoadedPokemons(loadedPokemons + 1);
      setError(false);
      if (score === highScore) {
        setHighScore(score + 1);
        localStorage.setItem("highScore_hard", JSON.stringify(score + 1));
      }
    } else {
      setScore(0);
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
      {loading && (
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
      )}
      <canvas ref={canvasRef} />
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
  );
};

export default HardGame;
