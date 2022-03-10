import { useState } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import pokemonsData from "./data.json";
import UnknownPokemon from "./components/UnknownPokemon";
import SearchPokemons from "./components/SearchPokemons";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [filters, setFilters] = useState({ name: "", type: "" });

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const searchType = (pokemon) => {
    const searchedType = pokemon.types.map((item) => {
      if (item.type.name === filters.type) return item;
      return null;
    });
    if (searchedType[0] || searchedType[1]) return true;
    return false;
  };

  const filteredPokemons = pokemonsData.filter((pokemon) => {
    if (filters.name === "" && filters.type === "") {
      return pokemon;
    } else if (filters.name !== "") {
      if (
        pokemon.name.toLocaleLowerCase() === filters.name.toLocaleLowerCase() ||
        pokemon.id.toString() === filters.name
      ) {
        if (filters.type === "") {
          return pokemon;
        } else if (searchType(pokemon)) return pokemon;
      }
    } else if (filters.type !== "" && searchType(pokemon)) {
      return pokemon;
    }
    return null;
  });

  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fff7e8",
        display: "flex",
        justifyContent: "center",
      }}
      elevation={3}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton href="https://github.com/agavriliu17/fiipractic-bytex-pokedex">
            <GitHubIcon sx={{ color: "#000", fontSize: "40px" }} />
          </IconButton>
        </Box>

        <Typography variant="h1" mt={2} mb={5}>
          Pokedex
        </Typography>
        <SearchPokemons applyFilters={applyFilters} filters={filters} />

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {filteredPokemons.length !== 0 ? (
            filteredPokemons.map((pokemon, index) => (
              <PokemonCard pokemon={pokemon} key={`${pokemon.id}-${index}`} />
            ))
          ) : (
            <UnknownPokemon />
          )}
        </Box>
      </Container>
    </Paper>
  );
}

export default App;
