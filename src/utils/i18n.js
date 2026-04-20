import es from '../locales/es.json';
import en from '../locales/en.json';

const translations = { es, en };

export function useTranslations(lang) {
  return function t(key) {
    const keys = key.split('.');
    let result = translations[lang] || translations.es;
    
    for (const k of keys) {
      if (result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  };
}

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';
