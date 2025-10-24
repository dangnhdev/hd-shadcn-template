# Codebase Summary

## Project Overview

**Shadcn Starter Template** is a modern full-stack React application template built with TypeScript, featuring a clean architecture with integrated authentication (Better Auth) and real-time backend (Convex). The template is production-ready with comprehensive UI components, error handling, and testing infrastructure.

**Version:** 2.2.0
**Package Manager:** pnpm (note: CLAUDE.md mentions bun, but package.json uses pnpm)
**Node Version:** Uses modern ESM modules

## Tech Stack

### Frontend
- **Framework:** React 19.2.0 with TypeScript 5.9.3
- **Build Tool:** Vite 7.1.9 with SWC for fast compilation
- **Routing:** TanStack Router v1.132.47 (file-based routing with type safety)
- **State Management:**
  - TanStack Query v5.90.2 (server state)
  - Zustand v5.0.8 (client state)
- **UI Framework:**
  - Shadcn UI (TailwindCSS 4.1.14 + Radix UI components)
  - Lucide Icons v0.545.0
  - Recharts v3.2.1 (data visualization)
- **Styling:** TailwindCSS 4.1.14 with @tailwindcss/vite plugin
- **Forms:** React Hook Form v7.64.0 + Zod v4.1.12 validation
- **Notifications:** Sonner v2.0.7

### Backend & Infrastructure
- **Backend:** Convex v1.28.0 (real-time serverless backend)
- **Authentication:** Better Auth v1.3.27 with Convex integration
  - Email OTP authentication
  - Magic link support
  - Cross-domain authentication
- **Email Service:** Resend via @convex-dev/resend v0.1.13
- **Email Templates:** React Email v4.3.1 with @react-email/components v0.5.7

### Developer Experience
- **Testing:** Vitest v4.0.2 with @vitest/ui
  - convex-test v0.0.38 for integration testing
  - happy-dom v20.0.8 for DOM testing
- **Linting:** ESLint v9.37.0 with TypeScript ESLint v8.46.0
- **Formatting:** Prettier v3.6.2 with plugins
- **Type Safety:** TypeScript strict mode enabled

## Directory Structure

