/// @ts-check

/**
 * Forza el valor a un número
 * @param {any} val Valor
 * @param {number|undefined} [defaultValue]
 * @returns
 */
const forceNumber = (val, defaultValue) => {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    try {
      const num = parseInt(val);
      if (isNaN(num)) {
        return defaultValue || 0;
      }
      return num;
    } catch (reason) {
      return defaultValue || 0;
    }
  }
  return defaultValue || 0;
};

module.exports = {
  forceNumber,
};
