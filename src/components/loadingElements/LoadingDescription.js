import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingDescription = () => {
  return (
    <Box
      sx={{
        "@media (max-width: 550px)": {
          width: "300px",
        },
      }}
    >
      {[...Array(5)].map((el, ind) => (
        <Skeleton
          variant="text"
          width="100%"
          height="20px"
          key={ind}
          animation="wave"
        />
      ))}
    </Box>
  );
};

export default LoadingDescription;
