import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import StatsCard from "../components/cards/StatsCard";

import { typeColors } from "../colors";
import axios from "axios";

import {
  getPokemon,
  getPokemonSpecies,
  getAllEvolutions,
} from "../helpers/apiHelper";
import OutlinedInput from "@mui/material/OutlinedInput";
import { normalizeString } from "../helpers/pokemonHelper";
import MainCard from "../components/cards/MainCard";
import EvolutionsCard from "../components/cards/EvolutionsCard";
import SpritesCard from "../components/cards/SpritesCard";
import CatchRateCard from "../components/cards/CatchRateCard";

const fetchEvolutionChain = (url) => {
  if (url) {
    return axios.get(url);
  }
  return null;
};

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [species, setSpecies] = useState({});
  const [evoChain, setEvoChain] = useState([]);

  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);
  const allDescriptions = species?.flavor_text_entries?.filter(
    (entry) => entry?.language?.name === "en"
  );
  const [currDesc, setCurrDesc] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const data = await getPokemon(pokemonId);
        const specieData = await getPokemonSpecies(pokemonId);

        setCurrDesc(specieData.flavor_text_entries[0]);
        setPokemon(data);
        setSpecies(specieData);

        if (specieData.evolution_chain?.url) {
          const evolutions = await fetchEvolutionChain(
            specieData?.evolution_chain?.url
          );
          const allEvo = await getAllEvolutions(evolutions?.data.chain);
          setEvoChain(allEvo || []);
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pokemon.types) setColor(typeColors[pokemon.types[0].type.name]);
  }, [pokemon]);

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
        {!loading && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <MainCard pokemon={pokemon} color={color} species={species} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "25px",
                }}
              >
                <Box
                  sx={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontFamily="monospace"
                      fontWeight="400"
                      mb="10px"
                    >
                      Description
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontFamily="monospace"
                        fontWeight="400"
                        mb="10px"
                      >
                        Game:
                      </Typography>
                      <Paper
                        sx={{
                          width: "150px",
                          borderRadius: "30px",
                          marginBottom: "10px",
                        }}
                      >
                        <Select
                          input={<OutlinedInput placeholder="Chip" />}
                          label="Age"
                          MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                          sx={{
                            width: "100%",
                            height: "25px",
                            borderRadius: "30px",
                          }}
                          value={currDesc}
                          onChange={(ev) => setCurrDesc(ev.target.value)}
                        >
                          {allDescriptions.map((game, index) => (
                            <MenuItem
                              value={game}
                              key={`${game.version.name}-${index}`}
                            >
                              {normalizeString(game.version.name)}
                            </MenuItem>
                          ))}
                        </Select>
                      </Paper>
                    </Box>
                  </Box>
                  <Typography fontFamily="monospace">
                    {currDesc.flavor_text}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontFamily="monospace"
                    fontWeight="400"
                    mb="10px"
                  >
                    Stats
                  </Typography>
                  <StatsCard cardColor={color} stats={pokemon.stats} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ margin: "25px 50px", width: "100%" }}>
              <Typography
                variant="h5"
                fontFamily="monospace"
                fontWeight="400"
                mb="15px"
                mt="15px"
                ml="25px"
              >
                Evolutions
              </Typography>
              {evoChain.map((evolution, index) => (
                <EvolutionsCard
                  color={color}
                  evolutions={evolution}
                  key={index}
                />
              ))}
            </Box>
            <Box
              sx={{
                marginTop: "25px",
                marginBottom: "25px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <CatchRateCard
                cardColor={color}
                catchRate={species.capture_rate}
                pokemonHealth={pokemon.stats[0].base_stat}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "25px",
                }}
              >
                <Typography
                  variant="h5"
                  fontFamily="monospace"
                  fontWeight="400"
                  mb="15px"
                  mt="15px"
                >
                  Sprites
                </Typography>
                <SpritesCard color={color} pokemon={pokemon} />
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Paper>
  );
};

export default Pokemon;
