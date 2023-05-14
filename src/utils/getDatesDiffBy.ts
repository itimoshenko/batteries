// eslint-disable-next-line import/prefer-default-export
export const getDatesDiffBy = (start: string, end: string, by = 1000 * 60 * 60) => {
  const startDate = new Date(start).valueOf();
  const endDate = new Date(end).valueOf();

  return (endDate - startDate) / by;
};
