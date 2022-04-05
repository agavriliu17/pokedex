import React from "react";

import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";

import footerLight from "../images/footer/footerLight.svg";
import footerDark from "../images/footer/footerDark.svg";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  const handleGithubRedirect = () => {
    window.open("https://github.com/agavriliu17/fiipractic-bytex-pokedex");
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          aspectRatio: 900 / 100,
          backgroundImage: `url(${
            theme.palette.mode === "light" ? footerLight : footerDark
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor:
            theme.palette.mode === "light" ? "#DBC9C5" : "#3C484F",
          height: "100px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={handleGithubRedirect}
          sx={{ height: "fit-content" }}
        >
          <GitHubIcon sx={{ fontSize: "50px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Footer;
