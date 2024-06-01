/// @ts-check

const { Word } = require("../word");

class DiscoverHintHelper {
  /**
   * Aplica la ayuda
   * @param {import("../word").Letter[]} remainingLetters Lista de letras faltantes
   * @param {import("../word").Letter[]} provenLetters Lista de letras probadas
   * @param {string[]} hints Lista de pistas
   * @param {Word} word Palabra
   */
  apply(remainingLetters, provenLetters, hints, word) {
    if (!word.hints.length) {
      throw new Error("Word without hints");
    }
    if (hints.length >= word.hints.length) {
      throw new Error("No more hints");
    }
    hints.push(word.hints[hints.length]);
  }
}

module.exports = { DiscoverHintHelper };
