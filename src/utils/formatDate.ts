export const formatDate = ({ dateObject }: { dateObject?: Date | string }) => {
  if (!dateObject) return "";
  if (typeof dateObject === "string") {
    dateObject = new Date(dateObject);
  }
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear().toString();
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;
  return formattedDate;
};

export const formatDateToString = (
  input: number | string,
  locale = "en-US"
): string => {
  const date = new Date(input);
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
