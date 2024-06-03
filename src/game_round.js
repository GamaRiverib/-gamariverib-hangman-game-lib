/// @ts-check

const { HelperConfig } = require("./helper");
const { getHelperByType } = require("./helpers/index");
const { Word, Letters } = require("./word");

/**
 * @typedef {0|1|2|3} GameRoundStatusValue
 */

/**
 * @typedef {Object} GameRoundStatusEnum
 * @property {0} InProcess
 * @property {1} Finished
 */

/**
 * Enumerador sobre el estatus de una ronda del juego.
 * @type {GameRoundStatusEnum}
 */
const GameRoundStatus = {
  InProcess: 0,
  Finished: 1,
};

/**
 * @class GameRound
 * @property {GameRoundStatusValue} status Estatus de la ronda del juego
 * @property {Array.<Letter>} provenLetters Lista de letras que ya han sido probadas
 * @property {Array.<Letter>} remainingLetters Lista de letras que faltan por probar
 * @property {Array.<string>} hints Lista de pistas sobre la palabra
 * @property {Array.<HelperTypeValue>} usedHelpers Lista de ayudas utilizadas
 * @property {number} hits Número de letras acertadas
 * @property {number} failures Número de letras fallidas
 * @property {number} remainingOportunities Número de intentos restantes
 * @property {boolean} completed Indica si se han probado todas las letras de la palabra
 */
class GameRound {
  /**
   * @type {import("./game").GameStatusValue}
   */
  #status;

  /**
   * @type {Word}
   */
  #word;

  /**
   * @type {number}
   */
  #oportunities;
  /**
   * @type {Array.<HelperConfig>}
   */
  #helpers;

  /**
   * @type {import("./word").Letter[]}
   */
  provenLetters = [];

  /**
   * @type {Array.<import("./word").Letter>}
   */
  remainingLetters = [];

  /**
   * @type {Array.<string>}
   */
  hints = [];

  /**
   * @type {Array.<import("./helper").HelperTypeValue>}
   */
  usedHelpers = [];

  /**
   * Constructor de la clase GameRound
   * @param {Word} word
   * @param {number} oportunities
   * @param {Array.<HelperConfig>} helpers
   */
  constructor(word, oportunities, helpers) {
    /**
     * @type {Word}
     */
    this.#word = word;
    /**
     * @type {number}
     */
    this.#oportunities = oportunities;
    /**
     * @type {Array.<HelperConfig>}
     */
    this.#helpers = helpers;
    /**
     * @type {Array.<import("./word").Letter>}
     */
    this.remainingLetters = [...Letters];
    /**
     * @type {GameRoundStatusValue}
     */
    this.#status = GameRoundStatus.InProcess;

    if (word.category) {
      this.hints.push(word.category);
    }
    if (word.definition) {
      this.hints.push(word.definition);
    }
  }

  /**
   * Estatus de la ronda del juego
   * @returns {GameRoundStatusValue}
   */
  get status() {
    return this.#status;
  }

  /**
   * Número de intentos acertados
   * @returns {number}
   */
  get hits() {
    let count = 0;
    this.provenLetters.forEach((letter) => {
      if (this.#word.prove(letter)) {
        count++;
      }
    });
    return count;
  }

  /**
   * Número de intentos fallidos
   * @returns {number}
   */
  get failures() {
    let count = 0;
    this.provenLetters.forEach((letter) => {
      if (!this.#word.prove(letter)) {
        count++;
      }
    });
    return count;
  }

  /**
   * Número de intentos restantes
   * @returns {number}
   */
  get remainingOportunities() {
    return this.#oportunities - this.failures;
  }

  /**
   * Indica si todas las letras de la palabra fueron probadas
   * @returns {boolean}
   */
  get completed() {
    let count = 0;
    const letters = Word.getLetters(this.#word.word);
    letters.forEach((letter) => {
      if (this.provenLetters.includes(letter)) {
        count++;
      }
    });
    return count >= letters.length;
  }

  /**
   * Obtiene las letras descubiertas
   * @returns {Array.<import("./word").Letter|" ">}
   */
  get word() {
    /**
     * @type {Array.<import("./word").Letter|" ">}
     */
    const letters = [];
    const wordLetters = Word.getLetters(this.#word.word);
    wordLetters.forEach((l) => {
      if (this.provenLetters.includes(l)) {
        letters.push(l);
      } else {
        letters.push(" ");
      }
    });
    return letters;
  }

  /**
   * Categoría de la palabra
   * @returns {string}
   */
  get category() {
    return this.#word.category;
  }

  /**
   * Definición de la palabra
   * @returns {string}
   */
  get definition() {
    return this.#word.definition;
  }

  /**
   * Probar una letra
   * Regresa true si la letra forma parte de la palabra
   * @param {import("./word").Letter} letter Letra
   * @returns {boolean}
   */
  prove(letter) {
    if (this.status !== GameRoundStatus.InProcess) {
      throw new Error("Round is not in progress");
    }
    if (this.remainingOportunities <= 0) {
      throw new Error("No more opportunities");
    }
    if (this.remainingLetters.length <= 0) {
      throw new Error("No more letters");
    }
    if (this.provenLetters.includes(letter)) {
      throw new Error("Letter already proved");
    }
    const found = this.#word.prove(letter);
    const index = this.remainingLetters.indexOf(letter);
    if (index >= 0) {
      this.remainingLetters.splice(index, 1);
    }
    if (!this.provenLetters.includes(letter)) {
      this.provenLetters.push(letter);
    }
    if (this.remainingOportunities <= 0 || this.completed) {
      this.#status = GameRoundStatus.Finished;
    }
    return found;
  }

  /**
   * Usa un ayudante
   * @param {import("./helper").HelperTypeValue} type Tipo de ayuda
   */
  useHelper(type) {
    if (this.status !== GameRoundStatus.InProcess) {
      throw new Error("Round is not in progress");
    }
    if (this.remainingOportunities <= 0) {
      throw new Error("No more opportunities");
    }
    if (this.remainingLetters.length <= 0) {
      throw new Error("No more letters");
    }
    if (this.#helpers.length === 0) {
      throw new Error("No more helpers");
    }
    const helperConfig = this.#helpers.find((h) => h.type === type);
    if (!helperConfig) {
      throw new Error(`Helper not found (${type})`);
    }
    const usedCount = this.usedHelpers.reduce((count, helperType) => {
      if (helperType === type) {
        count += 1;
      }
      return count;
    }, 0);
    if (usedCount >= helperConfig.amount) {
      throw new Error(`Helper not available (${type})`);
    }
    const helper = getHelperByType(type);
    helper.apply(this.remainingLetters, this.provenLetters, this.hints, this.#word);
    this.usedHelpers.push(type);
    if (this.remainingOportunities <= 0 || this.completed) {
      this.#status = GameRoundStatus.Finished;
    }
  }

  /**
   * Indica la cantidad disponible del ayudante indicado por el tipo
   * @param {import("./helper").HelperTypeValue} type Tipo de ayuda
   */
  getRemainingHelpers(type) {
    const helperConfig = this.#helpers.find((h) => h.type === type);
    if (!helperConfig) {
      return 0;
    }
    if (helperConfig.amount <= 0) {
      return 0;
    }
    const count = this.usedHelpers.reduce((count, helperType) => {
      if (helperType === type) {
        count += 1;
      }
      return count;
    }, 0);
    return helperConfig.amount - count;
  }
}

module.exports = { GameRound, GameRoundStatus };
