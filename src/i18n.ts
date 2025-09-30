import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "@/locales/zh-CN/translation.json";

i18n
  .use(initReactI18next) // 绑定 React
  .init({
    resources: {
      "zh-CN": { translation: zh },
    },
    lng: "zh-CN",
    ns: ["translation"],
    fallbackLng: "zh-CN",
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
