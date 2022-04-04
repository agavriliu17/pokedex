import React from "react";

import Layout from "./Layout";
import Box from "@mui/material/Box";
import snorlax from "../images/snorlax.png";

const NotFound = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <img src={snorlax} alt="sleepingSnorlax" />
      </Box>
    </Layout>
  );
};

export default NotFound;
