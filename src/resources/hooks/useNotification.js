import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { capitalizeFirstLetter } from "../pokemonHelper";

import { useSnackbar } from "react-simple-snackbar";

const options = {
  style: {
    backgroundColor: "#e25822",
    fontSize: "20px",
    textAlign: "center",
  },
};

export const useStreaksNotification = () => {
  const [openSnackbar] = useSnackbar(options);

  function openStreakNotification(count) {
    openSnackbar(
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LocalFireDepartmentIcon />

        <Typography fontFamily="monospace" ml={5}>
          {`You're on fire! ${count} Pokemons guessed!`}
        </Typography>
      </Box>,
      3000
    );
  }

  return [openStreakNotification];
};

export const usePokemonNotification = () => {
  const [openSnackbar] = useSnackbar();

  function showPokemonName(pokemon) {
    openSnackbar(
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography fontFamily="monospace" ml={5}>
          {`That pokemon was ${capitalizeFirstLetter(pokemon)}!`}
        </Typography>
      </Box>,
      3000
    );
  }

  return [showPokemonName];
};
