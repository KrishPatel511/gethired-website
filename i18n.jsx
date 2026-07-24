import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./src/locales/en.json";

const savedLang = localStorage.getItem("lng") || "en";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
        },
        lng: savedLang,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // React already escapes
        },
        react: {
            useSuspense: false, // simplify usage
        },
    });

export default i18n;