```
hd-shadcn-template/
├── .claude/                    # Claude Code AI configuration
│   ├── agents/                 # AI agent configurations (11 agents)
│   │   ├── brainstormer.md
│   │   ├── code-reviewer.md
│   │   ├── copywriter.md
│   │   ├── database-admin.md
│   │   ├── debugger.md
│   │   ├── docs-manager.md
│   │   ├── journal-writer.md
│   │   ├── planner.md
│   │   ├── project-manager.md
│   │   ├── researcher.md
│   │   ├── scout.md
│   │   ├── tester.md
│   │   └── ui-ux-designer.md
│   ├── commands/               # Slash commands for AI workflows
│   ├── skills/                 # AI skills and knowledge bases
│   │   ├── better-auth/
│   │   ├── better-auth-ui/
│   │   ├── convex/
│   │   ├── convex-better-auth/
│   │   ├── tanstack-query/
│   │   ├── tanstack-router/
│   │   ├── tanstack-start/
│   │   └── tanstack-table/
│   └── workflows/              # Development workflows
│       ├── development-rules.md
│       ├── documentation-management.md
│       ├── orchestration-protocol.md
│       └── primary-workflow.md
│
├── .github/                    # GitHub configuration
│   ├── workflows/              # CI/CD workflows
│   │   ├── ci.yml
│   │   └── stale.yml
│   └── ISSUE_TEMPLATE/
│
├── convex/                     # Convex backend
│   ├── _generated/             # Auto-generated Convex types
│   ├── emails/                 # Email templates
│   │   ├── components/
│   │   │   └── BaseEmail.tsx
│   │   ├── magicLink.tsx
│   │   ├── resetPassword.tsx
│   │   ├── verifyEmail.tsx
│   │   └── verifyOTP.tsx
│   ├── test/                   # Backend tests
│   │   └── email.test.ts
│   ├── auth.config.ts          # Better Auth domain config
│   ├── auth.ts                 # Better Auth setup
│   ├── convex.config.ts        # Convex configuration
│   ├── email.tsx               # Email sending functions
│   ├── http.ts                 # HTTP endpoints
│   ├── polyfills.ts            # Node polyfills for Convex
│   ├── schema.ts               # Convex database schema
│   └── tsconfig.json
│
├── docs/                       # Project documentation
│   └── testing-guide.md
│
├── plans/                      # Implementation plans and reports
│   ├── archive/
│   └── *.md                    # Various planning documents
│
├── public/                     # Static assets
│   └── images/
│
├── src/                        # Frontend source code
│   ├── assets/                 # SVG components and icons
│   │   ├── brand-icons/        # Social media icons (16 brands)
│   │   └── custom/             # Custom UI icons
│   │
│   ├── components/             # React components
│   │   ├── auth/               # Auth-related components
│   │   │   └── protected-route.tsx
│   │   ├── data-table/         # Reusable table components
│   │   │   ├── bulk-actions.tsx
│   │   │   ├── column-header.tsx
│   │   │   ├── faceted-filter.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── toolbar.tsx
│   │   │   └── view-options.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── data/
│   │   │   │   └── sidebar-data.ts
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── app-title.tsx
│   │   │   ├── authenticated-layout.tsx
│   │   │   ├── header.tsx
│   │   │   ├── main.tsx
│   │   │   ├── nav-group.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── top-nav.tsx
│   │   │   └── types.ts
│   │   └── ui/                 # Shadcn UI components (30+ components)
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── command.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── sidebar.tsx
│   │       └── ... (20+ more)
│   │
│   ├── config/                 # Configuration files
│   │   └── fonts.ts
│   │
│   ├── context/                # React Context providers
│   │   ├── font-provider.tsx
│   │   ├── layout-provider.tsx
│   │   ├── search-provider.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── features/               # Feature modules
│   │   ├── auth/               # Authentication UI
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── dashboard/          # Dashboard feature
│   │   │   ├── components/
│   │   │   │   ├── analytics-chart.tsx
│   │   │   │   ├── analytics.tsx
│   │   │   │   ├── overview.tsx
│   │   │   │   └── recent-sales.tsx
│   │   │   └── index.tsx
│   │   └── errors/             # Error pages feature
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-check-active-nav.tsx
│   │   ├── use-is-collapsed.tsx
│   │   └── use-sidebar-toggle.tsx
│   │
│   ├── lib/                    # Utility functions
│   │   ├── auth-client.ts      # Better Auth client setup
│   │   ├── handle-server-error.ts
│   │   ├── menu-list.tsx       # Navigation menu data
│   │   └── utils.ts            # Helper utilities
│   │
│   ├── routes/                 # TanStack Router routes (file-based)
│   │   ├── (auth)/             # Auth routes (ungrouped)
│   │   │   ├── auth.$pathname.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   ├── otp.tsx
│   │   │   ├── sign-in.tsx
│   │   │   ├── sign-in-2.tsx
│   │   │   └── sign-up.tsx
│   │   ├── (errors)/           # Error pages (ungrouped)
│   │   │   ├── 401.tsx
│   │   │   ├── 403.tsx
│   │   │   ├── 404.tsx
│   │   │   ├── 500.tsx
│   │   │   └── 503.tsx
│   │   ├── _authenticated/     # Protected routes (layout group)
│   │   │   ├── index.tsx       # Dashboard
│   │   │   ├── route.tsx       # Layout wrapper
│   │   │   ├── errors/
│   │   │   ├── help-center/
│   │   │   └── settings/
│   │   │       ├── account.tsx
│   │   │       ├── appearance.tsx
│   │   │       ├── display.tsx
│   │   │       ├── notifications.tsx
│   │   │       ├── index.tsx
│   │   │       └── route.tsx
│   │   └── __root.tsx          # Root layout
│   │
│   ├── styles/                 # Global styles
│   │   └── index.css
│   │
│   ├── main.tsx                # Application entry point
│   ├── routeTree.gen.ts        # Auto-generated route tree
│   └── vite-env.d.ts           # Vite type declarations
│
├── test/                       # Test setup
│   └── setup.ts                # Vitest global setup
│
├── .env.example                # Environment variables template
├── .gitignore
├── CLAUDE.md                   # Claude Code instructions
├── README.md                   # Project README
├── components.json             # Shadcn UI configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── pnpm-lock.yaml              # Lockfile
├── prettier.config.cjs         # Prettier configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.app.json           # App TypeScript config
├── tsconfig.json               # Base TypeScript config
├── tsconfig.node.json          # Node TypeScript config
├── vite.config.ts              # Vite configuration
└── vitest.config.ts            # Vitest configuration
```

