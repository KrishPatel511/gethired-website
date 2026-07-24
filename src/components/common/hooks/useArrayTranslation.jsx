import { useTranslation } from "react-i18next";

export function useArrayTranslation(key) {
  const { t } = useTranslation();
  return t(key, { returnObjects: true });
}
