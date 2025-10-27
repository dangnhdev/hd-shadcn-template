# Convex-Better-Auth - Migrations

**Pages:** 5

---

## Migrate to 0.8

**URL:** https://convex-better-auth.netlify.app/migrations/migrate-to-0-8

**Contents:**
- Migrate to 0.8
- Upgrade
  - Update the component
  - Update component instance
  - Convert hooks from createAuthFunctions to triggers
  - Move and update Better Auth config
  - Update ctx.auth.getUserIdentity() usage
  - Update authComponent.getAuthUser() usage
  - Framework specific changes
  - That's it!

Migrate to @convex-dev/better-auth@0.8

To use Local Install, complete this migration guide first and then follow the Local Install guide.

Update Better Auth and the component.

Replace the component instance with createClient.

The previously supported onCreateUser, onUpdateUser, and onDeleteUser hooks from betterAuthComponent.createAuthFunctions() have been replaced by triggers. See the Triggers guide for more information.

The createAuth function should be moved to convex/auth.ts. This isn't required, but better represents where the code actually runs, colocates it with other related server side auth code, and avoids potentially writing Convex code outside of the Convex directory for some function based config properties.

The Convex database adapter is now provided through a method on the auth component, and a GenericCtx type from the component library is now used to type the createAuth ctx arg.

There is also a new optionsOnly parameter to the createAuth function. This is used to disable logging when the function is called just to generate options. This is not required, but helpful for reducing noise in logs.

Be sure to update any imports of createAuth to the new path.

The subject property of the id token, as well as the user identity object returned from ctx.auth.getUserIdentity(), was formerly the user id from the application user table. It is now the user id from the Better Auth user table. Any direct usage of the subject property should be replaced with authComponent.getAuthUser(ctx), which returns the entire Better Auth user object (formerly referred to as user metadata).

authComponent.getAuthUser() now throws an error if the user is not found. Use authComponent.safeGetAuthUser() to match the previous behavior.

If your project uses TanStack Start, follow the last few steps of the TanStack Start guide and make sure your code aligns.

This migration should not have framework specific impacts for any other framework.

Please report any issues or inaccuracies from this guide via GitHub issues or in the #better-auth channel on Discord.

The named options parameter to the Convex plugin that accepted Better Auth options has been removed. This was necessary because the Convex plugin previously customized the session, breaking type inference for configuration that affected the session, so the Better Auth options had to be separated to a new function and passed in to the Convex plugin.

None of this is necessary anymore, if you were doing this you can

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npm install @convex-dev/better-auth@0.8
npm install better-auth@1.3.8 --save-exact
```

Example 2 (python):
```python
import {
  AuthFunctions,
  BetterAuth, 
  PublicAuthFunctions, 
  createClient, 
} from "@convex-dev/better-auth";
import { DataModel } from "./_generated/dataModel";
import { components } from "./_generated/api";

const authFunctions: AuthFunctions = internal.auth;
const publicAuthFunctions: PublicAuthFunctions = api.auth; 

