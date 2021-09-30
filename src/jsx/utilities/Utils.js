export const capitalizeFirstLetter = (string) => {
  if (string !== undefined && string.length > 0) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
