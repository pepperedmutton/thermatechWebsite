I18n quick guide
----------------

- Locales live under `src/locales/<locale>/` where `<locale>` is one of:
  - zh-CN (default, no URL prefix)
  - en   (prefix `/en`)
  - ja   (prefix `/ja`)
  - ru-RU (prefix `/ru`)
- Add one JSON file per page/namespace (e.g., `home.json`, `products.json`); keep the same keys across locales.
- Access translations with `const { t } = useI18n();` and call `t('home.heroTitle', 'fallback')`.
- Build locale-aware links with `buildLocalizedPath(locale, pathname)` or read `locale` from `useI18n()`.
- The `I18nProvider` sets `<html lang>` automatically on the client; routes are pre-scoped per-locale in `routes.jsx`.

For new pages:
1) Add JSON files for all locales with identical keys.
2) Use relative child paths in routes; top-level prefixes are handled in `routes.jsx`.
3) Use `Link to={buildLocalizedPath(locale, '/your-path')}` or keep paths relative within localized routes.
