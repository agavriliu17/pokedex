import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";

const LoadingMainCard = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "500px",
        minHeight: "500px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: theme.palette.loading,
        borderRadius: "15px",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        padding: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          margin: "10px",
        }}
      >
        <Box>
          <Skeleton width="150px" height="25px" sx={{ marginBottom: "20px" }} />
          <Skeleton width="100px" height="25px" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Skeleton width="100px" height="50px" sx={{ marginRight: "10px" }} />
          <Skeleton width="100px" height="50px" />
        </Box>
      </Box>

      <Skeleton variant="circular" width="275px" height="275px" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {[...Array(4)].map((el, ind) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
            key={`${ind}-main-stats`}
          >
            <Skeleton
              width="100px"
              height="25px"
              sx={{ marginBottom: "10px" }}
            />
            <Skeleton width="75px" height="25px" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoadingMainCard;
