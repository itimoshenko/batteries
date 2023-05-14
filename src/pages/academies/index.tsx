import React, {
  memo, useCallback,
} from 'react';
import List, { ListItem } from '@/components/List';
import { useRouter } from 'next/router';
import { useAcademies } from '@/hooks/useAcademies';

const Academies: React.FC = memo(() => {
  const router = useRouter();
  const {
    academies,
    academyDeviceBatteryReplaceCount,
    isLoading,
    error,
  } = useAcademies();

  const handleItemClick = useCallback((item: ListItem) => {
    router.push(`/academies/${item.id}`);
  }, [router]);

  return (
    <List
      isLoading={isLoading}
      data={academies.map((academyId) => ({
        id: academyId,
        title: `School #${academyId}, Batteries to replace: ${academyDeviceBatteryReplaceCount[academyId] || 0}`,
      }))}
      error={error}
      onItemClick={handleItemClick}
    />
  );
});

export default Academies;
