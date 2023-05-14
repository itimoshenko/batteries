import { academyDeviceBatteryReplaceCountQuery, academiesQuery } from '@/store';
import { useRecoilValue } from 'recoil';
import useBatteryData from '../useBatteryData';

// eslint-disable-next-line import/prefer-default-export
export const useAcademies = () => {
  const { isLoading, error } = useBatteryData();

  const academies = useRecoilValue(academiesQuery);
  const academyDeviceBatteryReplaceCount = useRecoilValue(
    academyDeviceBatteryReplaceCountQuery,
  );

  return {
    academies,
    academyDeviceBatteryReplaceCount,
    isLoading,
    error,
  };
};
