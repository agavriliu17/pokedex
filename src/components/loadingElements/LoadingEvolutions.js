import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { useTheme } from "@mui/material/styles";

const LoadingEvolutions = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minWidth: "275px",
        minHeight: "350px",
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: theme.palette.loading,
        borderRadius: "15px",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        flexWrap: "wrap",
      }}
    >
      {[...Array(3)].map((el, ind) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
          key={`${ind}-evolution`}
        >
          <Skeleton width="125px" height="25px" />
          <Skeleton width="75px" height="25px" sx={{ marginBottom: "10px" }} />

          <Skeleton variant="circular" width="150px" height="150px" />

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Skeleton
              width="100px"
              height="75px"
              sx={{ marginRight: "20px" }}
            />
            <Skeleton width="100px" height="75px" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default LoadingEvolutions;
