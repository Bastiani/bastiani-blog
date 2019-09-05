export const formatDate = (date: string) => {
  const appendLeadingZeroes = (number: number) => {
    if (number <= 9) {
      return '0' + number;
    }
    return number;
  };

  const newDate = new Date(date);
  return `${appendLeadingZeroes(newDate.getDate())}/${appendLeadingZeroes(
    newDate.getMonth() + 1
  )}/${newDate.getFullYear()}`;
};
