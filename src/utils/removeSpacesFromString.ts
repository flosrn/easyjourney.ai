const removeSpacesFromString = (str: string): string =>
  str.replaceAll(/\s{2,}/g, " ").trim();

export default removeSpacesFromString;
