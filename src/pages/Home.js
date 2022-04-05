import { useState, useEffect, useContext } from "react";

import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MenuContext from "../resources/context/MenuContext";

import Box from "@mui/material/Box";

import { getPokemons } from "../resources/apiHelper";
import UnknownPokemon from "../components/cards/UnknownPokemon";
import SearchPokemons from "../components/SearchPokemons";
import PreviewCard from "../components/cards/PreviewCard";
import LoadingPreviewCard from "../components/loadingElements/LoadingPreviewCard";

import PokemonMenu from "../components/cards/PokemonMenu";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", type: "" });
  const [value, setValue] = useState(0);
  const { favoritePokemons } = useContext(MenuContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const filteredPokemons = pokemons.filter((pokemon) => {
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
    <>
      <SearchPokemons applyFilters={applyFilters} filters={filters} />

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="All Pokemons" sx={{ textTransform: "none" }} />
        <Tab label="Favorites" sx={{ textTransform: "none" }} />
      </Tabs>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {value === 0 ? (
          <>
            {loading ? (
              [...Array(9)].map((el, ind) => <LoadingPreviewCard key={ind} />)
            ) : (
              <>
                {filteredPokemons.length !== 0 ? (
                  filteredPokemons.map((pokemon, index) => (
                    <PreviewCard
                      pokemon={pokemon}
                      key={`${pokemon.id}-${index}`}
                    />
                  ))
                ) : (
                  <UnknownPokemon />
                )}
              </>
            )}
          </>
        ) : favoritePokemons.length !== 0 ? (
          favoritePokemons.map((fav, index) => (
            <PreviewCard pokemon={fav} key={`${fav.id}-${index}`} />
          ))
        ) : (
          <>
            <Typography
              fontFamily="monospace"
              fontWeight="400"
              align="center"
              fontSize="25px"
            >
              Seems like you don't have any favorite pokemons yet.
            </Typography>
            <Typography
              fontFamily="monospace"
              fontWeight="400"
              align="center"
              fontSize="20px"
              mt={3}
            >
              If you want to save them here, you can click on the heart icon in
              the pokemon's details page, or while on the home page right-click
              on the pokemon to open an special menu and you'll see the add to
              favorites option.
            </Typography>
          </>
        )}
      </Box>
      <PokemonMenu />
    </>
  );
}

export default Home;