## Key Components and Modules

### Authentication Flow
1. **Frontend:** `src/lib/auth-client.ts`
   - Better Auth React client setup
   - Email OTP plugin enabled
   - Cross-domain authentication configured
   - Exported auth methods: signIn, signUp, signOut, useSession

2. **Backend:** `convex/auth.ts`
   - Better Auth server setup with Convex adapter
   - Email OTP verification via Resend
   - User session management helpers
   - getCurrentUser query for protected routes

3. **Email Templates:** `convex/emails/`
   - BaseEmail component with consistent styling
   - verifyOTP.tsx - OTP verification emails
   - magicLink.tsx - Magic link authentication
   - resetPassword.tsx - Password reset emails
   - verifyEmail.tsx - Email verification

### Routing Architecture
- **File-based routing** with TanStack Router
- **Route groups:**
  - `(auth)/` - Unauthenticated routes (login, signup)
  - `(errors)/` - Error pages (401, 403, 404, 500, 503)
  - `_authenticated/` - Protected routes requiring authentication
- **Route protection:** Via `_authenticated/route.tsx` layout
- **Type-safe navigation:** Auto-generated route tree in `routeTree.gen.ts`

### State Management Strategy
1. **Server State:** TanStack Query with Convex integration
   - Real-time data synchronization
   - Automatic caching and invalidation
   - Optimistic updates support

2. **Client State:** Zustand for local UI state
   - Theme preferences
   - Sidebar collapse state
   - Layout configuration

3. **Context Providers:**
   - ThemeProvider - Dark/light mode
   - FontProvider - Font customization
   - LayoutProvider - Layout configurations
   - SearchProvider - Global search state

### UI Component System
- **Base Components:** 30+ Shadcn UI components in `src/components/ui/`
- **Composite Components:**
  - DataTable system with sorting, filtering, pagination
  - Layout components (AppSidebar, Header, Main)
  - Auth components (ProtectedRoute)
- **Design Tokens:** TailwindCSS 4.x with CSS variables for theming

### Data Table System
Located in `src/components/data-table/`:
- **column-header.tsx** - Sortable column headers
- **faceted-filter.tsx** - Multi-select filters
- **pagination.tsx** - Pagination controls
- **toolbar.tsx** - Table toolbar with actions
- **view-options.tsx** - Column visibility toggle
- **bulk-actions.tsx** - Batch operations

### Error Handling
1. **Error Pages:** 401, 403, 404, 500, 503 with custom designs
2. **Query Error Handling:**
   - Automatic retry logic (3 attempts)
   - Session expiration detection
   - Server error navigation
3. **Server Error Handler:** `src/lib/handle-server-error.ts`
   - Axios error parsing
   - Toast notifications
   - Automatic error recovery

### Testing Infrastructure
- **Framework:** Vitest 4.0 with UI
- **Integration Tests:** convex-test for real Convex functions
- **DOM Testing:** happy-dom for lightweight DOM
- **Email Testing:** Resend test addresses (delivered@resend.dev)
- **Test Setup:** `test/setup.ts` with Convex testing helper
- **Coverage Target:** 80%+ for functions, statements, lines

## Configuration Files

### Build & Development
- **vite.config.ts:** Vite with React SWC, TailwindCSS, TanStack Router plugins
- **tsconfig.json:** TypeScript strict mode with path aliases (`@/*`)
- **tailwind.config.js:** TailwindCSS 4.x configuration
- **components.json:** Shadcn UI component registry

### Code Quality
- **eslint.config.js:** ESLint 9 flat config with TypeScript
- **prettier.config.cjs:** Prettier with Tailwind plugin
- **vitest.config.ts:** Vitest test runner configuration

### Convex
- **convex/convex.config.ts:** Convex deployment configuration
- **convex/schema.ts:** Database schema (currently empty template)
- **convex/auth.config.ts:** Auth domain configuration

## Scripts

