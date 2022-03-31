import Card from "@mui/material/Card";

const StatsCard = ({ cardColor, stats }) => {
  console.log(stats);
  return (
    <Card
      sx={{
        width: "400px",
        height: "200px",
        backgroundColor: cardColor,
      }}
    >
      Sttats
    </Card>
  );
};

export default StatsCard;
