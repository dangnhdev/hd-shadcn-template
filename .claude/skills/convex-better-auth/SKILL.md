---
name: convex-better-auth
description: Convex Better Auth integration documentation and guides
---

# Convex-Better-Auth Skill

Comprehensive assistance with Convex + Better Auth integration - a component that provides authentication for Convex applications using Better Auth.

## When to Use This Skill

This skill should be triggered when:
- **Setting up authentication** in a Convex project (Next.js, React, Expo, TanStack Start, SvelteKit)
- **Working with Better Auth** component configuration or API methods
- **Implementing auth features** like social sign-in, password changes, email verification
- **Using auth in Convex functions** (queries, mutations, actions)
- **Creating user triggers** (onCreate, onUpdate, onDelete hooks)
- **Migrating** from older versions of @convex-dev/better-auth
- **Debugging auth issues** with Convex + Better Auth
- **Questions about** authorization, user identity, session management
- **Local install setup** for custom schemas and plugins
- **Social provider configuration** (Google, GitHub, etc.)

## Key Concepts

### Core Architecture
- **Component-based**: Better Auth runs as a Convex component with its own user table
- **Two user tables**: Component table (Better Auth) + App table (optional, your users)
- **Auth tokens**: Better Auth issues JWT tokens that Convex validates
- **Server-side only**: Sign in/out via client methods (`authClient.signIn.*`), not server functions
- **Triggers**: Run transactional callbacks when auth data changes (onCreate, onUpdate, onDelete)

### Important Terminology
- **authComponent**: The Better Auth component client created via `createClient()`
- **createAuth**: Function that returns a Better Auth instance with Convex adapter
- **auth.api**: Better Auth server methods (changePassword, updateUser, etc.)
- **ctx.auth.getUserIdentity()**: Gets authenticated user identity from Convex JWT
- **authComponent.getAuthUser(ctx)**: Gets the Better Auth user object
- **Local Install**: Installing the component locally to customize schema/plugins

## Quick Reference

### 1. Register the Component (Setup)

Add Better Auth component to your Convex app:

```typescript
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

### 2. Create Auth Config (Setup)

Configure Better Auth with Convex authentication provider:

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

### 3. Create Component Client

Create the auth component client for use in Convex functions:

```typescript
import { createClient } from "@convex-dev/better-auth";
import { components } from "./_generated/api";
import { type GenericCtx } from "./_generated/server";
import { DataModel } from "./_generated/dataModel";

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    database: authComponent.adapter(ctx),
  });
};
```

### 4. Use Better Auth Server Methods

Call Better Auth API methods from Convex mutations:

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { createAuth, authComponent } from "./auth";

export const changePassword = mutation({
  args: {
    newPassword: v.string(),
    currentPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
    await auth.api.changePassword({
      body: {
        newPassword: args.newPassword,
        currentPassword: args.currentPassword,
      },
      headers,
    });
  },
});
```

### 5. Get Current User in Convex Functions

Access authenticated user in queries/mutations:

```typescript
import { query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get Better Auth user object
    return await authComponent.getAuthUser(ctx);
  },
});

// Or get user identity from JWT
export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});
```

### 6. Get User By ID

Retrieve any user by their Better Auth user id:

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const getUser = query({
  args: { id: v.id("user") },
  handler: async (ctx, args) => {
    return authComponent.getAnyUserById(ctx, args.id);
  },
});
```

### 7. User Triggers (onCreate, onUpdate, onDelete)

Run custom logic when users are created, updated, or deleted:

```typescript
import { createClient } from "@convex-dev/better-auth";
import { components, internal } from "./_generated/api";
import { AuthFunctions } from "@convex-dev/better-auth";
import { DataModel } from "./_generated/dataModel";

const authFunctions: AuthFunctions = internal.auth;

