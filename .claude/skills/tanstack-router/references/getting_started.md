# Tanstack-Router - Getting Started

**Pages:** 11

---

## Migration from React Router Checklist

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/migrate-from-react-router

If your UI is blank, open the console, and you will probably have some errors that read something along the lines of cannot use 'useNavigate' outside of context . This means there are React Router api’s that are still imported and referenced that you need to find and remove. The easiest way to make sure you find all React Router imports is to uninstall react-router-dom and then you should get typescript errors in your files. Then you will know what to change to a @tanstack/react-router import.

Here is the example repo

---

## Overview

**URL:** https://tanstack.com/router/latest/docs/framework/react/overview

**Contents:**
- "A Fork in the Route"
- Why TanStack Router?
- 100% Inferred TypeScript Support
- 1st Class Search Parameters
- Built-In Caching and Friendly Data Loading
  - Built-in Cache
  - Flexible & Powerful Data Lifecycle APIs
- Inherited Route Context
- File-based and/or Code-Based Routing
- Acknowledgements

TanStack Router is a router for building React and Solid applications. Some of its features include:

To get started quickly, head to the next page. For a more lengthy explanation, buckle up while I bring you up to speed!

Using a router to build applications is widely regarded as a must-have and is usually one of the first choices you’ll make in your tech stack.

TanStack Router delivers on the same fundamental expectations as other routers that you’ve come to expect:

And it also delivers some new features that raise the bar:

Let’s dive into some of the more important ones in more detail!

Everything these days is written “in Typescript” or at the very least offers type definitions that are veneered over runtime functionality, but too few packages in the ecosystem actually design their APIs with TypeScript in mind. So while I’m pleased that your router is auto-completing your option fields and catching a few property/method typos here and there, there is much more to be had.

What does all of that mean for you?

Search parameters are often an afterthought, treated like a black box of strings (or string) that you can parse and update, but not much else. Existing solutions are not type-safe either, adding to the caution that is required to deal with them. Even the most "modern" frameworks and routers leave it up to you to figure out how to manage this state. Sometimes they'll parse the search string into an object for you, or sometimes you're left to do it yourself with URLSearchParams.

Let's step back and remember that search params are the most powerful state manager in your entire application. They are global, serializable, bookmarkable, and shareable making them the perfect place to store any kind of state that needs to survive a page refresh or a social share.

To live up to that responsibility, search parameters are a first-class citizen in TanStack Router. While still based on standard URLSearchParams, TanStack Router uses a powerful parser/serializer to manage deeper and more complex data structures in your search params, all while keeping them type-safe and easy to work with.

It's like having useState right in the URL!

Search parameters are:

Once you start using TanStack Router's search parameters, you'll wonder how you ever lived without them.

Data loading is a critical part of any application and while most existing routers offer some form of critical data loading APIs, they often fall short when it comes to caching and data lifecycle mana

*[Content truncated]*

---

## Overview

**URL:** https://tanstack.com/router/latest/docs/

**Contents:**
- "A Fork in the Route"
- Why TanStack Router?
- 100% Inferred TypeScript Support
- 1st Class Search Parameters
- Built-In Caching and Friendly Data Loading
  - Built-in Cache
  - Flexible & Powerful Data Lifecycle APIs
- Inherited Route Context
- File-based and/or Code-Based Routing
- Acknowledgements

TanStack Router is a router for building React and Solid applications. Some of its features include:

To get started quickly, head to the next page. For a more lengthy explanation, buckle up while I bring you up to speed!

Using a router to build applications is widely regarded as a must-have and is usually one of the first choices you’ll make in your tech stack.

TanStack Router delivers on the same fundamental expectations as other routers that you’ve come to expect:

And it also delivers some new features that raise the bar:

Let’s dive into some of the more important ones in more detail!

Everything these days is written “in Typescript” or at the very least offers type definitions that are veneered over runtime functionality, but too few packages in the ecosystem actually design their APIs with TypeScript in mind. So while I’m pleased that your router is auto-completing your option fields and catching a few property/method typos here and there, there is much more to be had.

What does all of that mean for you?

Search parameters are often an afterthought, treated like a black box of strings (or string) that you can parse and update, but not much else. Existing solutions are not type-safe either, adding to the caution that is required to deal with them. Even the most "modern" frameworks and routers leave it up to you to figure out how to manage this state. Sometimes they'll parse the search string into an object for you, or sometimes you're left to do it yourself with URLSearchParams.

