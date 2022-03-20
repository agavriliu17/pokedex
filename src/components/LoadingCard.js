import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingCard = () => {
  return (
    <Box
      sx={{
        width: "275px",
        height: "200px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D3D3D3",
      }}
    >
      <Skeleton width="225px" height="25px" sx={{ marginBottom: "20px" }} />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          width: "225px",
        }}
      >
        <Box>
          <Skeleton width="100px" height="25px" sx={{ marginBottom: "20px" }} />
          <Skeleton width="100px" height="25px" />
        </Box>
        <Skeleton variant="circular" width="100px" height="100px" />
      </Box>
    </Box>
  );
};

export default LoadingCard;
