# System Architecture

## Overview

The Shadcn Starter Template follows a modern full-stack architecture with clear separation between frontend (React SPA), backend (Convex serverless), and external services (authentication, email). This document describes the system architecture, component interactions, data flow, and design decisions.

## High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React SPA (Browser)                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │  TanStack  │  │  TanStack  │  │  Better Auth │  │  │
│  │  │   Router   │  │   Query    │  │    Client    │  │  │
│  │  └────────────┘  └────────────┘  └──────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │           Shadcn UI Components                 │ │  │
│  │  │  (TailwindCSS + Radix UI + React)              │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                             │
                             │ HTTPS/WebSocket
                             ▼
┌────────────────────────────────────────────────────────────┐
│                       BACKEND TIER                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Convex (Serverless Backend)                  │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │   HTTP     │  │  Database  │  │   Better     │  │  │
│  │  │ Endpoints  │  │  (Real-    │  │    Auth      │  │  │
│  │  │  (REST)    │  │   time)    │  │  Component   │  │  │
│  │  └────────────┘  └────────────┘  └──────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │    Queries + Mutations + Actions               │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                             │
                             │ API Calls
                             ▼
┌────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Resend  │  │  OAuth   │  │  CDN     │  │  Other   │  │
│  │  Email   │  │ Providers│  │  Assets  │  │ Services │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Architecture

#### Layer Structure

```
┌─────────────────────────────────────────┐
│         Presentation Layer               │
│  ┌───────────────────────────────────┐  │
│  │  Pages (Routes)                   │  │
│  │  - File-based routing             │  │
│  │  - Lazy-loaded route components   │  │
│  └───────────────────────────────────┘  │
│                   │                      │
│  ┌───────────────────────────────────┐  │
│  │  Features                         │  │
│  │  - Self-contained modules         │  │
│  │  - Feature-specific components    │  │
│  └───────────────────────────────────┘  │
│                   │                      │
│  ┌───────────────────────────────────┐  │
│  │  Shared Components                │  │
│  │  - UI primitives (Shadcn)         │  │
│  │  - Layout components              │  │
│  │  - Data table system              │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                   │
┌─────────────────────────────────────────┐
│          State Management                │
│  ┌───────────────────────────────────┐  │
│  │  Server State (TanStack Query)    │  │
│  │  - API data caching               │  │
│  │  - Real-time subscriptions        │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Client State (Zustand)           │  │
│  │  - UI preferences                 │  │
│  │  - Application state              │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Context Providers                │  │
│  │  - Theme, Font, Layout, Search    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                   │
┌─────────────────────────────────────────┐
│         Data Access Layer                │
│  ┌───────────────────────────────────┐  │
│  │  ConvexQueryClient                │  │
│  │  - Query/Mutation integration     │  │
│  │  - WebSocket management           │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Auth Client                      │  │
│  │  - Better Auth React client       │  │
│  │  - Session management             │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### Component Communication Patterns

**1. Props Drilling (Limited Depth)**
```
Parent Component
    ↓ props
Child Component
    ↓ props
Grandchild Component
```
- Use for: 2-3 levels max
- Avoid: Deep nesting (use context instead)

**2. Context API (Cross-Cutting Concerns)**
```
ThemeProvider (Context)
    ↓ useTheme()
Any Component (Consumer)
```
- Use for: Theme, Auth, Global UI state
- Avoid: Frequent updates (causes re-renders)

**3. Event Callbacks (Bottom-Up Communication)**
```
Child Component
    ↑ event callback
Parent Component
```
- Use for: User interactions, form submissions
- Avoid: Long callback chains

**4. State Management (Global State)**
```
Zustand Store
    ↔ useStore()
