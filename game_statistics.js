/// @ts-check

const { GameRound, GameRoundStatus } = require("./game_round");

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

/**
 * @class GameStatistics
 * @property {DifficultyValue} difficulty
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
  correctLeterCount = 0;
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
    this.correctLeterCount += round.hits;
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

  /**
   * Serializa la instancia de estadísticas del juego
   * @returns {string} Objeto serializado
   */
  serialize() {
    const json = JSON.stringify(this);
    return Buffer.from(json).toString("base64");
  }

  /**
   * Deserializa una instancia de estadísticas del juego
   * @param {string} str Objeto de estadísticas del juego serializado
   * @returns {GameStatistics} Instancia de estadísticas del juego
   */
  static deserialize(str) {
    const json = JSON.parse(Buffer.from(str, "base64").toString());
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
    obj.correctLeterCount = forceNumber(correctLetterCount);
    obj.wrongLetterCount = forceNumber(wrongLetterCount);
    obj.helpersCount = helpersCount;
    obj.noWrongLettersCount = forceNumber(noWrongLettersCount);
    return obj;
  }
}

module.exports = { GameStatistics };
