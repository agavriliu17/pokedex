import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import LinearProgress from "@mui/material/LinearProgress";
import { normalizeString } from "../../resources/pokemonHelper";

const StatsCard = ({ cardColor, stats }) => {
  //TODO: Fix for values >100
  return (
    <Card
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
                  <LinearProgress
                    variant="determinate"
                    value={stat.base_stat}
                    color="error"
                    sx={{
                      borderRadius: "20px",
                      height: "8px",
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
