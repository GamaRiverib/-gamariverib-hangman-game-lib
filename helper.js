/// @ts-check

/**
 * @typedef {0|1|2} HelperTypeValue
 */

/**
 * @typedef {Object} HelperTypeEnum
 * @property {0} DiscoverRandomLetter
 * @property {1} DiscardRandomLetter
 * @property {2} DiscoverHint
 */

/**
 * Enumerador de nivel de dificultad del juego
 * @readonly
 * @type {HelperTypeEnum}
 */
const HelperTypeEnum = {
  DiscoverRandomLetter: 0,
  DiscardRandomLetter: 1,
  DiscoverHint: 2,
};

/**
 * @class Helper
 * @property {HelperTypeValue} type
 * @property {number} amount
 */
class HelperConfig {
  /**
   * @type {HelperTypeValue}
   */
  #type;

  /**
   * @type {number}
   */
  #amount;

  /**
   * Constructor de la clase Helper
   * @param {HelperTypeValue} type
   * @param {number} amount
   */
  constructor(type, amount) {
    this.#type = type;
    this.#amount = amount;
  }

  /**
   * @return {HelperTypeValue}
   */
  get type() {
    return this.#type;
  }

  /**
   * @returns {number}
   */
  get amount() {
    return this.#amount;
  }
}

module.exports = {
  HelperTypeEnum,
  HelperConfig,
};
