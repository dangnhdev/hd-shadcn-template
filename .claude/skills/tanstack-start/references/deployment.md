# Tanstack-Start - Deployment

**Pages:** 1

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
