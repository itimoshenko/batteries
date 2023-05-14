import { getAverageValueForDay } from '../getAverageValueForDay';

type BatteryRecord = {
  batteryLevel: number;
  timestamp: string;
};

const records: BatteryRecord[][] = [
  [
    { batteryLevel: 1, timestamp: '2023-05-15T09:00:00.000Z' },
    { batteryLevel: 0.8, timestamp: '2023-05-16T21:00:00.000Z' },
  ],
];

describe('getAverageValueForDay', () => {
  it('should return NaN when records array is empty', () => {
    expect(getAverageValueForDay([], 'batteryLevel')).toBeNaN();
  });

  it('should calculate the average value difference correctly', () => {
    expect(getAverageValueForDay(records, 'batteryLevel')).toEqual(0.1333333333333333);
  });

  it('should return NaN when there are no timestamp values', () => {
    const invalidRecords: any[][] = [
      [
        { batteryLevel: 90, timestamp: '2023-05-14T12:00:00.000Z' },
        { batteryLevel: 70 },
      ],
      [
        { batteryLevel: 80 },
        { batteryLevel: 50, timestamp: '2023-05-15T17:00:00.000Z' },
      ],
    ];

    expect(getAverageValueForDay(invalidRecords, 'batteryLevel')).toBeNaN();
  });

  it('should return NaN when timestamp values are invalid', () => {
    const invalidRecords: any[][] = [
      [
        { batteryLevel: 90, timestamp: 'invalid-date' },
        { batteryLevel: 70, timestamp: '2023-05-14T14:00:00.000Z' },
      ],
      [
        { batteryLevel: 80, timestamp: '2023-05-15T09:00:00.000Z' },
        { batteryLevel: 50, timestamp: 'invalid-date' },
      ],
    ];

    expect(getAverageValueForDay(invalidRecords, 'batteryLevel')).toBeNaN();
  });
});
