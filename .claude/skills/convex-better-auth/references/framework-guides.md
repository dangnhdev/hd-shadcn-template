# Convex-Better-Auth - Framework-Guides

**Pages:** 5

---

## Sveltekit

**URL:** https://convex-better-auth.netlify.app/framework-guides/sveltekit

**Contents:**
- Sveltekit
- Prerequisites
  - Install convex
  - Customize the convex path
  - Set up a Convex dev deployment
  - Add $convex alias
- Installation
  - Install packages
  - Register the component
  - Add Convex auth config

Install and configure Convex + Better Auth for Sveltekit.

Sveltekit support is currently community maintained, and relies on the @mmailaender/convex-better-auth-svelte package. A complete working example is provided in the repo, and any issues can be reported there as well.

You'll first need a project where Convex is already set-up. Ensure that all steps in prerequisites are completed.

SvelteKit doesn't like referencing code outside of source, so customize the convex functionsDir to be under src/.

Next, run npx convex dev. This will prompt you to log in with GitHub, create a project, and save your production and deployment URLs.

It will also create a src/convex/ folder for you to write your backend API functions in. The dev command will then continue running to sync your functions with your dev deployment in the cloud.

Add the following to your svelte.config.js file:

Install the component, a pinned version of Better Auth, and ensure the latest version of Convex.

Register the Better Auth component in your Convex project.

Add a src/convex/auth.config.ts file to configure Better Auth as an authentication provider.

Generate a secret for encryption and generating hashes. Use the command below if you have openssl installed, or generate your own however you like.

Add your site URL to your Convex deployment.

Add environment variables to the .env.local file created by npx convex dev. It will be picked up by your framework dev server.

Create a Better Auth instance and initialize the component.

Create a Better Auth client instance for interacting with the Better Auth server from your client.

Register Better Auth route handlers on your Convex deployment.

Set up route handlers to proxy auth requests from your framework server to your Convex deployment.

Initialize the Convex client with auth in your app. Note: createSvelteAuthClient includes already setupConvex() from convex-svelte.

To use Better Auth in server load functions, form actions, and other server-side code, you need to extract the authentication token from cookies and make it available throughout your server code.

Set up a SvelteKit hook to automatically extract the auth token on every request. This uses the getToken helper which reads the authentication cookie and validates it.

Add the token type to your app's type definitions. This enables TypeScript support for event.locals.token in your server code.

