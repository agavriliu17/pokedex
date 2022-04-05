import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingDescription = () => {
  return (
    <Box>
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
