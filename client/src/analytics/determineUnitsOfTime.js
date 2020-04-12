const determineUnitsOfTime = totalSum => {
  if (totalSum < 60) {
    return { units: "sec", total: totalSum };
  }
  if (totalSum > 60 && totalSum < 3600) {
    return { units: "min", total: totalSum / 60 };
  } else {
    return { units: "hrs", total: totalSum / 3600 };
  }
};

export default determineUnitsOfTime;
