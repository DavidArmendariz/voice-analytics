const determineUnitsOfTime = (time) => {
  const hours = ~~(time / 3600);
  const minutes = ~~((time % 3600) / 60);
  const seconds = ~~time % 60;
  const timeFormatted = `${hours ? `${hours}:` : ""}${
    minutes ? `${minutes}:` : ""
  }${seconds}`;
  let units = "sec";
  if (hours && minutes && seconds) {
    units = "hrs";
  } else if (!hours && minutes && seconds) {
    units = "min";
  }
  return `${timeFormatted} ${units}`;
};

export default determineUnitsOfTime;
