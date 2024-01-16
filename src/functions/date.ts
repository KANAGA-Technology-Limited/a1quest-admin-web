export const addOneDayToDate = (date: string) => {
  if (date) {
    const newDate = new Date(date);
    const currentDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    currentDate.setDate(currentDate.getDate() + 1);
    if (newDate > currentDate) {
      return currentDate.toISOString().split('T')[0];
    }
    return newDate.toISOString().split('T')[0];
  }
};

export const addDayToDate = (date: string, numberOfDays: number = 1) => {
  if (date) {
    const newDate = new Date(date);
    const currentDate = new Date();
    newDate.setDate(newDate.getDate() + numberOfDays);
    currentDate.setDate(currentDate.getDate() + numberOfDays);
    if (newDate > currentDate) {
      return currentDate.toISOString().split('T')[0];
    }
    return newDate.toISOString().split('T')[0];
  }
};
