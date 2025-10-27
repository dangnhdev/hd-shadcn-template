---
name: tanstack-start
description: TanStack Start - Full-stack React framework. Use for server-side rendering, routing, data loading, authentication, and full-stack React development.
---

# TanStack Start Skill

Comprehensive assistance with TanStack Start development - a full-stack React framework powered by TanStack Router with full-document SSR, streaming, server functions, and Vite.

## When to Use This Skill

This skill should be triggered when:
- **Setting up** a new TanStack Start project from scratch or migrating from Next.js
- **Implementing routing** - file-based routes, dynamic routes, nested layouts, route loaders
- **Working with server functions** - creating API endpoints, data fetching, mutations
- **Building full-stack features** - authentication, middleware, session management
- **Deploying** to Cloudflare Workers, Netlify, Vercel, or other hosting platforms
- **Fetching external APIs** - integrating with third-party services, TMDB, etc.
- **Debugging** TanStack Start applications or understanding error messages
- **Optimizing** SSR configuration, streaming, and performance
- **Learning** best practices for full-stack React development with type safety

## Key Concepts

### Core Architecture
- **TanStack Router** - Type-safe routing with automatic route tree generation
- **Server Functions** - Write server-side code with `createServerFn()` that's callable from client
- **Full-Stack SSR** - Complete server-side rendering with streaming support
- **Vite-Powered** - Fast dev server, HMR, and optimized production builds
- **File-Based Routing** - Routes defined in `src/routes/` directory structure
- **Type Safety** - End-to-end TypeScript support with automatic type generation

### Essential Files
```
src/
├── routes/
│   ├── __root.tsx          # Root layout (wraps all routes)
│   ├── index.tsx            # Home page (/)
│   └── posts/$postId.tsx    # Dynamic route (/posts/123)
├── router.tsx               # Router configuration
└── routeTree.gen.ts         # Auto-generated route tree (don't edit)
```

### Server vs Client Code
- **Environment Variables:**
  - `API_KEY=abc123` ❌ Won't work in client
  - `VITE_API_KEY=abc123` ✅ Works in client
  - Set at build time: `VITE_API_KEY=abc123 npm run build`

## Quick Reference

### 1. Creating a New TanStack Start Project

**Quick start with CLI:**
```bash
# Interactive setup with options (Tailwind, ESLint, etc.)
pnpm create @tanstack/start@latest

# Or clone an example
git clone https://github.com/TanStack/router.git
cd router/examples/react/start-basic
pnpm install
pnpm dev
```

**Manual setup (from scratch):**
```bash
mkdir myApp && cd myApp
npm init -y
npm install @tanstack/react-router @tanstack/start
npm install -D vite @vitejs/plugin-react
```

### 2. Vite Configuration

**Basic `vite.config.ts` setup:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStartVitePlugin } from '@tanstack/start/vite'

export default defineConfig({
  plugins: [
    tanstackStartVitePlugin(),
    react()
  ]
})
```

### 3. Creating Routes

**File structure for routes:**
```
src/routes/
├── __root.tsx              # Root layout
├── index.tsx                # / (home)
├── about.tsx                # /about
├── posts/
│   ├── index.tsx            # /posts
│   └── $postId.tsx          # /posts/:postId (dynamic)
```

**Root route (`__root.tsx`):**
```tsx
import { createRootRoute } from '@tanstack/react-router'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
```

**Simple page route (`index.tsx`):**
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <h1>Welcome to TanStack Start!</h1>
}
```

### 4. Server Functions - Data Fetching

**Create a server function to fetch data:**
```tsx
import { createServerFn } from '@tanstack/start'
import { createFileRoute } from '@tanstack/react-router'

// Server function (runs on server only)
const getMovies = createServerFn().handler(async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`
    }
  })
  return response.json()
})

// Route with loader
export const Route = createFileRoute('/movies')({
  loader: async () => await getMovies(),
  component: MoviesPage
})

