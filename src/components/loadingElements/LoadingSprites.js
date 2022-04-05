import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";

const LoadingSprites = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minWidth: "275px",
        minHeight: "200px",
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: theme.palette.loading,
        borderRadius: "15px",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        flexWrap: "wrap",
        padding: "20px",
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
          key={`${ind}-calculator-pokes`}
        >
          <Skeleton width="125px" height="25px" sx={{ marginBottom: "20px" }} />

          <Skeleton variant="circular" width="125px" height="125px" />
        </Box>
      ))}
    </Box>
  );
};

export default LoadingSprites;
