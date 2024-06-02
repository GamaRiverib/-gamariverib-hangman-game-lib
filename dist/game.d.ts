export type GameStatusValue = 0 | 1 | 2 | 3;
export type GameStatusEnum = {
    Setup: 0;
    Playing: 1;
    Paused: 2;
    Finished: 3;
};
/**
 * @class HangmanGame
 */
export class HangmanGame {
    /**
     * Constructor de la clase HangmanGame
     * @param {WordListManager} wordListManager Manejador de las palabras
     * @param {GameStatistics|undefined} [previousStatistics] Estadísticas previas del jugador
     */
    constructor(wordListManager: WordListManager, previousStatistics?: GameStatistics | undefined);
    /**
     * Ejecuta el proceso para iniciar una ronda.
     */
    play(): void;
    next(): void;
    pause(): void;
    resume(): void;
    finish(): void;
    /**
     * Obtiene la lista de idiomas para los cuales se encontraron palabras para jugar.
     * @returns {string[]}
     */
    get languages(): string[];
    /**
     * Idioma seleccionado
     * @type {string|undefined}
     */
    get language(): string;
    /**
     * Dificultad seleccionada
     * @type {number|undefined}
     */
    get difficulty(): number;
    /**
     * Obtiene la lista de categorías de las palabras disponibles.
     * @return {Array.<string>}
     */
    get availableCategories(): string[];
    /**
     * Obtiene la lista de categorias seleccionadas
     * @returns {Array.<string>}
     */
    get selectedCategories(): string[];
    /**
     * Obtiene el número de palabras disponibles para el idioma y categorías seleccionadas
     * @returns {number}
     */
    get availableWords(): number;
    /**
     * Obtiene la información de la ronda actual
     * @returns {GameRound|undefined}
     */
    get round(): GameRound;
    /**
     * Obtiene el estado actual del juego.
     * @return {GameState|undefined}
     */
    get state(): GameState;
    /**
     * Obtener las estadísticas del juego.
     * @return {GameStatistics|undefined}
     */
    get statistics(): GameStatistics;
    /**
     * Establece el idioma del juego (las palabras)
     * @param {string|undefined} language Idioma a utilizar
     */
    setLanguage(language: string | undefined): void;
    /**
     * Agregar una categoría de palabras para utilizar en el juego.
     * @param {string} category Categoría
     */
    addCategory(category: string): void;
    /**
     * Elimina una categoría de palabras de lista de categorías a utilizar en el juego.
     * @param {string} category Categoría
     */
    removeCategory(category: string): void;
    /**
     * Establece el nivel de dificultad para el juego.
     * @param {import("./game_config").DifficultyValue} difficulty Nivel de dificultad del juego
     */
    setDifficulty(difficulty: import("./game_config").DifficultyValue): void;
    /**
     * Probar letra
     * @param {import("./word").Letter} letter
     */
    proveLetter(letter: import("./word").Letter): boolean;
    /**
     * Utilizar ayuda
     * @param {import("./helper").HelperTypeValue} helper
     */
    useHelper(helper: import("./helper").HelperTypeValue): void;
    #private;
}
/**
 * @typedef {0|1|2|3} GameStatusValue
 */
/**
 * @typedef {Object} GameStatusEnum
 * @property {0} Setup
 * @property {1} Playing
 * @property {2} Paused
 * @property {3} Finished
 */
/**
 * Enumerador sobre el estatus del juego.
 * Setup -> Playing (play)
 * Playing -> Paused (pause)
 * Playing -> Finished (finish)
 * Paused -> Playing (resume)
 * Paused -> Finished (finish)
 * @readonly
 * @type {GameStatusEnum}
 */
export const GameStatus: GameStatusEnum;
import { GameRound } from "./game_round";
import { GameState } from "./game_state";
import { GameStatistics } from "./game_statistics";
import { WordListManager } from "./word_list_manager";
//# sourceMappingURL=game.d.ts.map