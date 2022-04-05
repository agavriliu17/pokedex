import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";

const LoadingStatsCard = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "400px",
        height: "150px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.loading,
        borderRadius: "15px",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        padding: "20px",
      }}
    >
      {[...Array(5)].map((el, ind) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <Skeleton
            width={60}
            height="20px"
            sx={{ marginRight: "10px" }}
            animation="wave"
          />
          <Skeleton
            variant="text"
            width="100%"
            height="20px"
            key={ind}
            animation="wave"
          />
        </Box>
      ))}
    </Box>
  );
};

export default LoadingStatsCard;