export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  triggers: {
    user: {
      onCreate: async (ctx, doc) => {
        // Create app user record when auth user is created
        await ctx.db.insert("posts", {
          title: "Hello, world!",
          userId: doc._id,
        });
      },
      onUpdate: async (ctx, newDoc, oldDoc) => {
        // Sync user email changes to app table
        if (oldDoc.email !== newDoc.email) {
          await ctx.db.patch(appUserId, { email: newDoc.email });
        }
      },
      onDelete: async (ctx, doc) => {
        // Clean up user data when deleted
        await ctx.db.delete(appUserId);
      },
    },
  },
});
```

### 8. Client-Side Authorization Check

Use Convex auth state (not Better Auth session) for UI:

```typescript
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  return (
    <main>
      <Unauthenticated>Logged out</Unauthenticated>
      <Authenticated>Logged in</Authenticated>
      <AuthLoading>Loading...</AuthLoading>
    </main>
  );
}

const Content = () => {
  const messages = useQuery(api.messages.getForCurrentUser);
  return <div>Authenticated content: {messages?.length}</div>;
};
```

### 9. Hono Integration (Alternative to HttpRouter)

Use Hono for Better Auth endpoints:

```typescript
import { Hono } from "hono";
import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
import { ActionCtx } from "./_generated/server";
import { createAuth } from "./auth";

const app: HonoWithConvex<ActionCtx> = new Hono();

// Redirect root well-known to api well-known
app.get("/.well-known/openid-configuration", async (c) => {
  return c.redirect("/api/auth/convex/.well-known/openid-configuration");
});

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

const http = new HttpRouterWithHono(app);
export default http;
```

### 10. Type Guards for Context

Ensure proper context type when needed (action vs query/mutation):

```typescript
import { requireActionCtx } from "@convex-dev/better-auth/utils";
import { Resend } from "@convex-dev/resend";
import { components } from "./_generated/api";
import { type ActionCtx } from "./_generated/server";

export const resend = new Resend(components.resend);

export const createAuth = (
  ctx: ActionCtx,
  { optionsOnly } = { optionsOnly: false }
) =>
  betterAuth({
    baseURL: siteUrl,
    sendVerificationEmail: async ({ user, url }) => {
      // Ensure we have action context for runMutation
      requireActionCtx(ctx);

      await resend.sendEmail(ctx, {
        to: user.email,
        subject: "Verify your email",
        html: `<a href="${url}">Verify</a>`,
      });
    },
  });
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

### **api.md** - Component API Reference
- **Component Client**: `createClient()`, `adapter()`, `getAuth()`, `getAnyUserById()`
- **Type Utilities**: `requireRunMutationCtx()`, `requireActionCtx()`
- How to use Better Auth server methods with Convex

### **framework-guides.md** - Framework Setup Guides
- **Next.js**: Full setup with route handlers and server-side auth
- **React (Vite SPA)**: Client-only setup with ConvexBetterAuthProvider
- **Expo (React Native)**: Mobile setup with secure storage
- **TanStack Start**: Setup with server functions
- **SvelteKit**: Community-maintained integration setup

Each guide includes:
- Prerequisites and installation steps
- Environment variable configuration
- Client provider setup
- Framework-specific usage patterns

### **migrations.md** - Migration Guides
- **Migrate to 0.8**: Converting from old API to triggers
- **Migrate to 0.9**: Update triggers, use `_id` in adapter
- **Migrate off user.userId**: Two strategies (authId in app table vs userId in component)
- **Local Install migration**: Converting to local component installation

### **other.md** - Additional Features
- **Getting Started**: Prerequisites, framework selection
- **Basic Usage**: Server-side auth, schemas, using auth.api
- **Authorization**: `<Authenticated>`, `useConvexAuth()`, `ctx.auth.getUserIdentity()`
- **Triggers**: Transactional callbacks for auth data changes
- **Hono Integration**: Using Hono instead of HttpRouter
- **Debugging**: Verbose logging on backend and client
- **Local Install**: Full control over schema and plugins

