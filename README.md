# Dansstudio Hengelo

Statische website voor Dansstudio Hengelo, gevestigd in de sportkantine van Sportvereniging H.G.V. te Hengelo. De site biedt een sfeerimpressie, contactinformatie en een routebeschrijving.

Live: [dansstudiohengelo.nl](https://dansstudiohengelo.nl)

## Gebouwd met

- [Astro](https://astro.build) v5 — statische sitegenerator
- [Tailwind CSS](https://tailwindcss.com) v4
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev) — testen
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting en deployment

## Aan de slag

### Vereisten

- Node.js 18 of hoger
- npm

### Installatie

```bash
npm install
```

### Ontwikkelserver starten

```bash
npm run dev
```

De site is bereikbaar op `http://localhost:4321`.

## Beschikbare commando's

| Commando          | Omschrijving                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start de lokale ontwikkelserver      |
| `npm run build`   | Bouw de productieversie naar `dist/` |
| `npm run preview` | Bekijk de productieversie lokaal     |
| `npm test`        | Voer de tests uit                    |

## Inhoud aanpassen

Paginateksten, contactgegevens en galerijafbeeldingen staan in de JSON-bestanden onder `content/`:

- `content/site.json` — naam, tagline, contactgegevens
- `content/home.json` — hero, over, galerij, contactsectie

## Build en deployment

De site wordt gebouwd als volledig statische HTML naar de `dist/` map en gedeployed via Cloudflare Pages.

Stel de volgende omgevingsvariabele in via het Cloudflare Pages dashboard of CI:

| Variabele         | Waarde                         |
| ----------------- | ------------------------------ |
| `PUBLIC_SITE_URL` | `https://dansstudiohengelo.nl` |
