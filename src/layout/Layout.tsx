import React, { memo } from 'react';

import {
  ConfigProvider,
  Layout as AntLayout,
} from 'antd';

import THEME from '../../ant-design.theme';

const { Content, Footer } = AntLayout;

const Layout: React.FC<React.PropsWithChildren> = memo((
  { children }: React.PropsWithChildren,
) => (
  <ConfigProvider theme={THEME}>
    <AntLayout className="min-h-screen">
      <Content className="h-full">
        {children}
      </Content>
      <Footer className="h-[10px] p-0 bg-colorPrimary" />
    </AntLayout>
  </ConfigProvider>
));

export default Layout;
