import React, { memo } from 'react';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Layout } from '@/layout';
import { RecoilRoot } from 'recoil';

const App: React.FC<AppProps> = memo(({ Component }: AppProps) => (
  <RecoilRoot>
    <Layout>
      <Component />
    </Layout>
  </RecoilRoot>
));

export default App;
