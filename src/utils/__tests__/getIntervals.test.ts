import { getIntervals } from '../getIntervals';

type BatteryRecord = {
  batteryLevel: number;
};

describe('getIntervals', () => {
  it('should return an empty array when records array is empty', () => {
    expect(getIntervals<BatteryRecord>([], 'batteryLevel')).toEqual([]);
  });

  it('should return an empty array for one record', () => {
    const records: BatteryRecord[] = [{ batteryLevel: 50 }];

    expect(getIntervals(records, 'batteryLevel')).toEqual([]);
  });

  it('should return multiple intervals for records', () => {
    const records: BatteryRecord[] = [
      { batteryLevel: 20 },
      { batteryLevel: 10 },
      { batteryLevel: 25 },
      { batteryLevel: 15 },
      { batteryLevel: 5 },
    ];

    expect(getIntervals(records, 'batteryLevel')).toEqual([
      [records[0], records[1]],
      [records[2], records[4]],
    ]);
  });
});