## Working with This Skill

### For Beginners
1. Start with **other.md** → "Getting Started" section to understand prerequisites
2. Follow your **framework-guides.md** setup (Next.js, React, Expo, etc.)
3. Read **other.md** → "Basic Usage" for core concepts
4. Use **other.md** → "Authorization" to protect routes and functions

### For Specific Features
- **Setting up auth**: Use **framework-guides.md** for your framework
- **User management**: See **api.md** → "Component Client" for `getAuthUser()`, `getAnyUserById()`
- **Password/email operations**: See **api.md** examples using `auth.api.changePassword()`
- **Custom user logic**: See **other.md** → "Triggers" for onCreate/onUpdate/onDelete
- **Social providers**: Check **framework-guides.md** for authorized redirect URIs
- **Custom schemas**: See **other.md** → "Local Install" for schema generation

### For Migration Tasks
- Upgrading versions: See **migrations.md** → "Migrate to 0.8" or "Migrate to 0.9"
- Removing user.userId: See **migrations.md** → "Migrate off of user.userId"
- Converting to local install: See **migrations.md** → component setup guides

### For Debugging
1. Enable verbose logging: **other.md** → "Debugging"
2. Check client vs server auth state: **other.md** → "Authorization" (use `useConvexAuth`, not `useSession`)
3. Common issues:
   - "Not authenticated" errors → Wrap component in `<Authenticated>`
   - Type errors with ctx → Use **api.md** → "Type Utilities"
   - User not found → Use `safeGetAuthUser()` instead of `getAuthUser()`

## Installation Commands

### Standard Install
```bash
npm install convex@latest @convex-dev/better-auth
npm install better-auth@1.3.27 --save-exact
```

### Generate Auth Secret
```bash
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

### Local Install (Custom Schema)
```bash
# Generate schema
cd convex/betterAuth
npx @better-auth/cli generate -y
```

## Common Patterns

### Pattern 1: Create App User on Auth User Creation
```typescript
triggers: {
  user: {
    onCreate: async (ctx, authUser) => {
      await ctx.db.insert("users", {
        authId: authUser._id,
        email: authUser.email,
      });
    },
  },
}
```

### Pattern 2: Safe Get Current User (No Error)
```typescript
export const getCurrentUser = query({
  handler: async (ctx) => {
    // Returns null if not authenticated
    return await authComponent.safeGetAuthUser(ctx);
  },
});
```

### Pattern 3: Get App User from Auth User
```typescript
export const getAppUser = query({
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    return await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", authUser._id))
      .unique();
  },
});
```

## Resources

### Official Documentation
- Convex Better Auth Docs: https://convex-better-auth.netlify.app
- Better Auth Docs: https://better-auth.dev
- Convex Docs: https://docs.convex.dev

### Example Projects
- Next.js Example: GitHub repo examples
- React SPA Example: GitHub repo examples
- TanStack Start Example: GitHub repo examples

### Support Channels
- GitHub Issues: Component bug reports
- Discord #better-auth: Community help

## Notes

- **Use Convex auth state** (`useConvexAuth`, `<Authenticated>`) for UI, not Better Auth session
- **Sign in/out from client only** - Convex functions can't set cookies
- **Triggers run in same transaction** - Unlike databaseHooks
- **authComponent.getAuthUser() throws** - Use `safeGetAuthUser()` if user might not exist
- **Subject in JWT** is Better Auth user id (not app user id)
- **Local Install required** for custom schemas and unsupported plugins
- **Better Auth version pinned** - Use exact version (currently 1.3.27)

## Updating

To get the latest Better Auth features:
1. Check migration guides in **migrations.md**
2. Update package versions (both @convex-dev/better-auth and better-auth)
3. Regenerate schema if using Local Install: `cd convex/betterAuth && npx @better-auth/cli generate -y`
4. Run `npx convex dev` to push schema changes
