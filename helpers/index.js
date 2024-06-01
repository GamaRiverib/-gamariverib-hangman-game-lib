/// @ts-check

const { HelperTypeEnum } = require("../helper");
const { DiscardRandomLetterHelper } = require("./DiscardRandomLetterHelper");
const { DiscoverHintHelper } = require("./DiscoverHintHelper");
const { DiscoverRandomLetterHelper } = require("./DiscoverRandomLetterHelper");

/**
 * Obtiene una instancia del ayudante
 * @param {import("../helper").HelperTypeValue} type Tipo de ayuda
 * @returns {DiscardRandomLetterHelper|DiscoverRandomLetterHelper|DiscoverHintHelper}
 */
function getHelperByType(type) {
  let helper;
  switch (type) {
    case HelperTypeEnum.DiscardRandomLetter:
      helper = new DiscardRandomLetterHelper();
      break;
    case HelperTypeEnum.DiscoverRandomLetter:
      helper = new DiscoverRandomLetterHelper();
      break;
    case HelperTypeEnum.DiscoverHint:
      helper = new DiscoverHintHelper();
      break;
  }
  return helper;
}

module.exports = {
  getHelperByType,
};
