import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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
      <Paper sx={{ width: "150px", marginLeft: "10px" }}>
        <Select displayEmpty fullWidth>
          <MenuItem>Select type</MenuItem>
          <MenuItem>Grass</MenuItem>
          <MenuItem>Fire</MenuItem>
          <MenuItem>Water</MenuItem>
        </Select>
      </Paper>
    </Box>
  );
};

export default SearchPokemons;
