import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { capitalizeFirstLetter } from "./PokemonCard";
import { primaryColors } from "../colors";
import pokeBall from "../pokeBall.png";

const SearchPokemons = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Paper sx={{ width: "500px" }}>
        <TextField
          placeholder="Search pokemons by name or type"
          variant="outlined"
          fullWidth
        />
      </Paper>
      <Paper sx={{ width: "150px", marginLeft: "10px", marginRight: "10px" }}>
        <Select displayEmpty fullWidth>
          {Object.keys(primaryColors).map((type, index) => (
            <MenuItem key={`${type}-${index}`}>
              {capitalizeFirstLetter(type)}
            </MenuItem>
          ))}
        </Select>
      </Paper>
      <Tooltip title="Search">
        <IconButton variant="contained" color="error">
          <img src={pokeBall} alt="pokeball" width="40px" height="40px" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SearchPokemons;
