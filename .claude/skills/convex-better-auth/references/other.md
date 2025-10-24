# Convex-Better-Auth - Other

**Pages:** 11

---

## Hono

**URL:** https://convex-better-auth.netlify.app/integrations/hono

**Contents:**
- Hono
- Configuration
- Add CORS support

Using Hono with Convex + Better Auth

If you prefer to work with Hono instead of the default HttpRouter, Hono can replace the default authComponent.registerRoutes() method. Check out the Convex w/ Hono Stack article and the Better Auth Hono docs for more details.

You'll need to install the convex-helpers package if you haven't already.

Required for client only / SPA installs like React/Vite.

Debugging Convex + Better Auth

Component client for Better Auth

**Examples:**

Example 1 (python):
```python
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

const http = new HttpRouterWithHono(app
...
```

Example 2 (python):
```python
import { Hono } from "hono";
import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
import { cors } from "hono/cors"; 
import { ActionCtx } from "./_generated/server";
import { createAuth } from "../lib/auth";

const app: HonoWithConvex<ActionCtx> = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: process.env.SITE_URL,
    allowHeaders: ["Content-Type", "Authorization", "Better-Auth-Cookie"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Set-Better-Auth-Cookie"],
    maxAge: 600,
    credentials: true,
  })
);

// ...
```

---

## Getting Started

**URL:** https://convex-better-auth.netlify.app

**Contents:**
- Getting Started
- Introduction
- Prerequisites
  - Create a Convex project
  - Run convex dev
- Select your framework

Getting Started with Better Auth and Convex

Convex + Better Auth is a Convex Component that provides an integration layer for using Better Auth with Convex.

To use Convex + Better Auth, you'll first need a Convex project. If you don't have one, run npm create convex@latest to get started, and check out the docs to learn more about Convex.

Running the cli during setup will initialize your Convex deployment if it doesn't already exist, and keeps generated types current through the process. Keep it running.

Installation steps vary by framework. Select yours to get started.

Install and configure Convex + Better Auth for React.

**Examples:**

Example 1 (unknown):
```unknown
npx convex dev
```

---

## Debugging

**URL:** https://convex-better-auth.netlify.app/debugging

**Contents:**
- Debugging
- Verbose logging
  - Backend
- Client side

Debugging Convex + Better Auth

Verbose logs from the Better Auth component can be enabled on the component constructor.

Verbose logs in the client can be enabled on the Convex client constructor.

Supported plugins for Convex + Better Auth

Using Hono with Convex + Better Auth

**Examples:**

Example 1 (javascript):
```javascript
export const authComponent = createClient(
  components.betterAuth,
  {
    verbose: true,
  }
);
```

Example 2 (javascript):
```javascript
// Replace this with your framework prefixed environment variable
// for your project's Convex cloud URL
const convexUrl = import.meta.env.PUBLIC_CONVEX_URL as string;
const convex = new ConvexReactClient(convexUrl, {
  verbose: true, 
});
```

---

## Basic Usage

**URL:** https://convex-better-auth.netlify.app/basic-usage

**Contents:**
- Basic Usage
- Better Auth guide
  - Exceptions
    - Server side authentication
    - Schemas and migrations
- Using server methods with auth.api
- Using Convex ctx in Better Auth config

Using Better Auth with Convex

Better Auth's basic usage guide applies to Convex as well. It covers signing in and out, social providers, plugins, and more. You will be using Better Auth directly in your project, so their guides are a primary reference.

There are a few areas in the Better Auth basic usage guide that work differently in Convex.

Better Auth supports signing users in and out through server side functions. Because Convex functions run over websockets and don't return HTTP responses or set cookies, signing up/in/out must be done from the client via authClient.signIn.* methods.

The basic usage guide includes information on database schema generation and migrations via the Better Auth CLI. This only applies for local installs, which support generating schemas. For projects not using local install, the default schema provided with the Better Auth component (preconfigured with the supported plugins) is used, and cannot be altered.

