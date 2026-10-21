# Architecture rules
- Keep event disclaimer, sponsor copy and the official-logo source slot in `src/lib/event-details.ts` and render the shared footer on public pages so event notices remain consistent.
- Preserve browser-local wizard personalization; migrate only retired menus and recognized obsolete sale copy so visitor passcodes and donation destinations remain unchanged.
- Store volunteer clicks as server-generated timestamps through a public edge endpoint; raw rows are service-role-only and the public statistics function returns aggregates, never individual events.
- Treat the existing admin password as a local wizard convenience, not Cloud authorization; anonymous click aggregates are non-sensitive public data.
- Group daily click counts in America/Chicago in PostgreSQL so totals are accurate beyond client pagination limits.