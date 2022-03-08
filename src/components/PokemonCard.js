import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import PokemonType from "./PokemonType";

const PokemonCard = ({ pokemon }) => {
  const formatNumber = (number) => {
    let id = number.toString();
    while (id.length < 3) id = "0" + id;
    return "#" + id;
  };
  return (
    <Fade in timeout={1000}>
      <Card
        sx={{
          width: "275px",
          height: "200px",
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            width: "85%",
          }}
        >
          <Box>{pokemon.name}</Box>
          <Box>{formatNumber(pokemon.id)}</Box>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Box>
            {pokemon.types.map((pokemon) => (
              <PokemonType type={pokemon.type.name} />
            ))}
          </Box>
          <img
            src={pokemon.sprites.other.official_artwork.front_default}
            alt="pokemon"
            height="130px"
            width="130px"
          />
        </Box>
      </Card>
    </Fade>
  );
};

export default PokemonCard;
