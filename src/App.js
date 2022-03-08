import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SearchPokemons from "./components/SearchPokemons";
import PokemonCard from "./components/PokemonCard";
import Box from "@mui/material/Box";

import pokemonsData from "./data.json";

import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";

function App() {
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fff7e8",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" mt={5} mb={5}>
          Pokedex
        </Typography>
        <SearchPokemons />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {pokemonsData.map((pokemon, index) => (
            <PokemonCard pokemon={pokemon} key={index} />
          ))}
        </Box>
      </Container>
    </Paper>
  );
}

export default App;
