import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

import StatsCard from "../components/cards/StatsCard";
import MainCard from "../components/cards/MainCard";
import EvolutionsCard from "../components/cards/EvolutionsCard";
import SpritesCard from "../components/cards/SpritesCard";
import CatchRateCard from "../components/cards/CatchRateCard";
import NavigateButtons from "../components/NavigateButtons";

import Skeleton from "@mui/material/Skeleton";
import LoadingEvolutions from "../components/loadingElements/LoadingEvolutions";
import LoadingSprites from "../components/loadingElements/LoadingSprites";
import LoadingMainCard from "../components/loadingElements/LoadingMainCard";
import CalculatorLoading from "../components/loadingElements/CalculatorLoading";
import LoadingStatsCard from "../components/loadingElements/LoadingStatsCard";
import LoadingDescription from "../components/loadingElements/LoadingDescription";

import {
  getPokemon,
  getPokemonSpecies,
  getAllEvolutions,
} from "../resources/apiHelper";
import { normalizeString } from "../resources/pokemonHelper";
import { useParams } from "react-router";
import { useTheme } from "@mui/material/styles";
import { typeColors } from "../colors";

import axios from "axios";

const fetchEvolutionChain = (url) => {
  if (url) {
    return axios.get(url);
  }
  return null;
};

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = React.useState({});
  const [species, setSpecies] = React.useState({});
  const [evoChain, setEvoChain] = React.useState([]);

  const [currDesc, setCurrDesc] = React.useState("");
  const [color, setColor] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const theme = useTheme();

  const allDescriptions = species?.flavor_text_entries?.filter(
    (entry) => entry?.language?.name === "en"
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);

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
  }, [pokemonId]);

  React.useEffect(() => {
    if (pokemon.types) setColor(typeColors[pokemon.types[0].type.name]);
  }, [pokemon]);

  return (
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
        <NavigateButtons pokemonId={pokemonId} />
        {loading ? (
          <LoadingMainCard />
        ) : (
          <MainCard pokemon={pokemon} color={color} species={species} />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "25px",
            "@media (max-width: 800px)": {
              justifyContent: "center",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
              "@media (min-width: 800px)": {
                width: "400px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                "@media (max-width: 800px)": {
                  flexDirection: "column",
                  justifyItems: "center",
                },
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
                {loading ? (
                  <Skeleton
                    width="150px"
                    height="40px"
                    sx={{ marginBottom: "10px" }}
                  />
                ) : (
                  <Paper
                    sx={{
                      width: "150px",
                      borderRadius: "30px",
                      marginBottom: "10px",
                      backgroundColor:
                        theme.palette.mode === "light" ? "#fff" : "#2d333b",
                    }}
                  >
                    <Select
                      input={<OutlinedInput placeholder="Chip" />}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 200,
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "#fff"
                                : "#2d333b",
                          },
                        },
                      }}
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
                )}
              </Box>
            </Box>
            {loading ? (
              <LoadingDescription />
            ) : (
              <Typography fontFamily="monospace">
                {currDesc.flavor_text}
              </Typography>
            )}
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
            {loading ? (
              <LoadingStatsCard />
            ) : (
              <StatsCard cardColor={color} stats={pokemon.stats} />
            )}
          </Box>
        </Box>
      </Box>
      {evoChain.length > 0 && (
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
          {loading ? (
            <LoadingEvolutions />
          ) : (
            evoChain.map((evolution, index) => (
              <EvolutionsCard
                color={color}
                evolutions={evolution}
                key={index}
              />
            ))
          )}
        </Box>
      )}
      <Box
        sx={{
          marginBottom: "25px",
          display: "flex",
          flexDirection: "row",
          "@media (max-width: 800px)": {
            flexDirection: "column",
            justifyItems: "center",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", margin: "25px" }}>
          <Typography
            fontFamily="monospace"
            fontWeight="400"
            fontSize="24px"
            mb="15px"
            mt="15px"
          >
            Catch Rate Calculator
          </Typography>
          {loading ? (
            <CalculatorLoading />
          ) : (
            <CatchRateCard
              cardColor={color}
              catchRate={species.capture_rate}
              pokemonHealth={pokemon.stats[0].base_stat}
            />
          )}
        </Box>
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
          {loading ? (
            <LoadingSprites />
          ) : (
            <SpritesCard color={color} pokemon={pokemon} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Pokemon;
