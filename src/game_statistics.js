/// @ts-check

const { GameRound, GameRoundStatus } = require("./game_round");
const { forceNumber } = require("./utilities");

/**
 * Crear una instancia de GameStatistics desde un objeto json.
 * @param {any} json Objeto json
 * @returns {GameStatistics}
 */
function createGameStatistics(json) {
  return GameStatistics.fromJson(json);
}

/**
 * @class GameStatistics
 * @property {number} rounds
 * @property {number} wins
 * @property {number} lost
 * @property {number} consecutiveWins
 * @property {number} highestConsecutiveWins
 * @property {number} correctLetterCount
 * @property {number} wrongLetterCount
 * @property {[type: HelperTypeValue]: number} helpersCount
 * @property {number} noWrongLettersCount
 */
class GameStatistics {
  /**
   * Total de rondas jugadas
   * @type {number}
   */
  rounds = 0;
  /**
   * Número de rondas ganadas
   * @type {number}
   */
  wins = 0;
  /**
   * Número de rondas pérdidas
   * @type {number}
   */
  lost = 0;
  /**
   * Racha actual: número de rondas ganadas consecutivamente
   * @type {number}
   */
  consecutiveWins = 0;
  /**
   * Mejor racha: mayor número de rondas ganadas consecutivamente
   * @type {number}
   */
  highestConsecutiveWins = 0;
  /**
   * Conteo de letras correctas
   * @type {number}
   */
  correctLetterCount = 0;
  /**
   * Conteo de letras incorrectas
   * @type {number}
   */
  wrongLetterCount = 0;
  /**
   * Conteo de uso de ayudas por tipo
   * @type {Object.<import("./helper").HelperTypeValue, number>}
   */
  helpersCount = {};
  /**
   * Número de partidas ganadas sin letras incorrectas
   * @type {number}
   */
  noWrongLettersCount = 0;

  constructor() {}

  /**
   * Crea una instancia de GameStatistics a partir de un objeto JSON.
   * @static
   * @param {any} json Objeto JSON.
   * @returns {GameStatistics}
   */
  static fromJson(json) {
    const {
      rounds,
      wins,
      lost,
      consecutiveWins,
      highestConsecutiveWins,
      correctLetterCount,
      wrongLetterCount,
      helpersCount,
      noWrongLettersCount,
    } = json;
    const obj = new GameStatistics();
    obj.rounds = forceNumber(rounds);
    obj.wins = forceNumber(wins);
    obj.lost = forceNumber(lost);
    obj.consecutiveWins = forceNumber(consecutiveWins);
    obj.highestConsecutiveWins = forceNumber(highestConsecutiveWins);
    obj.correctLetterCount = forceNumber(correctLetterCount);
    obj.wrongLetterCount = forceNumber(wrongLetterCount);
    obj.helpersCount = helpersCount;
    obj.noWrongLettersCount = forceNumber(noWrongLettersCount);
    return obj;
  }

  /**
   * Contabilizar una ronda
   * @param {GameRound} round
   */
  count(round) {
    if (round.status !== GameRoundStatus.Finished) {
      throw new Error("Round is not finished");
    }
    this.rounds++;
    if (round.completed) {
      this.wins++;
      this.consecutiveWins++;
      if (this.consecutiveWins > this.highestConsecutiveWins) {
        this.highestConsecutiveWins = this.consecutiveWins;
      }
      if (round.failures === 0) {
        this.noWrongLettersCount += 1;
      }
    } else {
      this.lost++;
      if (this.consecutiveWins > this.highestConsecutiveWins) {
        this.highestConsecutiveWins = this.consecutiveWins;
      }
      this.consecutiveWins = 0;
    }
    this.correctLetterCount += round.hits;
    this.wrongLetterCount += round.failures;
    if (round.usedHelpers.length) {
      round.usedHelpers.forEach((helper) => {
        if (!this.helpersCount[helper]) {
          this.helpersCount[helper] = 0;
        }
        this.helpersCount[helper] += 1;
      });
    }
  }
}

module.exports = { GameStatistics, createGameStatistics };
