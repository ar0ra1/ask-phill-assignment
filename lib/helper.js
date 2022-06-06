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

/**
 * It takes in a type, a new value, and a filter list, and returns a set of existing filters
 * @param type - the type of filter, e.g. 'category', 'color or 'price'
 * @param newValue - the value of the filter
 * @param filterList - the current state of the filter list
 * @returns A new Set with the newValue added or removed.
 */
export const checkForExisitngFilters = (type, newValue, filterList) => {
  const existing = new Set(filterList[type]);
  if (existing.has(newValue)) {
    existing.delete(newValue);
  } else {
    existing.add(newValue);
  }
  return existing;
};

/**
 * It deletes a key from an object and returns the object
 * @param key - the key to delete from the object
 * @param obj - The object to delete the key from
 * @returns The object with the key deleted.
 */
export const deleteKeyFromObject = (key, obj) => {
  delete obj[key];
  return obj;
};

/**
 * It takes in an array of strings and an object, and returns true if the object has a property called
 * colorFamily and the first item in that array is in the array of strings
 * @param toSearch - The search array of strings that the user has entered.
 * @param e - the node that is being searched
 * @returns True/False
 */
export const filterOnColor = (toSearch, e) => {
  if (e.node.colorFamily) {
    return toSearch.includes(e.node.colorFamily[0].name);
  }
};

/**
 * It takes an array of string to search for and a node, and returns true if the node has a categoryTags property
 * and the string to search for is in the formatted categories
 * @param toSearch - The search array of strings that the user has entered.
 * @param e - the node that is being searched
 * @returns True/False
 */
export const filterOnCategory = (toSearch, e) => {
  if (e.node.categoryTags) {
    return [formatCategories(...e.node.categoryTags)].some(
      (s) => toSearch.indexOf(s) >= 0
    );
  }
};

/**
 * It takes in a range and an element, and if the element has a shopifyProductEu property, it parses
 * the price of the first variant of the product, and if the price is within the range, it returns the
 * element
 * @param range - The range of prices that the user has selected.
 * @param e - The product object
 * @returns The product price is being returned.
 */
export const filterOnPrice = (range, e) => {
  const [selectedMinRange, selectMaxRange] = range;
  if (e.node.shopifyProductEu) {
    let productPrice = parseFloat(
      e.node.shopifyProductEu.variants.edges[0].node.price
    );
    if (productPrice >= selectedMinRange && productPrice <= selectMaxRange) {
      return e;
    }
  }
};
