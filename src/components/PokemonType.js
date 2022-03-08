import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { primaryColors } from "../colors";
import { capitalizeFirstLetter } from "./PokemonCard";

const PokemonType = ({ type }) => {
  return (
    <Box
      sx={{
        borderRadius: "5px",
        marginBottom: "10px",
        padding: "7px",
        textAlign: "center",
        width: "80px",
        backgroundColor: primaryColors[type],
        filter: "brightness(0.9)",
      }}
    >
      <Typography color="#fff">{capitalizeFirstLetter(type)}</Typography>
    </Box>
  );
};

export default PokemonType;
