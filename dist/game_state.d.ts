/**
 * @class GameState
 * @property {GameConfig} config
 * @property {GameStatusValue} status
 * @property {GameRound} round
 */
export class GameState {
    /**
     *
     * @param {GameConfig} config Configuración del juego
     * @param {GameRound} round Ronda del juego
     * @param {import("./game").GameStatusValue} status Estatus del juego
     */
    constructor(config: GameConfig, round: GameRound, status: import("./game").GameStatusValue);
    /**
     * @type {GameConfig}
     */
    config: GameConfig;
    /**
     * @type {import("./game").GameStatusValue}
     */
    status: import("./game").GameStatusValue;
    /**
     * @type {GameRound}
     */
    round: GameRound;
}
import { GameConfig } from "./game_config";
import { GameRound } from "./game_round";
//# sourceMappingURL=game_state.d.ts.map