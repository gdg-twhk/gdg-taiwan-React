import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// 匯入各語系檔案
import { en } from './locales/en/index';
import { zh } from './locales/zh/index';
import { zhCN } from './locales/zh-CN/index';
import { ja } from './locales/ja/index';
import { ko } from './locales/ko/index';
import { supportedLanguages } from './languages';

const resources = {
  en,
  zh,
  'zh-CN': zhCN,
  ja,
  ko,
  // 如有其他語系可在此新增
};

i18n
  .use(LanguageDetector) // 自動偵測瀏覽器語系
  .use(initReactI18next) // React Hooks 支援
  .init({
    resources,
    supportedLngs: supportedLanguages.map(lang => lang.code),
    fallbackLng: ['en'], // 找不到嘗試英文
    interpolation: { escapeValue: false },
  });

export default i18n; 