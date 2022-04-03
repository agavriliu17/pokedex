import React from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "@mui/material/Button";

import pokeball from "../../images/pokeballs/Simple-pokeball.png";
import greatball from "../../images/pokeballs/Great-ball.png";
import masterball from "../../images/pokeballs/Master-ball.png";
import InfoIcon from "@mui/icons-material/Info";

const pokemonStatus = [
  "Normal",
  "Poisoned",
  "Burned",
  "Paralyzed",
  "Frozen",
  "Asleep",
];

const statusAilment = {
  Normal: 0,
  Poisoned: 12,
  Burned: 12,
  Paralyzed: 12,
  Frozen: 25,
  Asleep: 25,
};

const ballMod = {
  pokeball: 255,
  greatball: 200,
  masterball: 150,
};

const CatchRateCard = ({ cardColor, catchRate, pokemonHealth }) => {
  const [calculated, setCalculated] = React.useState(false);
  const [catchPercentage, setCatchPercentage] = React.useState(0);
  const [form, setForm] = React.useState({
    status: "Normal",
    health: 100,
    pokeball: "",
  });

  const handleInputUpdate = (ev, key) => {
    setForm({ ...form, [key]: ev.target.value });
  };

  const handleCheckUpdate = (pokeball, key) => {
    setForm({ ...form, [key]: pokeball });
  };

  const calculateCatchRate = () => {
    //TODO: Validate data
    const p0 = statusAilment[form.status] / (ballMod[form.pokeball] + 1);

    const f =
      ((pokemonHealth * 255 * 4) / parseInt(form.health)) *
      pokemonHealth *
      0.01 *
      12;

    const p1 = ((catchRate / (ballMod[form.pokeball] + 1)) * (f + 1)) / 256;

    setCalculated(true);
    const rate = Math.floor(p0 + p1);
    setCatchPercentage(Math.min(rate, 100));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "300px",
        minHeight: "400px",
        backgroundColor: cardColor,
        padding: "20px",
        margin: "25px",
        borderRadius: "15px",
      }}
    >
      <Typography
        fontFamily="monospace"
        fontWeight="400"
        mb="25px"
        fontSize="24px"
      >
        Catch Rate Calculator
      </Typography>
      {!calculated ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              fontFamily="monospace"
              fontWeight="400"
              mr="10px"
              fontSize="20px"
            >
              Pokemon status:
            </Typography>
            <Select
              input={<OutlinedInput placeholder="Chip" />}
              label="Age"
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              sx={{
                width: "250px",
                height: "25px",
                borderRadius: "30px",
              }}
              value={form.status}
              onChange={(ev) => handleInputUpdate(ev, "status")}
            >
              {pokemonStatus.map((statusOption, index) => (
                <MenuItem key={`${statusOption}-${index}`} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Typography
              fontFamily="monospace"
              fontWeight="400"
              mr="10px"
              fontSize="20px"
            >
              Current Health:
            </Typography>
            <OutlinedInput
              type="number"
              inputProps={{ min: "0", max: "100", step: "5" }}
              sx={{
                width: "250px",
                height: "25px",
                borderRadius: "30px",
              }}
              value={form.health}
              onChange={(ev) => handleInputUpdate(ev, "health")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Typography
              fontFamily="monospace"
              fontWeight="400"
              mr="10px"
              fontSize="20px"
            >
              Select your pokeball:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                checked={form.pokeball === "pokeball"}
                onChange={() => handleCheckUpdate("pokeball", "pokeball")}
                label={
                  <img
                    src={pokeball}
                    alt="simple-pokeball"
                    height="40px"
                    width="40px"
                  />
                }
                labelPlacement="top"
                sx={{ padding: "0px" }}
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={form.pokeball === "greatball"}
                onChange={() => handleCheckUpdate("greatball", "pokeball")}
                label={
                  <img
                    src={greatball}
                    alt="simple-pokeball"
                    height="40px"
                    width="40px"
                  />
                }
                labelPlacement="top"
                sx={{ padding: "0px" }}
              />
              <FormControlLabel
                control={<Checkbox />}
                checked={form.pokeball === "masterball"}
                onChange={() => handleCheckUpdate("masterball", "pokeball")}
                label={
                  <img
                    src={masterball}
                    alt="simple-pokeball"
                    height="40px"
                    width="40px"
                  />
                }
                labelPlacement="top"
                sx={{ padding: "0px" }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={calculateCatchRate}
            >
              Catch!
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <Tooltip title={"learn more"}>
              <InfoIcon />
            </Tooltip>
          </Box>
          <Typography
            fontFamily="monospace"
            fontWeight="400"
            mr="10px"
            fontSize="20px"
          >
            {`Success rate: ${catchPercentage}%`}
          </Typography>
          <CircularProgress value={catchPercentage} variant="determinate" />
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={() => setCalculated(false)}
          >
            Calculate again
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default CatchRateCard;
