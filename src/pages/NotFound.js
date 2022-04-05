import React from "react";

import Box from "@mui/material/Box";
import snorlax from "../images/snorlax.png";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography
        fontFamily="monospace"
        fontWeight="500"
        fontSize="25px"
        m={5}
        align="center"
      >
        A wild Snorlax has appeared! It seems that he blocks this path...
      </Typography>
      <img src={snorlax} alt="sleepingSnorlax" />
      <Typography fontFamily="monospace" fontWeight="400" mt={2}>
        Click{" "}
        <Link
          onClick={() => navigate(-1)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          here
        </Link>{" "}
        to go back.
      </Typography>
    </Box>
  );
};

export default NotFound;
