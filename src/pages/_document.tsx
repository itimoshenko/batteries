import React, { memo } from 'react';

import {
  Html, Head, Main, NextScript,
} from 'next/document';

const Document: React.FC = memo(() => (
  <Html lang="en" className="bg-colorBgBase">
    <Head />
    <body className="m-0">
      <Main />
      <NextScript />
    </body>
  </Html>
));

export default Document;
