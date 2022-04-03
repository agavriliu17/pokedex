import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PokemonType from "../PokemonType";
import {
  capitalizeFirstLetter,
  formatNumber,
} from "../../helpers/pokemonHelper";

const InfoBlock = ({ title, content }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography fontFamily="monospace" fontWeight="700" fontSize="20px">
        {title}
      </Typography>
      <Typography fontFamily="monospace" fontWeight="400">
        {content}
      </Typography>
    </Box>
  );
};

const MainCard = ({ pokemon, color, species }) => {
  return (
    <Card
      sx={{
        width: "500px",
        height: "600px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "25px",
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
          <Typography fontFamily="monospace" fontWeight={700} fontSize={30}>
            {capitalizeFirstLetter(pokemon.name)}
          </Typography>
          <Typography fontFamily="monospace" fontWeight={700} fontSize={20}>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <InfoBlock title="Weight" content={`${pokemon.weight / 10} kg`} />
        <InfoBlock title="Height" content={`${pokemon.height / 10} meters`} />
        <InfoBlock
          title="Color"
          content={`${capitalizeFirstLetter(species?.color?.name)}`}
        />
        <InfoBlock
          title="Habitat"
          content={`${capitalizeFirstLetter(species?.habitat?.name)}`}
        />
        <InfoBlock
          title="Shape"
          content={`${capitalizeFirstLetter(species?.shape?.name)}`}
        />
      </Box>
    </Card>
  );
};

export default MainCard;
