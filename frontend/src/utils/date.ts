export const formatDate = (date: string | Date): string => {
  console.log(date);
  let d: Date;

  if (typeof date === "string") {
    d = new Date(date);
    if (isNaN(d.getTime())) {
      const [year, month, day] = date.split("-").map(Number);
      d = new Date(Date.UTC(year, month - 1, day));
    }
  } else {
    d = date;
  }

  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
