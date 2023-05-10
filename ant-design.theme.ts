import { ThemeConfig, theme } from 'antd';

import appTheme from './theme.json';

const THEME: ThemeConfig = {
  token: {
    colorPrimary: appTheme.colors.colorPrimary,
    colorBgBase: appTheme.colors.colorBgBase,
  },
  components: {
    Layout: {
      colorBgHeader: appTheme.colors.colorBgBase,
    },
  },
  algorithm: theme.darkAlgorithm,
};

export default THEME;
