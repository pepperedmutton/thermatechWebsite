# StarThermaTech Web — Codex Instructions (React + JavaScript only)

## Hard rules
- React project.
- Do NOT use TypeScript. Do not create/modify `.ts` or `.tsx` files for this feature.
- New code must be `.js` / `.jsx` only.
- Use JSDoc for function contracts if helpful.

## Goal
Implement a Langmuir Probe Virtual Instrument demo at `/vi/langmuir`, and add a CTA link on the Langmuir product page that opens this demo.

## Routing constraints
Codex must detect routing style automatically:
- If Next.js app router: create `app/vi/langmuir/page.jsx`
- If Next.js pages router: create `pages/vi/langmuir.jsx`
- If CRA/Vite + react-router: add route `/vi/langmuir` in router config and create `src/pages/ViLangmuir.jsx` (or match repo conventions)

## Must-have features (MVP)
1) `/vi/langmuir` page:
- 4 modes: Single / Double / Triple / Emissive
- User inputs: gas, Te(eV), ne(m^-3), Vp(V), Ti optional, probe geometry, scan range/points, realism toggles (noise/drift/RF ripple)
- Generate IV curve + show plot
- Invert and show results cards:
  - Single: Te, ne, Vp, Vf
  - Double: Te, ne, Vf (Vp = N/A unless reference enabled)
  - Triple: Te, ne
  - Emissive: Vp (primary), Vf (optional), Te/ne optional but can be N/A
- Buttons: Start Scan, Reset, Copy Share Link
- Share link encodes params into URL query (deterministic)

2) Product page CTA:
- Add a prominent button on `/products/langmuir` linking to `/vi/langmuir`.

## Engineering
- Put math in `src/lib/langmuir/` (or closest existing `lib/`, `utils/`), JS only:
  - `params.js` defaults + validation
  - `simulate.js` curve generators
  - `invert.js` inversion/fit
- Prefer existing UI/chart libs already in repo; avoid heavy new dependencies.
- Build must pass; no console errors.
