# Tanstack-Start - Start

**Pages:** 32

---

## Observability

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/observability

**Contents:**
- Partner Solution: Sentry
- Built-in Observability Patterns
  - Server Function Logging
  - Request/Response Middleware
  - Route Performance Monitoring
  - Health Check Endpoints
  - Error Boundaries
  - Performance Metrics Collection
  - Debug Headers for Development
  - Environment-Specific Logging

Observability is a critical aspect of modern web development, enabling you to monitor, trace, and debug your application's performance and errors. TanStack Start provides built-in patterns for observability and integrates seamlessly with external tools to give you comprehensive insights into your application.

For comprehensive observability, we recommend Sentry - our trusted partner for error tracking and performance monitoring. Sentry provides:

Get started with Sentry → | View integration example →

TanStack Start's architecture provides several opportunities for built-in observability without external dependencies:

Add logging to your server functions to track execution, performance, and errors:

Create middleware to log all requests and responses:

Track route loading performance on both client and server:

Create server routes for health monitoring:

Implement comprehensive error handling:

Collect and expose basic performance metrics:

Add helpful debug information to responses:

Configure different logging strategies for development vs production:

Basic error reporting without external dependencies:

While TanStack Start provides built-in observability patterns, external tools offer more comprehensive monitoring:

Application Performance Monitoring:

Analytics & User Behavior:

OpenTelemetry is the industry standard for observability. Here's an experimental approach to integrate it with TanStack Start:

Note: The above OpenTelemetry integration is experimental and requires manual setup. We're exploring first-class OpenTelemetry support that would provide automatic instrumentation for server functions, middleware, and route loaders.

Most observability tools follow a similar integration pattern with TanStack Start:

Direct OpenTelemetry support is coming to TanStack Start, which will provide automatic instrumentation for server functions, middleware, and route loaders without the manual setup shown above.

**Examples:**

Example 1 (python):
```python
// Client-side (app.tsx)
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

Example 2 (python):
```python
// Client-side (app.tsx)
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

Example 3 (python):
```python
// Client-side (app.tsx)
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

Example 4 (python):
```python
// Client-side (app.tsx)
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

---

## Quick Start

**URL:** https://tanstack.com/start/latest/docs/framework/react/quick-start

**Contents:**
- Impatient?
- Examples
  - Stackblitz
  - Quick Deploy
  - Manual Deploy
- Other Router Examples

The fastest way to get a Start project up and running is with the cli. Just run

depending on your package manage of choice. You'll be prompted to add things like Tailwind, eslint, and a ton of other options.

You can also clone and run the Basic example right away with the following commands:

If you'd like to use a different example, you can replace start-basic above with the slug of the example you'd like to use from the list below.

Once you've cloned the example you want, head back to the Routing guide to learn how to use TanStack Start!

TanStack Start has load of examples to get you started. Pick one of the examples below to get started!

Each example above has an embedded stackblitz preview to find the one that feels like a good starting point

To quickly deploy an example, click the Deploy to Netlify button on an example's page to both clone and deploy the example to Netlify.

To manually clone and deploy the example to anywhere else you'd like, use the following commands replacing EXAMPLE_SLUG with the slug of the example you'd like to use from above:

Once you've clone or deployed an example, head back to the Routing guide to learn how to use TanStack Start!

While not Start-specific examples, these may help you understand more about how TanStack Router works:

**Examples:**

Example 1 (unknown):
```unknown
pnpm create @tanstack/react-start@latest
```

Example 2 (unknown):
```unknown
pnpm create @tanstack/react-start@latest
```

Example 3 (unknown):
```unknown
pnpm create @tanstack/react-start@latest
```

Example 4 (unknown):
```unknown
pnpm create @tanstack/react-start@latest
```

---

## Calling an external API using TanStack Start

**URL:** https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

**Contents:**
- What You'll Learn
- Prerequisites
- Nice to know
- Setting up a TanStack Start Project
- Understanding the Project Structure
- Step 1: Setup a .env file with TMDB_AUTH_TOKEN
- Step 2: Defining Data Types
- Step 3: Creating the Route with API Fetch Function
- Step 4: Building the Movie Components
- Step 5: Creating the MoviesPage Component

This guide demonstrates how to integrate external API calls into your TanStack Start application using route loaders. We will use TMDB API to fetch popular movies using TanStack Start and understand how to fetch data in a TanStack Start app.

The complete code for this tutorial is available on GitHub.

First, let's create a new TanStack Start project:

When this script runs, it will ask you a few setup questions. You can either pick choices that work for you or just press enter to accept the defaults.

Optionally, you can pass in a --add-on flag to get options such as Shadcn, Clerk, Convex, TanStack Query, etc.

Once setup is complete, install dependencies and start the development server:

At this point, the project structure should look like this:

Once your project is set up, you can access your app at localhost:3000. You should see the default TanStack Start welcome page.

To fetch movies from the TMDB API, you need an authentication token. You can get this for free at themoviedb.org.

First, let's set up environment variables for our API key. Create a .env file in your project root:

Add your TMDB API token to this file:

Important: Make sure to add .env to your .gitignore file to keep your API keys secure.

Let's create TypeScript interfaces for our movie data. Create a new file at src/types/movie.ts:

Now let's create our route that fetches data from the TMDB API. Create a new file at src/routes/fetch-movies.tsx:

Now let's create the components that will display our movie data. Add these components to the same fetch-movies.tsx file:

Finally, let's create the main component that consumes the loader data:

Let's break down how the different parts of our application work together:

Now you can test your application by visiting http://localhost:3000/fetch-movies. If everything is set up correctly, you should see a grid of popular movies with their posters, titles, and ratings. Your app should look like this:

You've successfully built a movie discovery app that integrates with an external API using TanStack Start. This tutorial demonstrated how to use route loaders for server-side data fetching and building UI components with external data.

While fetching data at build time in TanStack Start is perfect for static content like blog posts or product pages, it's not ideal for interactive apps. If you need features like real-time updates, caching, or infinite scrolling, you'll want to use TanStack Query on the client side instead. TanStack Query makes it

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
pnpx create-start-app movie-discovery
cd movie-discovery
```

Example 2 (unknown):
```unknown
pnpx create-start-app movie-discovery
cd movie-discovery
```

Example 3 (unknown):
```unknown
pnpx create-start-app movie-discovery
cd movie-discovery
```

Example 4 (unknown):
```unknown
pnpx create-start-app movie-discovery
cd movie-discovery
```

---

## Building a Full Stack DevJokes App with TanStack Start

**URL:** https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file

**Contents:**
- What You'll Learn
- Prerequisites
- Nice to know
- Setting up a TanStack Start Project
- Understanding the project structure
- Step 1: Reading Data From a File
  - Step 1.1: Create a JSON File with Jokes
  - Step 1.2: Create Types for Our Data
  - Step 1.3: Create Server Functions to Read the File
  - Step 1.4: Consume Server Function on the Client Side

This tutorial will guide you through building a complete full-stack application using TanStack Start. You'll create a DevJokesapp where users can view and add developer-themed jokes, demonstrating key concepts of TanStack Start including server functions, file-based data storage, and React components.

Here's a demo of the app in action:

The complete code for this tutorial is available on GitHub.

First, let's create a new TanStack Start project:

When this script runs, it will ask you a few setup questions. You can either pick choices that work for you or just press enter to accept the defaults.

Optionally, you can pass in a --add-on flag to get options such as Shadcn, Clerk, Convex, TanStack Query, etc.

Once setup is complete, install dependencies and start the development server:

For this project, we'll need a few additional packages:

At this point, the project structure should look like this -

This structure might seem overwhelming at first, but here are the key files you need to focus on:

Once your project is set up, you can access your app at localhost:3000. You should see the default TanStack Start welcome page.

At this point, your app will look like this -

Let's start by creating a file-based storage system for our jokes.

Let's set up a list of jokes that we can use to render on the page. Create a data directory in your project root and a jokes.json file within it:

Now, let's add some sample jokes to this file:

Let's create a file to define our data types. Create a new file at src/types/index.ts:

Let's create a new file src/serverActions/jokesActions.ts to create a server function to perform a read-write operation. We will be creating a server function using createServerFn.

In this code, we are using createServerFn to create a server function that reads the jokes from the JSON file. The handler function is where we are using the fs module to read the file.

Now to consume this server function, we can simply call it in our code using TanStack Router which already comes with TanStack Start!

Now let's create a new component JokesList to render the jokes on the page with a little Tailwind styling sprinkle.

Now let's call our server function inside App.jsx using TanStack Router which already comes with TanStack Start!

When the page loads, jokes will have data from the jokes.json file already!

With a little Tailwind styling, the app should look like this:

So far, we have been able to read from the file successfully! We can use the same

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
pnpx create-start-app devjokes
cd devjokes
```

