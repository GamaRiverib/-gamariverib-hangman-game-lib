export type HelperTypeEnum = {
    DiscoverRandomLetter: 0;
    DiscardRandomLetter: 1;
    DiscoverHint: 2;
};
export type HelperTypeValue = 0 | 1 | 2;
/**
 * @typedef {0|1|2} HelperTypeValue
 */
/**
 * @typedef {Object} HelperTypeEnum
 * @property {0} DiscoverRandomLetter
 * @property {1} DiscardRandomLetter
 * @property {2} DiscoverHint
 */
/**
 * Enumerador de nivel de dificultad del juego
 * @readonly
 * @type {HelperTypeEnum}
 */
export const HelperTypeEnum: HelperTypeEnum;
/**
 * @class Helper
 * @property {HelperTypeValue} type
 * @property {number} amount
 */
export class HelperConfig {
    /**
     * Constructor de la clase Helper
     * @param {HelperTypeValue} type
     * @param {number} amount
     */
    constructor(type: HelperTypeValue, amount: number);
    /**
     * @return {HelperTypeValue}
     */
    get type(): HelperTypeValue;
    /**
     * @returns {number}
     */
    get amount(): number;
    #private;
}
//# sourceMappingURL=helper.d.ts.map