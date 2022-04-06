import React from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

const NavigateButtons = ({ pokemonId }) => {
  const navigate = useNavigate();

  const handlePreviousPokemon = () => {
    navigate(`/pokemon/${pokemonId - 1}`);
  };

  const handleNextPokemon = () => {
    navigate(`/pokemon/${parseInt(pokemonId) + 1}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Tooltip title="Previous pokemon">
        <IconButton
          onClick={handlePreviousPokemon}
          disabled={pokemonId === "1"}
          sx={{
            marginLeft: "25px",
            "@media (max-width: 550px)": {
              margin: 0,
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Next pokemon">
        <IconButton onClick={handleNextPokemon} disabled={pokemonId === "898"}>
          <ArrowForwardIosIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NavigateButtons;
