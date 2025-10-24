# Tanstack-Table - Getting Started

**Pages:** 2

---

## Overview

**URL:** https://tanstack.com/table/latest/docs/overview

**Contents:**
- Typescript
- Headless
- Core Objects and Types

TanStack Table's core is framework agnostic, which means its API is the same regardless of the framework you're using. Adapters are provided to make working with the table core easier depending on your framework. See the Adapters menu for available adapters.

While TanStack Table is written in TypeScript, using TypeScript in your application is optional (but recommended as it comes with outstanding benefits to both you and your codebase)

As it was mentioned extensively in the Intro section, TanStack Table is headless. This means that it doesn't render any DOM elements, and instead relies on you, the UI/UX developer to provide the table's markup and styles. This is a great way to build a table that can be used in any UI framework, including React, Vue, Solid, Svelte, Qwik, and even JS-to-native platforms like React Native!

The table core uses the following abstractions, commonly exposed by adapters:

There are even more structures that pertain to specific features like filtering, sorting, grouping, etc, which you can find in the features section.

---

## Installation

**URL:** https://tanstack.com/table/latest/docs/installation

**Contents:**
- React Table
- Vue Table
- Solid Table
- Svelte Table
- Qwik Table
- Angular Table
- Lit Table
- Table Core (no framework)

Before we dig in to the API, let's get you set up!

Install your table adapter as a dependency using your favorite npm package manager.

Only install ONE of the following packages:

The @tanstack/react-table package works with React 16.8, React 17, React 18, and React 19.

NOTE: Even though the react adapter works with React 19, it may not work with the new React Compiler that's coming out along-side React 19. This may be fixed in future TanStack Table updates.

The @tanstack/vue-table package works with Vue 3.

The @tanstack/solid-table package works with Solid-JS 1

The @tanstack/svelte-table package works with Svelte 3 and Svelte 4.

NOTE: There is not a built-in Svelte 5 adapter yet, but you can still use TanStack Table with Svelte 5 by installing the @tanstack/table-core package and using a custom adapter from the community. See this PR for inspiration.

The @tanstack/qwik-table package works with Qwik 1.

NOTE: There will be a "breaking change" release in the near future to support Qwik 2. This will be released as a minor version bump, but will be documented. Qwik 2 itself will have no breaking changes, but its name on the npm registry will change, and require different peer dependencies.

NOTE: The current qwik adapter only works with CSR. More improvements may not be available until a future table version.

The @tanstack/angular-table package works with Angular 17. The Angular adapter uses a new Angular Signal implementation.

The @tanstack/lit-table package works with Lit 3.

Don't see your favorite framework (or favorite version of your framework) listed? You can always just use the @tanstack/table-core package and build your own adapter in your own codebase. Usually, only a thin wrapper is needed to manage state and rendering for your specific framework. Browse the source code of all of the other adapters to see how they work.

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/react-table
```

Example 2 (unknown):
```unknown
npm install @tanstack/react-table
```

Example 3 (unknown):
```unknown
npm install @tanstack/react-table
```

Example 4 (unknown):
```unknown
npm install @tanstack/react-table
```

---
