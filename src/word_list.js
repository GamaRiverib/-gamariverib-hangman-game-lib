/// @ts-check

const { Difficulty } = require("./game_config");
const { Word } = require("./word");

/**
 * @class WordList
 * @property {string} language Idioma de la lista de palabras
 * @property {Array.<Word>} words Las palabras
 * @property {Array.<string>} selectedCategories Lista de categorias seleccionadas
 * @property {number} selectedDifficulty Dificultad máxima a utilizar
 */
class WordList {
  /**
   * @type {string}
   */
  #language;

  /**
   * @type {Array.<Word>}
   */
  #words;

  /**
   * @type {Array.<string>}
   */
  #selectedCategories;

  /**
   * @type {import("./game_config").DifficultyValue}
   */
  #selectedDifficulty;

  /**
   * Constructor de la clase WordList
   * @param {string|undefined} language Idioma de las palabras
   * @param {Array.<Word>} words Lista de las palabras
   */
  constructor(language, words) {
    this.#language = language || "";
    /**
     * @type {Array.<Word>}
     */
    this.#words = words || [];
    /**
     * @type {Array.<string>}
     */
    this.#selectedCategories = [];
    /**
     * @type {import("./game_config").DifficultyValue}
     */
    this.#selectedDifficulty = Difficulty.Easy;
  }

  /**
   * Idioma de las palabras
   * @returns {string}
   */
  get language() {
    return this.#language;
  }

  /**
   * Lista de categorias disponibles
   * @returns {Array.<string>}
   */
  get availableCategories() {
    const categories = [];
    this.#words.forEach((word) => {
      const category = word.category;
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    return categories.sort();
  }

  /**
   * Lista de categorias seleccionadas
   * @returns {Array.<string>}
   */
  get selectedCategories() {
    return this.#selectedCategories;
  }

  /**
   * Dificultad máxima a utilizar
   * @returns {import("./game_config").DifficultyValue}
   */
  get selectedDifficulty() {
    return this.#selectedDifficulty;
  }

  /**
   * Número total de palabras en la lista
   * @returns {number}
   */
  get wordsCount() {
    let list = this.#words;
    if (this.selectedCategories.length) {
      const cats = this.selectedCategories;
      list = list.filter((i) => cats.includes(i.category));
    }
    if (this.selectedDifficulty >= 0) {
      const d = this.selectedDifficulty;
      list = list.filter((i) => i.difficulty <= d);
    }
    return list.length;
  }

  /**
   * Lista de palabras (filtrado por categorias y dificultad)
   * @return {Array.<Word>}
   */
  get words() {
    /**
     * @type {Array.<Word>}
     */
    let words = this.#words;
    if (this.selectedCategories.length) {
      const cats = this.selectedCategories;
      words = words.filter((i) => cats.includes(i.category));
    }
    if (this.selectedDifficulty >= 0) {
      const d = this.selectedDifficulty;
      words = words.filter((i) => i.difficulty <= d);
    }
    return words;
  }

  /**
   * Inicializa un arreglo de palabras
   * @param {Array.<any>} json
   * @returns {Array.<Word>}
   */
  static wordsFromJson(json) {
    /**
     * @type {Array.<Word>}
     */
    const list = [];
    json.forEach((/** @type {any} */ item) => {
      try {
        const word = Word.fromJson(item);
        list.push(word);
      } catch (reason) {}
    });
    return list;
  }

  /**
   * Inicializa una lista de palabras desde un arreglo JSON
   * @param {any} json
   * @returns {WordList}
   */
  static fromJson(json) {
    const { language, words } = json;
    const list = WordList.wordsFromJson(words);
    return new WordList(language, list);
  }

  /**
   * Inicializa una lista de palabras desde el contenido de un archivo CSV
   * @param {string} language Idioma de las palabras
   * @param {*} csv Palabras en formato csv (letters, category, difficulty, definition, hits)
   * @returns {WordList}
   */
  static fromCsv(language, csv) {
    const wordJsonList = [];
    const rows = csv.split("\r\n");
    rows.forEach((/** @type {string}} */ row) => {
      const [word, category, difficulty, definition, ...hints] = row.split(",");
      const wordJson = {
        word,
        category,
        difficulty: parseInt(difficulty || "0"),
        definition,
        hints,
      };
      wordJsonList.push(wordJson);
    });
    const words = WordList.wordsFromJson(wordJsonList);
    return new WordList(language, words);
  }

  /**
   * Agregar una palabra a la lista
   * @param {Word} word Palabra
   */
  addWord(word) {
    this.#words.push(word);
  }

  /**
   * Permite agregar una categoria de las palabras a utilizar
   * @param {string} category Usar palabras de esta categoria
   */
  selectCategory(category) {
    if (!this.#selectedCategories.includes(category)) {
      this.#selectedCategories.push(category);
      this.#selectedCategories.sort();
    }
  }

  /**
   * Permite quitar una categoria de las palabras a utilizar
   * @param {string} category No usar palabras de esta categoria
   */
  unselectCategory(category) {
    const index = this.#selectedCategories.indexOf(category);
    if (index >= 0) {
      this.#selectedCategories.splice(index, 1);
    }
  }

  /**
   * Permite incluir las palabras de la dificultad máxima indicada
   * @param {import("./game_config").DifficultyValue} difficulty Usar palabras de esta dificultad
   */
  setDifficulty(difficulty) {
    this.#selectedDifficulty = difficulty;
  }

  /**
   * Obtiene una palabra aleatoriamente de las seleccionadas (categoría y dificultad)
   * @returns {Word}
   */
  getRandomWord() {
    const words = this.words;
    const min = 1;
    const max = words.length;
    const index = Math.floor(Math.random() * max) + min - 1;
    return words[index];
  }
}

module.exports = { WordList };
