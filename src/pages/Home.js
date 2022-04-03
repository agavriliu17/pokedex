import { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { getPokemons } from "../resources/apiHelper";
import pokemonsData from "../data.json";
import UnknownPokemon from "../components/cards/UnknownPokemon";
import SearchPokemons from "../components/SearchPokemons";
import PreviewCard from "../components/cards/PreviewCard";
import LoadingCard from "../components/cards/LoadingCard";

import PokemonMenu from "../components/cards/PokemonMenu";
import { MenuProvider } from "../resources/context/MenuContext";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", type: "" });

  useEffect(() => {
    (async function () {
      try {
        const data = await getPokemons();

        setPokemons(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
  }, []);

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

        <MenuProvider>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            {loading ? (
              [...Array(9)].map((el, ind) => <LoadingCard key={ind} />)
            ) : (
              <>
                {pokemons.length !== 0 ? (
                  pokemons.map((pokemon, index) => (
                    <PreviewCard
                      pokemon={pokemon}
                      key={`${pokemon.id}-${index}`}
                    />
                    // <LoadingCard />
                  ))
                ) : (
                  <UnknownPokemon />
                )}
              </>
            )}
          </Box>
          <PokemonMenu />
        </MenuProvider>
      </Container>
    </Paper>
  );
}

export default Home;
