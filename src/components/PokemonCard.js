import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import { typeColors } from "../colors";

import PokemonType from "./PokemonType";
import { Typography } from "@mui/material";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonCard = ({ pokemon }) => {
  const formatNumber = (number) => {
    let id = number.toString();
    while (id.length < 3) id = "0" + id;
    return "#" + id;
  };

  const cardColor = typeColors[pokemon.types[0].type.name];

  return (
    <Fade in timeout={1000}>
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
          backgroundColor: cardColor,
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
          <Typography color="#fff">
            {capitalizeFirstLetter(pokemon.name)}
          </Typography>
          <Typography color="#fff">{formatNumber(pokemon.id)}</Typography>
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
            {pokemon.types.map((pokemon, index) => (
              <PokemonType
                type={pokemon.type.name}
                key={`${pokemon.type.name}-${index}`}
              />
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
