import React from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";

import Button from "@mui/material/Button";

import pokeball from "../../images/pokeballs/Simple-pokeball.png";
import greatball from "../../images/pokeballs/Great-ball.png";
import masterball from "../../images/pokeballs/Master-ball.png";
import CustomCircularProgress from "../CustomLoading";
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
    pokeball: "pokeball",
  });
  const theme = useTheme();

  const handleInputUpdate = (ev, key) => {
    setForm({ ...form, [key]: ev.target.value });
  };

  const handleCheckUpdate = (pokeball, key) => {
    setForm({ ...form, [key]: pokeball });
  };

  const calculateCatchRate = () => {
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

  //Will return the number of pokeballs needed to catch
  const calculatePokeballs = (rate) => {
    if (rate > 95) return "Success chance per ball is pretty high.";
    else if (rate > 50) {
      const pokeballs = 95 / rate + 1;

      return `You have a 95% chance of catching it within ${Math.ceil(
        pokeballs
      )} balls.`;
    } else {
      const pokeballs50 = 50 / rate;
      const pokeballs95 = 95 / rate;

      return `Thus, you have at least a 50% chance of catching it within ${Math.ceil(
        pokeballs50
      )} balls and at least a 95% chance of catching it within ${Math.ceil(
        pokeballs95
      )} balls.`;
    }
  };

  return (
    <Card
      raised
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
        minHeight: "400px",
        backgroundColor: cardColor,
        padding: "20px",
        borderRadius: "15px",
        justifyContent: "space-between",
      }}
    >
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
              mb="5px"
            >
              Pokemon status:
            </Typography>
            <Paper
              sx={{
                width: "250px",
                borderRadius: "30px",
                height: "35px",
                backgroundColor:
                  theme.palette.mode === "light" ? "#fff" : "#2d333b",
              }}
            >
              <Select
                input={<OutlinedInput placeholder="Chip" />}
                label="Age"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      backgroundColor:
                        theme.palette.mode === "light" ? "#fff" : "#2d333b",
                    },
                  },
                }}
                sx={{
                  width: "250px",
                  height: "35px",
                  borderRadius: "30px",
                }}
                value={form.status}
                onChange={(ev) => handleInputUpdate(ev, "status")}
              >
                {pokemonStatus.map((statusOption, index) => (
                  <MenuItem
                    key={`${statusOption}-${index}`}
                    value={statusOption}
                  >
                    {statusOption}
                  </MenuItem>
                ))}
              </Select>
            </Paper>
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
              mb="5px"
              fontSize="20px"
            >
              Current Health:
            </Typography>
            <Paper
              sx={{
                width: "250px",
                borderRadius: "30px",
                height: "35px",
                backgroundColor:
                  theme.palette.mode === "light" ? "#fff" : "#2d333b",
              }}
            >
              <OutlinedInput
                type="number"
                inputProps={{ min: "0", max: "100", step: "5" }}
                sx={{
                  width: "250px",
                  height: "35px",
                  borderRadius: "30px",
                }}
                value={form.health}
                onChange={(ev) => handleInputUpdate(ev, "health")}
              />
            </Paper>
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
              mb="5px"
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
            width: "300px",
          }}
        >
          <Typography
            fontFamily="monospace"
            fontWeight="400"
            mr="10px"
            fontSize="20px"
            mb="15px"
          >
            {`Success rate: ${catchPercentage}%`}
          </Typography>

          <CustomCircularProgress value={catchPercentage} />
          <Typography
            fontFamily="monospace"
            fontWeight="400"
            mr="10px"
            fontSize="18px"
            mt="15px"
            align="center"
          >
            {calculatePokeballs(catchPercentage)}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={() => setCalculated(false)}
          >
            Calculate again
          </Button>
          <Typography
            fontFamily="monospace"
            fontWeight="400"
            mr="10px"
            fontSize="14px"
            mt="15px"
            align="center"
          >
            If you want to learn more about the exact additions way of
            calculating,{" "}
            <Link
              href="https://bulbapedia.bulbagarden.net/wiki/Catch_rate"
              fontFamily="monospace"
              fontWeight="700"
              color="inherit"
            >
              click here
            </Link>
            .
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default CatchRateCard;
