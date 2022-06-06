/**
 * It returns true if the input is a valid CSS color, and false otherwise
 * @param inp - The input string to check.
 * @returns A function that takes in a string and returns a boolean.
 */
export const isValidColor = (inp) => {
  const s = new Option().style;
  s.color = inp;
  return s.color !== "";
};

/**
 * It takes a string, removes the E8 and # characters, trims the whitespace, and capitalizes the first
 * letter of each word
 * @param cat - the category of the product
 * @returns the value of the variable format.
 */
export const formatCategories = (cat) => {
  // assuming we are doing all products, hence filter out E8 from unique categories for now
  const format = cat.replace("E8", "").replace(/#/g, "").trim().toLowerCase();
  return capitalize(format);
};

/**
 * Capitalize the first letter of a string.
 * @param inp - The string to be capitalized.
 */
const capitalize = (inp) => inp.charAt(0).toUpperCase() + inp.slice(1);
