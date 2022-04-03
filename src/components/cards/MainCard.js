import { useContext } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MenuContext from "../../resources/context/MenuContext";

import PokemonType from "../PokemonType";
import {
  capitalizeFirstLetter,
  formatNumber,
} from "../../resources/pokemonHelper";

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
  const { favoritePokemons, addToFavorites, removeFromFavorites } =
    useContext(MenuContext);

  const isFavorite = favoritePokemons.find((fav) => fav.id === pokemon.id);

  const handleCheckbox = () => {
    if (isFavorite) removeFromFavorites(pokemon);
    else addToFavorites(pokemon);
  };

  return (
    <Card
      sx={{
        width: "500px",
        minHeight: "500px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "25px",
        borderRadius: "15px",
        padding: "15px",
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
          <Checkbox
            checked={isFavorite}
            onChange={handleCheckbox}
            icon={<FavoriteBorder fontSize="large" />}
            checkedIcon={
              <Favorite sx={{ color: "#7C0D0E" }} fontSize="large" />
            }
            sx={{ width: "fit-content" }}
          />
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
          marginBottom: "20px",
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