Multiple Components
```
- Use for: Shared UI state (sidebar, modals)
- Avoid: Server data (use TanStack Query)

### Backend Architecture (Convex)

#### Convex Function Types

```
┌─────────────────────────────────────────┐
│              Queries                     │
│  - Read-only operations                 │
│  - Cached by default                    │
│  - Real-time subscriptions              │
│  - Cannot modify database               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│             Mutations                    │
│  - Write operations                     │
│  - Transactional                        │
│  - Invalidate related queries           │
│  - Can read and write database          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│             Actions                      │
│  - Long-running tasks                   │
│  - External API calls                   │
│  - Non-transactional                    │
│  - Can call queries/mutations           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          HTTP Endpoints                  │
│  - REST API endpoints                   │
│  - Webhooks                             │
│  - Better Auth routes (/auth/*)        │
│  - Can call any function type           │
└─────────────────────────────────────────┘
```

#### Data Flow in Convex

```
1. Client Request
   ↓
2. Convex HTTP Router
   ↓
3. Authentication Middleware (Better Auth)
   ↓
4. Query/Mutation/Action Handler
   ↓
5. Database Access (if applicable)
   ↓
6. Response to Client
   ↓
7. Real-time Update to Subscribers (if mutation)
```

#### Better Auth Integration Architecture

```
┌─────────────────────────────────────────────────┐
│               Frontend (React)                   │
│  ┌───────────────────────────────────────────┐  │
│  │  Better Auth Client                       │  │
│  │  - emailOTPClient()                       │  │
│  │  - crossDomainClient()                    │  │
│  │  - convexClient()                         │  │
│  └───────────────────────────────────────────┘  │
│                      │                           │
│  ┌───────────────────────────────────────────┐  │
│  │  Auth UI Provider                         │  │
│  │  - Sign in/up forms                       │  │
│  │  - OTP verification                       │  │
│  │  - Session management                     │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      │
                      │ HTTP POST /auth/*
                      ▼
┌─────────────────────────────────────────────────┐
│           Convex Backend (Better Auth)           │
│  ┌───────────────────────────────────────────┐  │
│  │  HTTP Handler (/auth/*)                   │  │
│  │  - Routes all auth requests               │  │
│  │  - CORS handling                          │  │
│  └───────────────────────────────────────────┘  │
│                      │                           │
│  ┌───────────────────────────────────────────┐  │
│  │  Better Auth Component                    │  │
│  │  - Database adapter (Convex)              │  │
│  │  - Session management                     │  │
│  │  - Plugins: emailOTP, crossDomain         │  │
│  └───────────────────────────────────────────┘  │
│                      │                           │
│  ┌───────────────────────────────────────────┐  │
│  │  Convex Database                          │  │
│  │  - Users table (managed by component)     │  │
│  │  - Sessions table                         │  │
│  │  - Verification tokens                    │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      │
                      │ SMTP
                      ▼
┌─────────────────────────────────────────────────┐
│                   Resend                         │
│  - OTP emails                                   │
│  - Magic link emails                            │
│  - Password reset emails                        │
└─────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### User Authentication Flow (Email OTP)

```
┌─────────┐                  ┌─────────┐                  ┌─────────┐
│ Browser │                  │ Convex  │                  │ Resend  │
└────┬────┘                  └────┬────┘                  └────┬────┘
     │                            │                            │
     │  1. POST /auth/sign-in     │                            │
     │    { email }               │                            │
     │───────────────────────────>│                            │
     │                            │                            │
     │                            │  2. Generate OTP           │
     │                            │     Store in DB            │
     │                            │                            │
     │                            │  3. Send OTP email         │
     │                            │───────────────────────────>│
     │                            │                            │
     │                            │  4. Email sent             │
     │                            │<───────────────────────────│
     │                            │                            │
     │  5. { success: true }      │                            │
     │<───────────────────────────│                            │
     │                            │                            │
     │  6. User enters OTP        │                            │
     │                            │                            │
     │  7. POST /auth/verify-otp  │                            │
     │    { email, otp }          │                            │
     │───────────────────────────>│                            │
     │                            │                            │
     │                            │  8. Verify OTP             │
     │                            │     Check expiration       │
     │                            │     Validate attempts      │
     │                            │                            │
     │  9. { session, user }      │                            │
     │<───────────────────────────│                            │
     │                            │                            │
     │  10. Redirect to dashboard │                            │
     │                            │                            │
```

### Data Fetching with Real-Time Updates

```
┌─────────┐                  ┌─────────┐
│ Browser │                  │ Convex  │
└────┬────┘                  └────┬────┘
     │                            │
     │  1. Subscribe to query     │
     │    useQuery({ queryKey,    │
     │      queryFn })            │
     │───────────────────────────>│
     │                            │
     │                            │  2. Execute query
     │                            │     Fetch from DB
     │                            │
     │  3. Initial data           │
     │<───────────────────────────│
     │                            │
     │  4. Render UI              │
     │                            │
     │    [WebSocket Connection]  │
     │<═══════════════════════════│
     │                            │
     │                            │  5. Database change
     │                            │     (from another user)
     │                            │
     │  6. Real-time update       │
     │<───────────────────────────│
     │                            │
     │  7. Auto re-render         │
     │                            │
```

### Form Submission with Optimistic Updates

```
┌─────────┐                  ┌─────────┐
│ Browser │                  │ Convex  │
└────┬────┘                  └────┬────┘
     │                            │
     │  1. User submits form      │
     │                            │
     │  2. Optimistic update      │
     │     (update UI immediately)│
     │                            │
     │  3. POST mutation          │
     │───────────────────────────>│
     │                            │
     │                            │  4. Validate input
     │                            │  5. Update database
     │                            │  6. Broadcast to subscribers
     │                            │
     │  7. Success response       │
     │<───────────────────────────│
     │                            │
     │  8. Confirm UI update      │
     │     (or rollback if error) │
     │                            │
```

## Database Schema

### Current Schema (Managed by Better Auth)

```typescript
// convex/schema.ts

// Users table (managed by @convex-dev/better-auth component)
{
  _id: Id<"users">,
  email: string,
  emailVerified: boolean,
  name?: string,
  image?: string,
  createdAt: number,
  updatedAt: number,
}

// Sessions table (managed by Better Auth)
{
  _id: Id<"sessions">,
  userId: Id<"users">,
  expiresAt: number,
  token: string,
  ipAddress?: string,
  userAgent?: string,
}

// Verification tokens (OTP, magic links)
{
  _id: Id<"verifications">,
  identifier: string, // email
  token: string,      // OTP or magic link token
  expiresAt: number,
  attempts: number,
}
```

### Schema Design Principles

1. **Normalized Data:** Related data in separate tables with references
2. **Denormalization for Performance:** Duplicate frequently-accessed data
3. **Indexes:** Add indexes for commonly-queried fields
4. **Timestamps:** Include createdAt/updatedAt for all entities
5. **Soft Deletes:** Use `deletedAt` instead of hard deletes

### Example Extended Schema

```typescript
// Future schema extensions

// User profiles
export const profiles = defineTable({
  userId: v.id("users"),
  bio: v.optional(v.string()),
  avatarUrl: v.optional(v.string()),
  timezone: v.optional(v.string()),
  preferences: v.object({
    theme: v.union(v.literal("light"), v.literal("dark")),
    emailNotifications: v.boolean(),
    language: v.string(),
  }),
}).index("by_user", ["userId"])

// Audit logs
export const auditLogs = defineTable({
  userId: v.id("users"),
  action: v.string(),
  entityType: v.string(),
  entityId: v.string(),
  changes: v.any(),
  timestamp: v.number(),
  ipAddress: v.optional(v.string()),
}).index("by_user", ["userId"])
  .index("by_timestamp", ["timestamp"])
```

## Routing Architecture

### TanStack Router File-Based Routing

```
src/routes/
├── __root.tsx                    # Root layout (wraps everything)
│
├── index.tsx                     # / (home page)
│
├── (auth)/                       # Route group (no layout)
│   ├── sign-in.tsx              # /sign-in
│   ├── sign-up.tsx              # /sign-up
│   ├── otp.tsx                  # /otp
│   └── forgot-password.tsx      # /forgot-password
│
├── (errors)/                     # Route group (no layout)
│   ├── 401.tsx                  # /401
│   ├── 403.tsx                  # /403
│   ├── 404.tsx                  # /404
│   ├── 500.tsx                  # /500
│   └── 503.tsx                  # /503
│
└── _authenticated/               # Layout route (protected)
    ├── route.tsx                # Layout component
    ├── index.tsx                # /dashboard
    ├── settings/
    │   ├── route.tsx           # Settings layout
    │   ├── index.tsx           # /settings
    │   ├── account.tsx         # /settings/account
    │   ├── appearance.tsx      # /settings/appearance
    │   ├── display.tsx         # /settings/display
    │   └── notifications.tsx   # /settings/notifications
    └── help-center/
        └── index.tsx            # /help-center
```

### Route Protection Strategy

```typescript
// _authenticated/route.tsx (layout wrapper)

export default function AuthenticatedLayout() {
  const { session, isLoading } = useSession()

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingScreen />
  }

  // Redirect to sign-in if not authenticated
  if (!session) {
    return <Navigate to="/sign-in" />
  }

  // Render protected content
  return (
    <AuthenticatedLayoutWrapper>
      <Outlet /> {/* Render child routes */}
    </AuthenticatedLayoutWrapper>
  )
}
```

## State Management Strategy

### Server State (TanStack Query)

**Purpose:** Manage data from backend (Convex)

**Use Cases:**
- User data
- Application data
- Real-time subscriptions

**Example:**
```typescript
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => convexQuery(api.users.getById, { userId }),
})
```

### Client State (Zustand)

**Purpose:** Manage local UI state

**Use Cases:**
- Theme preference
- Sidebar collapsed/expanded
- Modal open/closed
- Form draft data

**Example:**
```typescript
const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
```

### Context Providers

**Purpose:** Share state across component tree

**Use Cases:**
- Theme (light/dark mode)
- Font preferences
- Layout configuration
- Global search state

**Example:**
```typescript
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Theme>('system')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

