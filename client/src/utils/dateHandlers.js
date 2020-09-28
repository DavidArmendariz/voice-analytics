export const handleStartDateChange = (date, endDate, setStartDate) => {
  if (date > endDate) {
    alert("Start date cannot be greater than end date");
  } else {
    date.setHours(0, 0, 0);
    setStartDate(date);
  }
};

export const handleEndDateChange = (date, startDate, setEndDate) => {
  if (date < startDate) {
    alert("End date cannot be less than end date");
  } else {
    date.setHours(23, 59, 59);
    setEndDate(date);
  }
};
