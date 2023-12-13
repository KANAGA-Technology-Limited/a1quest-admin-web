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
