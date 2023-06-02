const getPosterTitle = (prompt: string) => {
  const capitalizedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
  const title = capitalizedPrompt
    .split(" ")
    .slice(0, 6)
    .join(" ")
    .replaceAll(",", "");
  return title;
};

export default getPosterTitle;
