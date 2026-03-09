

## Bakesale Setup Wizard

### What we're building

A password-protected `/admin` page with a step-by-step wizard form. Filling it out updates the donation page in real-time (stored in localStorage). The public page reads from that config instead of hardcoded values.

### Wizard fields (single form, sectioned)

1. **Recipe** -- name, short description (e.g. "Salted Chocolate Chunk Shortbread Cookies"), optional emoji
2. **Passcode** -- the code visitors enter to unlock the page
3. **Personal message** -- the "A Note from Jess" text (textarea)
4. **Beneficiary org** -- name, about-page URL, short description, optional logo URL
5. **Donation options** -- dynamic list; each entry has: label (e.g. "Venmo Jess"), type (Venmo / Classy / Zelle / PayPal / Other), URL, subtitle text. Add/remove as needed.

### Architecture

```text
/admin?pw=bakesaleadmin
  ┌─────────────────────┐
  │  Setup Wizard Form  │──saves──▶ localStorage("bakesale-config")
  │  (step-by-step)     │
  └──────────┬──────────┘
             │ on save, shows:
             ▼
  ┌─────────────────────┐
  │ Generated QR Link   │  e.g. bakesale.heyjess.xyz?code=<passcode>
  └─────────────────────┘

/ (public page)
  reads localStorage("bakesale-config")
  falls back to current hardcoded defaults if no config exists
```

### New files

| File | Purpose |
|------|---------|
| `src/types/bakesale.ts` | TypeScript interface for the config shape |
| `src/lib/bakesale-config.ts` | Read/write helpers for localStorage |
| `src/pages/Admin.tsx` | Password gate + wizard form + QR link output |

### Changes to existing files

- **`src/pages/Index.tsx`** -- replace all hardcoded values (passcode, recipe name, org info, donation links) with config reads. Fall back to current values as defaults.
- **`src/App.tsx`** -- add `/admin` route.

### Key details

- Admin password will be a constant (e.g. `bakesaleadmin`) -- simple password gate like the current passcode screen.
- Donation options use a dynamic list with add/remove buttons. Each option stores: label, url, subtitle, and type (which determines the icon/styling).
- After saving, the wizard displays the full shareable link with passcode baked in, ready to copy for QR code generation.
- No backend needed -- localStorage keeps it simple and single-device, which fits the "one at a time, overwrite" model.
- Current hardcoded content becomes the default fallback so the page works even without running the wizard.

### Considerations

- **localStorage is per-browser** -- if you set it up on your laptop, the published site visitors won't see your config. This means the wizard would only work for local preview/development. If you want the config to persist for the published site, we'd need to either bake the values into the code (which the wizard could help generate) or use Supabase. Want me to plan for Supabase instead?