Example 2 (unknown):
```unknown
pnpx create-start-app devjokes
cd devjokes
```

Example 3 (unknown):
```unknown
pnpx create-start-app devjokes
cd devjokes
```

Example 4 (unknown):
```unknown
pnpx create-start-app devjokes
cd devjokes
```

---

## Migrate from Next.js

**URL:** https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js

**Contents:**
- Step-by-Step (Basics)
  - Prerequisites
  - 1. Remove Next.js
  - 2. Install Required Dependencies
  - 3. Update Project Configuration
  - 4. Adapt the Root Layout
  - 5. Adapt the Home Page
  - 6. Are we migrated yet?
  - 7. Verify the Migration
- Next Steps (Advanced)

This guide provides a step-by-step process to migrate a project from the Next.js App Router to TanStack Start. We respect the powerful features of Next.js and aim to make this transition as smooth as possible.

This step-by-step guide provides an overview of how to migrate your Next.js App Router project to TanStack Start. The goal is to help you understand the basic steps involved in the migration process so you can adapt them to your specific project needs.

Before we begin, this guide assumes your project structure looks like this:

Alternatively, you can follow along by cloning the following starter template:

This structure is a basic Next.js application using the App Router, which we will migrate to TanStack Start.

First, uninstall Next.js and remove related configuration files:

TanStack Start leverages Vite and TanStack Router:

For Tailwind CSS and resolving imports using path aliases:

Now that you've installed the necessary dependencies, update your project configuration files to work with TanStack Start.

By default, routesDirectory is set to routes. To maintain consistency with Next.js App Router conventions, you can set it to app instead.

TanStack Start uses a routing approach similar to Remix, with some changes to support nested structures and special features using tokens. Learn more about it at Routing Concepts guide.

Instead of layout.tsx, create a file named __root.tsx in the src/app directory. This file will serve as the root layout for your application.

Instead of page.tsx, create an index.tsx file for the / route.

Before you can run the development server, you need to create a file that will define the behavior of TanStack Router within TanStack Start.

🧠 Here you can configure everything from the default preloading functionality to caching staleness.

Don't worry if you see some TypeScript errors at this point; the next step will resolve them.

Run the development server:

Then, visit http://localhost:3000. You should see the TanStack Start welcome page with its logo and a documentation link.

If you encounter issues, review the steps above and ensure that file names and paths match exactly. For a reference implementation, see the post-migration repository.

Now that you have migrated the basic structure of your Next.js application to TanStack Start, you can explore more advanced features and concepts.

Learn more about the Routing Concepts.

Retrieving dynamic route parameters in TanStack Start is straightforward.

Note: If you

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
└── tsconfig.json
```

Example 2 (unknown):
```unknown
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
└── tsconfig.json
```

Example 3 (unknown):
```unknown
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
└── tsconfig.json
```

Example 4 (unknown):
```unknown
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
└── tsconfig.json
```

---

## Hosting

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/hosting

**Contents:**
- What should I use?
- Deployment
  - Cloudflare Workers ⭐ Official Partner
  - Netlify ⭐ Official Partner
  - Netlify
  - Nitro
    - Using Nitro v2
    - Using Nitro v3 (ALPHA)
  - Vercel
  - Node.js / Railway / Docker

Hosting is the process of deploying your application to the internet so that users can access it. This is a critical part of any web development project, ensuring your application is available to the world. TanStack Start is built on Vite, a powerful dev/build platform that allows us to make it possible to deploy your application to any hosting provider.

TanStack Start is designed to work with any hosting provider, so if you already have a hosting provider in mind, you can deploy your application there using the full-stack APIs provided by TanStack Start.

However, since hosting is one of the most crucial aspects of your application's performance, reliability, and scalability, we recommend using one of our Official Hosting Partners: Cloudflare or Netlify.

The page is still a work in progress. We'll keep updating this page with guides on deployment to different hosting providers soon!

Once you've chosen a deployment target, you can follow the deployment guidelines below to deploy your TanStack Start application to the hosting provider of your choice:

When deploying to Cloudflare Workers, you'll need to complete a few extra steps before your users can start using your app.

To check current user use wrangler whoami.

Deploy your application to Cloudflare Workers using their one-click deployment process, and you're ready to go!

A full TanStack Start example for Cloudflare Workers is available here.

Install and add the @netlify/vite-plugin-tanstack-start plugin, which configures your build for Netlify deployment and provides full Netlify production platform emulation in local dev.

Add a netlify.toml file to your project root:

Deploy your application using their one-click deployment process, and you're ready to go!

Nitro is an abstraction layer that allows you to deploy TanStack Start applications to a wide range of providers.

⚠️ During TanStack Start 1.0 release candidate phase, we currently recommend using:

⚠️ @tanstack/nitro-v2-vite-plugin is a temporary compatibility plugin for using Nitro v2 as the underlying build tool for TanStack Start. Use this plugin if you experience issues with the Nitro v3 plugin. It does not support all of Nitro v3's features and is limited in its dev server capabilities, but should work as a safe fallback, even for production deployments for those who were using TanStack Start's alpha/beta versions.

⚠️ The nitro vite plugin is an official ALPHA plugin from the Nitro team for using Nitro v3 as the underlying build tool

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
pnpm add -D @cloudflare/vite-plugin wrangler
```

Example 2 (unknown):
```unknown
pnpm add -D @cloudflare/vite-plugin wrangler
```

Example 3 (unknown):
```unknown
pnpm add -D @cloudflare/vite-plugin wrangler
```

Example 4 (unknown):
```unknown
pnpm add -D @cloudflare/vite-plugin wrangler
```

---

## Middleware

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/middleware

**Contents:**
- What is Middleware?
  - What kinds of things can I do with Middleware?
- Middleware Types
  - Key Differences
- Core Concepts
  - Middleware Composition
  - Progressing the Middleware Chain
- Request Middleware
  - Available Methods
  - The .server method

Middleware allows you to customize the behavior of both server routes like GET/POST/etc (including requests to SSR your application) and server functions created with createServerFn. Middleware is composable and can even depend on other middleware to create a chain of operations that are executed hierarchically and in order.

There are two types of middleware: request middleware and server function middleware.

Server function middleware is a subset of request middleware that has extra functionality specifically for server functions like being able to validate input data or perform client-side logic both before and after the server function is executed.

Request middleware cannot depend on server function middleware, but server function middleware can depend on request middleware.

All middleware is composable, which means that one middleware can depend on another middleware.

Middleware is next-able, which means that you must call the next function in the .server method (and/or .client method if you are creating a server function middleware) to execute the next middleware in the chain. This allows you to:

Request middleware is used to customize the behavior of any server request that passes through it, including server routes, SSR and server functions.

To create a request middleware, call the createMiddleware function. You may call this function with the type property set to 'request', but this is the default value so you can omit it if you'd like.

Request middleware has the following methods:

