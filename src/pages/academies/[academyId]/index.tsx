import React, {
  memo,
} from 'react';
import List from '@/components/List';
import { useDevices } from '@/hooks/useDevices';
import { useRouter } from 'next/router';

const Devices: React.FC = memo(() => {
  const router = useRouter();
  const academyId = router.query.academyId as string;
  const {
    devices, aggregatedBatteries, isLoading, error,
  } = useDevices(academyId);

  return (
    <List
      isLoading={isLoading}
      data={devices.map((serialNumber) => {
        const value = aggregatedBatteries[academyId][serialNumber];

        return ({
          id: serialNumber,
          title: `Device #${serialNumber}, uses ${typeof value === 'number' ? Math.round(value * 100) : value}% of its battery per day`,
        });
      })}
      error={error}
    />
  );
});

export default Devices;