Better Auth's server side auth.api methods can be used with your createAuth function and the component headers method. Here's an example implementing the changePassword server method.

The ctx param passed in to the createAuth function is the Convex context object. This can be used to access the Convex database or Convex functions in your Better Auth config. It can be a query, mutation, or action context.

A common use case is sending emails for verification or password resets with the Resend component. resend.sendEmail will produce a type error because the ctx object could be a query ctx. The component provides type guards for this.

Install and configure Convex + Better Auth for Sveltekit.

Authorization with Better Auth

**Examples:**

Example 1 (javascript):
```javascript
export const updateUserPassword = mutation({
  args: {
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    // Many Better Auth server methods require a currently authenticated
    // user, so request headers have to be passed in so session cookies
    // can be parsed and validated. The `getAuth` method provides both the
    // auth object and headers for convenience.
    const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
    await auth.api.changePassword({
      body: {
        currentPassword: args.currentPassword,
   
...
```

Example 2 (python):
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

## Triggers

**URL:** https://convex-better-auth.netlify.app/features/triggers

**Contents:**
- Triggers
- Configuration

Run transactional callbacks when auth data changes

Triggers are a Convex-first approach to running mutations when your Better Auth data changes. Better Auth already supports this behavior for some tables through databaseHooks configuration, but database hooks cannot currently run in the same transaction as the original operation.

Triggers run in the same transaction as the original operation, and work on any table in your Better Auth schema.

To enable triggers, pass the triggers option to the component client config. A trigger config object has table names as keys, and each table name can be assigned an object with any of onCreate, onUpdate, or onDelete hooks. Throwing an error in a trigger will stop the original operation from committing.

A single Better Auth endpoint or auth.api call can perform multiple database interactions. Throwing an error in a trigger will only ensure the database operation that triggered will fail, but any previous operations will still commit.

Supported plugins for Convex + Better Auth

**Examples:**

Example 1 (python):
```python
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
        await ctx.db.insert("posts", {
          title: "Hello, world!",
          userId: doc._id,
        });
      },
      onUpdate: async (ctx, newDoc, oldDoc) 
...
```

---

## Getting Started

**URL:** https://convex-better-auth.netlify.app/

**Contents:**
- Getting Started
- Introduction
- Prerequisites
  - Create a Convex project
  - Run convex dev
- Select your framework

Getting Started with Better Auth and Convex

Convex + Better Auth is a Convex Component that provides an integration layer for using Better Auth with Convex.

To use Convex + Better Auth, you'll first need a Convex project. If you don't have one, run npm create convex@latest to get started, and check out the docs to learn more about Convex.

Running the cli during setup will initialize your Convex deployment if it doesn't already exist, and keeps generated types current through the process. Keep it running.

Installation steps vary by framework. Select yours to get started.

Install and configure Convex + Better Auth for React.

**Examples:**

Example 1 (unknown):
```unknown
npx convex dev
```

---

## Authorization

**URL:** https://convex-better-auth.netlify.app/basic-usage/authorization

**Contents:**
- Authorization
  - Showing UI based on authentication state
  - Authentication state in Convex functions

Authorization with Better Auth

You can control which UI is shown when the user is signed in or signed out using Convex's <Authenticated>, <Unauthenticated> and <AuthLoading> helper components. These components are powered by Convex's useConvexAuth() hook, which provides isAuthenticated and isLoading flags. This hook can be used directly if preferred.

It's important to use Convex's authentication state components or the useConvexAuth() hook instead of Better Auth's getSession() or useSession() when you need to check whether the user is logged in or not. Better Auth will reflect an authenticated user before Convex does, as the Convex client must subsequently validate the token provided by Better Auth. Convex functions that require authentication can throw if called before Convex has validated the token.

In the following example, the <Content /> component is a child of <Authenticated>, so its content and any of its child components are guaranteed to have an authenticated user, and Convex queries can require authentication.

If the client is authenticated, you can access the information stored in the JWT via ctx.auth.getUserIdentity.