The .server method is used to define server-side logic that the middleware will execute before any nested middleware, and also provide the result to the next middleware. It receives the next method and other things like context and the request object:

To quickly visualize this handshake, here is a diagram:

You can use request middleware with server routes in two ways:

To have a server route use middleware for all methods, pass a middleware array to the middleware property of the method builder object.

You can pass middleware to specific server route methods by using the createHandlers utility and passing a middleware array to the middleware property of the method object.

Server function middleware is a subset of request middleware that has extra functionality specifically for server functions like being able to validate input data or perform client-side logic both before and after the server function is executed.

To create a server function middleware, cal

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

Example 2 (python):
```python
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

Example 3 (python):
```python
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

Example 4 (python):
```python
import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware().server(() => {
  //...
})

const authMiddleware = createMiddleware()
  .middleware([loggingMiddleware])
  .server(() => {
    //...
  })
```

---

## 

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/error-boundaries

**Contents:**
- Error Boundaries (React Start)
  - Configure a default
  - Per-route override

TanStack Start uses TanStack Router's route-level error boundaries.

**Examples:**

Example 1 (python):
```python
// src/router.tsx
import { createRouter, ErrorComponent } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // Shown when an error bubbles to the router
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
  })
  return router
}
```

Example 2 (python):
```python
// src/router.tsx
import { createRouter, ErrorComponent } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // Shown when an error bubbles to the router
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
  })
  return router
}
```

Example 3 (python):
```python
// src/router.tsx
import { createRouter, ErrorComponent } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // Shown when an error bubbles to the router
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
  })
  return router
}
```

Example 4 (python):
```python
// src/router.tsx
import { createRouter, ErrorComponent } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // Shown when an error bubbles to the router
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
  })
  return router
}
```

---

## Code Execution Patterns

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns

**Contents:**
- Quick Start
- Implementation Patterns
  - Progressive Enhancement
  - Environment-Aware Storage
- Common Problems
  - Environment Variable Exposure
  - Incorrect Loader Assumptions
  - Hydration Mismatches
- Production Checklist
- Related Resources

This guide covers patterns for controlling where code runs in your TanStack Start application - server-only, client-only, or isomorphic (both environments). For foundational concepts, see the Execution Model guide.

Set up execution boundaries in your TanStack Start application:

**Examples:**

Example 1 (python):
```python
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/react-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()

...
```

Example 2 (python):
```python
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/react-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()

...
```

Example 3 (python):
```python
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/react-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()

...
```

Example 4 (python):
```python
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/react-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()

...
```

---

## SPA mode

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode

**Contents:**
- What the heck is SPA mode?
- Why use Start without SSR?
- Benefits of SPA mode
- Caveats of SPA mode
- How does it work?
- Configuring SPA mode
- Use Necessary Redirects
- Basic Redirects Example
- Allowing Server Functions and Server Routes
- Shell Mask Path

For applications that do not require SSR for either SEO, crawlers, or performance reasons, it may be desirable to ship static HTML to your users containing the "shell" of your application (or even prerendered HTML for specific routes) that contain the necessary html, head, and body tags to bootstrap your application only on the client.

No SSR doesn't mean giving up server-side features! SPA modes actually pair very nicely with server-side features like server functions and/or server routes or even other external APIs. It simply means that the initial document will not contain the fully rendered HTML of your application until it has been rendered on the client using JavaScript.

After enabling the SPA mode, running a Start build will have an additional prerendering step afterwards to generate the shell. This is done by:

Other routes may also be prerendered and it is recommended to prerender as much as you can in SPA mode, but this is not required for SPA mode to work.

To configure SPA mode, there are a few options you can add to your Start plugin's options:

Deploying a purely client-side SPA to a host or CDN often requires the use of redirects to ensure that urls are properly rewritten to the SPA shell. The goal of any deployment should include these priorities in this order:

Let's use Netlify's _redirects file to rewrite all 404 requests to the SPA shell.

Again, using Netlify's _redirects file, we can allow-list specific subpaths to be routed through to the server.

The default pathname used to generate the SPA shell is /. We call this the shell mask path. Since matched routes are not included, the pathname used to generate the shell is mostly irrelevant, but it's still configurable.

It's recommended to keep the default value of / as the shell mask path.

The prerender option is used to configure the prerendering behavior of the SPA shell, and accepts the same prerender options as found in our prerendering guide.

By default, the following prerender options are set:

This means that by default, the shell will not be crawled for links to follow for additional prerendering, and will not retry prerendering fails.

You can always override these options by providing your own prerender options:

Customizing the HTML output of the SPA shell can be useful if you want to:

To make this process simple, an isShell() function can be found on the router instance:

You can use this boolean to conditionally render different UI based on whether the current route is

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
// vite.config.ts
export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
  ],
})
```

Example 2 (unknown):
```unknown
// vite.config.ts
export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
  ],
})
```

Example 3 (unknown):
```unknown
// vite.config.ts
export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
  ],
})
```

Example 4 (unknown):
```unknown
// vite.config.ts
export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
  ],
})
```

---

## Databases

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/databases

**Contents:**
- What should I use?
- How simple is it to use a database with TanStack Start?
- Recommended Database Providers
- What is Neon?
- What is Convex?
- What is Prisma Postgres?
- Documentation & APIs

Databases are at the core of any dynamic application, providing the necessary infrastructure to store, retrieve, and manage data. TanStack Start makes it easy to integrate with a variety of databases, offering a flexible approach to managing your application's data layer.

TanStack Start is designed to work with any database provider, so if you already have a preferred database system, you can integrate it with TanStack Start using the provided full-stack APIs. Whether you're working with SQL, NoSQL, or other types of databases, TanStack Start can handle your needs.

Using a database with TanStack Start is as simple as calling into your database's adapter/client/driver/service from a TanStack Start server function or server route.

Here's an abstract example of how you might connect with a database and read/write to it:

This is obviously contrived, but it demonstrates that you can use literally any database provider with TanStack Start as long as you can call into it from a server function or server route.

While TanStack Start is designed to work with any database provider, we highly recommend considering one of our vetted partner database providers Neon or Convex. They have been vetted by TanStack to match our quality, openness, and performance standards and are both excellent choices for your database needs.

Neon is a fully managed serverless PostgreSQL with a generous free tier. It separates storage and compute to offer autoscaling, branching, and bottomless storage. With Neon, you get all the power and reliability of PostgreSQL combined with modern cloud capabilities, making it perfect for TanStack Start applications.

Key features that make Neon stand out:

Convex is a powerful, serverless database platform that simplifies the process of managing your application's data. With Convex, you can build full-stack applications without the need to manually manage database servers or write complex queries. Convex provides a real-time, scalable, and transactional data backend that seamlessly integrates with TanStack Start, making it an excellent choice for modern web applications.

Convex's declarative data model and automatic conflict resolution ensure that your application remains consistent and responsive, even at scale. It's designed to be developer-friendly, with a focus on simplicity and productivity.

Instant Postgres, Zero Setup: Get a production-ready Postgres database in seconds, then dive straight back into code. We handle connections, scaling, a

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { createServerFn } from '@tanstack/react-start'

const db = createMyDatabaseClient()

export const getUser = createServerFn(async ({ ctx }) => {
  const user = await db.getUser(ctx.userId)
  return user
})

export const createUser = createServerFn(async ({ ctx, input }) => {
  const user = await db.createUser(input)
  return user
})
```

Example 2 (python):
```python
import { createServerFn } from '@tanstack/react-start'

const db = createMyDatabaseClient()

export const getUser = createServerFn(async ({ ctx }) => {
  const user = await db.getUser(ctx.userId)
  return user
})

export const createUser = createServerFn(async ({ ctx, input }) => {
  const user = await db.createUser(input)
  return user
})
```

