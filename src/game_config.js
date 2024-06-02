/// @ts-check

const { HelperConfig, HelperTypeEnum } = require("./helper");

/**
 * @typedef {0|1|2} DifficultyValue
 */

/**
 * @typedef {Object} DifficultyEnum
 * @property {0} Easy
 * @property {1} Normal
 * @property {2} Hard
 */

/**
 * Enumerador de nivel de dificultad del juego
 * @readonly
 * @type {DifficultyEnum}
 */
const Difficulty = {
  Easy: 0,
  Normal: 1,
  Hard: 2,
};

/**
 * @readonly
 * @type {Array.<number>}
 */
const OportunitiesByDifficulty = [10, 7, 5];
/**
 * @readonly
 * @type {Array.<number>}
 */
const HintsByDifficulty = [2, 1, 0];
/**
 * @readonly
 * @type {Array.<Array.<HelperConfig>>}
 */
const HelpersByDifficulty = [
  [
    new HelperConfig(HelperTypeEnum.DiscardRandomLetter, 3),
    new HelperConfig(HelperTypeEnum.DiscoverRandomLetter, 3),
    new HelperConfig(HelperTypeEnum.DiscoverHint, 5),
  ],
  [
    new HelperConfig(HelperTypeEnum.DiscardRandomLetter, 1),
    new HelperConfig(HelperTypeEnum.DiscoverRandomLetter, 1),
    new HelperConfig(HelperTypeEnum.DiscoverHint, 3),
  ],
  [new HelperConfig(HelperTypeEnum.DiscoverHint, 3)],
];

/**
 * @class GameConfig
 * @property {string} language
 * @property {Array.<string>} [categories]
 * @property {DifficultyValue} [difficulty]
 * @property {number} oportunities
 * @property {number} hints
 * @property {Array.<Helper>} helpers
 */
class GameConfig {
  /**
   * @type {string}
   */
  #language;
  /**
   * @type {Array.<string>}
   */
  #categories;
  /**
   * @type {DifficultyValue}
   */
  #difficulty;
  /**
   * Constructor de la clase GameConfig
   * @param {string} language Idioma de las palabras a utilizar
   * @param {Array.<string>|undefined} [categories] Lista de categorias de palabras a utilizar
   * @param {DifficultyValue|undefined} [difficulty] Dificultad del juego
   */
  constructor(language, categories, difficulty) {
    /**
     * @type {string}
     */
    this.#language = language;
    /**
     * @type {Array.<string>}
     */
    this.#categories = categories || [];
    /**
     * @type {DifficultyValue}
     */
    this.#difficulty = difficulty || 0;

    Object.defineProperties(this, {
      language: {
        value: language,
        writable: false,
        enumerable: true,
      },
      categories: {
        value: categories,
        writable: false,
        enumerable: true,
      },
      difficulty: {
        value: difficulty,
        writable: false,
        enumerable: true,
      },
    });
  }

  /**
   * Idioma de las palabras a utilizar
   * @readonly
   * @returns {string}
   */
  get language() {
    return this.#language;
  }

  /**
   * Lista de categorias de palabras a utilizar
   * @readonly
   * @returns {Array.<string>|undefined}
   */
  get categories() {
    return this.#categories;
  }

  /**
   * Nivel de dificultad del juego
   * @readonly
   * @return {DifficultyValue}
   */
  get difficulty() {
    return this.#difficulty;
  }

  /**
   * Número total de oportunidades según el nivel de dificultad
   * @readonly
   * @returns {number}
   */
  get oportunities() {
    return OportunitiesByDifficulty[this.#difficulty || 0];
  }

  /**
   * Número total de pistas si están disponibles según el nivel de dificultad
   * @readonly
   * @return {number}
   */
  get hints() {
    return HintsByDifficulty[this.#difficulty || 0];
  }

  /**
   * Número total de ayudas según el nivel de dificultad
   * @readonly
   * @returns {Array.<HelperConfig>}
   */
  get helpers() {
    return HelpersByDifficulty[this.#difficulty || 0];
  }

  /**
   * Inicializa la configuración del juego desde un objeto JSON
   * @param {any} json Objeto JSON con la configuración del juego
   * @returns {GameConfig} Instancia de la palabra
   */
  static fromJson(json) {
    const { language, categories, difficulty } = json;
    return new GameConfig(language, categories || [], difficulty || 0);
  }
}

module.exports = {
  Difficulty,
  GameConfig,
};
