import React from "react";

import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import Fade from "react-reveal/Fade";

import footerLight from "../images/footer/footerLight.svg";
import footerDark from "../images/footer/footerDark.svg";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  const handleGithubRedirect = () => {
    window.open("https://github.com/agavriliu17/fiipractic-bytex-pokedex");
  };

  const handleLinkedInRedirect = () => {
    window.open("https://www.linkedin.com/in/alin-adrian-gavriliu-69166623a/");
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
        <Fade cascade>
          <IconButton
            onClick={handleGithubRedirect}
            sx={{ height: "fit-content", marginRight: "25px" }}
          >
            <GitHubIcon sx={{ fontSize: "50px" }} />
          </IconButton>
          <IconButton
            onClick={handleLinkedInRedirect}
            sx={{ height: "fit-content", marginLeft: "25px" }}
          >
            <LinkedInIcon sx={{ fontSize: "50px" }} />
          </IconButton>
        </Fade>
      </Box>
    </Box>
  );
};
export default Footer;
