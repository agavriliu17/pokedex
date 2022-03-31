import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import StatsCard from "../components/cards/StatsCard";

import { typeColors } from "../colors";

import { getPokemon } from "../helpers/apiHelper";
import PokemonType from "../components/PokemonType";
import MainCard from "../components/cards/MainCard";

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const data = await getPokemon(pokemonId);

        setPokemon(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (pokemon.types) setColor(typeColors[pokemon.types[0].type.name]);
  }, [pokemon]);

  console.log(pokemon);

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
              }}
            >
              <MainCard pokemon={pokemon} color={color} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "20px",
                }}
              >
                <Box sx={{ width: "400px" }}>
                  <Typography>Description</Typography>
                  <Typography>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi tortor neque, feugiat ut risus quis, ornare egestas
                    velit. Suspendisse eu dui semper, efficitur purus ac,
                    aliquam sem. Donec eu metus in nibh porttitor porta sit amet
                    semper ante. Donec congue porta lectus a lobortis. Duis
                    consequat et enim et porttitor. "
                  </Typography>
                </Box>
                <Box>
                  <Typography>Stats</Typography>
                  <StatsCard cardColor={color} stats={pokemon.stats} />
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography>Evolutions</Typography>
              <Card
                sx={{
                  width: "1050px",
                  height: "200px",
                  backgroundColor: color,
                }}
              ></Card>
            </Box>
          </>
        )}
      </Container>
    </Paper>
  );
};

export default Pokemon;
