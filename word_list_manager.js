/// @ts-check

const { Word } = require("./word");
const { WordList } = require("./word_list");

/**
 * @class WordListManager
 * @property {string[]} availableLanguages
 */
class WordListManager {
  /**
   * @type {WordList[]}
   */
  #wordList;
  /**
   *
   * @param {WordList[]} wordList
   */
  constructor(wordList) {
    /**
     * @type {WordList[]}
     */
    this.#wordList = wordList;
  }

  /**
   * Lista de idiomas disponibles
   * @returns {string[]}
   */
  get availableLanguages() {
    /**
     * @type {string[]}
     */
    const languages = [];
    this.#wordList.forEach((wordList) => {
      const language = wordList.language;
      if (!languages.includes(language)) {
        languages.push(language);
      }
    });
    return languages.sort();
  }

  /**
   * Obtiene la lista de categorias disponibles para el idioma indicado
   * @param {string} language Idioma
   * @returns {string[]}
   */
  getCategoriesByLanguage(language) {
    const categories = [];
    this.#wordList.forEach((wordList) => {
      if (wordList.language === language) {
        wordList.availableCategories.forEach((availableCategory) => {
          if (!categories.includes(!availableCategory)) {
            categories.push(availableCategory);
          }
        });
      }
    });
    return categories.sort();
  }

  /**
   * Obtiene una lista de palabras para el idioma indicado
   * @param {string} language Idioma
   * @returns {WordList}
   */
  getWordListByLanguage(language) {
    /**
     * @type {Word[]}
     */
    const words = [];
    this.#wordList.forEach((wordList) => {
      if (wordList.language === language) {
        wordList.words.forEach((w) => {
          words.push(w);
        });
      }
    });
    return new WordList(language, words);
  }
}

module.exports = { WordListManager };
