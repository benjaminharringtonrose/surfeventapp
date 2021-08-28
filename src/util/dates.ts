export const getDatesBetweenDates = (startDate: Date, endDate: Date) => {
  // gets all of the dates in between and including startDate and endDate
  let dates: Date[] = [];
  const theDate = new Date(startDate);
  while (theDate <= endDate) {
    dates = [...dates, new Date(theDate)];
    theDate.setDate(theDate.getDate() + 1);
  }
  return dates;
};

export const AddMinutesToDate = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};
