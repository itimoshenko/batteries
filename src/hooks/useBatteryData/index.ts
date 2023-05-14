import { BatteryRecord } from '@/types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { batteryRecordsState } from '@/store';
import { loadBatteryData } from '@/api/battery';
import useResource from '../useResource';

const useBatteryData = () => {
  const { resource, isLoading, error } = useResource<void, BatteryRecord[], BatteryRecord[]>({
    loadImmediately: true,
    defaultResource: [],
    onLoad: loadBatteryData,
  });

  const [batteryData, setRawJokesState] = useRecoilState(batteryRecordsState);

  useEffect(() => setRawJokesState(resource), [resource, setRawJokesState]);

  return { batteryData, isLoading, error };
};

export default useBatteryData;
