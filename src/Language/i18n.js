import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './english';
import ar from './arabic';

function Languages(language) {
  console.log('language', language);
  // return;
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      ar: {translation: ar},
    },
    lng: language, // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}
export default Languages;
