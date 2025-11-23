import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en", // default language
    supportedLngs: ["en", "ko", "zh"],
    preload: ["en", "ko", "zh"], // Preload all languages
    debug: true,

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