Example 3 (python):
```python
import { createServerFn } from '@tanstack/react-start'

const db = createMyDatabaseClient()

export const getUser = createServerFn(async ({ ctx }) => {
  const user = await db.getUser(ctx.userId)
  return user
})

export const createUser = createServerFn(async ({ ctx, input }) => {
  const user = await db.createUser(input)
  return user
})
```

Example 4 (python):
```python
import { createServerFn } from '@tanstack/react-start'

const db = createMyDatabaseClient()

export const getUser = createServerFn(async ({ ctx }) => {
  const user = await db.getUser(ctx.userId)
  return user
})

export const createUser = createServerFn(async ({ ctx, input }) => {
  const user = await db.createUser(input)
  return user
})
```

---

## Selective Server-Side Rendering (SSR)

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr

**Contents:**
- What is Selective SSR?
- How does this compare to SPA mode?
- Configuration
  - ssr: true
  - ssr: false
  - ssr: 'data-only'
  - Functional Form
  - Inheritance
- Fallback Rendering
- How to disable SSR of the root route?

In TanStack Start, routes matching the initial request are rendered on the server by default. This means beforeLoad and loader are executed on the server, followed by rendering the route components. The resulting HTML is sent to the client, which hydrates the markup into a fully interactive application.

However, there are cases where you might want to disable SSR for certain routes or all routes, such as:

TanStack Start's Selective SSR feature lets you configure:

TanStack Start's SPA mode completely disables server-side execution of beforeLoad and loader, as well as server-side rendering of route components. Selective SSR allows you to configure server-side handling on a per-route basis, either statically or dynamically.

You can control how a route is handled during the initial server request using the ssr property. If this property is not set, it defaults to true. You can change this default using the defaultSsr option in createStart:

This is the default behavior unless otherwise configured. On the initial request, it will:

This disables server-side:

This hybrid option will:

For more flexibility, you can use the functional form of the ssr property to decide at runtime whether to SSR a route:

The ssr function runs only on the server during the initial request and is stripped from the client bundle.

search and params are passed in after validation as a discriminated union:

If validation fails, status will be error and error will contain the failure details. Otherwise, status will be success and value will contain the validated data.

At runtime, a child route inherits the Selective SSR configuration of its parent. However, the inherited value can only be changed to be more restrictive (i.e. true to data-only or false and data-only to false). For example:

For the first route with ssr: false or ssr: 'data-only', the server will render the route's pendingComponent as a fallback. If pendingComponent isn't configured, the defaultPendingComponent will be rendered. If neither is configured, no fallback will be rendered.

On the client during hydration, this fallback will be displayed for at least minPendingMs (or defaultPendingMinMs if not configured), even if the route doesn't have beforeLoad or loader defined.

You can disable server side rendering of the root route component, however the <html> shell still needs to be rendered on the server. This shell is configured via the shellComponent property and takes a single property children. The shellCompo

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// src/start.ts
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  // Disable SSR by default
  defaultSsr: false,
}))
```

Example 2 (python):
```python
// src/start.ts
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  // Disable SSR by default
  defaultSsr: false,
}))
```

Example 3 (python):
```python
// src/start.ts
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  // Disable SSR by default
  defaultSsr: false,
}))
```

Example 4 (python):
```python
// src/start.ts
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  // Disable SSR by default
  defaultSsr: false,
}))
```

---

## Tailwind CSS Integration

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration

**Contents:**
- Tailwind CSS Version 4 (Latest)
  - Install Tailwind CSS
  - Configure The Vite Plugin
  - Import Tailwind in your CSS file
- Import the CSS file in your __root.tsx file
- Use Tailwind CSS anywhere in your project
- Tailwind CSS Version 3 (Legacy)
  - Install Tailwind CSS
  - Configure your template paths
  - Add the Tailwind directives to your CSS file

So you want to use Tailwind CSS in your TanStack Start project?

This guide will help you use Tailwind CSS in your TanStack Start project.

The latest version of Tailwind CSS is 4. And it has some configuration changes that majorly differ from Tailwind CSS Version 3. It's easier and recommended to set up Tailwind CSS Version 4 in a TanStack Start project, as TanStack Start uses Vite as its build tool.

Install Tailwind CSS and it's Vite plugin.

Add the @tailwindcss/vite plugin to your Vite configuration.

You need to create a CSS file to configure Tailwind CSS instead of the configuration file in version 4. You can do this by creating a src/styles/app.css file or name it whatever you want.

Import the CSS file in your __root.tsx file with the ?url query and make sure to add the triple slash directive to the top of the file.

You can now use Tailwind CSS anywhere in your project.

That's it! You can now use Tailwind CSS anywhere in your project 🎉.

If you are want to use Tailwind CSS Version 3, you can use the following steps.

Install Tailwind CSS and it's peer dependencies.

Then generate the Tailwind and PostCSS configuration files.

Add the paths to all of your template files in the tailwind.config.js file.

Add the @tailwind directives for each of Tailwind's layers to your src/styles/app.css file.

Jump to Import the CSS file in your __root.tsx file to see how to import the CSS file in your __root.tsx file.

**Examples:**

Example 1 (unknown):
```unknown
npm install tailwindcss @tailwindcss/vite
```

Example 2 (unknown):
```unknown
npm install tailwindcss @tailwindcss/vite
```

Example 3 (unknown):
```unknown
npm install tailwindcss @tailwindcss/vite
```

Example 4 (unknown):
```unknown
npm install tailwindcss @tailwindcss/vite
```

---

## Server Functions

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

**Contents:**
- What are Server Functions?
- Basic Usage
- Where to Call Server Functions
- Parameters & Validation
  - Basic Parameters
  - Validation with Zod
  - Form Data
- Error Handling & Redirects
  - Basic Errors
  - Redirects

Server functions let you define server-only logic that can be called from anywhere in your application - loaders, components, hooks, or other server functions. They run on the server but can be invoked from client code seamlessly.

Server functions provide server capabilities (database access, environment variables, file system) while maintaining type safety across the network boundary.

Server functions are created with createServerFn() and can specify HTTP method:

Call server functions from:

Server functions accept a single data parameter. Since they cross the network boundary, validation ensures type safety and runtime correctness.

For robust validation, use schema libraries like Zod:

Handle form submissions with FormData:

Server functions can throw errors, redirects, and not-found responses that are handled automatically when called from route lifecycles or components using useServerFn().

Use redirects for authentication, navigation, etc:

Throw not-found errors for missing resources:

For more advanced server function patterns and features, see these dedicated guides:

Access request headers, cookies, and response customization:

Stream typed data from server functions to the client. See the Streaming Data from Server Functions guide.

Return Response objects binary data, or custom content types.

Use server functions without JavaScript by leveraging the .url property with HTML forms.

Compose server functions with middleware for authentication, logging, and shared logic. See the Middleware guide.

Cache server function results at build time for static generation. See Static Server Functions.

Handle request cancellation with AbortSignal for long-running operations.

Server functions are addressed by a generated, stable function ID under the hood. These IDs are embedded into the client/SSR builds and used by the server to locate and import the correct module at runtime.

By default, IDs are SHA256 hashes of the same seed to keep bundles compact and avoid leaking file paths. If two server functions end up with the same ID (including when using a custom generator), the system de-duplicates by appending an incrementing suffix like _1, _2, etc.

You can customize function ID generation for the production build by providing a generateFunctionId function when configuring the TanStack Start Vite plugin.

Prefer deterministic inputs (filename + functionName) so IDs remain stable between builds.

Please note that this customization is experimental und su

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

Example 2 (python):
```python
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

Example 3 (python):
```python
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

Example 4 (python):
```python
import { createServerFn } from '@tanstack/react-start'

export const getServerTime = createServerFn().handler(async () => {
  // This runs only on the server
  return new Date().toISOString()
})

