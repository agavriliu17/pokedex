import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

import { normalizeString } from "../../resources/pokemonHelper";
import { useTheme } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

const StatsCard = ({ cardColor, stats }) => {
  const theme = useTheme();

  const calculateStatLevel = (score) => {
    if (score <= 40) return theme.palette.lowStat;
    else if (score < 100) return theme.palette.mediumStat;
    return theme.palette.highStat;
  };
  return (
    <Card
      raised
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "400px",
        height: "150px",
        backgroundColor: cardColor,
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      {stats.map((stat, index) => (
        <Box
          sx={{ display: "flex", alignItems: "center", flexDir: "row" }}
          key={index}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={5}>
              <Typography mr="5px" fontFamily="monospace">
                {normalizeString(stat.stat.name)}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Tooltip title={stat.base_stat} placement="right">
                <Box sx={{ width: "100%" }}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={stat.base_stat / 2}
                    sx={{
                      "& .MuiLinearProgress-barColorPrimary": {
                        backgroundColor: calculateStatLevel(stat.base_stat),
                      },
                    }}
                  />
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Card>
  );
};

export default StatsCard;
