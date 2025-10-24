# Shadcn Starter Template

A production-ready, full-stack React starter template with integrated authentication (Better Auth) and real-time backend (Convex). Built with modern best practices and comprehensive developer tooling.

**Version:** 2.2.0

## Features

### Core Features
- ✅ **Authentication:** Email OTP, Magic Link (Better Auth v1.3.27)
- ✅ **Real-time Backend:** Convex serverless with type-safe API
- ✅ **Modern UI:** Shadcn UI (30+ components) with TailwindCSS 4
- ✅ **Type-Safe Routing:** TanStack Router with file-based routing
- ✅ **Theme System:** Light/dark mode with system preference detection
- ✅ **Responsive Layout:** Collapsible sidebar, mobile-friendly navigation
- ✅ **Global Search:** Cmd+K command menu
- ✅ **Error Pages:** 401, 403, 404, 500, 503 with custom designs
- ✅ **Settings Pages:** Account, Appearance, Display, Notifications
- ✅ **Testing:** Vitest 4.0 + convex-test for integration testing
- ✅ **CI/CD:** GitHub Actions with automated testing and deployment

### Developer Experience
- ✅ **TypeScript:** Strict type checking throughout
- ✅ **Code Quality:** ESLint + Prettier configured
- ✅ **Hot Reload:** Vite HMR for instant feedback
- ✅ **Claude Code Integration:** 12 AI agents and comprehensive workflows
- ✅ **Documentation:** Complete guides for all aspects of development

## What's Included

### Authentication & Security
- Email OTP (passwordless) authentication
- Magic link support
- Cross-domain authentication
- Session management
- Protected routes
- Email templates with React Email

### UI Components & Layout
- 30+ Shadcn UI components (buttons, forms, dialogs, tables, etc.)
- Responsive sidebar navigation
- Header with user menu
- Command menu (Cmd+K)
- Data table with sorting, filtering, pagination
- Theme switcher (light/dark/system)
- Loading states and skeletons

### Backend & Data
- Convex real-time database
- Type-safe queries and mutations
- Email sending via Resend
- Better Auth Convex integration
- Database schema (managed by Better Auth component)

## Tech Stack

### Frontend
- **Framework:** React 19 with TypeScript 5.9
- **Build Tool:** Vite 7 with SWC
- **Routing:** TanStack Router v1 (file-based, type-safe)
- **UI Framework:** Shadcn UI (TailwindCSS 4 + Radix UI)
- **State Management:**
  - TanStack Query v5 (server state)
  - Zustand v5 (client state)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

### Backend & Services
- **Backend:** Convex v1.28 (serverless, real-time)
- **Authentication:** Better Auth v1.3.27
- **Email:** Resend API with React Email templates

### Developer Tools
- **Testing:** Vitest 4.0 + convex-test
- **Linting:** ESLint 9 with TypeScript
- **Formatting:** Prettier 3.6
- **CI/CD:** GitHub Actions

### Package Manager
- **pnpm** (recommended) - All scripts use `pnpm`

## Quick Start

