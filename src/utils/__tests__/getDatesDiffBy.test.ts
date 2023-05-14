import { getDatesDiffBy } from '../getDatesDiffBy';

describe('getDatesDiffBy', () => {
  it('uses the default value of 1 hour for the "by" parameter if it is not provided', () => {
    expect(getDatesDiffBy('2023-05-14T00:00:00Z', '2023-05-14T01:00:00Z')).toBe(1);
  });

  it('accepts a custom value for the "by" parameter', () => {
    expect(getDatesDiffBy('2023-05-14T00:00:00Z', '2023-05-14T00:01:00Z', 1000)).toBe(60);
    expect(getDatesDiffBy('2023-05-14T00:00:00Z', '2023-05-14T01:00:00Z', 1000 * 60)).toBe(60);
    expect(getDatesDiffBy('2023-05-14T00:00:00Z', '2023-05-14T01:00:00Z', 1000 * 60 * 60)).toBe(1);
  });
});