// Call from anywhere - components, loaders, hooks, etc.
const time = await getServerTime()
```

---

## Execution Model

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/execution-model

**Contents:**
- Core Principle: Isomorphic by Default
- The Execution Boundary
  - Server Environment
  - Client Environment
- Execution Control APIs
  - Server-Only Execution
  - Client-Only Execution
  - Environment-Specific Implementations
- Architectural Patterns
  - Progressive Enhancement

Understanding where code runs is fundamental to building TanStack Start applications. This guide explains TanStack Start's execution model and how to control where your code executes.

All code in TanStack Start is isomorphic by default - it runs and is included in both server and client bundles unless explicitly constrained.

Critical Understanding: Route loaders are isomorphic - they run on both server and client, not just the server.

TanStack Start applications run in two environments:

Build components that work without JavaScript and enhance with client-side functionality:

Understanding when to use server functions vs server-only functions:

Choose Server-Only when:

Choose Client-Only when:

Choose Isomorphic when:

Always verify server-only code isn't included in client bundles:

Handle server/client execution errors gracefully:

Understanding TanStack Start's execution model is crucial for building secure, performant, and maintainable applications. The isomorphic-by-default approach provides flexibility while the execution control APIs give you precise control when needed.

**Examples:**

Example 1 (javascript):
```javascript
// ✅ This runs on BOTH server and client
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/products')({
  loader: async () => {
    // This runs on server during SSR AND on client during navigation
    const response = await fetch('/api/products')
    return response.json()
  },
})
```

Example 2 (javascript):
```javascript
// ✅ This runs on BOTH server and client
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/products')({
  loader: async () => {
    // This runs on server during SSR AND on client during navigation
    const response = await fetch('/api/products')
    return response.json()
  },
})
```

Example 3 (javascript):
```javascript
// ✅ This runs on BOTH server and client
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/products')({
  loader: async () => {
    // This runs on server during SSR AND on client during navigation
    const response = await fetch('/api/products')
    return response.json()
  },
})
```

Example 4 (javascript):
```javascript
// ✅ This runs on BOTH server and client
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/products')({
  loader: async () => {
    // This runs on server during SSR AND on client during navigation
    const response = await fetch('/api/products')
    return response.json()
  },
})
```

---

## TanStack Start Overview

**URL:** https://tanstack.com/start/latest/docs/

**Contents:**
- Dependencies
- Should I use TanStack Start or just TanStack Router?
- Are there limitations?
- How is TanStack Start funded?
- Ready to get started?

TanStack Start is currently in the Release Candidate stage! This means it is considered feature-complete and its API is considered stable. This does not mean it is bug-free or without issues, which is why we invite you to try it out and provide feedback! The road to v1 will likely be a quick one, so don't wait too long to try it out!

TanStack Start is a full-stack React framework powered by TanStack Router. It provides a full-document SSR, streaming, server functions, bundling, and more. Thanks to Vite, it's ready to develop and deploy to any hosting provider or runtime you want!

TanStack Start is built on two key technologies:

90% of any framework usually comes down to the router, and TanStack Start is no different. TanStack Start relies 100% on TanStack Router for its routing system. In addition to TanStack Router's amazing features, Start enables even more powerful features:

That said, if you know with certainty that you will not need any of the above features, then you may want to consider using TanStack Router alone, which is still a powerful and type-safe SPA routing upgrade over other routers and frameworks.

The only relevant limitation is that TanStack Start does not currently support React Server Components, but we are actively working on integration and expect to support them in the near future.

Otherwise, TanStack Start provides the same capability as other full-stack frameworks like Next.js, Remix, etc, with even more features and a more powerful developer experience.

TanStack is 100% open source, free to use, and always will be. It is built and maintained by an extremely talented and dedicated community of developers and software engineers. TanStack.com (also open source) is owned by TanStack LLC, a privately held company, 100% bootstrapped and self-funded. We are not venture-backed and have never sought investors. To support the development of TanStack Start and other TanStack libraries, TanStack.com partners with these amazing companies who offer both financial support and resources to help us continue to build the best possible developer experience for the web community:

Go to the next page to learn how to install TanStack Start and create your first app!

---

## Authentication

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/authentication

**Contents:**
- Authentication Approaches
- Core Concepts
  - Authentication vs Authorization
- Essential Building Blocks
  - 1. Server Functions for Authentication
  - 2. Session Management
  - 3. Authentication Context
  - 4. Route Protection
- Implementation Patterns
  - Basic Email/Password Authentication

This guide covers authentication patterns and shows how to implement your own authentication system with TanStack Start.

📋 Before You Start: Check our Authentication Overview for all available options including partner solutions and hosted services.

You have several options for authentication in your TanStack Start application:

DIY Implementation Benefits:

Authentication involves many considerations including password security, session management, rate limiting, CSRF protection, and various attack vectors.

TanStack Start provides the tools for both through server functions, sessions, and route protection.

Server functions handle sensitive authentication logic securely on the server:

TanStack Start provides secure HTTP-only cookie sessions:

Share authentication state across your application:

Protect routes using beforeLoad:

Study these implementations to understand different authentication patterns:

If you're migrating from client-side authentication (localStorage, context only):

When choosing your authentication approach, consider these factors:

Hosted Solutions (Clerk, WorkOS, Better Auth):

Authentication systems need to handle various security aspects:

When implementing authentication, consider:

For other authentication approaches, check the Authentication Overview. For specific integration help, explore our working examples.

**Examples:**

Example 1 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id
...
```

Example 2 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id
...
```

Example 3 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id
...
```

Example 4 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'

// Login server function
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      userId: user.id
...
```

---

## Static Server Functions

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/static-server-functions

**Contents:**
- What are Static Server Functions?

Static Server Functions are experimental!

Static server functions are server functions that are executed at build time and cached as static assets when using prerendering/static-generation. They can be set to "static" mode by applying the staticFunctionMiddleware middleware to createServerFn:

Ensure that staticFunctionMiddleware is the final middleware!

This pattern goes as follows:

**Examples:**

Example 1 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/react-start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

Example 2 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/react-start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

Example 3 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/react-start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

Example 4 (python):
```python
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/react-start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

---

## Environment Functions

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions

**Contents:**
- What Are Environment Functions?
- Isomorphic Functions
  - Complete Implementation
  - Partial Implementation (Server)
  - Partial Implementation (Client)
  - No Implementation
    - What is a no-op?
- envOnly Functions
  - createServerOnlyFn
  - createClientOnlyFn

Environment functions are utilities designed to define and control function execution based on the runtime environment—whether the code is running on the client or the server. These utilities help ensure that environment-specific logic is executed safely and intentionally, preventing runtime errors and improving maintainability in fullstack or isomorphic applications.

Start provides three core environment functions:

Use createIsomorphicFn() to define functions that behave differently depending on whether they are called on the client or the server. This is useful for safely sharing logic across environments while delegating environment-specific behavior to appropriate handlers.

Here is an example of createIsomorphicFn() with only server implementation:

Here is an example of createIsomorphicFn() with only client implementation:

Here is an example of createIsomorphicFn() without any environment specific implementation:

A no-op (short for "no operation") is a function that does nothing when executed - it simply returns undefined without performing any operations.

The createServerOnlyFn and createClientOnlyFn helpers enforce strict environment-bound execution. They ensure the returned function is only callable in the correct runtime context. If misused, they throw descriptive runtime errors to prevent unintentional logic execution.

These functions are useful for API access, filesystem reads, using browser APIs, or other operations that are invalid or insecure outside their intended environment.

Environment functions are tree-shaken based on the environment for each bundle produced.

Functions created using createIsomorphicFn() are tree-shaken. All codes inside .client() are not included in server bundle, and vice-versa.

On the server, functions created using createClientOnlyFn() are replaced with a function that throws an Error on the server. The reverse is true for createServerOnlyFn functions on the client.

**Examples:**

