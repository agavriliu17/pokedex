import { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { motion, AnimatePresence } from "framer-motion";
import { solidColors } from "../../colors";

function CustomCards(props) {
  function handleDragEnd(event, info) {
    if (info.offset.x < -100) {
      props.setExitX(-250);
      if (props.index === props.maxCards - 1) {
        props.setIndex(0);
      } else {
        props.setIndex(props.index + 1);
      }
    }
    if (info.offset.x > 100) {
      props.setExitX(250);
      if (props.index === props.maxCards - 1) {
        props.setIndex(0);
      } else {
        props.setIndex(props.index + 1);
      }
    }
  }

  const description = props.ability?.flavor_text_entries?.find(
    (entry) => entry?.language?.name === "en"
  );

  const effectEntries = props.ability?.effect_entries?.find(
    (entry) => entry?.language?.name === "en"
  );

  const abilityName = props.ability?.names.find(
    (el) => el.language.name === "en"
  );

  return (
    <Card
      raised
      component={motion.div}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "400px",
        height: "175px",
        backgroundColor: props.cardColor,
        padding: "20px",
        borderRadius: "15px",
        position: "absolute",
        top: 0,
        cursor: "grab",
        "@media (max-width: 550px)": {
          width: "300px",
        },
        "@media (max-width: 400px)": {
          width: "250px",
        },
      }}
      whileTap={{ cursor: "grabbing" }}
      drag={props.drag}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnd={handleDragEnd}
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      exit={{
        x: props.exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <Typography
        fontFamily="monospace"
        fontSize="24px"
        mb="5px"
        fontWeight="400"
      >
        {abilityName.name}
      </Typography>

      <Typography fontFamily="monospace" fontSize="15px" mb="15px">
        {description.flavor_text}
      </Typography>

      <Typography fontFamily="monospace" fontWeight="500" fontSize="18px">
        Effect:
      </Typography>

      <Typography fontFamily="monospace" fontSize="15px">
        {effectEntries.short_effect}
      </Typography>
    </Card>
  );
}

export default function AbilitiesCard({ abilities, pokemonType }) {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState("100%");
  const theme = useTheme();

  const color = solidColors[theme.palette.mode][pokemonType];

  return (
    <motion.div
      style={{
        width: 150,
        height: 175,
        position: "relative",
      }}
    >
      <AnimatePresence initial={false}>
        <CustomCards
          key={index + 1}
          initial={{ scale: 0, y: 105, opacity: 0 }}
          animate={{ scale: 0.75, y: 30, opacity: 0.5 }}
          transition={{
            scale: { duration: 0.2 },
            opacity: { duration: 0.4 },
          }}
          cardColor={color}
          ability={
            index === abilities.length - 1 ? abilities[0] : abilities[index + 1]
          }
        />
        <CustomCards
          key={index}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.2 },
          }}
          exitX={exitX}
          setExitX={setExitX}
          index={index}
          setIndex={setIndex}
          drag="x"
          cardColor={color}
          maxCards={abilities.length}
          ability={abilities[index]}
        />
      </AnimatePresence>
    </motion.div>
  );
}
