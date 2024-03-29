import { useState } from "react";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";

import {
  capitalizeFirstLetter,
  getRandomPokemon,
} from "../resources/pokemonHelper";
import { typeColors } from "../colors";
import pokeBall from "../images/pokeBall.png";
import greatBall from "../images/greatBall.png";

import { useNavigate } from "react-router-dom";

const SearchPokemons = ({ applyFilters, filters }) => {
  const [input, setInput] = useState("");
  const [selectedTypes, setTypes] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const searchPokemons = () => {
    applyFilters({ name: input, type: selectedTypes });
  };

  const resetFilters = () => {
    applyFilters({ name: "", type: "" });
    setInput("");
    setTypes("");
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTypes(value);
  };

  const handleFeelingLucky = () => {
    const randomId = getRandomPokemon();
    navigate(`/pokemon/${randomId}`);
  };

  return (
    <Fade in timeout={500}>
      <Box sx={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              minWidth: "300px",
              marginBottom: "5px",
              backgroundColor:
                theme.palette.mode === "light" ? "#fff" : "#2d333b",
            }}
          >
            <TextField
              placeholder="Search pokemons by name or type"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              value={input}
            />
          </Paper>

          <Box
            sx={{
              marginLeft: "10px",
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Paper
              sx={{
                width: "150px",
                marginRight: "10px",
                marginBottom: "5px",
                backgroundColor:
                  theme.palette.mode === "light" ? "#fff" : "#2d333b",
              }}
            >
              <Select
                displayEmpty
                fullWidth
                input={<OutlinedInput placeholder="Chip" />}
                value={selectedTypes}
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      backgroundColor:
                        theme.palette.mode === "light" ? "#fff" : "#2d333b",
                    },
                  },
                }}
              >
                <MenuItem value={""} disabled={selectedTypes === ""}>
                  Select type
                </MenuItem>
                {Object.keys(typeColors).map((type, index) => (
                  <MenuItem key={`${type}-${index}`} value={type}>
                    {capitalizeFirstLetter(type)}
                  </MenuItem>
                ))}
              </Select>
            </Paper>

            <Tooltip title="Search">
              <IconButton
                variant="contained"
                color="error"
                onClick={searchPokemons}
                sx={{ marginBottom: "5px" }}
              >
                <img src={pokeBall} alt="pokeball" width="40px" height="40px" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Feeling Lucky">
              <IconButton
                variant="contained"
                color="primary"
                onClick={handleFeelingLucky}
                sx={{ marginBottom: "5px" }}
              >
                <img
                  src={greatBall}
                  alt="great-ball"
                  width="40px"
                  height="40px"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {(filters.name !== "" || filters.type !== "") && (
          <Button
            variant="contained"
            sx={{ width: "120px", marginTop: "10px", textTransform: "none" }}
            onClick={resetFilters}
          >
            Reset filters
          </Button>
        )}
      </Box>
    </Fade>
  );
};

export default SearchPokemons;
