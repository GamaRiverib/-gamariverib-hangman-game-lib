export type Letter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
/**
 * @class Word
 * @property {string} word
 * @property {string[]} [hints]
 * @property {string} [category]
 * @property {DifficultyValue} [difficulty]
 * @property {string} [definition]
 */
export class Word {
    /**
     * Inicializa la palabra desde un objeto JSON
     * @param {any} json Objeto JSON con la información de la palabra
     * @returns {Word} Instancia de la palabra
     */
    static fromJson(json: any): Word;
    /**
     * Letras de la palabra
     * @param {string} word Palabra
     * @returns {Array.<Letter>}
     */
    static getLetters(word: string): Array<Letter>;
    /**
     * Constructor de la clase Word
     * @param {string} word Letras de la palabra
     * @param {Array.<string>|undefined} [hints] Pistas de la palabra
     * @param {string|undefined} [category] Categoría de la palabra
     * @param {import("./game_config").DifficultyValue|undefined} [difficulty] Dificultad de la palabra
     * @param {string} [definition]
     */
    constructor(word: string, hints?: Array<string> | undefined, category?: string | undefined, difficulty?: import("./game_config").DifficultyValue | undefined, definition?: string);
    /**
     * La palabra
     * @readonly
     * @returns {string}
     */
    readonly get word(): string;
    /**
     * Pistas de la palabra
     * @readonly
     * @returns {Array.<string>}
     */
    readonly get hints(): string[];
    /**
     * Categoría de la palabra
     * @readonly
     * @returns {string}
     */
    readonly get category(): string;
    /**
     * Dificultad de la palabra
     * @readonly
     * @returns {number}
     */
    readonly get difficulty(): number;
    /**
     * Definición de la palabra
     * @readonly
     * @returns {string}
     */
    readonly get definition(): string;
    /**
     * Probar si la letra forma parte de la palabra
     * @param {Letter} letter Letra
     * @returns {boolean}
     */
    prove(letter: Letter): boolean;
    #private;
}
/**
 * @typedef {"a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"|"k"|"l"|"m"|"n"|"o"|"p"|"q"|"r"|"s"|"t"|"u"|"v"|"w"|"x"|"y"|"z"} Letter
 */
/**
 * @type {Array.<Letter>}
 */
export const Letters: Array<Letter>;
/**
 * Convierte una letra de String a Letter
 * @param {string} str Letra en string
 * @returns {Letter|undefined}
 */
export function stringToLetter(str: string): Letter | undefined;
//# sourceMappingURL=word.d.ts.map