Let's step back and remember that search params are the most powerful state manager in your entire application. They are global, serializable, bookmarkable, and shareable making them the perfect place to store any kind of state that needs to survive a page refresh or a social share.

To live up to that responsibility, search parameters are a first-class citizen in TanStack Router. While still based on standard URLSearchParams, TanStack Router uses a powerful parser/serializer to manage deeper and more complex data structures in your search params, all while keeping them type-safe and easy to work with.

It's like having useState right in the URL!

Search parameters are:

Once you start using TanStack Router's search parameters, you'll wonder how you ever lived without them.

Data loading is a critical part of any application and while most existing routers offer some form of critical data loading APIs, they often fall short when it comes to caching and data lifecycle mana

*[Content truncated]*

---

## Manual Setup

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/manual

**Contents:**
- Using File-Based Route Generation
    - Install TanStack Router, Vite Plugin, and the Router Devtools
    - Configure the Vite Plugin
    - src/routes/__root.tsx
    - src/routes/index.tsx
    - src/routes/about.tsx
    - src/main.tsx
- Using Code-Based Route Configuration

To set up TanStack Router manually in a React project, follow the steps below. This gives you a bare minimum setup to get going with TanStack Router using both file-based route generation and code-based route configuration:

If you are not using Vite, or any of the supported bundlers, you can check out the TanStack Router CLI guide for more info.

Create the following files:

Regardless of whether you are using the @tanstack/router-plugin package and running the npm run dev/npm run build scripts, or manually running the tsr watch/tsr generate commands from your package scripts, the route tree file will be generated at src/routeTree.gen.ts.

Import the generated route tree and create a new router instance:

If you are working with this pattern you should change the id of the root <div> on your index.html file to <div id='root'></div>

The following example shows how to configure routes using code, and for simplicity's sake is in a single file for this demo. While code-based generation allows you to declare many routes and even the router instance in a single file, we recommend splitting your routes into separate files for better organization and performance as your application grows.

If you glossed over these examples or didn't understand something, we don't blame you, because there's so much more to learn to really take advantage of TanStack Router! Let's move on.

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
# or
pnpm add @tanstack/react-router @tanstack/react-router-devtools
pnpm add -D @tanstack/router-plugin
# or
yarn add @tanstack/react-router @tanstack/react-router-devtools
yarn add -D @tanstack/router-plugin
# or
bun add @tanstack/react-router @tanstack/react-router-devtools
bun add -D @tanstack/router-plugin
# or
deno add npm:@tanstack/react-router npm:@tanstack/router-plugin npm:@tanstack/react-router-devtools
```

Example 2 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
# or
pnpm add @tanstack/react-router @tanstack/react-router-devtools
pnpm add -D @tanstack/router-plugin
# or
yarn add @tanstack/react-router @tanstack/react-router-devtools
yarn add -D @tanstack/router-plugin
# or
bun add @tanstack/react-router @tanstack/react-router-devtools
bun add -D @tanstack/router-plugin
# or
deno add npm:@tanstack/react-router npm:@tanstack/router-plugin npm:@tanstack/react-router-devtools
```

Example 3 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
# or
pnpm add @tanstack/react-router @tanstack/react-router-devtools
pnpm add -D @tanstack/router-plugin
# or
yarn add @tanstack/react-router @tanstack/react-router-devtools
yarn add -D @tanstack/router-plugin
# or
bun add @tanstack/react-router @tanstack/react-router-devtools
bun add -D @tanstack/router-plugin
# or
deno add npm:@tanstack/react-router npm:@tanstack/router-plugin npm:@tanstack/react-router-devtools
```

Example 4 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
# or
pnpm add @tanstack/react-router @tanstack/react-router-devtools
pnpm add -D @tanstack/router-plugin
# or
yarn add @tanstack/react-router @tanstack/react-router-devtools
yarn add -D @tanstack/router-plugin
# or
bun add @tanstack/react-router @tanstack/react-router-devtools
bun add -D @tanstack/router-plugin
# or
deno add npm:@tanstack/react-router npm:@tanstack/router-plugin npm:@tanstack/react-router-devtools
```

---

## Migration from React Location

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/migrate-from-react-location

