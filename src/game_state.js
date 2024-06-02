/// @ts-check

const { GameConfig } = require("./game_config");
const { GameRound } = require("./game_round");

/**
 * @class GameState
 * @property {GameConfig} config
 * @property {GameStatusValue} status
 * @property {GameRound} round
 */
class GameState {
  /**
   * @type {GameConfig}
   */
  config;

  /**
   * @type {import("./game").GameStatusValue}
   */
  status;

  /**
   * @type {GameRound}
   */
  round;

  /**
   *
   * @param {GameConfig} config Configuración del juego
   * @param {GameRound} round Ronda del juego
   * @param {import("./game").GameStatusValue} status Estatus del juego
   */
  constructor(config, round, status) {
    this.config = config;
    this.round = round;
    this.status = status;
  }
}

module.exports = { GameState };
