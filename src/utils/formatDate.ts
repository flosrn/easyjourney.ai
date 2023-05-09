export const formatDate = ({ dateObject }: { dateObject: Date | string }) => {
  if (!dateObject) {
    return "date undefined"; // ou une autre valeur par défaut que vous souhaitez utiliser
  }
  // @ts-expect-error
  const day = dateObject.getDate().toString().padStart(2, "0");
  // @ts-expect-error
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  // @ts-expect-error
  const year = dateObject.getFullYear().toString();
  // @ts-expect-error
  const hours = dateObject.getHours().toString().padStart(2, "0");
  // @ts-expect-error
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  // @ts-expect-error
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
