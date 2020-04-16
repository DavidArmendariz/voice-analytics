export const handleStartDateChange = (date, endDate, setStartDate) => {
    if (date > endDate) {
      alert("Start date cannot be greater than end date");
    } else {
      setStartDate(date);
    }
  };

export const handleEndDateChange = (date, startDate, setEndDate) => {
    if (date < startDate) {
      alert("End date cannot be less than end date");
    } else {
      setEndDate(date);
    }
  };