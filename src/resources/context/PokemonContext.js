import { createContext, useState } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [favoritePokemons, setFavoritesPokemons] = useState({});

  const addToFavorites = (pokemon) =>
    setFavoritesPokemons([...favoritePokemons, pokemon]);

  const removeFromFavorites = (pokemon) => {
    console.log(pokemon);
  };

  return (
    <PokemonContext.Provider
      value={{ favoritePokemons, addToFavorites, removeFromFavorites }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
