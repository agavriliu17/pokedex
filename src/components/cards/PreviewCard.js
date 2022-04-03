import { useState, useContext } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MenuContext from "../../resources/context/MenuContext";

import PokemonType from "../PokemonType";
import {
  capitalizeFirstLetter,
  formatNumber,
} from "../../resources/pokemonHelper";
import { typeColors } from "../../colors";
import { useNavigate } from "react-router-dom";

const PreviewCard = ({ pokemon }) => {
  const [hovered, setHovered] = useState(false);
  const { selectPokemon } = useContext(MenuContext);
  const navigate = useNavigate();

  const cardColor = typeColors[pokemon.types[0].type.name];

  return (
    <>
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
            borderRadius: "15px",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onContextMenu={() => selectPokemon(pokemon.id)}
          onClick={() => navigate(`/pokemon/${pokemon.id}`)}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />

              <Typography
                color="#fff"
                fontFamily="monospace"
                fontWeight={700}
                fontSize={20}
              >
                {formatNumber(pokemon.id)}
              </Typography>
            </Box>
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
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt="pokemon"
              height="130px"
              width="130px"
            />
          </Box>
        </Card>
      </Fade>
    </>
  );
};

export default PreviewCard;
