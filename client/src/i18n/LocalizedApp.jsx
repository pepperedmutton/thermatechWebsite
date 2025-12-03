import React from 'react';
import App from '../App';
import { I18nProvider } from './i18n';

export default function LocalizedApp({ locale }) {
  return (
    <I18nProvider locale={locale}>
      <App />
    </I18nProvider>
  );
}

LocalizedApp.defaultProps = {
  locale: 'zh-CN',
};
