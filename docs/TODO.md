# Driven IT Solution — Project Backlog & Tasks

## In Progress

Append-only session locks, keyed by each item's permanent `#N` id (one
shared sequence across Backlog and Done — assigned once, shown next to the
item, never a content hash, so editing an item's wording never breaks its
lock). Never edit or delete a line here — union merge can't reconcile
in-place edits across sessions, only unioned appends. Formats:
`- CLAIM #N session <session-id> <timestamp> "optional label"`
`- RELEASE #N session <session-id> <timestamp>` (optional, only if you stop
early — a release from your own session cancels your own claim immediately)
The quoted label is optional but recommended: a future reader sees WHAT was
claimed, not just who/when — a session id alone answers "who," not "why."
Locks auto-expire after 2 hours with no release needed.

When the item is fully finished (moved to `## Done`): delete its CLAIM/
RELEASE line(s) from here entirely, in the same edit that writes the Done
entry — the Done entry is now the permanent record, the lock lines are pure
clutter once resolved. Safe specifically because it's one coordinated edit
by the session that just finished it, not a routine action or a race with
anyone. If only pausing an item that's still open, RELEASE but leave the
pair — it's a progress trail for whoever resumes it next.

If a session that claimed something gets closed, crashes, or is deleted
before finishing: don't wait out the timeout if you don't have to. The
SessionStart message shows which session id holds a locked item — write a
RELEASE line quoting THAT session's id (not your own) and it frees
immediately. The 2h expiry is only the backstop for when
nobody notices.

## Done
- `#50506` **2026-11-12**: **Full Supabase Bidirectional Synchronization Connected & Verified**:
  - Configured Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) directly on Vercel production environment variables.
  - Initialized and seeded all 7 PostgreSQL tables in Supabase: `team`, `projects`, `services`, `products`, `reviews`, `settings`, `admins`.
  - Refactored `src/lib/db.js` unified database layer to treat Supabase PostgreSQL as the primary source of truth, removing stale mock JSON fallbacks and fixing type coercion bugs on delete.
  - Refactored Next.js `page.js` to dynamic Server-Side Rendering (`force-dynamic`, `revalidate: 0`) delivering direct Supabase data on first paint.
  - Eliminated stale cache locks across all frontend components (`CaseStudiesSection`, `SoftwareWeOwn`, `WhatYouGet`, `WhyChooseUs`, `ClientStories`, `ContactSection`, `MollahsFooter`).
  - Implemented real-time cross-tab synchronization and active focus-refetching so changes made in the Admin Panel or Supabase Table Editor instantly reflect everywhere without cache staleness.
  - Verified full bi-directional write/delete loop live on Vercel production: Admin mutations write directly to Supabase PostgreSQL, and Supabase edits immediately reflect on both the Admin Console and Public Website.
- `#50507` **2026-11-11**: Fixed WhyChooseUs / Teachers grid empty cell in Public Panel so it blends seamlessly with `#050505` background.
- `#50508` **2026-11-11**: Fixed Admin Panel FlowFieldCanvas background animation to eliminate dark smudges and mirror Public Panel 100% accurately.
- `#50509` **2026-11-11**: Built Admin Google Sign-In gate modal and secure authentication endpoints (`/api/auth/google`).
- `#50510` **2026-11-11**: Built 7th tab `Users & Roles` in Admin Panel with Super Admin (👑) and Admin (🛡️) RBAC matrix and admin roster management.
- `#50511` **2026-11-11**: Restructured repository so Next.js application lives directly at the root for zero-configuration cloud hosting.
- `#50512` **2026-11-11**: Finalized permanent Vercel cloud deployment under official brand domain `https://driven-it-solution.vercel.app` with live automated CI/CD from GitHub `main`.

## Backlog / Enhancements
- `#50513` [ ] Connect Supabase Storage Buckets for persistent cloud media uploads across serverless environments.

