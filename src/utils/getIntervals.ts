// eslint-disable-next-line import/prefer-default-export
export const getIntervals = <T extends Record<string | number, unknown>>(
  records: T[],
  prop: keyof T,
) => records
    .reduce((acc, r) => {
      const lastIndex = !acc.length ? 0 : acc.length - 1;
      const [start, end] = acc[lastIndex] || [r, r];

      if (end[prop] >= r[prop]) {
        acc[lastIndex] = [start, r];
      } else {
        acc.push([r, r]);
      }

      return acc;
    }, [] as T[][])
    .filter(([start, end]) => start[prop] !== end[prop]);
