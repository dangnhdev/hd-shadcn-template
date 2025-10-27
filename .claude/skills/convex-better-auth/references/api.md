# Convex-Better-Auth - Api

**Pages:** 2

---

## Component Client

**URL:** https://convex-better-auth.netlify.app/api/component-client

**Contents:**
- Component Client
- adapter()
- getAuth()
- getAnyUserById()

Component client for Better Auth

The component client is returned from the createClient function, and provides helpful methods for using Better Auth in your Convex code.

Returns the Convex database adapter for use in Better Auth options.

Better Auth API endpoints can be called directly from the server, and many require headers to be passed in containing a session token for the current user. This method provides both the auth object and headers for convenience.

Returns a user by their Better Auth user id.

Using Hono with Convex + Better Auth

Type utilities for Better Auth

**Examples:**

Example 1 (python):
```python
import { createClient } from "@convex-dev/better-auth";
import { components } from "./_generated/api";
import { type GenericCtx } from "./_generated/server";
import { DataModel } from "./_generated/dataModel";

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    database: authComponent.adapter(ctx),
  });
});
```

Example 2 (python):
```python
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

Example 3 (python):
```python
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

---

## Type Utilities

**URL:** https://convex-better-auth.netlify.app/api/type-utilities

**Contents:**
- Type Utilities
- requireRunMutationCtx()
- requireActionCtx()
- Example usage

Type utilities for Better Auth

A type guard to ensure a given context object has a runMutation property. Requires a mutation context or action context. Will error if a query context is provided.

A type guard to ensure the ctx is an action ctx. Will error if the provided ctx is not an action ctx.

Component client for Better Auth

Migrate to @convex-dev/better-auth@0.9

**Examples:**

Example 1 (python):
```python
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
      // This function only requires a `runMutation` property on the ctx object,
      // but we'll make sure we have an action ctx because we know 
...
```

---
