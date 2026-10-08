# tool-template

The shared base for tiny, mobile-first tools: one shared link, no login,
monochrome. TabMath and TagYourTurn are built on it.

**New tool?** Follow [`docs/new-tool.md`](./docs/new-tool.md).

## What you get

- **Next.js 16 + React 19 + TypeScript**, Tailwind 4, hand-rolled UI primitives in the monochrome system
- **Postgres on Neon + Prisma 7** with a capped connection pool, a least-privilege
  app role, and a build-time schema drift check
- **Security by default**: per-request nonce CSP with violation reporting, HSTS
  and friends, CSRF guard, size-capped Zod-validated bodies, 128-bit secret links,
  `no-store` + `noindex` on secret routes, Postgres-backed rate limiting
- **A working example**: create a "space", share its secret link, replace the
  link. It exercises every pattern above; replace it with your tool.
- **Agent rules** in `AGENTS.md` (Claude Code reads it via `CLAUDE.md`)
- **Vitest** with tests for every shared helper

Optional modules (auth with guest sessions, photo uploads, AI extraction) are
documented in [`docs/modules/`](./docs/modules) with the reference
implementation in TabMath.

## Run it

```bash
npm install
cp .env.example .env      # app-role pooled + direct Neon URLs
npx prisma migrate deploy # with the owner role, first time only
npm run dev
```

## Commands

```bash
npm run dev         # dev server
npm run build       # prisma generate + drift check + next build
npm run typecheck   # next typegen + tsc
npm run lint
npm test            # vitest
```

## Design system

Monochrome, two voices, 1px borders, zero radius, numbered section labels.

| Token | Use |
| --- | --- |
| `ink` / `paper` | text and background, borders |
| `mute` / `faint` | secondary text, placeholders |
| `wash` | hover, read-only fields |
| `display` utility | Space Grotesk headlines and big numbers |
| `label` utility | 11px uppercase mono labels |

Primitives: `Button` (+ `buttonVariants` for links), `Input`, `Textarea`,
`Field`, `Switch`, `Dialog` (native `<dialog>`), `ToastProvider`/`useToast`,
`CopyField`, `SectionLabel`, `Shell`, `Divider`.

## Keeping tools in sync

Tools copy the template; they don't depend on it. When a shared file improves
here (anything outside "This tool" in `AGENTS.md`, `src/lib/server/*`,
`src/lib/csp*.ts`, `src/components/ui/*`, `next.config.ts`, `src/proxy.ts`),
port it to each tool in a PR.
