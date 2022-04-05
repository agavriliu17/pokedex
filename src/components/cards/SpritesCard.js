import React from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Sprite({ title, imgSource }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        fontFamily="monospace"
        fontWeight="400"
        mb="10px"
      >
        {title}
      </Typography>
      <img src={imgSource} alt="Pokemon" height="150px" width="150px" />
    </Box>
  );
}

const SpritesCard = ({ color, pokemon }) => {
  const { front_default, back_default, front_shiny, back_shiny } =
    pokemon.sprites;
  return (
    <Card
      raised
      sx={{
        width: "100%",
        minHeight: "200px",
        backgroundColor: color,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        flexWrap: "wrap",
        borderRadius: "15px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {front_default && <Sprite title="Front" imgSource={front_default} />}
        {back_default && <Sprite title="Back" imgSource={back_default} />}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {front_shiny && <Sprite title="Front Shiny" imgSource={front_shiny} />}
        {back_shiny && <Sprite title="Back Shiny" imgSource={back_shiny} />}
      </Box>
    </Card>
  );
};

export default SpritesCard;
