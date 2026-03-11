# 🍪 Bakesale — A Free QR-Code Charity Bakesale Kit

**Bakesale** is a beautiful, mobile-first web app that turns any bake sale into a fundraiser. Print a QR code, slap it on your table, and let visitors discover your recipe, your story, and easy ways to donate — all from their phone.

Built with [Lovable](https://lovable.dev), React, Tailwind CSS, and TypeScript.

## ✨ Features

- **Passcode-gated landing page** — visitors scan a QR code and enter a passcode to unlock your bakesale page
- **Personal message** — tell visitors about your bake and the cause you're supporting (supports **bold** markdown)
- **Multiple donation options** — Venmo, PayPal, Zelle, Cash App, Classy campaign pages, or any custom link
- **Beneficiary showcase** — highlight the organization you're raising money for with a logo, description, and link
- **Admin setup wizard** — a step-by-step wizard at `/admin` to configure everything (no code required)
- **Mobile-first design** — looks great on phones, tablets, and desktops
- **100% client-side** — all config is stored in localStorage, no backend needed

## 🚀 Quick Start

1. **Fork or clone** this repo
2. Open it in [Lovable](https://lovable.dev) or run locally:
   ```sh
   npm install
   npm run dev
   ```
3. Visit `/admin` and enter the default password: **`admin`**
4. Walk through the setup wizard to customize your recipe, message, and donation links
5. Save, copy the generated share link, and create a QR code pointing to it
6. Print the QR code, set it next to your baked goods, and start fundraising!

## 🔧 Configuration

All configuration is managed through the admin wizard at `/admin`. You can customize:

| Setting | Description |
|---------|-------------|
| Recipe name & emoji | What you baked |
| Passcode | The code visitors enter to unlock the page |
| Your name | Shown in the personal message section |
| Personal message | Your story — why you're baking and fundraising |
| Beneficiary org | Name, description, logo, and about URL |
| Donation options | Any number of payment links (Venmo, PayPal, etc.) |

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast dev & builds
- **Tailwind CSS** + **shadcn/ui** for styling
- **React Router** for navigation
- **localStorage** for persistence (no database required)

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Config utilities (bakesale-config.ts)
├── pages/            # Route pages (Index, Admin, NotFound)
├── types/            # TypeScript types (bakesale.ts)
└── index.css         # Design tokens & global styles
```

## 🎨 Customization

The design system uses CSS custom properties defined in `src/index.css`. You can easily change colors, fonts, and spacing by editing the design tokens.

## 📄 License

MIT — use it, fork it, bake with it. 🧁
