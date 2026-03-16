import en from "@/messages/en.json";
import uz from "@/messages/uz.json";

const map = { en, uz };

export type Locale = keyof typeof map;

export function getLocaleByRegion(region?: string): Locale {
  if (!region) return "en";
  const normalized = region.toLowerCase();
  if (normalized.includes("uz") || normalized.includes("tashkent")) return "uz";
  return "en";
}

export function t(locale: Locale, key: keyof typeof en) {
  return map[locale][key] ?? map.en[key];
}
