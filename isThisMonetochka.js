function isThisMonetochka(text) {
  const re = /^([mм]+[о0o]+[нnh]+[eе]+[тt]+[о0o]+((ch)+|[4ч])+[kк]+[aа]+)$/gi;
  const text2 = text.replace(/[^А-ЯA-Z0-9]+/gi, '');
  return re.test(text2);
}

module.exports = isThisMonetochka;
