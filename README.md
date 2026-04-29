# Habit Tracker PWA

This is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Project Overview

This is a **Habit Tracker Progressive Web App (PWA)** built for Stage 3.

It allows users to:

- Sign up and log in (local authentication)
- Create, edit, and delete habits
- Mark habits as completed per day
- Track streaks based on consecutive completions
- Persist data using `localStorage`
- Work offline after initial load (PWA behavior)

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Running Tests

**Unit + Integration tests (Vitest)**

```bash
npm run test:unit
npm run test:integration
```

**Full test suite (unit + integration + e2e)**

```bash
npm run test
```

**End-to-end tests (Playwright)**

```bash
npm run test:e2e
```

---

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Vitest (unit + integration testing)
- React Testing Library
- Playwright (E2E tests)
- `localStorage` (persistence layer)
- PWA (manifest + service worker)

---

## Data Persistence

This app uses `localStorage` only — no backend.

**Keys used:**

- `habit-tracker-users` — stores registered users
- `habit-tracker-session` — stores active session
- `habit-tracker-habits` — stores all habits

**Example Habit Shape:**

```ts
{
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: 'daily';
  createdAt: string;
  completions: string[];
}
```

---

## PWA Features

The app is installable and works offline after first load.

Implemented:

- `manifest.json` configured
- Service worker registered
- App shell caching
- Offline-safe navigation (no crash when offline)

**Known limitation:** Icons must exist in `/public/icons/` as `icon-192.png` and `icon-512.png`.

---

## Key Features

**Authentication (local only)**

- Signup creates user in `localStorage`
- Login validates stored users
- Session stored in `localStorage`
- Logout clears session

**Habits**

- Create habit (user-specific)
- Edit habit (immutable fields preserved)
- Delete habit with confirmation
- Toggle completion per day
- Prevent duplicate completions
- Auto streak calculation

**Routing**

- `/` — splash screen, redirects based on session
- `/login` — login page
- `/signup` — signup page
- `/dashboard` — protected route

---

## Testing Strategy

**Unit Tests**

- Slug generation logic
- Habit validation
- Streak calculation
- Habit toggle logic

**Integration Tests**

- Auth flow (signup/login/logout)
- Habit form creation/edit/delete
- UI + state interaction

**E2E Tests**

- Full user journey: Splash → login → dashboard
- Habit creation and completion flow
- Offline + reload persistence
- Protected routes behavior

**Required Test Coverage Mapping**

| Test File | What It Verifies |
|---|---|
| `slug.test.ts` | Habit name slug generation |
| `validators.test.ts` | Input validation rules |
| `streaks.test.ts` | Streak calculation logic |
| `habits.test.ts` | Toggle completion logic |
| `auth-flow.test.tsx` | Login/signup/session flow |
| `habit-form.test.tsx` | CRUD habit UI behavior |
| `app.spec.ts` | Full end-to-end user journey |

---

## Assumptions and Trade-offs

- No backend — all auth is fake/local
- `localStorage` is used instead of a database
- Service worker is minimal (basic caching only)
- Auth is not secure (for demo/testing only)
- No cloud sync or multi-device support

---

## Folder Notes

Key components:

- `ProtectedRoute` — handles session checking
- `SplashScreen` — handles boot UX delay
- `HabitForm` — handles creation and editing
- `HabitList` — renders user habits

---

## Challenges Faced

- Debugging routing issues caused by service worker caching
- Fixing Vitest + Next.js module import conflicts
- Resolving label/input accessibility test failures
- PWA icon 404 issues due to missing `/public/icons` files
- Navigation issues caused by `router.push` vs `router.replace`
- Test failures due to incorrect `testid` bindings in forms

---

## Deploy

Recommended deployment: [Vercel](https://vercel.com) (recommended for Next.js)