export const betterAuthComponent = new BetterAuth(
export const authComponent = createClient<DataModel>(
  components.betterAuth, {
    authFunctions,
    publicAuthFunctions, 
  });

// These will be used in the next step
export const { onCreate, onUpdate, onDelete } = 
...
```

Example 3 (javascript):
```javascript
export const {
  createUser,
  deleteUser,
  updateUser,
} = betterAuthComponent.createAuthFunctions<DataModel>({
  onCreateUser: async (ctx, user) => {
    return ctx.db.insert("users", {
      email: user.email,
    });
  },
  onDeleteUser: async (ctx, userId) => {
    await ctx.db.delete(userId as Id<"users">);
  },
});

const authFunctions: AuthFunctions = internal.auth;

export const authComponent = createClient<DataModel>(
  components.betterAuth,
  {
    authFunctions,
    triggers: {
      user: {
        onCreate: async (ctx, authUser) => {
          // Any `onCreateUser` logic should
...
```

Example 4 (python):
```python
import type { GenericCtx } from './_generated/server'; 
const {
  convexAdapter, 
  type GenericCtx, 
  createClient,
} from "@convex-dev/better-auth";
import { DataModel } from "./_generated/dataModel";

export const authComponent = createClient<DataModel>(
  components.betterAuth
  // ...
)

export const createAuth = (ctx: GenericCtx) => { 
export const createAuth = (
  ctx: GenericCtx<DataModel>, 
  { optionsOnly } = { optionsOnly: false }, 
) => {
  return betterAuth({
    // ...
    database: authComponent.adapter(ctx), 
    database: convexAdapter(ctx, authComponent), 
    // When create
...
```

---

## Component user id in app table

**URL:** https://convex-better-auth.netlify.app/migrations/migrate-userid/userid-in-app-table

**Contents:**
- Component user id in app table
  - Run convex dev
  - Install migrations component
  - Add authId field to users table
  - Add migration functions
  - Update adapter exports (Local Install only)
  - Update user triggers
  - Run addAuthId migration
  - Deploy to production
  - Run addAuthId migration in production

Migrate user id reference from component to app table

This guide shows one of two recommended strategies for migrating away from maintaining a user.userId field in the Better Auth user table. Read the overview for more information.

The migration guide covers basic required changes, but your application may have additional or altered requirements depending on how the Better Auth component is implemented. Be sure to review any auth related code for potential impacts. Avoid type assertions and checking for type errors is encouraged.

This guide is for migrating from tracking the app user id in the component to tracking the component user id in the app user table via an authId field.

Keep the Convex dev server running while following the migration steps.

Install and configure the migrations component.

Add an authId field to your app users table. You can use any name you want, but keep in mind that this guide will refer to it as authId. The field should be optional for now, it can be changed to required later.

Create a convex/migrations.ts file and add migration functions. Two functions are added - one for adding the authId field to the app users table, and one for removing the userId field from the related Better Auth user. We'll run them in later steps.

If using Local Install, update the adapter exports to include the migrationRemoveUserId function.

Update user triggers to set the user authId field on creation, and use it to get the app user on update and delete.

Depending on how you're using Better Auth, you may or may not be using all of these triggers.

At this point, with the convex dev server running, your code is still functioning as it did prior to starting this guide, but is now also defining authId on every new user, so all new users moving forward will have an authId value.

This migration will backfill the authId field for previously existing users in your development deployment.

Before proceeding, make sure the migration was successful in your development deployment by running your application locally. Also confirm that the authId field on all users in your development deployment app user table is set.

The changes made so far, which are strictly additive and not destructive, should be deployed to production. The first migration will need to run there as well.

Deployment steps depend on how you deploy your app. Most apps deploy through Netlify or Vercel by merging changes to the main branch of their project repo.

With production succes

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npx convex dev
```

Example 2 (unknown):
```unknown
npm install @convex-dev/migrations
```

Example 3 (python):
```python
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";
import migrations from "@convex-dev/migrations/convex.config"; 

const app = defineApp();
app.use(betterAuth);
app.use(migrations); 

export default app;
```

Example 4 (unknown):
```unknown
export default defineSchema({
  users: defineTable({
    email: v.string(),
    authId: v.optional(v.string()), 
  })
    .index("email", ["email"])
    .index("authId", ["authId"]), 
  // ...
});
```

---

## App user id in component table

**URL:** https://convex-better-auth.netlify.app/migrations/migrate-userid/userid-in-component-table

**Contents:**
- App user id in component table
  - Run convex dev
  - Migrate to Local Install
  - Add userId field to component schema
  - Regenerate schema
  - Add setUserId mutation
  - Update user onCreate trigger
  - All set 🎉

Configure Better Auth to continue tracking app user id in component table

This guide shows one of two recommended strategies for migrating away from maintaining a user.userId field in the Better Auth user table. Read the overview for more information.

The migration guide covers basic required changes, but your application may have additional or altered requirements depending on how the Better Auth component is implemented. Be sure to review any auth related code for potential impacts. Avoid type assertions and checking for type errors is encouraged.

This guide is for configuring Better Auth to continue the existing behavior of tracking the app user id in the component table.

Keep the Convex dev server running while following the migration steps.

If you haven't already, follow the guide to migrate to Local Install.

Use Better Auth's additionalFields option to add the userId field to the component schema.

Regenerate the Better Auth schema to include the new userId field.

The component has a deprecated setUserId method, you'll want to create your own to replace it.

Update the user onCreate trigger to set the userId field on the Better Auth user.

Previous behavior is now configured manually, no changes in behavior should result.

Migrate off of user.userId

Migrate away from tracking user.userId in the component user table

Component user id in app table

Migrate user id reference from component to app table

**Examples:**

Example 1 (unknown):
```unknown
npx convex dev
```

Example 2 (javascript):
```javascript
export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) => {
  return betterAuth({
    user: {
      additionalFields: {
        userId: {
          type: "string",
          required: false,
        },
      },
    },
  });
};
```

Example 3 (unknown):
```unknown
cd convex/betterAuth && npx @better-auth/cli generate -y
```

Example 4 (javascript):
```javascript
export const setUserId = mutation({
  args: {
    authId: v.id("user"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.authId, {
      userId: args.userId,
    });
  },
});
```

---

## Migrate to 0.9

**URL:** https://convex-better-auth.netlify.app/migrations/migrate-to-0-9

**Contents:**
- Migrate to 0.9
- Upgrade component
  - Install dependencies
  - Regenerate schema (Local Install only)
  - Update onUpdate triggers
  - Use _id in database adapter
  - Migrate away from user.userId support
  - Migration guide

Migrate to @convex-dev/better-auth@0.9

This release includes breaking changes. Not following the migration steps correctly can lead to unexpected behavior.

Update Better Auth and the component.

Whenever updating Better Auth w/ Local Install, regenerate the schema.

Any triggers using the onUpdate hook should be updated to expect the new doc as the second parameter, and the old doc as the third parameter. The old doc parameter can be left out of the signature if not needed.

This isn't technically breaking since the database adapter api is not a part of the documented api surface, but any adapter usage referencing the id field should be updated to use _id instead.

Using the adapter directly is not unsafe, but it is not recommended. Results are not typesafe, and breaking changes may occur.

This step is not required for 0.9, but will be required in a future release.

Storing your app user id in the Better Auth user table is no longer required, and built in support for it is deprecated.

Migrate away from user.userId support

Type utilities for Better Auth

Migrate off of user.userId

Migrate away from tracking user.userId in the component user table

**Examples:**

Example 1 (unknown):
```unknown
npm install @convex-dev/better-auth@0.9
npm install better-auth@1.3.27 --save-exact
```

Example 2 (unknown):
```unknown
cd convex/betterAuth
npx @better-auth/cli generate -y
```

Example 3 (javascript):
```javascript
export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  triggers: {
    user: {
      onUpdate: async (ctx, oldDoc, newDoc) => { 
      onUpdate: async (ctx, newDoc, oldDoc) => { 
        // oldDoc can be left out of the signature if not needed
      },
    },
  },
});
```

Example 4 (javascript):
```javascript
export const getUserById = query({
  args: { authId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(components.betterAuth.adapter.findOne, {
      model: "user",
      where: [{ field: "id", value: args.authId }], 
      where: [{ field: "_id", value: args.authId }], 
    });
    return user;
  },
});
```

---

## Migrate off of user.userId

**URL:** https://convex-better-auth.netlify.app/migrations/migrate-userid

**Contents:**
- Migrate off of user.userId
- tl;dr
  - Why?
  - Do I need to do anything?
- Migration options
  - Keep current behavior
  - Migration guide
  - Track component user id in app table
  - Migration guide

Migrate away from tracking user.userId in the component user table

The Better Auth component has it's own user table. Your app may have it's own user table as well. These tables are related via the userId field in the Better Auth user table. The component facilitates this relationship as a special case, but is going to stop doing that in a future release.

Originally the component schema couldn't be configured. This is now possible through Local Install. Moving forward, keeping two user tables should be a project decision that is explicitly configured rather than a built in pattern that often brings confusion.

If your app has it's own user table and the userId field is populated in any of your betterAuth user table records, you will need to follow the migration guide below. Otherwise, you can ignore this guide.

If avoiding a data migration is the most important thing for you, this is the way to go.

If you want to maintain the current approach, you can configure Better Auth to do that. If you already use Local Install, want to continue keep using two user tables, and are fine with the app user id being tracked in the component user table, this will be the simplest approach.

Migrate user id reference to component table

If avoiding using Local Install is the most important thing for you, this is the way to go.

This is the generally recommended approach for apps that will continue using two app tables. It doesn't require Local Install. This approach involves migrating from tracking the app user id in the component to tracking the component user id in the app user table via an authId field.

A data migration is required to backfill the authId field.

Migrate user id reference to app table

Migrate to @convex-dev/better-auth@0.9

App user id in component table

Configure Better Auth to continue tracking app user id in component table

---
