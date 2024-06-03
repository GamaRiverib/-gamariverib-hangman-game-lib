/**
 * @class WordList
 * @property {string} language Idioma de la lista de palabras
 * @property {Array.<Word>} words Las palabras
 * @property {Array.<string>} selectedCategories Lista de categorias seleccionadas
 * @property {number} selectedDifficulty Dificultad máxima a utilizar
 */
export class WordList {
    /**
     * Inicializa un arreglo de palabras
     * @param {Array.<any>} json
     * @returns {Array.<Word>}
     */
    static wordsFromJson(json: Array<any>): Array<Word>;
    /**
     * Inicializa una lista de palabras desde un arreglo JSON
     * @param {any} json
     * @returns {WordList}
     */
    static fromJson(json: any): WordList;
    /**
     * Inicializa una lista de palabras desde el contenido de un archivo CSV
     * @param {string} language Idioma de las palabras
     * @param {string} csv Palabras en formato csv (letters, category, difficulty, definition, hits)
     * @returns {WordList}
     */
    static fromCsv(language: string, csv: string): WordList;
    /**
     * Constructor de la clase WordList
     * @param {string|undefined} language Idioma de las palabras
     * @param {Array.<Word>} words Lista de las palabras
     */
    constructor(language: string | undefined, words: Array<Word>);
    /**
     * Idioma de las palabras
     * @returns {string}
     */
    get language(): string;
    /**
     * Lista de categorias disponibles
     * @returns {Array.<string>}
     */
    get availableCategories(): string[];
    /**
     * Lista de categorias seleccionadas
     * @returns {Array.<string>}
     */
    get selectedCategories(): string[];
    /**
     * Dificultad máxima a utilizar
     * @returns {import("./game_config").DifficultyValue}
     */
    get selectedDifficulty(): import("./game_config").DifficultyValue;
    /**
     * Número total de palabras en la lista
     * @returns {number}
     */
    get wordsCount(): number;
    /**
     * Lista de palabras (filtrado por categorias y dificultad)
     * @return {Array.<Word>}
     */
    get words(): Word[];
    /**
     * Agregar una palabra a la lista
     * @param {Word} word Palabra
     */
    addWord(word: Word): void;
    /**
     * Permite agregar una categoria de las palabras a utilizar
     * @param {string} category Usar palabras de esta categoria
     */
    selectCategory(category: string): void;
    /**
     * Permite quitar una categoria de las palabras a utilizar
     * @param {string} category No usar palabras de esta categoria
     */
    unselectCategory(category: string): void;
    /**
     * Permite incluir las palabras de la dificultad máxima indicada
     * @param {import("./game_config").DifficultyValue} difficulty Usar palabras de esta dificultad
     */
    setDifficulty(difficulty: import("./game_config").DifficultyValue): void;
    /**
     * Obtiene una palabra aleatoriamente de las seleccionadas (categoría y dificultad)
     * @returns {Word}
     */
    getRandomWord(): Word;
    #private;
}
/**
 * Inicializa un arreglo de palabras
 * @param {Array.<any>} json
 * @returns {Array.<Word>}
 */
export function createWords(json: Array<any>): Array<Word>;
/**
 * Inicializa una lista de palabras desde un arreglo JSON
 * @param {any} json
 * @returns {WordList}
 */
export function createWordListFromJson(json: any): WordList;
/**
 * Inicializa una lista de palabras desde el contenido de un archivo CSV
 * @param {string} language Idioma de las palabras
 * @param {string} csv Palabras en formato csv (letters, category, difficulty, definition, hits)
 * @returns {WordList}
 */
export function createWordListFromCsv(language: string, csv: string): WordList;
import { Word } from "./word";
//# sourceMappingURL=word_list.d.ts.map