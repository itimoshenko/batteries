import { deviceDataQuery } from '@/store';
import { useRecoilValue } from 'recoil';
import useBatteryData from '../useBatteryData';

// eslint-disable-next-line import/prefer-default-export
export const useDevice = (academyId: string, deviceId: string) => {
  const { isLoading, error } = useBatteryData();

  const deviceData = useRecoilValue(deviceDataQuery({ academyId, deviceId }));

  return {
    deviceData, isLoading, error,
  };
};
