export function isoToNormalDate(iso) {
  const isoDate = new Date(iso);
  const months = [
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
  const year = isoDate.getFullYear();
  const month = isoDate.getMonth();
  const date = isoDate.getDate();
  let hours = isoDate.getUTCHours();
  const minutesbefore = isoDate.getUTCMinutes();
  const AmOrPM = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  let minutes = minutesbefore >= 10 ? minutesbefore : `0${minutesbefore}`;
  const monthName = months[month];
  return { year, monthName, date, hours, minutes, AmOrPM };
}
