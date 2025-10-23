# Shadcn Starter Template

A clean, minimal starter template built with Shadcn UI and Vite. Ready for Better Auth + Convex integration.

## Features

- ✅ Light/dark mode
- ✅ Responsive design
- ✅ Accessible components
- ✅ Built-in Sidebar component
- ✅ Global search command
- ✅ Error pages (401, 403, 404, 500, 503)
- ✅ Settings pages
- ✅ Clean architecture
- 🚀 Ready for Better Auth + Convex

## Cleaned Up

This template has been cleaned from:
- ❌ Clerk authentication (removed)
- ❌ RTL (Right-to-Left) support (removed)
- ❌ Team/Workspace switcher (removed)
- ❌ Demo pages (Tasks, Apps, Chats, Users - removed)

## Components

All Shadcn UI components are standard and can be safely updated via the CLI:

```bash
npx shadcn@latest add <component>
```

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/)

**Ready for Integration:**
- **Backend:** [Convex](https://convex.dev) (Recommended)
- **Auth:** [Better Auth](https://better-auth.com) (Recommended)

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
# or
pnpm build
```

## Next Steps: Add Backend & Auth

Follow the integration guide at `plans/better-auth-convex-integration.md` to add:
- **Convex** - Real-time backend with serverless functions
- **Better Auth** - Self-hosted authentication

This will give you a complete full-stack application with:
- ✅ Real-time database
- ✅ Type-safe backend
- ✅ Authentication (email/password, social providers)
- ✅ User management
- ✅ File storage
- ✅ Scheduled functions

## Project Structure

```
├── src/
│   ├── components/     # UI components
│   ├── features/       # Feature modules
│   ├── routes/         # TanStack Router routes
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React context providers
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── plans/              # Integration guides
│   ├── cleanup-plan.md
│   └── better-auth-convex-integration.md
└── public/             # Static assets
```

## Credits

Original template: [Shadcn Admin](https://github.com/satnaing/shadcn-admin) by [@satnaing](https://github.com/satnaing)

## License

MIT License