Example 1 (python):
```python
import { createIsomorphicFn } from '@tanstack/react-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
// ℹ️ On the **server**, it returns `'server'`.
// ℹ️ On the **client**, it returns `'client'`.
```

Example 2 (python):
```python
import { createIsomorphicFn } from '@tanstack/react-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
// ℹ️ On the **server**, it returns `'server'`.
// ℹ️ On the **client**, it returns `'client'`.
```

Example 3 (python):
```python
import { createIsomorphicFn } from '@tanstack/react-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
// ℹ️ On the **server**, it returns `'server'`.
// ℹ️ On the **client**, it returns `'client'`.
```

Example 4 (python):
```python
import { createIsomorphicFn } from '@tanstack/react-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
// ℹ️ On the **server**, it returns `'server'`.
// ℹ️ On the **client**, it returns `'client'`.
```

---

## Client Entry Point

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point

**Contents:**
- Client Entry Point
- Error Handling
- Development vs Production

The client entry point is optional out of the box. If not provided, TanStack Start will automatically handle the client entry point for you using the below as a default.

Getting our html to the client is only half the battle. Once there, we need to hydrate our client-side JavaScript once the route resolves to the client. We do this by hydrating the root of our application with the StartClient component:

This enables us to kick off client-side routing once the user's initial server request has fulfilled.

You can wrap your client entry point with error boundaries to handle client-side errors gracefully:

You may want different behavior in development vs production:

The client entry point gives you full control over how your application initializes on the client side while working seamlessly with TanStack Start's server-side rendering.

**Examples:**

Example 1 (python):
```python
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
```

Example 2 (python):
```python
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
```

Example 3 (python):
```python
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
```

Example 4 (python):
```python
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
```

---

## Path Aliases

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases

Path aliases are a useful feature of TypeScript that allows you to define a shortcut for a path that could be distant in your project's directory structure. This can help you avoid long relative imports in your code and make it easier to refactor your project's structure. This is especially useful for avoiding long relative imports in your code.

By default, TanStack Start does not include path aliases. However, you can easily add them to your project by updating your tsconfig.json file in the root of your project and adding the following configuration:

In this example, we've defined the path alias ~/* that maps to the ./src/* directory. This means that you can now import files from the src directory using the ~ prefix.

After updating your tsconfig.json file, you'll need to install the vite-tsconfig-paths plugin to enable path aliases in your TanStack Start project. You can do this by running the following command:

Now, you'll need to update your vite.config.ts file to include the following:

Once this configuration has completed, you'll now be able to import files using the path alias like so:

**Examples:**

Example 1 (unknown):
```unknown
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

Example 2 (unknown):
```unknown
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

Example 3 (unknown):
```unknown
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

Example 4 (unknown):
```unknown
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

---

## Authentication

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/authentication-overview

**Contents:**
- Authentication vs Authorization
- Architecture Overview
  - Full-Stack Authentication Model
  - Session Management Patterns
  - Route Protection Architecture
  - State Management Patterns
- Authentication Options
  - 🏢 Partner Solutions
  - 🛠️ DIY Authentication
  - 🌐 Other Excellent Options

HTTP-Only Cookies (Recommended)

Layout Route Pattern (Recommended)

Component-Level Protection

Server Function Guards

Server-Driven State (Recommended)

Build your own authentication system using TanStack Start's server functions and session management:

Open Source & Community Solutions:

Visit WorkOS → | View example →

Visit Clerk → | Sign up free → | View example →

Client-Side Examples:

Implementation Guides:

Step-by-Step Tutorials:

---

## TanStack Start Overview

**URL:** https://tanstack.com/start/latest/docs/framework/react/overview

**Contents:**
- Dependencies
- Should I use TanStack Start or just TanStack Router?
- Are there limitations?
- How is TanStack Start funded?
- Ready to get started?

TanStack Start is currently in the Release Candidate stage! This means it is considered feature-complete and its API is considered stable. This does not mean it is bug-free or without issues, which is why we invite you to try it out and provide feedback! The road to v1 will likely be a quick one, so don't wait too long to try it out!

TanStack Start is a full-stack React framework powered by TanStack Router. It provides a full-document SSR, streaming, server functions, bundling, and more. Thanks to Vite, it's ready to develop and deploy to any hosting provider or runtime you want!

TanStack Start is built on two key technologies:

90% of any framework usually comes down to the router, and TanStack Start is no different. TanStack Start relies 100% on TanStack Router for its routing system. In addition to TanStack Router's amazing features, Start enables even more powerful features:

That said, if you know with certainty that you will not need any of the above features, then you may want to consider using TanStack Router alone, which is still a powerful and type-safe SPA routing upgrade over other routers and frameworks.

The only relevant limitation is that TanStack Start does not currently support React Server Components, but we are actively working on integration and expect to support them in the near future.

Otherwise, TanStack Start provides the same capability as other full-stack frameworks like Next.js, Remix, etc, with even more features and a more powerful developer experience.

TanStack is 100% open source, free to use, and always will be. It is built and maintained by an extremely talented and dedicated community of developers and software engineers. TanStack.com (also open source) is owned by TanStack LLC, a privately held company, 100% bootstrapped and self-funded. We are not venture-backed and have never sought investors. To support the development of TanStack Start and other TanStack libraries, TanStack.com partners with these amazing companies who offer both financial support and resources to help us continue to build the best possible developer experience for the web community:

Go to the next page to learn how to install TanStack Start and create your first app!

---

## Getting Started

**URL:** https://tanstack.com/start/latest/docs/framework/react/getting-started

**Contents:**
- Migrate an existing project from another framework
- Start a new project from scratch
- Next Steps

Choose one of the following options to start building a new TanStack Start project:

Unless you chose to build a project from scratch, you can now move on to the Routing guide to learn how to use TanStack Start!

---

## Streaming Data from Server Functions

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions

**Contents:**
- Typed Readable Streams
- Async Generators in Server Functions

Streaming data from the server has become very popular thanks to the rise of AI apps. Luckily, it's a pretty easy task with TanStack Start, and what's even better: the streamed data is typed!

The two most popular ways of streaming data from server functions are using ReadableStream-s or async generators.

You can see how to implement both in the Streaming Data From Server Functions example.

Here's an example for a server function that streams an array of messages to the client in a type-safe manner:

When you consume this stream from the client, the streamed chunks will be properly typed:

A much cleaner approach with the same results is to use an async generator function:

The client side code will also be leaner:

**Examples:**

Example 1 (javascript):
```javascript
type Message = {
  content: string
}

/**
  This server function returns a `ReadableStream`
  that streams `Message` chunks to the client.
*/
const streamingResponseFn = createServerFn().handler(async () => {
  // These are the messages that you want to send as chunks to the client
  const messages: Message[] = generateMessages()

  // This `ReadableStream` is typed, so each
  // will be of type `Message`.
  const stream = new ReadableStream<Message>({
    async start(controller) {
      for (const message of messages) {
        // Send the message
        controller.enqueue(message)
      }
 
...
```

Example 2 (javascript):
```javascript
type Message = {
  content: string
}

/**
  This server function returns a `ReadableStream`
  that streams `Message` chunks to the client.
*/
const streamingResponseFn = createServerFn().handler(async () => {
  // These are the messages that you want to send as chunks to the client
  const messages: Message[] = generateMessages()

  // This `ReadableStream` is typed, so each
  // will be of type `Message`.
  const stream = new ReadableStream<Message>({
    async start(controller) {
      for (const message of messages) {
        // Send the message
        controller.enqueue(message)
      }
 
...
```

Example 3 (javascript):
```javascript
type Message = {
  content: string
}

/**
  This server function returns a `ReadableStream`
  that streams `Message` chunks to the client.
*/
const streamingResponseFn = createServerFn().handler(async () => {
  // These are the messages that you want to send as chunks to the client
  const messages: Message[] = generateMessages()

  // This `ReadableStream` is typed, so each
  // will be of type `Message`.
  const stream = new ReadableStream<Message>({
    async start(controller) {
      for (const message of messages) {
        // Send the message
        controller.enqueue(message)
      }
 
...
```

