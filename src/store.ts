import {
  atom, selector, selectorFamily,
} from 'recoil';
import { BatteryRecord } from './types';
import { aggregateAndCalculateBatteries } from './utils/batteries';

export const batteryRecordsState = atom<BatteryRecord[]>({
  key: 'batteryRecordsState',
  default: [],
});

export const aggregatedBatteriesQuery = selector({
  key: 'aggregatedBatteriesState',
  get: ({ get }) => {
    const batteryRecords = get(batteryRecordsState);

    return aggregateAndCalculateBatteries(batteryRecords);
  },
});

export const academyDeviceBatteryReplaceCountQuery = selector({
  key: 'academyDeviceBatteryReplaceCountQuery',
  get: ({ get }) => {
    const aggregatedBatteries = get(aggregatedBatteriesQuery);

    return Object.fromEntries(
      Object.entries(aggregatedBatteries)
        .map(([academyId, devices]) => [
          academyId,
          Object.values(devices).filter((value) => typeof value === 'number' && value >= 0.3).length,
        ]),
    );
  },
});

export const academiesQuery = selector({
  key: 'academiesQuery',
  get: ({ get }) => {
    const aggregatedBatteries = get(aggregatedBatteriesQuery);

    return Object.keys(aggregatedBatteries);
  },
});

export const devicesQuery = selectorFamily({
  key: 'devicesQuery',
  get: (academyId: string) => ({ get }) => {
    const aggregatedBatteries = get(aggregatedBatteriesQuery);

    return Object.keys(aggregatedBatteries[academyId] || {});
  },
});
