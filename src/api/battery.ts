import { BatteryRecord } from '@/types';
import ApiClient from './ApiClient';

const loadBatteryData = () => ApiClient.request<BatteryRecord[]>(`${process.env.NEXT_PUBLIC_API_URL}/battery-data.json`);

// eslint-disable-next-line import/prefer-default-export
export { loadBatteryData };