Example 4 (javascript):
```javascript
type Message = {
  content: string
}

/**
  This server function returns a `ReadableStream`
  that streams `Message` chunks to the client.
*/
const streamingResponseFn = createServerFn().handler(async () => {
  // These are the messages that you want to send as chunks to the client
  const messages: Message[] = generateMessages()

  // This `ReadableStream` is typed, so each
  // will be of type `Message`.
  const stream = new ReadableStream<Message>({
    async start(controller) {
      for (const message of messages) {
        // Send the message
        controller.enqueue(message)
      }
 
...
```

---

## Hydration Errors

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors

**Contents:**
  - Why it happens
  - Strategy 1 — Make server and client match
  - Strategy 2 — Let the client tell you its environment
  - Strategy 3 — Make it client-only
  - Strategy 4 — Disable or limit SSR for the route
  - Strategy 5 — Last resort suppression
  - Checklist

See also: Execution Model, Code Execution Patterns, Selective SSR, Server Functions

**Examples:**

Example 1 (python):
```python
// src/start.ts
import { createStart, createMiddleware } from '@tanstack/react-start'
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader('accept-language')
  const headerLocale = header?.split(',')[0] || 'en-US'
  const cookieLocale = getCookie('locale')
  const cookieTz = getCookie('tz') // set by client later (see Strategy 2)

  const locale = cookieLocale || headerLocale
  const timeZone = cookieTz || 'UTC' // deterministic until client send
...
```

Example 2 (python):
```python
// src/start.ts
import { createStart, createMiddleware } from '@tanstack/react-start'
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader('accept-language')
  const headerLocale = header?.split(',')[0] || 'en-US'
  const cookieLocale = getCookie('locale')
  const cookieTz = getCookie('tz') // set by client later (see Strategy 2)

  const locale = cookieLocale || headerLocale
  const timeZone = cookieTz || 'UTC' // deterministic until client send
...
```

Example 3 (python):
```python
// src/start.ts
import { createStart, createMiddleware } from '@tanstack/react-start'
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader('accept-language')
  const headerLocale = header?.split(',')[0] || 'en-US'
  const cookieLocale = getCookie('locale')
  const cookieTz = getCookie('tz') // set by client later (see Strategy 2)

  const locale = cookieLocale || headerLocale
  const timeZone = cookieTz || 'UTC' // deterministic until client send
...
```

Example 4 (python):
```python
// src/start.ts
import { createStart, createMiddleware } from '@tanstack/react-start'
import {
  getRequestHeader,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'

const localeTzMiddleware = createMiddleware().server(async ({ next }) => {
  const header = getRequestHeader('accept-language')
  const headerLocale = header?.split(',')[0] || 'en-US'
  const cookieLocale = getCookie('locale')
  const cookieTz = getCookie('tz') // set by client later (see Strategy 2)

  const locale = cookieLocale || headerLocale
  const timeZone = cookieTz || 'UTC' // deterministic until client send
...
```

---

## Routing

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/routing

**Contents:**
- The Router
- File-Based Routing
- The Root Route
- The HeadContent Component
- The Outlet Component
- The Scripts Component
- Route Tree Generation
- Nested Routing
- Types of Routes
- Route Tree Configuration

TanStack Start is built on top of TanStack Router, so all of the features of TanStack Router are available to you.

We highly recommend reading the TanStack Router documentation to learn more about the features and capabilities of TanStack Router. What you learn here is more of a high-level overview of TanStack Router and how it works in Start.

The router.tsx file is the file that will dictate the behavior of TanStack Router used within Start. It's located in the src directory of your project.

Here, you can configure everything from the default preloading functionality to caching staleness.

Start uses TanStack Router's file-based routing approach to ensure proper code-splitting and advanced type-safety.

You can find your routes in the src/routes directory.

The root route is the top-most route in the entire tree and encapsulates all other routes as children. It's found in the src/routes/__root.tsx file and must be named __root.tsx.

Notice the Scripts component at the bottom of the <body> tag. This is used to load all of the client-side JavaScript for the application and should always be included for proper functionality.

The HeadContent component is used to render the head, title, meta, link, and head-related script tags of the document.

It should be rendered in the <head> tag of your root route's layout.

The Outlet component is used to render the next potentially matching child route. <Outlet /> doesn't take any props and can be rendered anywhere within a route's component tree. If there is no matching child route, <Outlet /> will render null.

The Scripts component is used to render the body scripts of the document.

It should be rendered in the <body> tag of your root route's layout.

You may notice a routeTree.gen.ts file in your project.

This file is automatically generated when you run TanStack Start (via npm run dev or npm run start). This file contains the generated route tree and a handful of TS utilities that make TanStack Start's type-safety extremely fast and fully inferred.

You may gitignore this file, since it is a build artifact.

TanStack Router uses nested routing to match the URL with the correct component tree to render.

For example, given the following routes:

And the URL: /posts/123

The component tree would look like this:

There are a few different types of routes that you can create in your project.

There are also a few different utility route types that you can use to group and organize your routes

The route tree is c

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
src/
├── router.tsx
```

Example 2 (unknown):
```unknown
src/
├── router.tsx
```

Example 3 (unknown):
```unknown
src/
├── router.tsx
```

Example 4 (unknown):
```unknown
src/
├── router.tsx
```

---

## Server Entry Point

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point

**Contents:**
- Server Entry Point
- Custom Server Handlers
- Request context
- Server Configuration

The server entry point is optional out of the box. If not provided, TanStack Start will automatically handle the server entry point for you using the below as a default.

This is done via the src/server.ts file.

The entry point must conform to the following interface:

Whether we are statically generating our app or serving it dynamically, the server.ts file is the entry point for doing all SSR-related work as well as for handling server routes and server function requests.

You can create custom server handlers to modify how your application is rendered:

When your server needs to pass additional, typed data into request handlers (for example, authenticated user info, a database connection, or per-request flags), register a request context type via TypeScript module augmentation. The registered context is delivered as the second argument to the server fetch handler and is available throughout the server-side middleware chain — including global middleware, request/function middleware, server routes, server functions, and the router itself.

To add types for your request context, augment the Register interface from @tanstack/react-start with a server.requestContext property. The runtime context you pass to handler.fetch will then match that type. Example:

The server entry point is where you can configure server-specific behavior:

This flexibility allows you to customize how your TanStack Start application handles server-side rendering while maintaining the framework's conventions.

**Examples:**

Example 1 (python):
```python
// src/server.ts
import handler from '@tanstack/react-start/server-entry'

export default {
  fetch(request: Request) {
    return handler.fetch(request)
  },
}
```

Example 2 (python):
```python
// src/server.ts
import handler from '@tanstack/react-start/server-entry'

export default {
  fetch(request: Request) {
    return handler.fetch(request)
  },
}
```

Example 3 (python):
```python
// src/server.ts
import handler from '@tanstack/react-start/server-entry'

export default {
  fetch(request: Request) {
    return handler.fetch(request)
  },
}
```

Example 4 (python):
```python
// src/server.ts
import handler from '@tanstack/react-start/server-entry'

