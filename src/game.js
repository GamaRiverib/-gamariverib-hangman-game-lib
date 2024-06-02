/// @ts-check

const { GameConfig } = require("./game_config");
const { GameRound, GameRoundStatus } = require("./game_round");
const { GameState } = require("./game_state");
const { GameStatistics } = require("./game_statistics");
const { WordList } = require("./word_list");
const { WordListManager } = require("./word_list_manager");

/**
 * @typedef {0|1|2|3} GameStatusValue
 */

/**
 * @typedef {Object} GameStatusEnum
 * @property {0} Setup
 * @property {1} Playing
 * @property {2} Paused
 * @property {3} Finished
 */

/**
 * Enumerador sobre el estatus del juego.
 * Setup -> Playing (play)
 * Playing -> Paused (pause)
 * Playing -> Finished (finish)
 * Paused -> Playing (resume)
 * Paused -> Finished (finish)
 * @readonly
 * @type {GameStatusEnum}
 */
const GameStatus = {
  Setup: 0,
  Playing: 1,
  Paused: 2,
  Finished: 3,
};

/**
 * @class HangmanGame
 */
class HangmanGame {
  /**
   * @type {WordListManager}
   */
  #wordListManager;
  /**
   * @type {GameStatusValue}
   */
  #status;
  /**
   * @type {GameConfig|undefined}
   */
  #config;
  /**
   * @type {GameStatistics|undefined}
   */
  #statistics;
  /**
   * @type {WordList|undefined}
   */
  #wordList;
  /**
   * @type {Array.<GameRound>}
   */
  #rounds;
  /**
   * Constructor de la clase HangmanGame
   * @param {WordListManager} wordListManager Manejador de las palabras
   * @param {GameStatistics|undefined} [previousStatistics] Estadísticas previas del jugador
   */
  constructor(wordListManager, previousStatistics) {
    this.#wordListManager = wordListManager;
    this.#status = GameStatus.Setup;
    this.#config = undefined;
    this.#statistics = previousStatistics;
    this.#wordList = undefined;
    this.#rounds = [];
  }

  /**
   * Ejecuta el proceso para iniciar una ronda.
   */
  play() {
    if (this.#status !== GameStatus.Setup && this.#status !== GameStatus.Finished) {
      throw Error(`Bad game status. Actual "${this.#status}", required: "${GameStatus.Setup}" or "${GameStatus.Finished}"`);
    }
    if (!this.#wordList) {
      throw Error("Set language first");
    }

    if (!this.#config) {
      const language = this.#wordList.language;
      const categories = this.#wordList.selectedCategories;
      const difficulty = this.#wordList.selectedDifficulty;
      this.#config = new GameConfig(language, categories, difficulty);
    }
    if (!this.#statistics) {
      this.#statistics = new GameStatistics();
    }
    const word = this.#wordList.getRandomWord();
    const oportunities = this.#config.oportunities;
    const helpers = this.#config.helpers;
    const round = new GameRound(word, oportunities, helpers);
    this.#rounds.push(round);
    this.#status = GameStatus.Playing;
  }

  next() {
    if (this.#status !== GameStatus.Playing) {
      throw Error(`Bad game status. Actual "${this.#status}", required: "${GameStatus.Playing}"`);
    }
    if (!this.#rounds.length) {
      throw Error("No rounds found");
    }
    const r = this.#rounds[this.#rounds.length - 1];

    if (r.status !== GameRoundStatus.Finished) {
      throw new Error(`Bad round status. Actual "${r.status}", required: "${GameRoundStatus.Finished}"`)
    }

    if (!this.#wordList) {
      throw Error("Set language first");
    }

    if (!this.#config) {
      const language = this.#wordList.language;
      const categories = this.#wordList.selectedCategories;
      const difficulty = this.#wordList.selectedDifficulty;
      this.#config = new GameConfig(language, categories, difficulty);
    }
    if (!this.#statistics) {
      this.#statistics = new GameStatistics();
    }
    const word = this.#wordList.getRandomWord();
    const oportunities = this.#config.oportunities;
    const helpers = this.#config.helpers;
    const round = new GameRound(word, oportunities, helpers);
    this.#rounds.push(round);
    this.#status = GameStatus.Playing;
  }

  pause() {
    if (this.#status !== GameStatus.Playing) {
      throw Error(`Bad game status. Actual "${this.#status}", required: "${GameStatus.Playing}"`);
    }
    // TODO: hacer otras cosas
    this.#status = GameStatus.Paused;
  }

  resume() {
    if (this.#status !== GameStatus.Paused) {
      throw Error(`Bad game status. Actual "${this.#status}", required: "${GameStatus.Paused}"`);
    }
    // TODO: hacer otras cosas
    this.#status = GameStatus.Playing;
  }