**Contents:**
- Differences between React Location and TanStack Router
- Migration guide
  - Step 1: Swap over to TanStack Router's dependencies
  - Step 2: Use the file-based routing watcher
  - Step 3: Add the file-based configuration file to your project
  - Step 4: Create the routes directory
  - Step 5: Create the root route file
  - Step 6: Create the index route file
  - Step 7: Create the posts route file
  - Step 8: Create the posts index route file

Before you begin your journey in migrating from React Location, it's important that you have a good understanding of the Routing Concepts and Design Decisions used by TanStack Router.

React Location and TanStack Router share much of same design decisions concepts, but there are some key differences that you should be aware of.

In this guide we'll go over the process of migrating the React Location Basic example over to TanStack Router using file-based routing, with the end goal of having the same functionality as the original example (styling and other non-routing related code will be omitted).

To use a code-based approach for defining your routes, you can read the code-based Routing guide.

First, we need to install the dependencies for TanStack Router. For detailed installation instructions, see our How to Install TanStack Router guide.

And remove the React Location dependencies.

If your project uses Vite (or one of the supported bundlers), you can use the TanStack Router plugin to watch for changes in your routes files and automatically update the routes configuration.

Installation of the Vite plugin:

And add it to your vite.config.js:

However, if your application does not use Vite, you use one of our other supported bundlers, or you can use the @tanstack/router-cli package to watch for changes in your routes files and automatically update the routes configuration.

Create a tsr.config.json file in the root of your project with the following content:

You can find the full list of options for the tsr.config.json file here.

Create a routes directory in the src directory of your project.

You will need to move any related components and logic needed for the index route from the src/index.tsx file to the src/routes/index.tsx file.

You will need to move any related components and logic needed for the posts route from the src/index.tsx file to the src/routes/posts.tsx file.

You will need to move any related components and logic needed for the posts index route from the src/index.tsx file to the src/routes/posts.index.tsx file.

You will need to move any related components and logic needed for the posts id route from the src/index.tsx file to the src/routes/posts.$postId.tsx file.

If you are using one of the supported bundlers, the route tree will be generated automatically when you run the dev script.

If you are not using one of the supported bundlers, you can generate the route tree by running the following command:

Once you've generated the r

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/router-devtools
```

Example 2 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/router-devtools
```

