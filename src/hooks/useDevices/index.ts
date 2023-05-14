import { aggregatedBatteriesQuery, devicesQuery } from '@/store';
import { useRecoilValue } from 'recoil';
import useBatteryData from '../useBatteryData';

// eslint-disable-next-line import/prefer-default-export
export const useDevices = (academyId: string) => {
  const { isLoading, error } = useBatteryData();

  const devices = useRecoilValue(devicesQuery(academyId));
  const aggregatedBatteries = useRecoilValue(aggregatedBatteriesQuery);

  return {
    devices, aggregatedBatteries, isLoading, error,
  };
};
