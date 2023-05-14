import { calculate } from '../calculate';

type Item = {
  val: number;
};

describe('calculate', () => {
  it('should return the correct aggregation', () => {
    const input = {
      key1: [
        { val: 1 },
        { val: 2 },
      ],
      key2: [
        { val: 3 },
        { val: 4 },
      ],
    };
    const calculatePred = (arr: Item[]) => ({
      sum: arr.reduce((acc, el) => acc + el.val, 0),
      count: arr.length,
    });
    const expected = {
      key1: {
        sum: 3,
        count: 2,
      },
      key2: {
        sum: 7,
        count: 2,
      },
    };
    const result = calculate(input, calculatePred);
    expect(result).toEqual(expected);
  });

  it('should handle deeply nested objects', () => {
    const input = {
      key1: {
        subkey1: [
          { val: 1 },
          { val: 2 },
        ],
        subkey2: [
          { val: 3 },
          { val: 4 },
        ],
      },
      key2: {
        subkey1: [
          { val: 5 },
          { val: 6 },
        ],
      },
    };
    const calculatePred = (arr: Item[]) => ({
      sum: arr.reduce((acc, el) => acc + el.val, 0),
      count: arr.length,
    });
    const expected = {
      key1: {
        subkey1: {
          sum: 3,
          count: 2,
        },
        subkey2: {
          sum: 7,
          count: 2,
        },
      },
      key2: {
        subkey1: {
          sum: 11,
          count: 2,
        },
      },
    };
    const result = calculate(input, calculatePred);
    expect(result).toEqual(expected);
  });
});
