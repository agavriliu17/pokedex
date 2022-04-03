import { createContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState({});

  const selectPokemon = (pokemon) => setSelectedPokemon(pokemon);

  return (
    <MenuContext.Provider value={{ selectedPokemon, selectPokemon }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
