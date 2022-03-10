import { useState } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import PokemonType from "./PokemonType";
import { typeColors } from "../colors";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonCard = ({ pokemon }) => {
  const [hovered, setHovered] = useState(false);

  const formatNumber = (number) => {
    let id = number.toString();
    while (id.length < 3) id = "0" + id;
    return "#" + id;
  };

  const cardColor = typeColors[pokemon.types[0].type.name];

  return (
    <Fade in timeout={1000}>
      <Card
        raised={hovered}
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            width: "85%",
          }}
        >
          <Typography
            color="#fff"
            fontFamily="monospace"
            fontWeight={700}
            fontSize={20}
          >
            {capitalizeFirstLetter(pokemon.name)}
          </Typography>
          <Typography
            color="#fff"
            fontFamily="monospace"
            fontWeight={700}
            fontSize={20}
          >
            {formatNumber(pokemon.id)}
          </Typography>
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
