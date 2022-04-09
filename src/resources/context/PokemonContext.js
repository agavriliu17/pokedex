import { createContext, useState, useEffect } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [favoritePokemons, setFavoritesPokemons] = useState([]);
  const [gameGreetPlayed, setGameGreetPlayed] = useState(false);

  useEffect(() => {
    const savedFavPokemons = localStorage.getItem("favPokemons");

    if (savedFavPokemons) {
      setFavoritesPokemons(JSON.parse(savedFavPokemons));
    }
  }, []);

  const addToFavorites = (pokemon) => {
    setFavoritesPokemons([...favoritePokemons, pokemon]);
    localStorage.setItem(
      "favPokemons",
      JSON.stringify([...favoritePokemons, pokemon])
    );
  };

  const removeFromFavorites = (pokemon) => {
    setFavoritesPokemons(
      favoritePokemons.filter((fav) => pokemon.id !== fav.id)
    );
    localStorage.setItem(
      "favPokemons",
      JSON.stringify(favoritePokemons.filter((fav) => pokemon.id !== fav.id))
    );
  };

  const selectPokemon = (pokemon) => setSelectedPokemon(pokemon);

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        selectPokemon,
        favoritePokemons,
        addToFavorites,
        removeFromFavorites,
        gameGreetPlayed,
        setGameGreetPlayed,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
