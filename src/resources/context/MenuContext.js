import { createContext, useState, useEffect } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [favoritePokemons, setFavoritesPokemons] = useState([]);

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
    <MenuContext.Provider
      value={{
        selectedPokemon,
        selectPokemon,
        favoritePokemons,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
