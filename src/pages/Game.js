import React from "react";
// import Button from "@mui/material/Button";
import { getPokemon } from "../resources/apiHelper";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";

const getRandomInt = () => Math.floor(Math.random() * 898);

const Game = () => {
  const [pokemon, setPokemon] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [input, setInput] = React.useState("");
  const canvasRef = React.useRef(null);

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
      // loop through all pixels
      // each pixel is decomposed in its 4 rgba values
      for (let i = 0; i < d.length; i += 4) {
        // set it to each value
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
  }, [pokemon]);

  React.useEffect(() => {
    (async function () {
      try {
        const randomIndex = getRandomInt();
        const newPokemon = await getPokemon(randomIndex);

        setPokemon(newPokemon);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
  }, []);

  console.log(pokemon.name);
  return (
    <>
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
          value={input}
          onChange={handleInput}
        />
      </Paper>
    </>
  );
};

export default Game;
