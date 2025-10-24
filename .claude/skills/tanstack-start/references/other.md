# Tanstack-Start - Other

**Pages:** 1

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
