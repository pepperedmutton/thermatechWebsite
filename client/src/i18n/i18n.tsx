import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

export type Locale = 'zh-CN' | 'en' | 'ja' | 'ru-RU';

export const SUPPORTED_LOCALES: Locale[] = ['zh-CN', 'en', 'ja', 'ru-RU'];

const PATH_PREFIX: Record<Locale, string> = {
  'zh-CN': '',
  en: '/en',
  ja: '/ja',
  'ru-RU': '/ru',
};

type Translations = Record<string, string>;
type NamespacedTranslations = Record<string, Translations>;
type LocaleTranslations = Record<Locale, NamespacedTranslations>;

const rawModules = import.meta.glob('../locales/**/*.json', { eager: true }) as Record<
  string,
  { default: Record<string, string> }
>;

const translations: LocaleTranslations = SUPPORTED_LOCALES.reduce((acc, locale) => {
  acc[locale] = {};
  return acc;
}, {} as LocaleTranslations);

Object.entries(rawModules).forEach(([path, module]) => {
  const match = path.match(/..\/locales\/([^/]+)\/([^/]+)\.json$/);
  if (!match) return;
  const [, localeKey, ns] = match;
  const locale = localeKey as Locale;
  if (!SUPPORTED_LOCALES.includes(locale)) return;
  translations[locale][ns] = module.default || {};
});

type I18nContextValue = {
  locale: Locale;
  t: (key: string, fallback?: string) => string;
  buildLocalizedPath: (nextLocale: Locale, pathname: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getNamespacesKey(key: string) {
  const [ns, ...rest] = key.split('.');
  return { ns, key: rest.join('.') };
}

function stripLocalePrefix(pathname: string): string {
  if (pathname.startsWith('/en/')) return pathname.replace(/^\/en/, '') || '/';
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/ja/')) return pathname.replace(/^\/ja/, '') || '/';
  if (pathname === '/ja') return '/';
  if (pathname.startsWith('/ru/')) return pathname.replace(/^\/ru/, '') || '/';
  if (pathname === '/ru') return '/';
  return pathname || '/';
}

export function detectLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ja')) return 'ja';
  if (pathname.startsWith('/ru')) return 'ru-RU';
  return 'zh-CN';
}

export function buildLocalizedPath(locale: Locale, pathname: string): string {
  const clean = stripLocalePrefix(pathname || '/');
  const prefix = PATH_PREFIX[locale] || '';
  if (clean === '/' && prefix) return `${prefix}/`;
  return `${prefix}${clean}` || '/';
}

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nContextValue>(() => {
    const namespaces = translations[locale] || {};
    const t = (key: string, fallback = '') => {
      const { ns, key: innerKey } = getNamespacesKey(key);
      const bucket = namespaces[ns];
      if (!bucket) return fallback || key;
      return bucket[innerKey] ?? fallback ?? key;
    };

    return {
      locale,
      t,
      buildLocalizedPath: (nextLocale, pathname) => buildLocalizedPath(nextLocale, pathname),
    };
  }, [locale]);

  // Sync <html lang> for accessibility/SEO on client side.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

