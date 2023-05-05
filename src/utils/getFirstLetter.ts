const getFirstLetters = (name: string) => {
  const splitedName = name.split(" ");
  if (splitedName.length > 1) {
    return splitedName[0][0] + splitedName[1][0];
  }
  return name.charAt(0).toUpperCase();
};

export default getFirstLetters;
