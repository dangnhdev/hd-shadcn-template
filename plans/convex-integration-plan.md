# Convex Integration Plan

## Objective
Integrate Convex backend with Clerk authentication into the shadcn template, replacing the current Axios/TanStack Query setup with Convex's reactive database and real-time queries.

---

## Architecture Overview

### Current Stack:
- Frontend: React + Vite + TanStack Router
- State: TanStack Query + Axios
- Auth: Clerk (already integrated)

### New Stack:
- Frontend: React + Vite + TanStack Router
- Backend: **Convex** (reactive database + serverless functions)
- State: **Convex React hooks** (useQuery, useMutation, useAction)
- Auth: **Clerk + Convex Auth** (integrated)

---

## Benefits of Convex Integration

1. **Real-time updates**: Automatic UI updates when data changes
2. **Type-safe**: End-to-end TypeScript with generated types
3. **Serverless functions**: No backend needed
4. **Optimistic updates**: Built-in optimistic mutation support
5. **File storage**: Built-in file storage capabilities
6. **Scheduling**: Built-in cron jobs and scheduled functions
7. **Full-stack in one repo**: Backend code lives alongside frontend

---

## Implementation Steps

### 1. Install Convex Dependencies

```bash
npm install convex
npm install convex/react-clerk
```

Keep:
- `@clerk/clerk-react` (already installed)
- Remove later: `axios`, `@tanstack/react-query`

### 2. Initialize Convex Project

```bash
npx convex dev
```

This will:
- Create `convex/` directory
- Generate `convex.json` config
- Create `.env.local` with `VITE_CONVEX_URL`
- Set up authentication

### 3. Configure Clerk + Convex Authentication

**File: `convex/auth.config.ts`**
```typescript
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
```

**Environment Variables (.env.local):**
```env
# Convex
VITE_CONVEX_URL=<your-convex-url>

# Clerk
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-key>
CLERK_SECRET_KEY=<your-clerk-secret>
CLERK_JWT_ISSUER_DOMAIN=<your-issuer-domain>
```

### 4. Update React Providers

**File: `src/main.tsx`**

Replace current setup with:

```typescript
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from './context/theme-provider'
import { FontProvider } from './context/font-provider'
// Remove DirectionProvider
import { routeTree } from './routeTree.gen'
import './styles/index.css'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const router = createRouter({
  routeTree,
  context: { convex }, // Pass convex client to router context
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ThemeProvider>
            <FontProvider>
              <RouterProvider router={router} />
            </FontProvider>
          </ThemeProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </StrictMode>
  )
}
```

### 5. Create Convex Schema

**File: `convex/schema.ts`**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  // Add more tables as needed
});
```

### 6. Create Example Convex Functions

**File: `convex/users.ts`**

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get current user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

// Mutation to create/update user
export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
```

### 7. Create User Sync Hook

**File: `src/hooks/use-sync-user.ts`**

```typescript
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useEffect } from 'react'

export function useSyncUser() {
  const { user, isLoaded } = useUser()
  const syncUser = useMutation(api.users.syncUser)

  useEffect(() => {
    if (!isLoaded || !user) return

    syncUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? '',
      name: user.fullName ?? undefined,
      imageUrl: user.imageUrl ?? undefined,
    })
  }, [user, isLoaded, syncUser])
}
```

### 8. Update Dashboard to Use Convex

**Example usage in components:**

```typescript
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

function Dashboard() {
  const currentUser = useQuery(api.users.getCurrentUser)

  if (currentUser === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome, {currentUser?.name ?? 'User'}!</h1>
    </div>
  )
}
```

### 9. Replace TanStack Query Calls

Find and replace:
- `useQuery` from `@tanstack/react-query` → `useQuery` from `convex/react`
- `useMutation` from `@tanstack/react-query` → `useMutation` from `convex/react`
- Axios calls → Convex queries/mutations/actions

### 10. Authentication Components

Use Convex's built-in auth helpers:

```typescript
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'

function App() {
  return (
    <>
      <AuthLoading>
        <div>Loading...</div>
      </AuthLoading>
      <Authenticated>
        <Dashboard />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  )
}
```

---

## File Structure After Integration

```
project-root/
├── convex/
│   ├── _generated/        # Auto-generated types
│   ├── auth.config.ts     # Auth configuration
│   ├── schema.ts          # Database schema
│   ├── users.ts           # User-related functions
│   └── ...                # More Convex functions
├── src/
│   ├── hooks/
│   │   └── use-sync-user.ts
│   ├── main.tsx           # Updated with Convex providers
│   └── ...
├── .env.local             # Environment variables
└── convex.json            # Convex configuration
```

---

## Migration Strategy

### Phase 1: Setup (Do First)
1. Install Convex
2. Initialize Convex project
3. Configure Clerk auth
4. Update providers in main.tsx
5. Create basic schema

### Phase 2: Gradual Migration
1. Keep TanStack Query initially
2. Migrate one feature at a time to Convex
3. Start with simple queries (e.g., user data)
4. Then migrate mutations
5. Test each migration

### Phase 3: Cleanup (Do Last)
1. Remove TanStack Query
2. Remove Axios
3. Remove unused query client code
4. Update types

---

## Testing Checklist

- [ ] Convex dev server runs: `npx convex dev`
- [ ] Clerk authentication works
- [ ] User sync to Convex database works
- [ ] Queries return data correctly
- [ ] Mutations update data correctly
- [ ] Real-time updates work
- [ ] Type generation works: `npx convex dev` generates types
- [ ] Build succeeds: `pnpm build`
- [ ] Deployment works: `npx convex deploy`

---

## Key Differences from TanStack Query

| Feature | TanStack Query | Convex |
|---------|---------------|---------|
| **Data fetching** | Manual with Axios | Automatic with queries |
| **Real-time** | Manual polling/SSE | Built-in subscriptions |
| **Caching** | Manual cache config | Automatic reactivity |
| **Optimistic updates** | Manual | Built-in support |
| **Type safety** | Manual types | Auto-generated types |
| **Backend** | Separate API needed | Serverless functions included |

---

## Resources

- Convex Docs: https://docs.convex.dev
- Convex + Clerk: https://docs.convex.dev/auth/clerk
- Convex React Guide: https://docs.convex.dev/client/react
- Example Template: https://github.com/get-convex/template-react-vite-clerk

---

## Notes

- Keep Clerk components for UI (SignInButton, UserButton)
- Convex handles backend auth validation
- No need for manual token management
- Real-time subscriptions work automatically
- File uploads: Use Convex file storage
- Scheduled tasks: Use Convex cron jobs
