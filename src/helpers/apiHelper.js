import axios from "axios";

export const getPokemons = async () => {
  const data = await axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
    .then((res) => res.data);

  const promises = data.results.map((result) => axios.get(result.url));

  const resolvedData = await Promise.all(promises).then((res) =>
    res.map((pokemon) => pokemon.data)
  );

  //   return resolvedData;

  return new Promise((resolve) => {
    setTimeout(() => resolve(resolvedData), 3000);
  });
};

export const getPokemon = async (id) => {
  const data = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.data);

  return data;
};