If the client is not authenticated, ctx.auth.getUserIdentity will return null.

Make sure that the component calling this query is a child of <Authenticated> from convex/react, or that isAuthenticated from useConvexAuth() is true. Otherwise, it will throw on page load.

Using Better Auth with Convex

**Examples:**

Example 1 (python):
```python
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

export default App;
```

Example 2 (python):
```python
import { query } from "./_generated/server";

// You can get the current user from the auth component
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authComponent.getAuthUser(ctx);
  },
});

// You can also just get the authenticated user id as you
// normally would from ctx.auth.getUserIdentity
export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("me
...
```

---

## Local Install

**URL:** https://convex-better-auth.netlify.app/features/local-install

**Contents:**
- Local Install
- Installation
  - Create the component definition
  - Generate the schema
  - Export adapter functions
  - Update component registration
  - Update component config
  - You're done!
- Usage
  - Updating the schema

Local install gives you full control over your Better Auth schema, allows schema related configuration to work, and makes it possible to use plugins beyond those supported for Convex + Better Auth. It also allows you to write Convex functions that directly access Better Auth component tables.

With this approach, the Better Auth plugin is defined in it's own Convex subdirectory. Installation is a bit different from the default approach, and includes a schema generation step via Better Auth CLI, similar to the installation experience with other providers.

Before you begin, follow the Getting Started guide to set up Convex + Better Auth for your project. Then return here to walk through converting the default install to a local install.

Create a convex/betterAuth/convex.config.ts file to define the component. This will signal to Convex that the convex/betterAuth directory is a locally installed component.

Add a static auth export to the convex/betterAuth/auth.ts file.

Generate the schema for the component.

Export adapter functions for the component.

Update component registration to use the locally installed component.

Update the component client config to use the local schema.

The Better Auth component and schema are now locally defined in your Convex project.

Certain options changes may require schema generation. The Better Auth docs will often note when this is the case. To regenerate the schema at any time (as it's generally safe to do), move into the component directory and run the Better Auth CLI generate command.

Some database interactions through Better Auth may run queries that don't use an index. The Better Auth component automatically selects a suitable index for a given query if one exists, and will log a warning indicating what index should be added.

Custom indexes can be added by generating the schema to a secondary file, importing it convex/betterAuth/schema.ts and adding the indexes. This way custom indexes aren't overwritten when the schema is regenerated.

Schema table names and fields should not be customized directly, as any customizations won't match your Better Auth configuration, and will be overwritten when the schema is regenerated. Instead, Better Auth schema can be customized through options.

Generate the schema to a secondary file.

Delete the contents of schema.ts and replace with table definitions from the generated schema.

Convex functions within your Better Auth component directory can access the component's tables

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { defineComponent } from "convex/server";

const component = defineComponent("betterAuth");

export default component;
```

Example 2 (python):
```python
import { createAuth } from '../auth'
import { getStaticAuth } from '@convex-dev/better-auth'

// Export a static instance for Better Auth schema generation
export const auth = getStaticAuth(createAuth)
```

Example 3 (unknown):
```unknown
cd convex/betterAuth
npx @better-auth/cli generate -y
```

Example 4 (python):
```python
import { createApi } from "@convex-dev/better-auth";
import schema from "./schema";
import { createAuth } from "../auth";

export const {
  create,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
} = createApi(schema, createAuth);
```

---

## Triggers

**URL:** https://convex-better-auth.netlify.app/triggers

**Contents:**
- Triggers
- Configuration

Run transactional callbacks when auth data changes

Triggers are a Convex-first approach to running mutations when your Better Auth data changes. Better Auth already supports this behavior for some tables through databaseHooks configuration, but database hooks cannot currently run in the same transaction as the original operation.

Triggers run in the same transaction as the original operation, and work on any table in your Better Auth schema.

To enable triggers, pass the triggers option to the component client config. A trigger config object has table names as keys, and each table name can be assigned an object with any of onCreate, onUpdate, or onDelete hooks. Throwing an error in a trigger will stop the original operation from committing.

A single Better Auth endpoint or auth.api call can perform multiple database interactions. Throwing an error in a trigger will only ensure the database operation that triggered will fail, but any previous operations will still commit.

Supported plugins for Convex + Better Auth

**Examples:**

Example 1 (python):
```python
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
        await ctx.db.insert("posts", {
          title: "Hello, world!",
          userId: doc._id,
        });
      },
      onUpdate: async (ctx, newDoc, oldDoc) 
