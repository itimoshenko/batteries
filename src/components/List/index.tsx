import { Button, List as AntList } from 'antd';
import React, {
  memo,
} from 'react';

export type ListItem = {
  id: string;
  title: string;
};

type ListProps = {
  isLoading: boolean;
  data: ListItem[];
  error: unknown;
  // eslint-disable-next-line react/require-default-props
  onItemClick?: (item: ListItem) => void;
};

const List = memo((
  {
    isLoading, data, error, onItemClick,
  }: ListProps,
) => {
  if (error) {
    return <div>Failed to fetch data</div>;
  }

  return (
    <AntList
      className="mx-auto my-16 max-w-[600px] font-bold h-full"
      loading={isLoading}
      size="large"
      dataSource={data}
      renderItem={(item, i) => (
        <AntList.Item
          actions={onItemClick ? [
            <Button
              data-testid={`list-btn-${i}`}
              size="large"
              onClick={() => onItemClick(item)}
            >
              SHOW
            </Button>,
          ] : []}
        >
          <AntList.Item.Meta
            description={item.title}
          />
        </AntList.Item>
      )}
    />
  );
});

export default List;
