export type DifficultyValue = 0 | 1 | 2;
export type DifficultyEnum = {
    Easy: 0;
    Normal: 1;
    Hard: 2;
};
/**
 * @typedef {0|1|2} DifficultyValue
 */
/**
 * @typedef {Object} DifficultyEnum
 * @property {0} Easy
 * @property {1} Normal
 * @property {2} Hard
 */
/**
 * Enumerador de nivel de dificultad del juego
 * @readonly
 * @type {DifficultyEnum}
 */
export const Difficulty: DifficultyEnum;
/**
 * @class GameConfig
 * @property {string} language
 * @property {Array.<string>} [categories]
 * @property {DifficultyValue} [difficulty]
 * @property {number} oportunities
 * @property {number} hints
 * @property {Array.<Helper>} helpers
 */
export class GameConfig {
    /**
     * Inicializa la configuración del juego desde un objeto JSON
     * @param {any} json Objeto JSON con la configuración del juego
     * @returns {GameConfig} Instancia de la palabra
     */
    static fromJson(json: any): GameConfig;
    /**
     * Constructor de la clase GameConfig
     * @param {string} language Idioma de las palabras a utilizar
     * @param {Array.<string>|undefined} [categories] Lista de categorias de palabras a utilizar
     * @param {DifficultyValue|undefined} [difficulty] Dificultad del juego
     */
    constructor(language: string, categories?: Array<string> | undefined, difficulty?: DifficultyValue | undefined);
    /**
     * Idioma de las palabras a utilizar
     * @returns {string}
     */
    get language(): string;
    /**
     * Lista de categorias de palabras a utilizar
     * @returns {Array.<string>|undefined}
     */
    get categories(): string[];
    /**
     * Nivel de dificultad del juego
     * @return {DifficultyValue}
     */
    get difficulty(): DifficultyValue;
    /**
     * Número total de oportunidades según el nivel de dificultad
     * @returns {number}
     */
    get oportunities(): number;
    /**
     * Número total de pistas si están disponibles según el nivel de dificultad
     * @return {number}
     */
    get hints(): number;
    /**
     * Número total de ayudas según el nivel de dificultad
     * @returns {Array.<HelperConfig>}
     */
    get helpers(): HelperConfig[];
    #private;
}
/**
 * Crea una instancia de GameConfig desde un objeto JSON.
 * @param {any} json
 * @returns {GameConfig}
 */
export function createGameConfig(json: any): GameConfig;
import { HelperConfig } from "./helper";
//# sourceMappingURL=game_config.d.ts.map