Example 3 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/router-devtools
```

Example 4 (unknown):
```unknown
npm install @tanstack/react-router @tanstack/router-devtools
```

---

## Installation with Vite

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/with-vite

**Contents:**
- Ignoring the generated route tree file
- Configuration

To use file-based routing with Vite, you'll need to install the @tanstack/router-plugin package.

Once installed, you'll need to add the plugin to your Vite configuration.

Or, you can clone our Quickstart Vite example and get started.

If you are using the older @tanstack/router-vite-plugin package, you can still continue to use it, as it will be aliased to the @tanstack/router-plugin/vite package. However, we would recommend using the @tanstack/router-plugin package directly.

Now that you've added the plugin to your Vite configuration, you're all set to start using file-based routing with TanStack Router.

If your project is configured to use a linter and/or formatter, you may want to ignore the generated route tree file. This file is managed by TanStack Router and therefore shouldn't be changed by your linter or formatter.

Here are some resources to help you ignore the generated route tree file:

If you are using VSCode, you may experience the route tree file unexpectedly open (with errors) after renaming a route.

You can prevent that from the VSCode settings by marking the file as readonly. Our recommendation is to also exclude it from search results and file watcher with the following settings:

You can use those settings either at a user level or only for a single workspace by creating the file .vscode/settings.json at the root of your project.

When using the TanStack Router Plugin with Vite for File-based routing, it comes with some sane defaults that should work for most projects:

If these defaults work for your project, you don't need to configure anything at all! However, if you need to customize the configuration, you can do so by editing the configuration object passed into the tanstackRouter function.

You can find all the available configuration options in the File-based Routing API Reference.

**Examples:**

Example 1 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 2 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 3 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 4 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

---

## Installation with Esbuild

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/with-esbuild

**Contents:**
- Ignoring the generated route tree file
- Configuration

To use file-based routing with Esbuild, you'll need to install the @tanstack/router-plugin package.

Once installed, you'll need to add the plugin to your configuration.

Or, you can clone our Quickstart Esbuild example and get started.

Now that you've added the plugin to your Esbuild configuration, you're all set to start using file-based routing with TanStack Router.

If your project is configured to use a linter and/or formatter, you may want to ignore the generated route tree file. This file is managed by TanStack Router and therefore shouldn't be changed by your linter or formatter.

Here are some resources to help you ignore the generated route tree file:

If you are using VSCode, you may experience the route tree file unexpectedly open (with errors) after renaming a route.

You can prevent that from the VSCode settings by marking the file as readonly. Our recommendation is to also exclude it from search results and file watcher with the following settings:

You can use those settings either at a user level or only for a single workspace by creating the file .vscode/settings.json at the root of your project.

When using the TanStack Router Plugin with Esbuild for File-based routing, it comes with some sane defaults that should work for most projects:

If these defaults work for your project, you don't need to configure anything at all! However, if you need to customize the configuration, you can do so by editing the configuration object passed into the tanstackRouter function.

You can find all the available configuration options in the File-based Routing API Reference.

**Examples:**

Example 1 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 2 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 3 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 4 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

---

## Installation with Webpack

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/with-webpack

**Contents:**
- Ignoring the generated route tree file
- Configuration

To use file-based routing with Webpack, you'll need to install the @tanstack/router-plugin package.

Once installed, you'll need to add the plugin to your configuration.

Or, you can clone our Quickstart Webpack example and get started.

Now that you've added the plugin to your Webpack configuration, you're all set to start using file-based routing with TanStack Router.

If your project is configured to use a linter and/or formatter, you may want to ignore the generated route tree file. This file is managed by TanStack Router and therefore shouldn't be changed by your linter or formatter.

Here are some resources to help you ignore the generated route tree file:

If you are using VSCode, you may experience the route tree file unexpectedly open (with errors) after renaming a route.

You can prevent that from the VSCode settings by marking the file as readonly. Our recommendation is to also exclude it from search results and file watcher with the following settings:

You can use those settings either at a user level or only for a single workspace by creating the file .vscode/settings.json at the root of your project.

When using the TanStack Router Plugin with Webpack for File-based routing, it comes with some sane defaults that should work for most projects:

If these defaults work for your project, you don't need to configure anything at all! However, if you need to customize the configuration, you can do so by editing the configuration object passed into the tanstackRouter function.

You can find all the available configuration options in the File-based Routing API Reference.

**Examples:**

Example 1 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 2 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 3 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 4 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

---

## Installation with Router CLI

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/with-router-cli

**Contents:**
- Using the generate command
- Using the watch command
- Ignoring the generated route tree file
- Configuration

You should only use the TanStack Router CLI if you are not using a supported bundler. The CLI only supports the generation of the route tree file and does not provide any other features.

To use file-based routing with the TanStack Router CLI, you'll need to install the @tanstack/router-cli package.

Once installed, you'll need to amend your scripts in your package.json for the CLI to watch and generate files.

You shouldn't forget to ignore the generated route tree file. Head over to the Ignoring the generated route tree file section to learn more.

With the CLI installed, the following commands are made available via the tsr command

Generates the routes for a project based on the provided configuration.

Continuously watches the specified directories and regenerates routes as needed.

With file-based routing enabled, whenever you start your application in development mode, TanStack Router will watch your configured routesDirectory and generate your route tree whenever a file is added, removed, or changed.

If your project is configured to use a linter and/or formatter, you may want to ignore the generated route tree file. This file is managed by TanStack Router and therefore shouldn't be changed by your linter or formatter.

Here are some resources to help you ignore the generated route tree file:

If you are using VSCode, you may experience the route tree file unexpectedly open (with errors) after renaming a route.

You can prevent that from the VSCode settings by marking the file as readonly. Our recommendation is to also exclude it from search results and file watcher with the following settings:

You can use those settings either at a user level or only for a single workspace by creating the file .vscode/settings.json at the root of your project.

When using the TanStack Router CLI for File-based routing, it comes with some sane defaults that should work for most projects:

If these defaults work for your project, you don't need to configure anything at all! However, if you need to customize the configuration, you can do so by creating a tsr.config.json file in the root of your project directory.

You can find all the available configuration options in the File-based Routing API Reference.

**Examples:**

Example 1 (unknown):
```unknown
npm install -D @tanstack/router-cli
```

Example 2 (unknown):
```unknown
npm install -D @tanstack/router-cli
```

Example 3 (unknown):
```unknown
npm install -D @tanstack/router-cli
```

Example 4 (unknown):
```unknown
npm install -D @tanstack/router-cli
```

---

## Installation with Rspack

**URL:** https://tanstack.com/router/latest/docs/framework/react/installation/with-rspack

**Contents:**
- Ignoring the generated route tree file
- Configuration

To use file-based routing with Rspack or Rsbuild, you'll need to install the @tanstack/router-plugin package.

Once installed, you'll need to add the plugin to your configuration.

Or, you can clone our Quickstart Rspack/Rsbuild example and get started.

Now that you've added the plugin to your Rspack/Rsbuild configuration, you're all set to start using file-based routing with TanStack Router.

If your project is configured to use a linter and/or formatter, you may want to ignore the generated route tree file. This file is managed by TanStack Router and therefore shouldn't be changed by your linter or formatter.

Here are some resources to help you ignore the generated route tree file:

If you are using VSCode, you may experience the route tree file unexpectedly open (with errors) after renaming a route.

You can prevent that from the VSCode settings by marking the file as readonly. Our recommendation is to also exclude it from search results and file watcher with the following settings:

You can use those settings either at a user level or only for a single workspace by creating the file .vscode/settings.json at the root of your project.

When using the TanStack Router Plugin with Rspack (or Rsbuild) for File-based routing, it comes with some sane defaults that should work for most projects:

If these defaults work for your project, you don't need to configure anything at all! However, if you need to customize the configuration, you can do so by editing the configuration object passed into the tanstackRouter function.

You can find all the available configuration options in the File-based Routing API Reference.

**Examples:**

Example 1 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 2 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 3 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

Example 4 (unknown):
```unknown
npm install -D @tanstack/router-plugin
```

---

## Quick Start

**URL:** https://tanstack.com/router/latest/docs/framework/react/quick-start

**Contents:**
- TanStack Router Installation
  - Requirements
  - Download and Install
- New Project Setup
  - Routing Options
    - File-Based Route Generation
    - Code-Based Route Configuration

TanStack Router can be quickly added to any existing React project or used to scaffold a new one.

Before installing TanStack router, please ensure your project meets the following requirements:

Using TypeScript (v5.3.x or higher) is recommended for the best development experience, though not strictly required. We aim to support the last 5 minor versions of TypeScript, but using the latest version will help avoid potential issues.

TanStack Router is currently only compatible with React (with ReactDOM) and Solid. If you're interested in contributing to support other frameworks, such as React Native, Angular, or Vue, please reach out to us on Discord.

To install TanStack Router in your project, run the following command using your preferred package manager:

Once installed, you can verify the installation by checking your package.json file for the dependency.

To quickly scaffold a new project with TanStack Router, you can use the create-tsrouter-app command-line tool. This tool sets up a new React application with TanStack Router pre-configured, allowing you to get started quickly.

For full details on available options and templates, visit the create-tsrouter-app documentation.

To create a new project, run the following command in your terminal:

The CLI will guide you through a short series of prompts to customize your setup, including options for:

Once complete, a new React project will be generated with TanStack Router installed and ready to use. All dependencies are automatically installed, so you can jump straight into development:

TanStack Router supports both file-based and code-based route configurations, allowing you to choose the approach that best fits your workflow.

The file-based approach is the recommended option for most projects. It automatically creates routes based on your file structure, giving you the best mix of performance, simplicity, and developer experience.

To create a new project using file-based route generation, run the following command:

This command sets up a new directory called my-app with everything configured. Once setup completes, you can then start your development server and begin building your application:

If you prefer to define routes programmatically, you can use the code-based route configuration. This approach gives you full control over routing logic while maintaining the same project scaffolding workflow.

Similar to the file-based setup, this command creates a new directory called my-app with TanStac

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/react-router
# or
pnpm add @tanstack/react-router
#or
yarn add @tanstack/react-router
# or
bun add @tanstack/react-router
# or
deno add npm:@tanstack/react-router
```

Example 2 (unknown):
```unknown
npm install @tanstack/react-router
# or
pnpm add @tanstack/react-router
#or
yarn add @tanstack/react-router
# or
bun add @tanstack/react-router
# or
deno add npm:@tanstack/react-router
```

Example 3 (unknown):
```unknown
npm install @tanstack/react-router
# or
pnpm add @tanstack/react-router
#or
yarn add @tanstack/react-router
# or
bun add @tanstack/react-router
# or
deno add npm:@tanstack/react-router
```

Example 4 (unknown):
```unknown
npm install @tanstack/react-router
# or
pnpm add @tanstack/react-router
#or
yarn add @tanstack/react-router
# or
bun add @tanstack/react-router
# or
deno add npm:@tanstack/react-router
```

---
