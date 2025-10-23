# Better Auth + Convex Integration Plan

## Objective
Replace Clerk authentication with Better Auth and integrate Convex backend for a complete, type-safe, self-hosted authentication and data solution.

---

## Why Better Auth + Convex?

### Better Auth Benefits:
- ✅ **Open source & self-hosted**: No vendor lock-in
- ✅ **Framework-agnostic**: Works with any TypeScript framework
- ✅ **Comprehensive features**: Email/password, social providers, 2FA, magic links, passkeys
- ✅ **Flexible**: Plugin ecosystem for advanced features
- ✅ **Database-agnostic**: Works with any database (we'll use Convex)
- ✅ **No pricing tiers**: Full control

### Convex Benefits:
- ✅ **Real-time reactive**: Automatic UI updates
- ✅ **Type-safe**: Full TypeScript support with generated types
- ✅ **Serverless**: No backend setup needed
- ✅ **Official Better Auth integration**: `@convex-dev/better-auth`
- ✅ **Built-in auth validation**: Native JWT support
- ✅ **File storage**: Built-in for avatars, uploads
- ✅ **Scheduled functions**: Cron jobs included

---

## Architecture Overview

### Current Stack:
- Frontend: React + Vite + TanStack Router
- State: TanStack Query + Axios
- Auth: **Clerk** ❌

### New Stack:
- Frontend: React + Vite + TanStack Router
- Backend: **Convex** ✅ (reactive database + serverless)
- Auth: **Better Auth** ✅ (via Convex component)
- State: **Convex React hooks** ✅ (useQuery, useMutation)
- Real-time: **Built-in** ✅ (via Convex subscriptions)

---

## Installation Steps

### 1. Install Dependencies

```bash
# Install Convex
npm install convex

# Install Convex Better Auth component
npm install @convex-dev/better-auth

# Install Better Auth React client
npm install better-auth

# Remove Clerk
npm uninstall @clerk/clerk-react

# Optional: Keep TanStack Query initially for gradual migration
# npm uninstall @tanstack/react-query axios
```

### 2. Initialize Convex Project

```bash
# Initialize Convex (creates convex/ folder)
npx convex dev
```

This will:
- Create `convex/` directory
- Generate `convex.json` config
- Create `.env.local` with `VITE_CONVEX_URL`
- Prompt you to create a Convex account/project

---

## Configuration Files

### 1. Environment Variables (`.env.local`)

```env
# Convex
VITE_CONVEX_URL=https://your-deployment.convex.cloud
VITE_CONVEX_SITE_URL=https://your-deployment.convex.site

# Local site URL
SITE_URL=http://localhost:5173

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-random-secret-key-here

# Social Providers (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Set Convex environment variables:**
```bash
npx convex env set BETTER_AUTH_SECRET $(openssl rand -base64 32)
npx convex env set SITE_URL http://localhost:5173
```

---

### 2. Convex Configuration (`convex/convex.config.ts`)

Register the Better Auth component:

```typescript
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

---

### 3. Better Auth Configuration (`convex/auth.config.ts`)

Configure auth providers:

```typescript
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
```

---

### 4. Create Better Auth Instance (`convex/auth.ts`)

```typescript
import { convexAuth } from "@convex-dev/better-auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    {
      id: "email-password",
      type: "credentials",
      // Enable email/password authentication
    },
    // Add social providers if needed
  ],
});
```

---

### 5. Convex HTTP Routes (`convex/http.ts`)

Handle Better Auth HTTP requests:

```typescript
import { Hono } from "hono";
import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
import { ActionCtx } from "./_generated/server";
import { auth } from "./auth";

const app: HonoWithConvex<ActionCtx> = new Hono();

// Redirect root well-known to api well-known
app.get("/.well-known/openid-configuration", async (c) => {
  return c.redirect("/api/auth/convex/.well-known/openid-configuration");
});

// Handle Better Auth routes
app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  return auth.handler(c.req.raw);
});

const http = new HttpRouterWithHono(app);

export default http;
```

**Install Hono and helpers:**
```bash
npm install hono convex-helpers
```

---

### 6. Better Auth Client (`src/lib/auth-client.ts`)

```typescript
import { createAuthClient } from "better-auth/react";
import {
  convexClient,
  crossDomainClient,
} from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  plugins: [
    convexClient(),
    crossDomainClient(), // Enable cross-domain auth
  ],
});

// Export useful auth methods
export const { signIn, signUp, signOut, useSession } = authClient;
```

---

### 7. Update React Providers (`src/main.tsx`)

Replace Clerk providers with Convex + Better Auth:

```typescript
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ConvexReactClient } from 'convex/react'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ThemeProvider } from './context/theme-provider'
import { FontProvider } from './context/font-provider'
import { authClient } from './lib/auth-client'
import { routeTree } from './routeTree.gen'
import './styles/index.css'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const router = createRouter({
  routeTree,
  context: { convex },
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
      <ConvexBetterAuthProvider client={convex} authClient={authClient}>
        <ThemeProvider>
          <FontProvider>
            <RouterProvider router={router} />
          </FontProvider>
        </ThemeProvider>
      </ConvexBetterAuthProvider>
    </StrictMode>
  )
}
```

---

## Database Schema

### Convex Schema (`convex/schema.ts`)

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/better-auth/server";

export default defineSchema({
  // Better Auth tables (managed automatically)
  ...authTables,

  // Your custom tables
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    createdAt: v.number(),
  }).index("by_author", ["authorId"]),

  // Add more tables as needed
});
```

---

## Authentication Components

### 1. Sign In Page (`src/features/auth/sign-in/index.tsx`)

```typescript
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
    })

    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    if (data) {
      navigate({ to: '/' })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### 2. Sign Up Page (`src/features/auth/sign-up/index.tsx`)

```typescript
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
    })

    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    if (data) {
      navigate({ to: '/' })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### 3. User Profile Component

```typescript
import { useSession } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'

export function UserProfile() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await authClient.signOut()
    navigate({ to: '/sign-in' })
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-medium">{session.user.name}</p>
        <p className="text-muted-foreground">{session.user.email}</p>
      </div>
      <Button variant="outline" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  )
}
```

---

## Example Convex Functions

### Query with Auth (`convex/posts.ts`)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get current user's posts
export const myPosts = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_subject", (q) => q.eq("subject", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", user._id))
      .collect();
  },
});

// Create a post
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_subject", (q) => q.eq("subject", identity.subject))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      createdAt: Date.now(),
    });
  },
});
```

