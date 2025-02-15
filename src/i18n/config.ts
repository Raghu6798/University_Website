import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'Search...': 'Search...',
          'Login': 'Login',
          // Add more translations here
        }
      },
      es: {
        translation: {
          'Search...': 'Buscar...',
          'Login': 'Iniciar sesión',
          // Add more translations here
        }
      },
      fr: {
        translation: {
          'Search...': 'Rechercher...',
          'Login': 'Se connecter',
          // Add more translations here
        }
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;