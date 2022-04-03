import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Cloud from "@mui/icons-material/Cloud";
import { useNavigate } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";

import useContextMenu from "../../resources/useContextMenu";
import MenuContext from "../../resources/context/MenuContext";
import Box from "@mui/material/Box";

export default function PokemonMenu() {
  const { anchorPoint, show } = useContextMenu();
  const navigate = useNavigate();

  const { selectedPokemon, selectPokemon } = React.useContext(MenuContext);

  if (show) {
    return (
      <Paper
        sx={{
          width: 320,
          maxWidth: "100%",
          top: anchorPoint.y,
          left: anchorPoint.x,
          position: "absolute",
        }}
      >
        {selectedPokemon ? (
          <MenuList>
            <MenuItem onClick={() => navigate(`/pokemon/${selectedPokemon}`)}>
              <ListItemIcon>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>See more details</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add to favorites</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>ID: {selectedPokemon}</ListItemText>
            </MenuItem>
          </MenuList>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Typography align="center">
              Right click on any pokemon card to display custom actions
            </Typography>
          </Box>
        )}
      </Paper>
    );
  } else {
    selectPokemon(null);
    return <></>;
  }
}
