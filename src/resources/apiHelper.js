import axios from "axios";

export const getPokemons = async (url) => {
  const data = await axios.get(url).then((res) => res.data);

  const promises = data.results.map((result) => axios.get(result.url));

  const resolvedData = await Promise.all(promises).then((res) =>
    res.map((pokemon) => pokemon.data)
  );

  return resolvedData;
};

export const getPokemon = async (id) => {
  const data = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.data);

  return data;
};

export const getPokemonAbilities = async (abilities) => {
  const promises = abilities.map((result) => axios.get(result.ability.url));

  const resolvedData = await Promise.all(promises).then((res) =>
    res.map((ability) => ability.data)
  );

  return resolvedData;
};

export const getPokemonSpecies = async (id) => {
  const data = await axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.data);

  return data;
};

export const getAllEvolutions = async (chain) => {
  const initial = getPokemon(chain?.species?.name);
  const evolutions = [];

  const evos = [initial];

  // eslint-disable-next-line array-callback-return
  chain.evolves_to.map((evolution) => {
    const firstEvolution = getPokemon(evolution.species.name);
    evos.push(firstEvolution);

    if (evolution.evolves_to?.length) {
      for (const secondEvolution of evolution.evolves_to) {
        const second = getPokemon(secondEvolution.species.name);
        evos.push(second);
      }
    }
  });

  const resolved = await Promise.all(evos);

  // eslint-disable-next-line array-callback-return
  chain.evolves_to.map((evolution) => {
    const initialEvolution = resolved.find(
      (pokemon) => pokemon.name === chain?.species?.name
    );
    const firstEvolution = resolved.find(
      (pokemon) => pokemon.name === evolution.species.name
    );
    const evolutionLine = [initialEvolution, firstEvolution];

    if (evolution.evolves_to.length) {
      for (const secondEvolution of evolution.evolves_to) {
        const second = resolved.find(
          (pokemon) => pokemon.name === secondEvolution.species.name
        );
        evolutions.push([...evolutionLine, second]);
      }
    } else {
      evolutions.push(evolutionLine);
    }
  });

  return evolutions;
};

export const fetchEvolutionChain = (url) => {
  if (url) {
    return axios.get(url);
  }
  return null;
};
