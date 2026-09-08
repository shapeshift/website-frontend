# Developers Directory

This directory contains the `/developers` landing page: the entry point for dApps, chains, and wallets integrating ShapeShift's swap widget or REST API.

## Directory Structure

- **layout.tsx**: Metadata (title/description/OG/Twitter) for the page, plus `DevelopersResourceHints` (DNS prefetch/preconnect for `widget.shapeshift.com`).
- **page.tsx**: Assembles all sections below in order.
- **_components/**: One component per page section.

## Page sections, in order

1. **Hero** — the real, live `@shapeshiftoss/swap-widget` embedded in the page (not a mock), plus the primary CTAs (Try the Widget / Talk with us).
2. **Stats** — chains / assets / lifetime volume (static snapshot figures, not live).
3. **Partner logos** — scrolling row of protocols ShapeShift routes across.
4. **Widget** — feature copy + an interactive live theme-color preview (`LiveThemeSwitcher`).
5. **Why ShapeShift** — the routing pitch: compare protocols, return one best route.
6. **API** — clickable endpoint list with a live-switching, typewriter-animated code sample panel.
7. **Economics** — how the affiliate revenue share works, step by step.
8. **Launch path** — the three questions most teams ask before choosing an integration path.
9. **FAQ** — accordion.
10. **Closing CTA** band.

## Technical Implementation

- Most copy lives in `app/[lang]/_utils/dictionary/developers.ts` under `DEVELOPERS_DICT.page`, **except** WhyShapeShift, WidgetSection's feature ring, ApiSection's code panels, EconomicsSection's milestones, and LaunchPath's Q&A, which hardcode their copy directly in JSX (illustration- or interaction-heavy sections where copy, visuals, and behavior are tightly coupled).
- `DevelopersHero.tsx` embeds the real `@shapeshiftoss/swap-widget` React SDK (dynamically imported, `ssr: false`) with `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`. Set this public Reown project ID before building (Next.js embeds it in the client bundle); the existing swap-widget service uses the value documented in `.env.local.sample`. Configure it in each Railway environment before promoting this page. Verify the website origin is allowed in Reown and test wallet connection before release. Set `NEXT_PUBLIC_SHAPESHIFT_PARTNER_CODE` to ShapeShift's registered affiliate code before release so website swaps are attributed to its payout account; verify the code via `/v1/partner/{code}`.
- Client components (interactive state, refs, or the widget's own client-only requirements): `DevelopersHero`, `DevelopersWidgetSection`, `DevelopersApiSection`, `DevelopersFaq`, `DevelopersPartnerLogos`. Everything else is a server component.
- Reuses existing shared components (`Button`, `LocalizedLink`) and Tailwind color tokens from `tailwind.config.ts`.

## Development Guidelines

- Keep all partner/API links pointed at real, live URLs (`https://api.shapeshift.com/docs`, `https://widget.shapeshift.com/`) — never placeholder `#` hrefs.
- Match existing Tailwind color tokens (`bg-blue`, `bg-blueLight`, `bg-mint`, `bg-secondBg`, `border-stroke`, etc.) rather than introducing new hex values.
- The `@shapeshiftoss/swap-widget` SDK and its peer dependencies (`wagmi`, `@reown/appkit*`, `@solana/wallet-adapter-*`, etc.) are the only dependency this page adds to the repo. `next.config.ts`'s `webpack` block and `middleware.ts`'s CSP scoping (to `/developers` only) exist solely to support it — see the comments in both files before changing either.
