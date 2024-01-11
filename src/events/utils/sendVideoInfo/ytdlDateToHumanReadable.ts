const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ytdlDateToHumanReadable(dateString: string) {
  const dateArray = dateString.split("T")[0].split("-");
  return `${dateArray[2]} ${monthNames[parseInt(dateArray[1]) - 1]} ${
    dateArray[0]
  }`;
}
