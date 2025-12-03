import { buildLocalizedPath, Locale } from './i18n';

export const BASE_URL = 'https://www.starthermatech.com';

export const HREFLANGS: Array<{ locale: Locale; hreflang: string }> = [
  { locale: 'zh-CN', hreflang: 'zh-CN' },
  { locale: 'en', hreflang: 'en' },
  { locale: 'ja', hreflang: 'ja' },
  { locale: 'ru-RU', hreflang: 'ru-RU' },
];

const OG_LOCALE_MAP: Record<Locale, string> = {
  'zh-CN': 'zh_CN',
  'en': 'en_US',
  'ja': 'ja_JP',
  'ru-RU': 'ru_RU',
};

export function buildCanonicalUrl(locale: Locale, pathname: string) {
  const path = buildLocalizedPath(locale, pathname || '/');
  const suffix = path === '/' ? '' : path;
  return `${BASE_URL}${suffix}`;
}

export function buildHreflangLinks(pathname: string) {
  return HREFLANGS.map(({ locale, hreflang }) => ({
    hreflang,
    href: buildCanonicalUrl(locale, pathname),
  }));
}

export function getOgLocale(locale: Locale): string {
  return OG_LOCALE_MAP[locale] || 'zh_CN';
}

export function getOgLocaleAlternates(currentLocale: Locale): string[] {
  return HREFLANGS
    .filter(({ locale }) => locale !== currentLocale)
    .map(({ locale }) => OG_LOCALE_MAP[locale]);
}
