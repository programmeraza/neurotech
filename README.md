# NEUROTECH v2

Editorial Monochrome redesign of the NEUROTECH marketing site, built with Next.js.

## Stack

- Next.js (App Router) + TypeScript
- react-i18next for multi-language content (`ru` / `en` / `uz`, see `src/locales/`)
- GSAP is not used here; scroll-driven reveals and the stats counter run on plain `IntersectionObserver` + `requestAnimationFrame`

## Development

```bash
npm install
npm run dev
```

## Environment variables

The consultation form (`src/app/api/consultation/route.ts`) posts leads to a Telegram chat and needs:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Set these in the Vercel project's Environment Variables before the form will work in production.
