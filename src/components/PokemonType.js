import Box from "@mui/material/Box";

const PokemonType = ({ type }) => {
  return (
    <Box
      sx={{
        borderRadius: "5px",
        marginBottom: "10px",
        padding: "7px",
        textAlign: "center",
        width: "80px",
      }}
    >
      {type}
    </Box>
  );
};

export default PokemonType;