```json
{
  "dev": "pnpx npm-run-all --parallel dev:*",
  "dev:vite": "vite --host",
  "dev:convex": "pnpx convex dev",
  "build": "tsc -b && vite build",
  "typecheck": "tsc --noEmit",
  "lint": "eslint --fix .",
  "format": "prettier --write .",
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

## Key Features Implemented

### Authentication
- ✅ Email OTP authentication (passwordless)
- ✅ Magic link support
- ✅ Cross-domain authentication
- ✅ Session management
- ✅ Protected routes
- ✅ User profile management
- ✅ Email templates with React Email

### UI/UX
- ✅ Dark/light mode with system preference
- ✅ Responsive sidebar navigation
- ✅ Global command menu (Cmd+K)
- ✅ Error pages (401, 403, 404, 500, 503)
- ✅ Settings pages (account, appearance, display, notifications)
- ✅ Loading states and skeletons
- ✅ Toast notifications
- ✅ Theme customization

### Developer Experience
- ✅ Type-safe routing with TanStack Router
- ✅ Type-safe backend with Convex
- ✅ Hot module replacement (HMR)
- ✅ Real-time data synchronization
- ✅ Integration testing with convex-test
- ✅ ESLint + Prettier configured
- ✅ CI/CD with GitHub Actions

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Convex
VITE_CONVEX_URL=https://your-project.convex.cloud
CONVEX_SITE_URL=http://localhost:5173

# Better Auth
SITE_URL=http://localhost:5173

# Email (Resend)
RESEND_API_KEY=re_xxx

# Optional
NODE_ENV=development
```

## Claude Code Integration

This project includes comprehensive Claude Code AI integration:

### Agents (11 specialized agents)
- **brainstormer** - Feature ideation and brainstorming
- **code-reviewer** - Code review and quality checks
- **copywriter** - Content and copy writing
- **database-admin** - Database management and queries
- **debugger** - Bug investigation and fixing
- **docs-manager** - Documentation updates
- **journal-writer** - Development journal entries
- **planner** - Implementation planning
- **project-manager** - Project tracking and TODO management
- **researcher** - Technical research
- **scout** - Codebase exploration
- **tester** - Test execution and analysis
- **ui-ux-designer** - Design and UI/UX work

### Workflows
- **development-rules.md** - Coding standards and practices
- **documentation-management.md** - Docs update protocols
- **orchestration-protocol.md** - Agent coordination
- **primary-workflow.md** - Main development workflow

### Skills
Pre-configured AI skills for major dependencies:
- Better Auth & Better Auth UI
- Convex & Convex Better Auth
- TanStack Query, Router, Start, Table
- Canvas Design, Repomix, MCP Builder
- Problem-solving frameworks

## Recent Changes (from git log)

1. **f4e79bb** - Removed git-manager agent, updated agent configurations
2. **2b72d43** - Added AI skills for major dependencies
3. **1b65898** - Downgraded better-auth to v1.3.27, configured cross-domain credentials
4. **b7b8ac7** - Code refactoring
5. **ae69623** - Migrated to better-auth client, reorganized codebase
6. **ee83b6c** - Integrated better-auth v1.3.29 and email templates
7. **bb2757d** - Added better-auth integration and testing infrastructure
8. **f940ca1** - Integrated Convex backend with real-time database

## Known Issues & Limitations

1. **Package Manager Discrepancy:**
   - CLAUDE.md mentions "bun" as package manager
   - package.json scripts use "pnpm" (pnpx commands)
   - Recommendation: Standardize on pnpm

2. **Empty Schema:**
   - `convex/schema.ts` has no defined tables
   - Better Auth tables managed by @convex-dev/better-auth component

3. **Authentication Version:**
   - Currently locked to better-auth v1.3.27 (not latest)
   - Locked due to cross-domain credential issues in newer versions

## Next Steps & Roadmap

See `/Users/dangnhdev/dev/node/hd-shadcn-template/docs/project-roadmap.md` for detailed roadmap.

## Resources

- **Convex Docs:** https://docs.convex.dev
- **Better Auth Docs:** https://better-auth.com
- **TanStack Router:** https://tanstack.com/router
- **Shadcn UI:** https://ui.shadcn.com
- **Original Template:** https://github.com/satnaing/shadcn-admin

---

**Last Updated:** 2025-10-25
**Maintained By:** docs-manager agent
