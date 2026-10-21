# Architecture rules
- Keep event disclaimer, sponsor copy and the official-logo source slot in `src/lib/event-details.ts` and render the shared footer on public pages so event notices remain consistent.
- Preserve browser-local wizard personalization; migrate only retired menus, recognized obsolete sale copy and explicitly retired event passcodes so custom passcodes and donation destinations remain unchanged. Persist retired-passcode migrations so returning visitors and admin share links use the current code.
- Store volunteer clicks as server-generated timestamps through a public edge endpoint; raw rows are service-role-only and the public statistics function returns aggregates, never individual events.
- Treat the existing admin password as a local wizard convenience, not Cloud authorization; anonymous click aggregates are non-sensitive public data.
- Group daily click counts in America/Chicago in PostgreSQL so totals are accurate beyond client pagination limits.