function MoviesPage() {
  const data = Route.useLoaderData()
  return (
    <div>
      {data.results.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  )
}
```

### 5. Reading and Writing Files (Server-Side)

**Server function to read from a JSON file:**
```tsx
import { createServerFn } from '@tanstack/start'
import fs from 'fs/promises'
import path from 'path'

export const getJokes = createServerFn().handler(async () => {
  const filePath = path.join(process.cwd(), 'data', 'jokes.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(fileContent)
})

export const addJoke = createServerFn()
  .validator((data: { setup: string; punchline: string }) => data)
  .handler(async ({ data }) => {
    const filePath = path.join(process.cwd(), 'data', 'jokes.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const jokes = JSON.parse(fileContent)

    jokes.push({
      id: Date.now(),
      ...data
    })

    await fs.writeFile(filePath, JSON.stringify(jokes, null, 2))
    return jokes
  })
```

### 6. Dynamic Routes and Route Parameters

**Dynamic route file: `posts/$postId.tsx`**
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostPage
})

function PostPage() {
  const { postId } = Route.useParams()
  return <h1>Post ID: {postId}</h1>
}
```

### 7. Selective SSR Configuration

**Configure SSR per route:**
```tsx
// Route-level SSR control
export const Route = createFileRoute('/about')({
  ssr: false,  // Disable SSR for this route (client-only)
  component: AboutPage
})

// Options:
// ssr: true       - Full SSR (default)
// ssr: false      - Client-only rendering
// ssr: 'data-only' - Only fetch data on server, render on client
```

**SSR inheritance hierarchy:**
```
root { ssr: undefined }     # Default (true)
  posts { ssr: false }       # Client-only
    $postId { ssr: true }    # Can't re-enable (inherits false)
      details { ssr: false } # Still false
```

### 8. Middleware Pattern

**Request logging middleware:**
```tsx
import { createMiddleware } from '@tanstack/start'

export const loggingMiddleware = createMiddleware().server(async ({
  next,
  request
}) => {
  console.log(`${request.method} ${request.url}`)
  const start = Date.now()

  const response = await next()

  console.log(`Completed in ${Date.now() - start}ms`)
  return response
})
```

**Using middleware in server functions:**
```tsx
const getData = createServerFn()
  .middleware([loggingMiddleware])
  .handler(async () => {
    return { data: 'Hello World' }
  })
```

### 9. Deployment to Cloudflare Workers

**Install Cloudflare plugin:**
```bash
pnpm add -D @cloudflare/vite-plugin wrangler
```

**Update `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  plugins: [
    cloudflare(),
    tanstackStartVitePlugin()
  ]
})
```

**Deploy:**
```bash
wrangler whoami  # Check login
wrangler deploy  # Deploy to Cloudflare
```

### 10. Deployment to Netlify

**Install Netlify plugin:**
```bash
pnpm add -D @netlify/vite-plugin-tanstack-start
```

**Update `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import { netlify } from '@netlify/vite-plugin-tanstack-start'

export default defineConfig({
  plugins: [
    netlify(),
    tanstackStartVitePlugin()
  ]
})
```

**Create `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = ".output/public"
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

### 📚 **deployment.md** - Deployment & Hosting
- Build a project from scratch (step-by-step setup)
- TypeScript configuration requirements
- Installation and dependency management
- Router and root configuration
- Deployment guides for Cloudflare, Netlify, Vercel, Docker

### 🚀 **getting_started.md** - Quick Start & Overview
- Quick start with CLI (`pnpm create @tanstack/start`)
- Cloning and running examples (start-basic, etc.)
- TanStack Start overview and key features
- Dependencies (TanStack Router + Vite)
- Authentication patterns and partner solutions (WorkOS, Clerk)
- When to use TanStack Start vs. just TanStack Router

### 📖 **guide.md** - Core Guides & Tutorials
- **Observability** - Sentry integration, logging, monitoring, error tracking
- **External API fetching** - Complete TMDB API tutorial with types
- **File I/O tutorial** - Building a DevJokes app with read/write operations
- **Hosting providers** - Cloudflare Workers, Netlify, Nitro, Vercel, Node.js
- **Middleware** - Request/response middleware, composition, server function guards
- **Server functions** - Creating endpoints, validators, error handling

### 🔧 **other.md** - Migration & Advanced Topics
- **Migration from Next.js** - Step-by-step App Router to TanStack Start
- Converting layouts, pages, and configuration files
- Adapting Next.js patterns to TanStack Start conventions

## Working with This Skill

### For Beginners
1. **Start here:** Read `getting_started.md` for overview and quick start options
2. **First project:** Use the CLI `pnpm create @tanstack/start@latest` or clone `start-basic` example
3. **Learn routing:** Check `deployment.md` for file structure and route creation basics
4. **Build something:** Follow the DevJokes tutorial in `guide.md` (file I/O + server functions)

### For Specific Features
- **Authentication:** See `getting_started.md` → Authentication section (WorkOS, Clerk, DIY patterns)
- **External APIs:** See `guide.md` → TMDB API tutorial (complete working example)
- **Deployment:** See `deployment.md` for Cloudflare/Netlify/Vercel setup
- **Middleware:** See `guide.md` → Middleware section for request/response handling
- **Migration:** See `other.md` if coming from Next.js App Router

### For Code Examples
- **Quick patterns:** Use the Quick Reference section above (10 practical examples)
- **Complete tutorials:** Check `guide.md` for full working applications
- **Real-world setup:** See deployment guides for production configuration

### Navigation Tips
- All reference files include Table of Contents at the top
- Code examples preserve language detection (tsx, typescript, bash, json, toml)
- Examples include both simple patterns and complete implementations
- Links to original documentation available in each reference file

## Common Patterns

### Route File Structure
```
src/routes/
├── __root.tsx           # Root layout (required)
├── index.tsx             # / route
├── about.tsx             # /about route
├── posts/
│   ├── index.tsx         # /posts route
│   └── $postId.tsx       # /posts/:postId dynamic route
```

### Environment Variables
```bash
# ❌ Won't work in client code
API_KEY=abc123

# ✅ Works in client code (prefix with VITE_)
VITE_API_KEY=abc123

# ✅ Set at build time for production
VITE_API_KEY=abc123 npm run build
```

### Server Function Pattern
```tsx
// 1. Create server function
const fetchData = createServerFn().handler(async () => {
  // Server-only code here
  return { data: 'from server' }
})

// 2. Use in route loader
export const Route = createFileRoute('/page')({
  loader: () => fetchData(),
  component: Page
})

// 3. Access data in component
function Page() {
  const data = Route.useLoaderData()
  return <div>{data.data}</div>
}
```

## Resources

### Official Links
- **Documentation:** https://tanstack.com/start/latest
- **GitHub:** https://github.com/TanStack/router
- **Examples:** https://tanstack.com/start/latest/docs/framework/react/quick-start

### Partner Solutions
- **Cloudflare Workers** - Deployment platform (official partner)
- **Netlify** - Deployment platform (official partner)
- **WorkOS** - Authentication solution
- **Clerk** - Authentication solution
- **Sentry** - Error tracking and observability

### Key Technologies
- **TanStack Router** - Type-safe routing (core dependency)
- **Vite** - Build tool and dev server
- **React** - UI framework
- **TypeScript** - Type safety (strongly recommended)

## Notes

- TanStack Start is currently in **Release Candidate** stage (stable API, approaching v1)
- Does not currently support React Server Components (planned for future)
- 100% open source and free to use
- File-based routing similar to Remix with TanStack Router tokens
- Automatic route tree generation (don't manually edit `routeTree.gen.ts`)
- Server functions provide type-safe server/client communication
- Deploy anywhere: Cloudflare, Netlify, Vercel, Node.js, Docker

## Troubleshooting

### Routes Not Found
- Ensure `routeTree.gen.ts` is generated (runs automatically on dev server start)
- Check file naming: `index.tsx` for index routes, `$paramName.tsx` for dynamic routes
- Verify `router.tsx` exists and is properly configured

### Environment Variables Not Working
- Client-side vars must be prefixed with `VITE_`
- Set at build time for production: `VITE_KEY=value npm run build`
- Server-only vars (no VITE_ prefix) only work in server functions

### SSR Issues
- Check SSR configuration inheritance (child routes can only be more restrictive)
- Use `ssr: false` for client-only routes
- Use `ssr: 'data-only'` for server data fetching with client rendering

### Deployment Errors
- Ensure correct deployment adapter is installed and configured in `vite.config.ts`
- Check platform-specific requirements (Cloudflare needs wrangler, Netlify needs netlify.toml)
- Verify build command in deployment platform matches package.json scripts
