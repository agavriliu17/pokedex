import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { typeColors } from "../colors";
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
        backgroundColor: typeColors[type],
        filter: "brightness(0.9)",
      }}
    >
      <Typography
        color="#fff"
        fontFamily="monospace"
        fontWeight={700}
        fontSize={15}
      >
        {capitalizeFirstLetter(type)}
      </Typography>
    </Box>
  );
};

export default PokemonType;
