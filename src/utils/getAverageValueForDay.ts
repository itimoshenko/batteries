import { getDatesDiffBy } from './getDatesDiffBy';

// eslint-disable-next-line import/prefer-default-export
export const getAverageValueForDay = <
    T extends Record<string | number, unknown> & { timestamp: string },
>(
    records: T[][],
    prop: keyof T,
  ) => records
    .map(([start, end]) => {
      const valueDiff = Number(start[prop]) - Number(end[prop]);

      return (
        (valueDiff / getDatesDiffBy(start.timestamp, end.timestamp)) * 24
      );
    })
    .reduce((acc, i) => acc + i, 0) / records.length;
