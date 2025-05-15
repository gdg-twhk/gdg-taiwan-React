import { useTranslation } from "react-i18next";
import { activityMeta } from "./index";

export type ActivityKey = keyof typeof activityMeta;

export function useActivityContent() {
  const { t } = useTranslation();
  return (Object.keys(activityMeta) as ActivityKey[]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        title: t(`activity.${key}.title`),
        description: t(`activity.${key}.description`),
        ...activityMeta[key],
      },
    }),
    {} as Record<
      ActivityKey,
      typeof activityMeta[ActivityKey] & { title: string; description: string }
    >
  );
} 