  finish() {
    if (this.#status !== GameStatus.Playing && this.#status !== GameStatus.Paused) {
      throw Error(`Bad game status. Actual "${this.#status}", required: "${GameStatus.Playing}" or "${GameStatus.Paused}"`);
    }
    // TODO: hacer otras cosas
    this.#status = GameStatus.Finished;
  }

  /**
   * Obtiene la lista de idiomas para los cuales se encontraron palabras para jugar.
   * @returns {string[]}
   */
  get languages() {
    return this.#wordListManager.availableLanguages;
  }

  /**
   * Idioma seleccionado
   * @type {string|undefined}
   */
  get language() {
    return this.#wordList?.language;
  }

  /**
   * Dificultad seleccionada
   * @type {number|undefined}
   */
  get difficulty() {
    return this.#wordList?.selectedDifficulty;
  }

  /**
   * Obtiene la lista de categorías de las palabras disponibles.
   * @return {Array.<string>}
   */
  get availableCategories() {
    // Se debe seleccionar primero el idioma
    if (!this.#wordList?.language) {
      return [];
    }
    return this.#wordListManager.getCategoriesByLanguage(this.#wordList.language);
  }

  /**
   * Obtiene la lista de categorias seleccionadas
   * @returns {Array.<string>}
   */
  get selectedCategories() {
    if (this.#wordList) {
      return this.#wordList.selectedCategories;
    }
    return [];
  }

  /**
   * Obtiene el número de palabras disponibles para el idioma y categorías seleccionadas
   * @returns {number}
   */
  get availableWords() {
    if (!this.#wordList) {
      return 0;
    }
    return this.#wordList.wordsCount;
  }

  /**
   * Obtiene la información de la ronda actual
   * @returns {GameRound|undefined}
   */
  get round() {
    if (this.#rounds.length > 0) {
      return this.#rounds[this.#rounds.length - 1];
    }
    return undefined;
  }

  /**
   * Obtiene el estado actual del juego.
   * @return {GameState|undefined}
   */
  get state() {
    if (!this.round || !this.#config) {
      return undefined;
    }
    return new GameState(this.#config, this.round, this.#status);
  }

  /**
   * Obtener las estadísticas del juego.
   * @return {GameStatistics|undefined}
   */
  get statistics() {
    return this.#statistics;
  }

  /**
   * Establece el idioma del juego (las palabras)
   * @param {string|undefined} language Idioma a utilizar
   */
  setLanguage(language) {
    if (this.#status !== GameStatus.Setup) {
      return;
    }
    if (!language) {
      this.#wordList = undefined;
    }
    // Si el idioma cambia, se reestablecen las categorías
    if (language && this.#wordList?.language !== language) {
      this.#wordList = this.#wordListManager.getWordListByLanguage(language);
    }
  }

  /**
   * Agregar una categoría de palabras para utilizar en el juego.
   * @param {string} category Categoría
   */
  addCategory(category) {
    if (this.#status !== GameStatus.Setup) {
      return;
    }
    if (this.#wordList) {
      this.#wordList.selectCategory(category);
    }
  }

  /**
   * Elimina una categoría de palabras de lista de categorías a utilizar en el juego.
   * @param {string} category Categoría
   */
  removeCategory(category) {
    if (this.#status !== GameStatus.Setup) {
      return;
    }
    if (this.#wordList) {
      this.#wordList.unselectCategory(category);
    }
  }

  /**
   * Establece el nivel de dificultad para el juego.
   * @param {import("./game_config").DifficultyValue} difficulty Nivel de dificultad del juego
   */
  setDifficulty(difficulty) {
    if (this.#status !== GameStatus.Setup) {
      return;
    }
    if (this.#wordList) {
      this.#wordList.setDifficulty(difficulty);
    }
  }

  /**
   * Probar letra
   * @param {import("./word").Letter} letter
   */
  proveLetter(letter) {
    if (letter.length !== 1) {
      throw new Error("Bad input letter");
    }
    if (this.#status !== GameStatus.Playing) {
      throw Error(`Bad game status. Actual "${this.#status}", required: "${GameStatus.Playing}"`);
    }
    if (!this.round) {
      throw new Error("Round not started");
    }
    const result = this.round.prove(letter);
    if (this.round.status === GameRoundStatus.Finished) {
      this.#statistics?.count(this.round);
    }

    return result;
  }

  /**
   * Utilizar ayuda
   * @param {import("./helper").HelperTypeValue} helper
   */
  useHelper(helper) {
    if (this.#status !== GameStatus.Playing) {
      throw Error(`Bad game status. Actual "${this.#status}", required: "${GameStatus.Playing}"`);
    }
    if (!this.round) {
      throw new Error("Round not started");
    }
    this.round.useHelper(helper);
    if (this.round.status === GameRoundStatus.Finished) {
      this.#statistics?.count(this.round);
      this.#status = GameStatus.Setup;
    }
  }
}

module.exports = {
  HangmanGame,
  GameStatus,
};
