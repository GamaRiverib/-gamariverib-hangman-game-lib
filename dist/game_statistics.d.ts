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
export class GameStatistics {
    /**
     * Crea una instancia de GameStatistics a partir de un objeto JSON.
     * @static
     * @param {any} json Objeto JSON.
     * @returns {GameStatistics}
     */
    static fromJson(json: any): GameStatistics;
    /**
     * Total de rondas jugadas
     * @type {number}
     */
    rounds: number;
    /**
     * Número de rondas ganadas
     * @type {number}
     */
    wins: number;
    /**
     * Número de rondas pérdidas
     * @type {number}
     */
    lost: number;
    /**
     * Racha actual: número de rondas ganadas consecutivamente
     * @type {number}
     */
    consecutiveWins: number;
    /**
     * Mejor racha: mayor número de rondas ganadas consecutivamente
     * @type {number}
     */
    highestConsecutiveWins: number;
    /**
     * Conteo de letras correctas
     * @type {number}
     */
    correctLetterCount: number;
    /**
     * Conteo de letras incorrectas
     * @type {number}
     */
    wrongLetterCount: number;
    /**
     * Conteo de uso de ayudas por tipo
     * @type {Object.<import("./helper").HelperTypeValue, number>}
     */
    helpersCount: any;
    /**
     * Número de partidas ganadas sin letras incorrectas
     * @type {number}
     */
    noWrongLettersCount: number;
    /**
     * Contabilizar una ronda
     * @param {GameRound} round
     */
    count(round: GameRound): void;
}
/**
 * Crear una instancia de GameStatistics desde un objeto json.
 * @param {any} json Objeto json
 * @returns {GameStatistics}
 */
export function createGameStatistics(json: any): GameStatistics;
import { GameRound } from "./game_round";
//# sourceMappingURL=game_statistics.d.ts.map