import React from "react";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

const ScrollToTop = () => {
  return (
    <Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          margin: 0,
          top: "auto",
          right: 50,
          bottom: 50,
          left: "auto",
          position: "fixed",
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ScrollToTop();
