import { aggregateDataBy } from '../aggregateDataBy';

type BatteryRecord = {
  academyId: number;
  serialNumber: string;
};

describe('aggregateDataBy', () => {
  it('should return an empty object when records array is empty', () => {
    expect(aggregateDataBy<BatteryRecord>([], [])).toEqual({});
  });

  it('should group one record by one predicate', () => {
    const records: BatteryRecord[] = [{ academyId: 1, serialNumber: '1234' }];
    const aggregateByPreds = [(r: BatteryRecord) => String(r.academyId)];

    expect(aggregateDataBy(records, aggregateByPreds)).toEqual({ 1: [records[0]] });
  });

  it('should group multiple records by one predicate', () => {
    const records: BatteryRecord[] = [
      { academyId: 1, serialNumber: '1234' },
      { academyId: 2, serialNumber: '5678' },
      { academyId: 1, serialNumber: '4321' },
    ];
    const aggregateByPreds = [(r: BatteryRecord) => String(r.academyId)];

    expect(aggregateDataBy(records, aggregateByPreds)).toEqual({
      1: [records[0], records[2]],
      2: [records[1]],
    });
  });

  it('should group one record by multiple predicates', () => {
    const records: BatteryRecord[] = [{ academyId: 1, serialNumber: '1234' }];
    const aggregateByPreds = [
      (r: BatteryRecord) => String(r.academyId),
      (r: BatteryRecord) => String(r.serialNumber),
    ];

    expect(aggregateDataBy(records, aggregateByPreds)).toEqual({
      1: {
        1234: [records[0]],
      },
    });
  });

  it('should group multiple records by multiple predicates', () => {
    const records: BatteryRecord[] = [
      { academyId: 1, serialNumber: '1234' },
      { academyId: 2, serialNumber: '5678' },
      { academyId: 1, serialNumber: '4321' },
    ];
    const aggregateByPreds = [
      (r: BatteryRecord) => String(r.academyId),
      (r: BatteryRecord) => String(r.serialNumber),
    ];

    expect(aggregateDataBy(records, aggregateByPreds)).toEqual({
      1: {
        1234: [records[0]],
        4321: [records[2]],
      },
      2: {
        5678: [records[1]],
      },
    });
  });
});
