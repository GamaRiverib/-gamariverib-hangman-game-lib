export type GameRoundStatusValue = 0 | 1 | 2 | 3;
export type GameRoundStatusEnum = {
    InProcess: 0;
    Finished: 1;
};
/**
 * @class GameRound
 * @property {GameRoundStatusValue} status Estatus de la ronda del juego
 * @property {Array.<Letter>} provenLetters Lista de letras que ya han sido probadas
 * @property {Array.<Letter>} remainingLetters Lista de letras que faltan por probar
 * @property {Array.<string>} hints Lista de pistas sobre la palabra
 * @property {Array.<HelperTypeValue>} usedHelpers Lista de ayudas utilizadas
 * @property {number} hits Número de letras acertadas
 * @property {number} failures Número de letras fallidas
 * @property {number} remainingOportunities Número de intentos restantes
 * @property {boolean} completed Indica si se han probado todas las letras de la palabra
 */
export class GameRound {
    /**
     * Constructor de la clase GameRound
     * @param {Word} word
     * @param {number} oportunities
     * @param {Array.<HelperConfig>} helpers
     */
    constructor(word: Word, oportunities: number, helpers: Array<HelperConfig>);
    /**
     * @type {import("./word").Letter[]}
     */
    provenLetters: import("./word").Letter[];
    /**
     * @type {Array.<import("./word").Letter>}
     */
    remainingLetters: Array<import("./word").Letter>;
    /**
     * @type {Array.<string>}
     */
    hints: Array<string>;
    /**
     * @type {Array.<import("./helper").HelperTypeValue>}
     */
    usedHelpers: Array<import("./helper").HelperTypeValue>;
    /**
     * Estatus de la ronda del juego
     * @returns {GameRoundStatusValue}
     */
    get status(): GameRoundStatusValue;
    /**
     * Número de intentos acertados
     * @returns {number}
     */
    get hits(): number;
    /**
     * Número de intentos fallidos
     * @returns {number}
     */
    get failures(): number;
    /**
     * Número de intentos restantes
     * @returns {number}
     */
    get remainingOportunities(): number;
    /**
     * Indica si todas las letras de la palabra fueron probadas
     * @returns {boolean}
     */
    get completed(): boolean;
    /**
     * Obtiene las letras descubiertas
     * @returns {Array.<import("./word").Letter|" ">}
     */
    get word(): (import("./word").Letter | " ")[];
    /**
     * Categoría de la palabra
     * @returns {string}
     */
    get category(): string;
    /**
     * Definición de la palabra
     * @returns {string}
     */
    get definition(): string;
    /**
     * Probar una letra
     * Regresa true si la letra forma parte de la palabra
     * @param {import("./word").Letter} letter Letra
     * @returns {boolean}
     */
    prove(letter: import("./word").Letter): boolean;
    /**
     * Usa un ayudante
     * @param {import("./helper").HelperTypeValue} type Tipo de ayuda
     */
    useHelper(type: import("./helper").HelperTypeValue): void;
    /**
     * Indica la cantidad disponible del ayudante indicado por el tipo
     * @param {import("./helper").HelperTypeValue} type Tipo de ayuda
     */
    getRemainingHelpers(type: import("./helper").HelperTypeValue): number;
    #private;
}
/**
 * @typedef {0|1|2|3} GameRoundStatusValue
 */
/**
 * @typedef {Object} GameRoundStatusEnum
 * @property {0} InProcess
 * @property {1} Finished
 */
/**
 * Enumerador sobre el estatus de una ronda del juego.
 * @type {GameRoundStatusEnum}
 */
export const GameRoundStatus: GameRoundStatusEnum;
import { Word } from "./word";
import { HelperConfig } from "./helper";
//# sourceMappingURL=game_round.d.ts.map