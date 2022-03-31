export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatNumber = (number) => {
  let id = number.toString();
  while (id.length < 3) id = "0" + id;
  return "#" + id;
};