With this setup, event.locals.token is now available in all server load functions (+pa

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npm install convex convex-svelte
```

Example 2 (unknown):
```unknown
{
  "functions": "src/convex/"
}
```

Example 3 (unknown):
```unknown
npx convex dev
```

Example 4 (python):
```python
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more informa
...
```

---

## React (Vite SPA)

**URL:** https://convex-better-auth.netlify.app/framework-guides/react

**Contents:**
- React (Vite SPA)
- Installation
  - Install packages
  - Register the component
  - Add Convex auth config
  - Set environment variables
  - Create a Better Auth instance
  - Create a Better Auth client instance
  - Mount handlers
  - Set up Convex client provider

Install and configure Convex + Better Auth for React.

Check out a complete Convex + Better Auth example with React in the GitHub repo.

Install the component, a pinned version of Better Auth, and ensure the latest version of Convex.

Register the Better Auth component in your Convex project.

Add a convex/auth.config.ts file to configure Better Auth as an authentication provider.

Generate a secret for encryption and generating hashes. Use the command below if you have openssl installed, or use the button to generate a random value instead. Or generate your own however you like.

Add your site URL to your Convex deployment.

Add environment variables to the .env.local file created by npx convex dev. It will be picked up by your framework dev server.

Create a Better Auth instance and initialize the component.

Create a Better Auth client instance for interacting with the Better Auth server from your client.

Register Better Auth route handlers on your Convex deployment.

Wrap your app with the ConvexBetterAuthProvider component.

You're now ready to start using Better Auth with Convex.

Check out the Basic Usage guide for more information on general usage. Below are usage notes specific to React SPAs.

Social sign-in for React SPAs works the same as with full stack frameworks, but the authorized redirect URI is based on your Convex site URL instead of your application domain.

For example, with Google sign-in, the authorized redirect URI would look like:

Getting Started with Better Auth and Convex

Install and configure Convex + Better Auth for Expo.

**Examples:**

Example 1 (unknown):
```unknown
npm install convex@latest @convex-dev/better-auth
npm install better-auth@1.3.27 --save-exact
```

Example 2 (python):
```python
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

Example 3 (unknown):
```unknown
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
```

Example 4 (unknown):
```unknown
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

---

## Next.js

**URL:** https://convex-better-auth.netlify.app/framework-guides/next

**Contents:**
- Next.js
- Installation
  - Install packages
  - Register the component
  - Add Convex auth config
  - Set environment variables
  - Create a Better Auth instance
  - Create a Better Auth client instance
  - Mount handlers
  - Set up Convex client provider

Install and configure Convex + Better Auth for Next.js.

Check out a complete Convex + Better Auth example with Next.js in the GitHub repo.

Install the component, a pinned version of Better Auth, and ensure the latest version of Convex.

Register the Better Auth component in your Convex project.

Add a convex/auth.config.ts file to configure Better Auth as an authentication provider.

Generate a secret for encryption and generating hashes. Use the command below if you have openssl installed, or generate your own however you like.

Add your site URL to your Convex deployment.

Add environment variables to the .env.local file created by npx convex dev. It will be picked up by your framework dev server.

Create a Better Auth instance and initialize the component.

Create a Better Auth client instance for interacting with the Better Auth server from your client.

Register Better Auth route handlers on your Convex deployment.

Set up route handlers to proxy auth requests from your framework server to your Convex deployment.

Wrap your app with the ConvexBetterAuthProvider component.

You're now ready to start using Better Auth with Convex.

Check out the Basic Usage guide for more information on general usage. Below are usage notes specific to Next.js.

To use Better Auth's server methods in server rendering, server functions, or any other Next.js server code, use Convex functions and call the function from your server code.

First, a token helper for calling Convex functions from your server code.

Here's an example Convex function that uses Better Auth's server methods, and a server action that calls the Convex function.

Install and configure Convex + Better Auth for TanStack Start.

Install and configure Convex + Better Auth for Sveltekit.

**Examples:**

Example 1 (unknown):
```unknown
npm install convex@latest @convex-dev/better-auth
npm install better-auth@1.3.27 --save-exact
```

Example 2 (python):
```python
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

Example 3 (unknown):
```unknown
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
```

Example 4 (unknown):
```unknown
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

---

## Expo (React Native)

**URL:** https://convex-better-auth.netlify.app/framework-guides/expo

**Contents:**
- Expo (React Native)
- Installation
  - Install packages
  - Install additional Expo dependencies
  - Register the component
  - Add Convex auth config
  - Set environment variables
  - Create a Better Auth instance
  - Create a Better Auth client instance
  - Mount handlers

Install and configure Convex + Better Auth for Expo.

Install the component, a pinned version of Better Auth, and ensure the latest version of Convex.

expo-secure-store is used for secure cookie storage.

Register the Better Auth component in your Convex project.

Add a convex/auth.config.ts file to configure Better Auth as an authentication provider.

Generate a secret for encryption and generating hashes. Use the command below if you have openssl installed, or use the button to generate a random value instead. Or generate your own however you like.

Add environment variables to the .env.local file created by npx convex dev. It will be picked up by your framework dev server.

Create a Better Auth instance and initialize the component.

Create a Better Auth client instance for interacting with the Better Auth server from your client.

Register Better Auth route handlers on your Convex deployment.

Wrap your app with the ConvexBetterAuthProvider component.

The Expo integration for Better Auth requires a few involved steps that could change over time. Follow steps 3, 6, and 7 of their Expo integration guide.

You're now ready to start using Better Auth with Convex.

Check out the Basic Usage guide for more information on general usage. Below are usage notes specific to Expo.

Social sign-in for Expo works the same as with full stack frameworks, but the authorized origin and redirect URI are based on your Convex site URL instead of your application domain.

For example, with Google sign-in, the authorized origin and redirect URI would look like:

To use Expo Web along with Expo/Expo Go, you'll need to follow a few additional steps.

To use Expo Web, follow step 4 of the React guide to add your Expo Web site URL as the SITE_URL environment variable.

Add the site URL and the cross-domain plugin to the Better Auth instance.

Add { cors: true } to the Better Auth route handlers:

Finally, add the cross-domain client plugin to the Better Auth client instance.

Note that the expoClient and crossDomainClient plugins cannot both be included in the client instance at the same time.

Install and configure Convex + Better Auth for React.

Install and configure Convex + Better Auth for TanStack Start.

**Examples:**

Example 1 (unknown):
```unknown
npm install convex@latest @convex-dev/better-auth
npm install better-auth@1.3.27 @better-auth/expo@1.3.27 --save-exact
```

Example 2 (unknown):
```unknown
npx expo install expo-secure-store
```

Example 3 (python):
```python
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

Example 4 (unknown):
```unknown
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

## TanStack Start

**URL:** https://convex-better-auth.netlify.app/framework-guides/tanstack-start

**Contents:**
- TanStack Start
- Installation
  - Install packages
  - Register the component
  - Add Convex auth config
  - Set environment variables
  - Create a Better Auth instance
  - Create a Better Auth client instance
  - Mount handlers
  - Set up root route

Install and configure Convex + Better Auth for TanStack Start.

Check out a complete Convex + Better Auth example with TanStack Start in the GitHub repo.

Install the component, a pinned version of Better Auth, and ensure the latest version of Convex.

Register the Better Auth component in your Convex project.

Add a convex/auth.config.ts file to configure Better Auth as an authentication provider.

Generate a secret for encryption and generating hashes. Use the command below if you have openssl installed, or use the button to generate a random value instead. Or generate your own however you like.

Add your site URL to your Convex deployment.

Add environment variables to the .env.local file created by npx convex dev. It will be picked up by your framework dev server.

Create a Better Auth instance and initialize the component.

Create a Better Auth client instance for interacting with the Better Auth server from your client.

Register Better Auth route handlers on your Convex deployment.

Set up route handlers to proxy auth requests from TanStack Start to your Convex deployment.

Wrap your application root with ConvexBetterAuthProvider and make auth available in loaders.

Provide context from Convex to your routes.

You're now ready to start using Better Auth with Convex.

Check out the Basic Usage guide for more information on general usage. Below are usage notes specific to TanStack Start.

To use Better Auth's server methods in server rendering, server functions, or any other TanStack Start server code, use Convex functions and call the function from your server code.

First, export helpers for calling Convex functions from your server code.

Here's an example Convex function that uses Better Auth's server methods, and a TanStack server function that calls the Convex function.

Install and configure Convex + Better Auth for Expo.

Install and configure Convex + Better Auth for Next.js.

**Examples:**

Example 1 (unknown):
```unknown
npm install convex@latest @convex-dev/better-auth
npm install better-auth@1.3.27 --save-exact
```

Example 2 (python):
```python
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

Example 3 (unknown):
```unknown
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
```

Example 4 (unknown):
```unknown
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

---
