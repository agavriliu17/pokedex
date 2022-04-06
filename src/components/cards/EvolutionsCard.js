import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PokemonType from "../PokemonType";

import {
  capitalizeFirstLetter,
  formatNumber,
} from "../../resources/pokemonHelper";
import { typeColors } from "../../colors";
import { useNavigate } from "react-router-dom";

const EvolutionsCard = ({ color, evolutions }) => {
  const navigate = useNavigate();

  const hoverColor = typeColors.hover[evolutions[0].types[0].type.name];

  return (
    <Card
      raised
      sx={{
        minHeight: "200px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: "25px",
        alignItems: "center",
        padding: "20px",
        flexWrap: "wrap",
        borderRadius: "15px",
      }}
    >
      {evolutions.map((evo, index) => (
        <Box
          key={index}
          sx={{
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            padding: "15px",
            borderRadius: "15px",
            margin: "10px",
            transition: "background 0.3s, color 0.3s",
            "&:hover": {
              backgroundColor: hoverColor,
              cursor: "pointer",
            },
          }}
          onClick={() => navigate(`/pokemon/${evo.id}`)}
        >
          <Typography
            fontFamily="monospace"
            fontWeight="700"
            align="center"
            fontSize="20px"
          >
            {capitalizeFirstLetter(evo.name)}
          </Typography>
          <Typography fontFamily="monospace" fontWeight="500" align="center">
            {formatNumber(evo.id)}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={evo.sprites.other["official-artwork"].front_default}
              alt="pokemon"
              height="150px"
              width="150px"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {evo.types.map((pokemon, index) => (
              <PokemonType
                type={pokemon.type.name}
                key={`${pokemon.type.name}-${index}`}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Card>
  );
};

export default EvolutionsCard;