### Prerequisites
- Node.js 18 or higher
- pnpm (install: `npm install -g pnpm`)
- Convex account (free tier available at [convex.dev](https://convex.dev))
- Resend account (free tier available at [resend.com](https://resend.com))

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd hd-shadcn-template

# Install dependencies
pnpm install
```

### 2. Set Up Convex Backend

```bash
# Login to Convex
pnpx convex login

# Initialize and deploy
pnpx convex init
pnpx convex deploy

# Set environment variables
pnpx convex env set RESEND_API_KEY your_resend_api_key
pnpx convex env set SITE_URL http://localhost:5173
```

### 3. Configure Environment Variables

Create `.env` file in the root directory:

```bash
# Convex (from Convex dashboard after deploy)
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# Better Auth
CONVEX_SITE_URL=http://localhost:5173
SITE_URL=http://localhost:5173
```

### 4. Start Development Servers

```bash
# Start both Vite and Convex dev servers
pnpm dev
```

This will start:
- Frontend at `http://localhost:5173`
- Convex dev server (backend)

### 5. Test Authentication

1. Visit `http://localhost:5173`
2. Click "Sign In"
3. Enter your email
4. Check your email for the OTP code
5. Enter OTP to complete sign-in

**Note:** For testing, use Resend test email: `delivered@resend.dev`

## Available Scripts

```bash
# Development
pnpm dev              # Start dev servers (Vite + Convex)
pnpm dev:vite         # Start only Vite dev server
pnpm dev:convex       # Start only Convex dev server

# Building
pnpm build            # Build for production
pnpm typecheck        # Run TypeScript type checking

# Testing
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Run tests with coverage

# Code Quality
pnpm lint             # Lint and fix code
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Other
pnpm preview          # Preview production build
pnpm knip             # Find unused dependencies
```

## Project Structure

```
hd-shadcn-template/
├── .claude/                    # Claude Code AI configuration
│   ├── agents/                 # 12 specialized AI agents
│   ├── commands/               # Slash commands for workflows
│   ├── skills/                 # AI skills and knowledge bases
│   └── workflows/              # Development workflows
│
├── convex/                     # Convex backend
│   ├── _generated/             # Auto-generated types
│   ├── emails/                 # Email templates
│   │   ├── components/
│   │   ├── magicLink.tsx
│   │   ├── verifyOTP.tsx
│   │   └── ...
│   ├── test/                   # Backend tests
│   ├── auth.ts                 # Better Auth setup
│   ├── http.ts                 # HTTP endpoints
│   └── schema.ts               # Database schema
│
├── docs/                       # Comprehensive documentation
│   ├── codebase-summary.md
│   ├── code-standards.md
│   ├── deployment-guide.md
│   ├── design-guidelines.md
│   ├── project-overview-pdr.md
│   ├── project-roadmap.md
│   ├── system-architecture.md
│   └── testing-guide.md
│
├── src/                        # Frontend source
│   ├── components/             # Shared components
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── layout/             # Layout components
│   │   └── data-table/         # Table system
│   ├── features/               # Feature modules
│   │   ├── auth/               # Authentication UI
│   │   ├── dashboard/          # Dashboard feature
│   │   └── errors/             # Error pages
│   ├── routes/                 # TanStack Router routes
│   │   ├── (auth)/             # Auth routes
│   │   ├── (errors)/           # Error pages
│   │   └── _authenticated/     # Protected routes
│   ├── hooks/                  # Custom React hooks
│   ├── context/                # Context providers
│   ├── lib/                    # Utilities
│   │   ├── auth-client.ts      # Better Auth client
│   │   └── utils.ts            # Helper functions
│   └── styles/                 # Global styles
│
├── plans/                      # Implementation plans
├── test/                       # Test setup
├── .env.example                # Environment variables template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── vitest.config.ts            # Vitest configuration
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Codebase Summary](docs/codebase-summary.md)** - Overview of project structure and components
- **[Project Overview & PDR](docs/project-overview-pdr.md)** - Product requirements and architecture decisions
- **[Code Standards](docs/code-standards.md)** - Coding guidelines and best practices
- **[System Architecture](docs/system-architecture.md)** - Technical architecture and data flow
- **[Project Roadmap](docs/project-roadmap.md)** - Future plans and feature roadmap
- **[Deployment Guide](docs/deployment-guide.md)** - Complete deployment instructions
- **[Design Guidelines](docs/design-guidelines.md)** - UI/UX design principles
- **[Testing Guide](docs/testing-guide.md)** - Testing strategies and examples

## Customization

### Adding Shadcn UI Components

```bash
# Add a new component
pnpx shadcn@latest add <component-name>

# Examples
pnpx shadcn@latest add toast
pnpx shadcn@latest add date-picker
```

### Updating Components

All Shadcn UI components are in your codebase and can be modified directly. Update them via CLI when needed:

```bash
pnpx shadcn@latest add <component-name>
```

### Customizing Theme

Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... other variables */
}
```

## Deployment

See the complete [Deployment Guide](docs/deployment-guide.md) for detailed instructions.

### Quick Deploy to Vercel

```bash
# 1. Deploy Convex backend
pnpx convex deploy

# 2. Set environment variables in Convex
pnpx convex env set RESEND_API_KEY your_key
pnpx convex env set SITE_URL https://your-domain.com

# 3. Deploy frontend to Vercel
vercel --prod
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug in authentication
docs: update README
style: format code
refactor: restructure component
test: add unit tests
chore: update dependencies
```

## Support

- **Documentation:** See `/docs` directory
- **Issues:** Report bugs via GitHub Issues
- **Discussions:** Ask questions in GitHub Discussions
- **Email:** (Add your support email)

## Roadmap

See [Project Roadmap](docs/project-roadmap.md) for detailed plans.

**Current Focus (Phase 2):**
- Increase test coverage to 80%+
- Complete all documentation
- Performance optimizations

**Coming Next:**
- Social authentication (GitHub, Google, Twitter)
- Multi-factor authentication (2FA)
- Role-based access control (RBAC)

## Credits

- Original template: [Shadcn Admin](https://github.com/satnaing/shadcn-admin) by [@satnaing](https://github.com/satnaing)
- UI Components: [Shadcn UI](https://ui.shadcn.com)
- Backend: [Convex](https://convex.dev)
- Authentication: [Better Auth](https://better-auth.com)

## License

MIT License - see LICENSE file for details
