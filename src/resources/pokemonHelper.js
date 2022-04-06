import bug from "../images/types/bug.svg";
import dark from "../images/types/dark.svg";
import dragon from "../images/types/dragon.svg";
import electric from "../images/types/electric.svg";
import fairy from "../images/types/fairy.svg";
import fighting from "../images/types/fighting.svg";
import fire from "../images/types/fire.svg";
import flying from "../images/types/flying.svg";
import ghost from "../images/types/ghost.svg";
import grass from "../images/types/grass.svg";
import ground from "../images/types/ground.svg";
import ice from "../images/types/ice.svg";
import normal from "../images/types/normal.svg";
import poison from "../images/types/poison.svg";
import psychic from "../images/types/psychic.svg";
import rock from "../images/types/rock.svg";
import steel from "../images/types/steel.svg";
import water from "../images/types/water.svg";

const TYPES_ICONS = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

export const getTypeIcon = (type) => {
  return TYPES_ICONS[type];
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatNumber = (number) => {
  let id = number.toString();
  while (id.length < 3) id = "0" + id;
  return "#" + id;
};

export const normalizeString = (string) => {
  if (string.includes("-")) {
    const splitted = string.split("-");
    let normalizedWord = "";

    splitted.map(
      (word) => (normalizedWord += capitalizeFirstLetter(word) + " ")
    );

    return normalizedWord.slice(0, -1);
  } else return capitalizeFirstLetter(string);
};

export const getRandomPokemon = () => Math.floor(Math.random() * 898);
