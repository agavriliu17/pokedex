import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { typeColors } from "../colors";
import { capitalizeFirstLetter, getTypeIcon } from "../resources/pokemonHelper";

const PokemonType = ({ type }) => {
  return (
    <Box
      sx={{
        borderRadius: "5px",
        marginBottom: "10px",
        padding: "7px",
        textAlign: "center",
        minWidth: "80px",
        height: "25px",
        backgroundColor: typeColors[type],
        filter: "brightness(0.9)",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        margin: "5px",
      }}
    >
      <img src={getTypeIcon(type)} alt="typeIcon" height="15px" width="15px" />
      <Typography
        color="#fff"
        fontFamily="monospace"
        fontWeight={700}
        fontSize={15}
        ml="15px"
      >
        {capitalizeFirstLetter(type)}
      </Typography>
    </Box>
  );
};

export default PokemonType;
