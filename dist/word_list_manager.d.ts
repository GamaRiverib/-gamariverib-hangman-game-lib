/**
 * @class WordListManager
 * @property {Array.<string>} availableLanguages
 */
export class WordListManager {
    /**
     *
     * @param {Array.<WordList>} wordList
     */
    constructor(wordList: Array<WordList>);
    /**
     * Lista de idiomas disponibles
     * @returns {Array.<string>}
     */
    get availableLanguages(): string[];
    /**
     * Obtiene la lista de categorias disponibles para el idioma indicado
     * @param {string} language Idioma
     * @returns {Array.<string>}
     */
    getCategoriesByLanguage(language: string): Array<string>;
    /**
     * Obtiene una lista de palabras para el idioma indicado
     * @param {string} language Idioma
     * @returns {WordList}
     */
    getWordListByLanguage(language: string): WordList;
    #private;
}
import { WordList } from "./word_list";
//# sourceMappingURL=word_list_manager.d.ts.map