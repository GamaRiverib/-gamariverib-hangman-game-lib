/// @ts-check

const { Word } = require("../word");

class DiscardRandomLetterHelper {
  /**
   * Aplica la ayuda
   * @param {Array.<import("../word").Letter>} remainingLetters Lista de letras faltantes
   * @param {Array.<import("../word").Letter>} provenLetters Lista de letras probadas
   * @param {Array.<string>} hints Lista de pistas
   * @param {Word} word Palabra
   */
  apply(remainingLetters, provenLetters, hints, word) {
    const letters = Word.getLetters(word.word);
    const remaining = remainingLetters.filter((l) => !letters.includes(l));
    const min = 1;
    const max = remaining.length;
    let index = Math.floor(Math.random() * max) + min - 1;
    const letter = remaining[index];
    index = remainingLetters.indexOf(letter);
    if (index >= 0) {
      remainingLetters.splice(index, 1);
    }
    // provenLetters.push(letter);
  }
}

module.exports = { DiscardRandomLetterHelper };
