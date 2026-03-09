

## Revamp Plan: "Grab a Cookie, Give if You Wish"

### Overview
Rebuild the single-page fundraiser site with a fun, playful design. The page is passcode-gated (QR codes pre-fill the passcode via URL param). Once unlocked, visitors see a cheerful cookie-themed page with info about BBBS, a personal message, and a donate modal with both the BBBS campaign link and Venmo.

### Page Structure

**1. Passcode Gate (full-screen overlay)**
- Title: "Grab a Cookie, Give if You Wish"
- Passcode input + Unlock button
- Reads `?code=` URL param to auto-unlock
- Fun, playful styling — cookie emoji or illustration, warm colors, rounded shapes

**2. Main Page (after unlock)**

- **Hero Section**: Large playful title "Grab a Cookie, Give if You Wish" with a fun cookie-themed illustration/emoji, warm background gradient (think chocolate browns, cream, sprinkle accents)

- **Personal Message Section**: A heartfelt note from you about why you're doing this — card-style with a friendly, handwritten-feeling font or styling

- **About the Cause (BBBS) Section**: Brief info about Big Brothers Big Sisters of Metropolitan Chicago and the Bowl For Kids' Sake 2025 campaign. Playful card layout with icons.

- **Donate Button (prominent CTA)**: Opens a modal/dialog with two options:
  - **BBBS Campaign**: Links to `https://donate.bbbschgo.org/fundraiser/6598504`
  - **Venmo**: Links to your Venmo (will need your Venmo handle/link)

**3. Footer**: Simple credit line

### Design Direction
- **Fun & playful**: Rounded corners, cookie/chocolate emojis, warm color palette (chocolate brown, cream, soft pink/coral accents)
- **Typography**: Friendly, approachable — mix of a fun display font and clean body text
- **Mobile-first**: Most visitors will come via QR code on their phones

### Technical Approach
- Single `Index.tsx` page with passcode state management via `useState`
- URL param parsing via `useSearchParams` from react-router-dom
- Donate modal using the existing Radix Dialog component
- All content hardcoded (no backend needed)
- Tailwind for all styling

### What I'll Need From You
- Your **Venmo link/handle** for the donate modal
- Your **personal message** text (or I can draft placeholder text for you to edit)
- Any **cookie photos** you'd like to use (optional — can use emoji/illustrations instead)