## Security Architecture

### Authentication Flow

```
1. User submits credentials (email + OTP)
2. Convex Better Auth verifies credentials
3. Generate session token (JWT)
4. Store session in Convex database
5. Send session cookie to client (httpOnly, secure)
6. Client includes cookie in all requests
7. Convex validates session on each request
8. Return user data or 401 Unauthorized
```

### Authorization Patterns

#### Function-Level Authorization
```typescript
// Every protected function checks authentication

export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // 1. Get authenticated user
    const currentUser = await getUser(ctx)

    // 2. Check authorization
    if (!currentUser) {
      throw new ConvexError("Unauthorized")
    }

    // 3. Additional checks (e.g., user can only view own profile)
    if (currentUser._id !== args.userId) {
      throw new ConvexError("Forbidden")
    }

    // 4. Execute authorized logic
    return await ctx.db.get(args.userId)
  },
})
```

#### Row-Level Security
```typescript
// Filter data based on user permissions

export const getMyDocuments = query({
  args: {},
  handler: async (ctx) => {
    const user = await getUser(ctx)
    if (!user) throw new ConvexError("Unauthorized")

    // Only return documents owned by the user
    return await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("ownerId"), user._id))
      .collect()
  },
})
```

### CORS and Cross-Domain

```typescript
// convex/http.ts

export default httpRouter()
  .route({
    path: "/auth/*",
    method: "GET",
    handler: betterAuthHandler,
  })
  .route({
    path: "/auth/*",
    method: "POST",
    handler: betterAuthHandler,
  })

// Better Auth handles CORS automatically via crossDomain plugin
// Trusted origins configured in convex/auth.ts
```

