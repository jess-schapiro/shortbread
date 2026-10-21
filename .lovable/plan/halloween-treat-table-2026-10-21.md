# Halloween treat table

- Restyle the gate, home page, donation popup, ingredients page and admin using charcoal, pumpkin orange, slime green and Creepster headings.
- Replace the menu with the three supplied treats, ingredients, warnings and emojis. Refresh retired menus for returning visitors while preserving their passcode and donation links.
- Replace sale wording with optional giving: “Suggested donation $5. Give what you wish.” Update Jess’s note for Saturday October 31 and change the donation button to “Donate”. Refresh old saved sale messages so returning visitors see the new framing.
- Add the exact kitchen disclaimer and Thrivent sponsorship text on both public pages, with a clearly marked footer placeholder for a future official logo.
- Add Become a Big below About the Cause with the supplied referral line and form link.
- Record timestamp-only volunteer clicks in Lovable Cloud, and show totals and daily counts on /admin. The form always opens, even when logging fails.

## Technical details and assumptions
- Use BOO2026 (updated October 21), keeping case-insensitive entry, QR auto-unlock, automatic popup and existing Venmo/Classy URLs unchanged.
- Store only server-generated click timestamps. Keep raw click rows inaccessible to visitors; expose anonymous aggregate counts only. Counts are non-sensitive and publicly retrievable; the existing admin password remains a local wizard convenience, not secure Cloud authentication.
- Daily counts use Chicago time. Application tracking stores no IP, identity or device information; Cloud’s standard infrastructure request logs are separate from the timestamp-only table.
- Add focused tests for menu migration, preserved settings, donation framing and click success/failure behavior. Verify phone and desktop pages and a real click reading back in admin.