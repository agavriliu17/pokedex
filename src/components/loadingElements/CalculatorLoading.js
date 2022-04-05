import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";

const CalculatorLoading = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: theme.palette.loading,
        borderRadius: "15px",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <Skeleton width="100px" height="25px" sx={{ marginBottom: "5px" }} />
        <Skeleton width="250px" height="50px" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Skeleton width="100px" height="25px" sx={{ marginBottom: "5px" }} />
        <Skeleton width="250px" height="50px" />
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Skeleton width="100px" height="25px" sx={{ marginBottom: "5px" }} />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {[...Array(4)].map((el, ind) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
              key={`${ind}-sprites`}
            >
              <Skeleton variant="circular" width="45px" height="45px" />
            </Box>
          ))}
        </Box>
        <Skeleton width="75px" height="50px" sx={{ marginTop: "15px" }} />
      </Box>
    </Box>
  );
};

export default CalculatorLoading;