...
```

---

## Supported Plugins

**URL:** https://convex-better-auth.netlify.app/supported-plugins

**Contents:**
- Supported Plugins
- Supported plugins
  - Incompatible plugins

Supported plugins for Convex + Better Auth

Any Better Auth plugin may be used with Convex + Better Auth, but only a subset are considered supported for the integration. Convex + Better Auth works out of the box for these without any required schema changes.

For plugins that require schema changes and aren't in the list, check out Local Install.

Official Better Auth plugins that are incompatible with Convex + Better Auth (even when Local Install is used):

Run transactional callbacks when auth data changes

Debugging Convex + Better Auth

---

## Local Install

**URL:** https://convex-better-auth.netlify.app/local-install

**Contents:**
- Local Install
- Installation
  - Create the component definition
  - Generate the schema
  - Export adapter functions
  - Update component registration
  - Update component config
  - You're done!
- Usage
  - Updating the schema

Local install gives you full control over your Better Auth schema, allows schema related configuration to work, and makes it possible to use plugins beyond those supported for Convex + Better Auth. It also allows you to write Convex functions that directly access Better Auth component tables.

With this approach, the Better Auth plugin is defined in it's own Convex subdirectory. Installation is a bit different from the default approach, and includes a schema generation step via Better Auth CLI, similar to the installation experience with other providers.

Before you begin, follow the Getting Started guide to set up Convex + Better Auth for your project. Then return here to walk through converting the default install to a local install.

Create a convex/betterAuth/convex.config.ts file to define the component. This will signal to Convex that the convex/betterAuth directory is a locally installed component.

Add a static auth export to the convex/betterAuth/auth.ts file.

Generate the schema for the component.

Export adapter functions for the component.

Update component registration to use the locally installed component.

Update the component client config to use the local schema.

The Better Auth component and schema are now locally defined in your Convex project.

Certain options changes may require schema generation. The Better Auth docs will often note when this is the case. To regenerate the schema at any time (as it's generally safe to do), move into the component directory and run the Better Auth CLI generate command.

Some database interactions through Better Auth may run queries that don't use an index. The Better Auth component automatically selects a suitable index for a given query if one exists, and will log a warning indicating what index should be added.

Custom indexes can be added by generating the schema to a secondary file, importing it convex/betterAuth/schema.ts and adding the indexes. This way custom indexes aren't overwritten when the schema is regenerated.

Schema table names and fields should not be customized directly, as any customizations won't match your Better Auth configuration, and will be overwritten when the schema is regenerated. Instead, Better Auth schema can be customized through options.

Generate the schema to a secondary file.

Delete the contents of schema.ts and replace with table definitions from the generated schema.

Convex functions within your Better Auth component directory can access the component's tables

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { defineComponent } from "convex/server";

const component = defineComponent("betterAuth");

export default component;
```

Example 2 (python):
```python
import { createAuth } from '../auth'
import { getStaticAuth } from '@convex-dev/better-auth'

// Export a static instance for Better Auth schema generation
export const auth = getStaticAuth(createAuth)
```

Example 3 (unknown):
```unknown
cd convex/betterAuth
npx @better-auth/cli generate -y
```

Example 4 (python):
```python
import { createApi } from "@convex-dev/better-auth";
import schema from "./schema";
import { createAuth } from "../auth";

export const {
  create,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
} = createApi(schema, createAuth);
```

---
