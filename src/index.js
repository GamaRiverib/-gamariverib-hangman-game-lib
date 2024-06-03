const { Difficulty, GameConfig, createGameConfig } = require("./game_config");
const { GameRound, GameRoundStatus } = require("./game_round");
const { GameState } = require("./game_state");
const { GameStatistics, createGameStatistics } = require("./game_statistics");
const { GameStatus, HangmanGame } = require("./game");
const { HelperConfig, HelperTypeEnum } = require("./helper");
const { WordListManager } = require("./word_list_manager");
const {
  WordList,
  createWords,
  createWordListFromJson,
  createWordListFromCsv,
} = require("./word_list");
const { Letters, Word, stringToLetter, getLetters, createWord } = require("./word");

/**
 * Forza el valor a un número
 * @param {any} val Valor
 * @param {number|undefined} [defaultValue]
 * @returns
 */
function forceNumber(val, defaultValue) {
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
}

module.exports = {
  Difficulty,
  GameConfig,
  createGameConfig,
  GameRound,
  GameRoundStatus,
  GameState,
  GameStatistics,
  createGameStatistics,
  GameStatus,
  HangmanGame,
  HelperConfig,
  HelperTypeEnum,
  WordListManager,
  WordList,
  createWords,
  createWordListFromJson,
  createWordListFromCsv,
  Letters,
  Word,
  getLetters,
  createWord,
  stringToLetter,
  forceNumber,
};
