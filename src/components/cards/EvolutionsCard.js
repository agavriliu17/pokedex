import React from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import PokemonType from "../PokemonType";

import {
  capitalizeFirstLetter,
  formatNumber,
} from "../../resources/pokemonHelper";

const EvolutionsCard = ({ color, evolutions }) => {
  const navigate = useNavigate();

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
        // <Link to={`/pokemon/${evo.id}`} id={evo.id}>
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            // "&:hover": {
            //   cursor: "grab",
            // },
            margin: "10px",
          }}
          // onClick={() => navigate(`/pokemon/${evo.id}`)}
        >
          <Typography
            fontFamily="monospace"
            fontWeight="700"
            align="center"
            fontSize="20px"
          >
            {capitalizeFirstLetter(evo.name)}
          </Typography>
          <Typography fontFamily="monospace" fontWeight="400" align="center">
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
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {evo.types.map((pokemon, index) => (
              <PokemonType
                type={pokemon.type.name}
                key={`${pokemon.type.name}-${index}`}
              />
            ))}
          </Box>
        </Box>
        // </Link>
      ))}
    </Card>
  );
};

export default EvolutionsCard;
