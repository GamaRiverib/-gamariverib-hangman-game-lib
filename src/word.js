/// @ts-check

/**
 * @typedef {"a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"|"k"|"l"|"m"|"n"|"o"|"p"|"q"|"r"|"s"|"t"|"u"|"v"|"w"|"x"|"y"|"z"} Letter
 */

/**
 * @type {Array.<Letter>}
 */
const Letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
/**
 * @type {Object.<number, Letter>}
 */
const SpecialLetters = {
  241: "n", // ñ
  225: "a", // á
  233: "e", // é
  237: "i", // í
  243: "o", // ó
  250: "u", // ú
  252: "u", // ü
};

/**
 * Convierte una letra de String a Letter
 * @param {string} str Letra en string
 * @returns {Letter|undefined}
 */
function stringToLetter(str) {
  if (str?.length !== 1) {
    return undefined;
  }
  const charCode = str.charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) {
    return Letters[charCode - 97];
  } else if (SpecialLetters[charCode]) {
    return SpecialLetters[charCode];
  }
  return undefined;
}

/**
 * @class Word
 * @property {string} word
 * @property {string[]} [hints]
 * @property {string} [category]
 * @property {DifficultyValue} [difficulty]
 * @property {string} [definition]
 */
class Word {
  /**
   * @type {string}
   */
  #word;
  /**
   * @type {Array.<string>}
   */
  #hints;
  /***
   * @type {string}
   */
  #category;
  /**
   * @type {import("./game_config").DifficultyValue}
   */
  #difficulty;
  /**
   * @type {string}
   */
  #definition;
  /**
   * Constructor de la clase Word
   * @param {string} word Letras de la palabra
   * @param {Array.<string>|undefined} [hints] Pistas de la palabra
   * @param {string|undefined} [category] Categoría de la palabra
   * @param {import("./game_config").DifficultyValue|undefined} [difficulty] Dificultad de la palabra
   * @param {string} [definition]
   */
  constructor(word, hints, category, difficulty, definition) {
    if (typeof word !== "string" || !word.length) {
      throw new Error("Letter must be a string");
    }
    if (hints !== undefined && !Array.isArray(hints)) {
      throw new Error("Hints must be a string array");
    }
    if (category && typeof category !== "string") {
      throw new Error("Category must be a string");
    }
    this.#word = word || "";
    this.#hints = hints || [];
    this.#category = category || "";
    this.#difficulty = difficulty || 0;
    this.#definition = definition || "";
  }

  /**
   * Inicializa la palabra desde un objeto JSON
   * @param {any} json Objeto JSON con la información de la palabra
   * @returns {Word} Instancia de la palabra
   */
  static fromJson(json) {
    const { word, hints, category, difficulty, definition } = json;
    return new Word(word, hints, category, difficulty, definition);
  }

  /**
   * La palabra
   * @readonly
   * @returns {string}
   */
  get word() {
    return this.#word;
  }

  /**
   * Pistas de la palabra
   * @readonly
   * @returns {Array.<string>}
   */
  get hints() {
    return this.#hints;
  }

  /**
   * Categoría de la palabra
   * @readonly
   * @returns {string}
   */
  get category() {
    return this.#category;
  }

  /**
   * Dificultad de la palabra
   * @readonly
   * @returns {number}
   */
  get difficulty() {
    return this.#difficulty;
  }

  /**
   * Definición de la palabra
   * @readonly
   * @returns {string}
   */
  get definition() {
    return this.#definition;
  }

  /**
   * Probar si la letra forma parte de la palabra
   * @param {Letter} letter Letra
   * @returns {boolean}
   */
  prove(letter) {
    /**
     * @type {Array.<Letter>}
     */
    const letters = Word.getLetters(this.word);
    const l = stringToLetter(letter);
    return letters.includes(l || letter);
  }

  /**
   * Letras de la palabra
   * @param {string} word Palabra
   * @returns {Array.<Letter>}
   */
  static getLetters(word) {
    /**
     * @type {Array.<Letter>}
     */
    const letters = [];
    const lowerCaseWord = word.toLocaleLowerCase();
    for (let i = 0; i < lowerCaseWord.length; i++) {
      /**
       * @type {number}
       */
      const charCode = lowerCaseWord.charCodeAt(i);
      if (charCode >= 97 && charCode <= 122) {
        letters.push(Letters[charCode - 97]);
      } else if (SpecialLetters[charCode]) {
        letters.push(SpecialLetters[charCode]);
      }
    }
    return letters;
  }
}

module.exports = { Word, Letters, stringToLetter };
