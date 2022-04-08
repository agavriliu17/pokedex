import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

import pokemon from "../../images/unknown_pokemon.png";

const UnknownPokemon = () => {
  return (
    <Fade in timeout={500}>
      <Card
        raised
        sx={{
          width: "275px",
          height: "200px",
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#808080",
          borderRadius: "15px",
        }}
      >
        <Typography m={1} fontSize={25} textAlign="center" color="#fff">
          Couldn't find your pokemon!
        </Typography>
        <img src={pokemon} alt="pokemon" height="130px" width="130px" />
      </Card>
    </Fade>
  );
};

export default UnknownPokemon;
