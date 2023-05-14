import { BatteryRecord } from '../types';
import { aggregateDataBy } from './aggregateDataBy';
import { calculate } from './calculate';
import { getAverageValueForDay } from './getAverageValueForDay';
import { getIntervals } from './getIntervals';

const aggregateBatteryRecords = (
  batteryRecords: BatteryRecord[],
) => aggregateDataBy(batteryRecords, [
  (r) => String(r.academyId),
  (r) => r.serialNumber,
]);

// eslint-disable-next-line import/prefer-default-export
export const aggregateAndCalculateBatteries = (batteryRecords: BatteryRecord[]) => {
  const aggregation = aggregateBatteryRecords(batteryRecords);

  return calculate(aggregation, (data: BatteryRecord[]) => {
    const intervals = getIntervals(data, 'batteryLevel');

    if (!intervals.length) {
      return 'unknown';
    }

    const average = getAverageValueForDay(intervals, 'batteryLevel');

    return Number.isNaN(average) ? 'unknown' : average;
  }) as Record<string, Record<string, number | string>>;
};