## Performance Optimizations

### Frontend Optimizations

1. **Code Splitting:**
   - Route-based splitting (automatic with TanStack Router)
   - Component lazy loading with `React.lazy()`
   - Dynamic imports for heavy libraries

2. **Caching:**
   - TanStack Query caching (staleTime: 10s)
   - Browser cache for static assets
   - Service worker for offline support (future)

3. **Rendering:**
   - React.memo for expensive components
   - useMemo for expensive computations
   - useCallback for event handlers
   - Virtual scrolling for long lists (future)

4. **Bundle Size:**
   - Tree shaking (automatic with Vite)
   - Import specific functions (not entire libraries)
   - Analyze bundle with `vite-bundle-visualizer`

### Backend Optimizations

1. **Database Indexes:**
   - Add indexes for commonly-queried fields
   - Composite indexes for multi-field queries

2. **Query Optimization:**
   - Avoid N+1 queries
   - Batch related data fetches
   - Use pagination for large datasets

3. **Caching:**
   - Query results cached by Convex
   - Convex handles cache invalidation automatically

## Scalability Considerations

### Horizontal Scaling (Convex)

- **Automatic:** Convex scales automatically
- **No Configuration:** Zero-ops scaling
- **Limits:** 10,000+ concurrent connections supported

### Database Scaling

