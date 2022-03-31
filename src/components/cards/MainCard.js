import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PokemonType from "../PokemonType";
import {
  capitalizeFirstLetter,
  formatNumber,
} from "../../helpers/pokemonHelper";

const MainCard = ({ pokemon, color }) => {
  return (
    <Card
      sx={{
        width: "500px",
        height: "600px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          margin: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            color="#fff"
            fontFamily="monospace"
            fontWeight={700}
            fontSize={30}
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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {pokemon.types.map((pokemon, index) => (
            <PokemonType
              type={pokemon.type.name}
              key={`${pokemon.type.name}-${index}`}
            />
          ))}
        </Box>
      </Box>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt="pokemon"
        height="400px"
        width="400px"
      />
    </Card>
  );
};

export default MainCard;