export default {
  fetch(request: Request) {
    return handler.fetch(request)
  },
}
```

---

## Server Routes

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/server-routes

**Contents:**
- Server Routes and App Routes
- File Route Conventions
- Unique Route Paths
- Escaped Matching
- Pathless Layout Routes and Break-out Routes
- Nested Directories vs File-names
- Handling Server Route Requests
- Defining a Server Route
- Defining Server Route Handlers
  - Simple handlers

Server routes are a powerful feature of TanStack Start that allow you to create server-side endpoints in your application and are useful for handling raw HTTP requests, form submissions, user authentication, and much more.

Server routes can be defined in your ./src/routes directory of your project right alongside your TanStack Router routes and are automatically handled by the TanStack Start server.

Here's what a simple server route looks like:

Because server routes can be defined in the same directory as your app routes, you can even use the same file for both!

Server routes in TanStack Start follow the same file-based routing conventions as TanStack Router. This means that each file in your routes directory with a server property in the createFileRoute call will be treated as an API route. Here are a few examples:

Each route can only have a single handler file associated with it. So, if you have a file named routes/users.ts which'd equal the request path of /users, you cannot have other files that'd also resolve to the same route. For example, the following files would all resolve to the same route and would error:

Just as with normal routes, server routes can match on escaped characters. For example, a file named routes/users[.]json.ts will create an API route at /users.json.

Because of the unified routing system, pathless layout routes and break-out routes are supported for similar functionality around server route middleware.

In the examples above, you may have noticed that the file naming conventions are flexible and allow you to mix and match directories and file names. This is intentional and allows you to organize your Server routes in a way that makes sense for your application. You can read more about this in the TanStack Router File-based Routing Guide.

Server route requests are handled by Start automatically by default or by Start's createStartHandler in your custom src/server.ts entry point file.

The start handler is responsible for matching an incoming request to a server route and executing the appropriate middleware and handler.

If you need to customize the server handler, you can do so by creating a custom handler and then passing the event to the start handler. See The Server Entry Point.

Server routes are created by adding a server property to your createFileRoute call. The server property contains:

You can define handlers in two ways:

For simple use cases, you can provide handler functions directly in a handlers object.



*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

Example 2 (python):
```python
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

Example 3 (python):
```python
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

Example 4 (python):
```python
// routes/hello.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response('Hello, World!')
      },
    },
  },
})
```

---

## Static Prerendering

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering

**Contents:**
- Prerendering
- Automatic Static Route Discovery
- Crawling Links

Static prerendering is the process of generating static HTML files for your application. This can be useful for either improving the performance of your application, as it allows you to serve pre-rendered HTML files to users without having to generate them on the fly or for deploying static sites to platforms that do not support server-side rendering.

TanStack Start can prerender your application to static HTML files, which can then be served to users without having to generate them on the fly. To prerender your application, you can add the prerender option to your tanstackStart configuration in vite.config.ts file:

All static paths will be automatically discovered and seamlessly merged with the specified pages config

Routes are excluded from automatic discovery in the following cases:

Note: Dynamic routes can still be prerendered if they are linked from other pages when crawlLinks is enabled.

When crawlLinks is enabled (default: true), TanStack Start will extract links from prerendered pages and prerender those linked pages as well.

For example, if / contains a link to /posts, then /posts will also be automatically prerendered.

**Examples:**

Example 1 (python):
```python
// vite.config.ts

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // If disabled, only the root path or the paths defined in the pages config will be prerendered
        autoStaticPathsDiscovery: true,

        // How many prerender jobs to run at once
        concur
...
```

Example 2 (python):
```python
// vite.config.ts

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // If disabled, only the root path or the paths defined in the pages config will be prerendered
        autoStaticPathsDiscovery: true,

        // How many prerender jobs to run at once
        concur
...
```

Example 3 (python):
```python
// vite.config.ts

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // If disabled, only the root path or the paths defined in the pages config will be prerendered
        autoStaticPathsDiscovery: true,

        // How many prerender jobs to run at once
        concur
...
```

Example 4 (python):
```python
// vite.config.ts

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // If disabled, only the root path or the paths defined in the pages config will be prerendered
        autoStaticPathsDiscovery: true,

        // How many prerender jobs to run at once
        concur
...
```

---

## Build a Project from Scratch

**URL:** https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

**Contents:**
- TypeScript Configuration
- Install Dependencies
- Update Configuration Files
- Add the Basic Templating
- The Router Configuration
- The Root of Your Application
- Writing Your First Route

If you chose to quick start with an example or cloned project, you can skip this guide and move on to the Routing guide.

So you want to build a TanStack Start project from scratch?

This guide will help you build a very basic TanStack Start web application. Together, we will use TanStack Start to:

Here is what that will look like

Let's create a new project directory and initialize it.

> We use npm in all of these examples, but you can use your package manager of choice instead.

We highly recommend using TypeScript with TanStack Start. Create a tsconfig.json file with at least the following settings:

> Enabling verbatimModuleSyntax can result in server bundles leaking into client bundles. It is recommended to keep this option disabled.

TanStack Start is powered by Vite and TanStack Router and requires them as dependencies.

To install them, run:

We also need vite as a devDependency:

You'll also need React:

As well as React's Vite plugin:

Alternatively, you can also use @vitejs/plugin-react-oxc or @vitejs/plugin-react-swc.

We'll then update our package.json to use Vite's CLI and set "type": "module":

Then configure TanStack Start's Vite plugin in vite.config.ts:

There are 2 required files for TanStack Start usage:

Once configuration is done, we'll have a file tree that looks like the following:

This is the file that will dictate the behavior of TanStack Router used within Start. Here, you can configure everything from the default preloading functionality to caching staleness.

You won't have a routeTree.gen.ts file yet. This file will be generated when you run TanStack Start for the first time.

Finally, we need to create the root of our application. This is the entry point for all other routes. The code in this file will wrap all other routes in the application.

Now that we have the basic templating setup, we can write our first route. This is done by creating a new file in the src/routes directory.

That's it! 🤯 You've now set up a TanStack Start project and written your first route. 🎉

You can now run npm run dev to start your server and navigate to http://localhost:3000 to see your route in action.

You want to deploy your application? Check out the hosting guide.

**Examples:**

Example 1 (unknown):
```unknown
mkdir myApp
cd myApp
npm init -y
```

Example 2 (unknown):
```unknown
mkdir myApp
cd myApp
npm init -y
```

Example 3 (unknown):
```unknown
mkdir myApp
cd myApp
npm init -y
```

Example 4 (unknown):
```unknown
mkdir myApp
cd myApp
npm init -y
```

---

## Environment Variables

**URL:** https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables

**Contents:**
- Quick Start
- Environment Variable Contexts
  - Server-Side Context (Server Functions & API Routes)
  - Client-Side Context (Components & Client Code)
- Environment File Setup
  - File Hierarchy (Loaded in Order)
  - Example Setup
- Common Patterns
  - Database Configuration
  - Authentication Provider Setup

Learn how to securely configure and use environment variables in your TanStack Start application across different contexts (server functions, client code, and build processes).

TanStack Start automatically loads .env files and makes variables available in both server and client contexts with proper security boundaries.

Server functions can access any environment variable using process.env:

Client code can only access variables with the VITE_ prefix:

TanStack Start automatically loads environment files in this order:

.env (committed to repository):

.env.local (add to .gitignore):

Create src/env.d.ts to add type safety:

Use Zod for runtime validation of environment variables:

Problem: import.meta.env.MY_VARIABLE returns undefined

Problem: If VITE_ variables are replaced at bundle time only, how to make runtime variables available on the client?

Pass variables from the server down to the client:

Problem: Environment variable changes aren't reflected

Problem: Property 'VITE_MY_VAR' does not exist on type 'ImportMetaEnv'

Solution: Add to src/env.d.ts:

Problem: Sensitive data appearing in client bundle

Problem: Missing environment variables in production build

**Examples:**

Example 1 (unknown):
```unknown
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
VITE_APP_NAME=My TanStack Start App
```

Example 2 (unknown):
```unknown
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
VITE_APP_NAME=My TanStack Start App
```

Example 3 (unknown):
```unknown
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
VITE_APP_NAME=My TanStack Start App
```

Example 4 (unknown):
```unknown
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
VITE_APP_NAME=My TanStack Start App
```

---