- **Indexes:** Add as data grows
- **Pagination:** Implement for large datasets
- **Sharding:** Convex handles internally

### Real-Time Scaling

- **WebSocket Connections:** Convex manages connection pooling
- **Broadcasting:** Efficient pub/sub for updates
- **Backpressure:** Automatic handling of slow clients

## Monitoring and Observability

### Current Monitoring

1. **Convex Dashboard:**
   - Function execution times
   - Error rates
   - Database query performance
   - WebSocket connections

2. **Browser DevTools:**
   - Network requests
   - Console logs (dev only)
   - React DevTools
   - TanStack Query DevTools

### Future Monitoring (Recommended)

1. **Error Tracking:**
   - Sentry or similar
   - Client-side error capture
   - Server-side error logging

2. **Performance Monitoring:**
   - Web Vitals (Core Web Vitals)
   - Lighthouse CI in deployment pipeline

3. **User Analytics:**
   - Plausible or similar (privacy-focused)
   - User behavior tracking

## Disaster Recovery

### Backup Strategy

- **Convex Backups:** Automatic daily backups
- **Export Data:** Manual export via Convex dashboard
- **Version Control:** All code in Git

### Recovery Procedures

1. **Database Corruption:**
   - Restore from Convex backup
   - Re-run migrations if needed

2. **Deployment Failure:**
   - Rollback to previous Convex deployment
   - Rollback frontend via hosting platform

3. **Data Loss:**
   - Restore from latest backup
   - Audit logs for missing data

## Technology Decision Matrix

| Concern | Technology | Alternatives Considered | Reason |
|---------|-----------|------------------------|--------|
| Frontend Framework | React 19 | Vue 3, Svelte | Ecosystem, Better Auth support |
| Build Tool | Vite 7 | Webpack, Turbopack | Speed, DX |
| Backend | Convex | Firebase, Supabase, Node.js | Type safety, real-time, zero-ops |
| Auth | Better Auth 1.3.27 | Clerk, Auth.js, Supabase | Self-hosted, flexible |
| Routing | TanStack Router | React Router, Wouter | Type safety, file-based |
| UI Framework | Shadcn UI | Chakra, MUI, Ant Design | Copy-paste, customizable |
| Styling | Tailwind 4 | CSS Modules, Styled Components | Utility-first, Shadcn compat |
| State (Server) | TanStack Query | SWR, Apollo, RTK Query | Convex integration |
| State (Client) | Zustand | Redux, MobX, Jotai | Simple, minimal |
| Forms | React Hook Form + Zod | Formik, Final Form | Performance, validation |
| Testing | Vitest | Jest, Playwright | Speed, Vite integration |
| Email | Resend | SendGrid, Mailgun | Developer experience |

## Future Architecture Enhancements

### Planned Improvements

1. **API Layer Abstraction:**
   - Create API client wrapper for easier backend migration
   - Standardize error handling across all API calls

2. **Event-Driven Architecture:**
   - Add event bus for decoupled components
   - Implement domain events for audit logs

3. **Micro-Frontends (If Needed):**
   - Split large features into separate apps
   - Module federation for sharing components

4. **GraphQL Gateway (Optional):**
   - Add GraphQL layer over Convex
   - Better data fetching for complex queries

5. **Service Worker:**
   - Offline support
   - Background sync
   - Push notifications

---

**Last Updated:** 2025-10-25
**Maintained By:** docs-manager agent