---

## Using Convex in Components

```typescript
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

function MyPosts() {
  const posts = useQuery(api.posts.myPosts)
  const createPost = useMutation(api.posts.createPost)

  if (posts === undefined) {
    return <div>Loading...</div>
  }

  const handleCreate = async () => {
    await createPost({
      title: 'My Post',
      content: 'Post content',
    })
  }

  return (
    <div>
      <button onClick={handleCreate}>Create Post</button>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## Migration Checklist

### Phase 1: Setup
- [ ] Install Convex and Better Auth packages
- [ ] Remove Clerk package
- [ ] Initialize Convex project
- [ ] Configure environment variables
- [ ] Set up Better Auth config files
- [ ] Update React providers

### Phase 2: Authentication
- [ ] Create Better Auth client
- [ ] Build sign-in page
- [ ] Build sign-up page
- [ ] Create user profile component
- [ ] Update protected routes
- [ ] Test authentication flow

### Phase 3: Database Schema
- [ ] Define Convex schema
- [ ] Create initial functions
- [ ] Test queries/mutations
- [ ] Set up auth checks

### Phase 4: Cleanup
- [ ] Remove Clerk components
- [ ] Remove TanStack Query (optional)
- [ ] Remove Axios (optional)
- [ ] Update all imports
- [ ] Fix TypeScript errors
- [ ] Test build

---

## Key Differences from Clerk

| Feature | Clerk | Better Auth + Convex |
|---------|-------|----------------------|
| **Hosting** | Managed SaaS | Self-hosted in Convex |
| **Pricing** | Free tier + paid | Free (Convex free tier) |
| **Customization** | Limited | Fully customizable |
| **UI Components** | Pre-built | Build your own |
| **Database** | Managed | Your Convex DB |
| **Real-time** | No | Yes (built-in) |
| **Backend** | Separate | Integrated |

---

## Advanced Features

### Add Social Providers

Update `convex/auth.ts`:

```typescript
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    {
      id: "email-password",
      type: "credentials",
    },
    {
      id: "github",
      type: "oauth",
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    {
      id: "google",
      type: "oauth",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  ],
});
```

### Add Email Verification

```typescript
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [...],
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      // Send email using your preferred service
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `Click here to verify: ${url}`,
      });
    },
  },
});
```

---

## Resources

- Better Auth Docs: https://www.better-auth.com
- Convex Docs: https://docs.convex.dev
- Convex Better Auth Component: https://github.com/get-convex/better-auth
- Example Repo: https://github.com/get-convex/better-auth/tree/main/examples

---

## Notes

- Better Auth stores sessions in your Convex database
- No external auth service needed
- Full control over user data
- Built-in support for social providers
- Can add 2FA, magic links, passkeys via plugins
- Real-time auth state updates via Convex
