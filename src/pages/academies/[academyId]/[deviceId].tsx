import React, {
  memo,
} from 'react';
import { useRouter } from 'next/router';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDevice } from '@/hooks/useDevice';
import THEME from '../../../../theme.json';

const Devices: React.FC = memo(() => {
  const router = useRouter();
  const academyId = router.query.academyId as string;
  const deviceId = router.query.deviceId as string;

  const { deviceData } = useDevice(academyId, deviceId);

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        id={`${academyId}_${deviceId}`}
        data={deviceData}
        margin={{
          top: 50,
          right: 50,
          left: 50,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="batteryLevel" stroke={THEME.colors.colorPrimary} />
      </LineChart>
    </ResponsiveContainer>
  );
});

export default Devices;
