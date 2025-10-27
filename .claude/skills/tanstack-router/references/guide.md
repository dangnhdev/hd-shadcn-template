# Tanstack-Router - Guide

**Pages:** 29

---

## Automatic Code Splitting

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/automatic-code-splitting

**Contents:**
- How does it work?
  - The transformation process
  - What gets code split?
  - Rules of Splitting
    - Do not export route properties
- Granular control
  - Global code splitting behavior (defaultBehavior)
  - Advanced programmatic control (splitBehavior)
  - Per-route overrides (codeSplitGroupings)
  - Configuration order matters

The automatic code splitting feature in TanStack Router allows you to optimize your application's bundle size by lazily loading route components and their associated data. This is particularly useful for large applications where you want to minimize the initial load time by only loading the necessary code for the current route.

To turn this feature on, simply set the autoCodeSplitting option to true in your bundler plugin configuration. This enables the router to automatically handle code splitting for your routes without requiring any additional setup.

But that's just the beginning! TanStack Router's automatic code splitting is not only easy to enable, but it also provides powerful customization options to tailor how your routes are split into chunks. This allows you to optimize your application's performance based on your specific needs and usage patterns.

TanStack Router's automatic code splitting works by transforming your route files both during 'development' and at 'build' time. It rewrites the route definitions to use lazy-loading wrappers for components and loaders, which allows the bundler to group these properties into separate chunks.

A chunk is a file that contains a portion of your application's code, which can be loaded on demand. This helps reduce the initial load time of your application by only loading the code that is needed for the current route.

So when your application loads, it doesn't include all the code for every route. Instead, it only includes the code for the routes that are initially needed. As users navigate through your application, additional chunks are loaded on demand.

This happens seamlessly, without requiring you to manually split your code or manage lazy loading. The TanStack Router bundler plugin takes care of everything, ensuring that your routes are optimized for performance right out of the box.

When you enable automatic code splitting, the bundler plugin does this by using static code analysis look at your the code in your route files to transform them into optimized outputs.

This transformation process produces two key outputs when each of your route files are processed:

This process ensures that your original code remains clean and readable, while the actual bundled output is optimized for initial bundle size.

The decision of what to split into separate chunks is crucial for optimizing your application's performance. TanStack Router uses a concept called "Split Groupings" to determine how different part

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true, // Enable automatic code splitting
    }),
  ],
})
```

Example 2 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true, // Enable automatic code splitting
    }),
  ],
})
```

Example 3 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true, // Enable automatic code splitting
    }),
  ],
})
```

Example 4 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true, // Enable automatic code splitting
    }),
  ],
})
```

---

## Custom Link

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/custom-link

**Contents:**
- createLink for cross-cutting concerns
  - Basic example
- createLink with third party libraries
  - React Aria Components example
  - Chakra UI example
  - MUI example
    - Link
    - Button
    - Usage with styled
  - Mantine example

While repeating yourself can be acceptable in many situations, you might find that you do it too often. At times, you may want to create cross-cutting components with additional behavior or styles. You might also consider using third-party libraries in combination with TanStack Router's type safety.

createLink creates a custom Link component with the same type parameters as Link. This means you can create your own component which provides the same type safety and typescript performance as Link.

If you want to create a basic custom link component, you can do so with the following:

You can then use your newly created Link component as any other Link

Here are some examples of how you can use createLink with third-party libraries.

React Aria Components v1.11.0 and later works with TanStack Router's preload (intent) prop. Use createLink to wrap each React Aria component that you use as a link.

To use React Aria's render props, including the className, style, and children functions, create a wrapper component and pass that to createLink.

There is an example available which uses these patterns.

If the MUI Link should simply behave like the router Link, it can be just wrapped with createLink:

If the Link should be customized this approach can be used:

If a Button should be used as a router Link, the component should be set as a:

Any of these MUI approaches can then be used with styled:

**Examples:**

Example 1 (python):
```python
import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => {
    return (
      <a ref={ref} {...props} className={'block px-3 py-2 text-blue-700'} />
    )
  },
)

const CreatedLinkComponent = createLink(BasicLinkComponent)

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  
...
```

Example 2 (python):
```python
import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => {
    return (
      <a ref={ref} {...props} className={'block px-3 py-2 text-blue-700'} />
    )
  },
)

const CreatedLinkComponent = createLink(BasicLinkComponent)

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  
...
```

Example 3 (python):
```python
import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => {
    return (
      <a ref={ref} {...props} className={'block px-3 py-2 text-blue-700'} />
    )
  },
)

const CreatedLinkComponent = createLink(BasicLinkComponent)

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  
...
```

Example 4 (python):
```python
import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => {
    return (
      <a ref={ref} {...props} className={'block px-3 py-2 text-blue-700'} />
    )
  },
)

const CreatedLinkComponent = createLink(BasicLinkComponent)

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  
...
```

---

## Type Utilities

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/type-utilities

**Contents:**
- Type checking Link options with ValidateLinkOptions
- Type checking an array of Link options with ValidateLinkOptionsArray
- Type checking redirect options with ValidateRedirectOptions
- Type checking navigate options with ValidateNavigateOptions

Most types exposed by TanStack Router are internal, subject to breaking changes and not always easy to use. That is why TanStack Router has a subset of exposed types focused on ease of use with the intension to be used externally. These types provide the same type safe experience from TanStack Router's runtime concepts on the type level, with flexibility of where to provide type checking

ValidateLinkOptions type checks object literal types to ensure they conform to Link options at inference sites. For example, you may have a generic HeadingLink component which accepts a title prop along with linkOptions, the idea being this component can be re-used for any navigation.

A more permissive overload of HeadingLink is used to avoid type assertions you would otherwise have to do with the generic signature. Using a looser signature without type parameters is an easy way to avoid type assertions in the implementation of HeadingLink

All type parameters for utilities are optional but for the best TypeScript performance TRouter should always be specified for the public facing signature. And TOptions should always be used at inference sites like HeadingLink to infer the linkOptions to correctly narrow params and search

The result of this is that linkOptions in the following is completely type-safe

All navigation type utilities have an array variant. ValidateLinkOptionsArray enables type checking of an array of Link options. For example, you might have a generic Menu component where each item is a Link.

This of course allows the following items prop to be completely type-safe

It is also possible to fix from for each Link options in the array. This would allow all Menu items to navigate relative to from. Additional type checking of from can be provided by the ValidateFromPath utility

ValidateLinkOptionsArray allows you to fix from by providing an extra type parameter. The result is a type safe array of Link options providing navigation relative to from

ValidateRedirectOptions type checks object literal types to ensure they conform to redirect options at inference sites. For example, you may need a generic fetchOrRedirect function which accepts a url along with redirectOptions, the idea being this function will redirect when the fetch fails.

The result is that redirectOptions passed to fetchOrRedirect is completely type-safe

ValidateNavigateOptions type checks object literal types to ensure they conform to navigate options at inference sites. For example, you m

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
export interface HeaderLinkProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  title: string
  linkOptions: ValidateLinkOptions<TRouter, TOptions>
}

export function HeadingLink<TRouter extends RegisteredRouter, TOptions>(
  props: HeaderLinkProps<TRouter, TOptions>,
): React.ReactNode
export function HeadingLink(props: HeaderLinkProps): React.ReactNode {
  return (
    <>
      <h1>{props.title}</h1>
      <Link {...props.linkOptions} />
    </>
  )
}
```

Example 2 (unknown):
```unknown
export interface HeaderLinkProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  title: string
  linkOptions: ValidateLinkOptions<TRouter, TOptions>
}

export function HeadingLink<TRouter extends RegisteredRouter, TOptions>(
  props: HeaderLinkProps<TRouter, TOptions>,
): React.ReactNode
export function HeadingLink(props: HeaderLinkProps): React.ReactNode {
  return (
    <>
      <h1>{props.title}</h1>
      <Link {...props.linkOptions} />
    </>
  )
}
```

Example 3 (unknown):
```unknown
export interface HeaderLinkProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  title: string
  linkOptions: ValidateLinkOptions<TRouter, TOptions>
}

export function HeadingLink<TRouter extends RegisteredRouter, TOptions>(
  props: HeaderLinkProps<TRouter, TOptions>,
): React.ReactNode
export function HeadingLink(props: HeaderLinkProps): React.ReactNode {
  return (
    <>
      <h1>{props.title}</h1>
      <Link {...props.linkOptions} />
    </>
  )
}
```

Example 4 (unknown):
```unknown
export interface HeaderLinkProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  title: string
  linkOptions: ValidateLinkOptions<TRouter, TOptions>
}

export function HeadingLink<TRouter extends RegisteredRouter, TOptions>(
  props: HeaderLinkProps<TRouter, TOptions>,
): React.ReactNode
export function HeadingLink(props: HeaderLinkProps): React.ReactNode {
  return (
    <>
      <h1>{props.title}</h1>
      <Link {...props.linkOptions} />
    </>
  )
}
```

---

## External Data Loading

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading

**Contents:**
- To Store or to Coordinate?
- What data fetching libraries are supported?
- Using Loaders to ensure data is loaded
- A more realistic example using TanStack Query
  - Error handling with TanStack Query
- SSR Dehydration/Hydration
- Critical Dehydration/Hydration

This guide is geared towards external state management libraries and their integration with TanStack Router for data fetching, ssr, hydration/dehydration and streaming. If you haven't read the standard Data Loading guide, please do so first.

While Router is very capable of storing and managing most data needs out of the box, sometimes you just might want something more robust!

Router is designed to be a perfect coordinator for external data fetching and caching libraries. This means that you can use any data fetching/caching library you want, and the router will coordinate the loading of your data in a way that aligns with your users' navigation and expectations of freshness.

Any data fetching library that supports asynchronous promises can be used with TanStack Router. This includes:

Literally any library that can return a promise and read/write data can be integrated.

The easiest way to integrate external caching/data library into Router is to use route.loaders to ensure that the data required inside of a route has been loaded and is ready to be displayed.

⚠️ BUT WHY? It's very important to preload your critical render data in the loader for a few reasons:

Here is a naive illustration (don't do this) of using a Route's loader option to seed the cache for some data:

This example is obviously flawed, but illustrates the point that you can use a route's loader option to seed your cache with data. Let's take a look at a more realistic example using TanStack Query.

Let's take a look at a more realistic example using TanStack Query.

When an error occurs while using suspense with TanStack Query, you need to let queries know that you want to try again when re-rendering. This can be done by using the reset function provided by the useQueryErrorResetBoundary hook. You can invoke this function in an effect as soon as the error component mounts. This will make sure that the query is reset and will try to fetch data again when the route component is rendered again. This will also cover cases where users navigate away from the route instead of clicking the retry button.

Tools that are able can integrate with TanStack Router's convenient Dehydration/Hydration APIs to shuttle dehydrated data between the server and client and rehydrate it where needed. Let's go over how to do this with both 3rd party critical data and 3rd party deferred data.

For critical data needed for the first render/paint, TanStack Router supports dehydrate and hydrate options when confi

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
// src/routes/posts.tsx
let postsCache = []

export const Route = createFileRoute('/posts')({
  loader: async () => {
    postsCache = await fetchPosts()
  },
  component: () => {
    return (
      <div>
        {postsCache.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )
  },
})
```

Example 2 (javascript):
```javascript
// src/routes/posts.tsx
let postsCache = []

export const Route = createFileRoute('/posts')({
  loader: async () => {
    postsCache = await fetchPosts()
  },
  component: () => {
    return (
      <div>
        {postsCache.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )
  },
})
```

Example 3 (javascript):
```javascript
// src/routes/posts.tsx
let postsCache = []

export const Route = createFileRoute('/posts')({
  loader: async () => {
    postsCache = await fetchPosts()
  },
  component: () => {
    return (
      <div>
        {postsCache.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )
  },
})
```

Example 4 (javascript):
```javascript
// src/routes/posts.tsx
let postsCache = []

export const Route = createFileRoute('/posts')({
  loader: async () => {
    postsCache = await fetchPosts()
  },
  component: () => {
    return (
      <div>
        {postsCache.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )
  },
})
```

---

## Type Safety

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/type-safety

**Contents:**
- Route Definitions
  - File-based Routing
  - Code-based Routing
- Exported Hooks, Components, and Utilities
- Fixing the Component Context Problem
  - What if I don't know the route? What if it's a shared component?
  - What if I pass the wrong from path?
  - What if I don't know the route, or it's a shared component, and I can't pass from?
- Router Context
- Performance Recommendations

TanStack Router is built to be as type-safe as possible within the limits of the TypeScript compiler and runtime. This means that it's not only written in TypeScript, but that it also fully infers the types it's provided and tenaciously pipes them through the entire routing experience.

Ultimately, this means that you write less types as a developer and have more confidence in your code as it evolves.

Routes are hierarchical, and so are their definitions. If you're using file-based routing, much of the type-safety is already taken care of for you.

If you're using the Route class directly, you'll need to be aware of how to ensure your routes are typed properly using the Route's getParentRoute option. This is because child routes need to be aware of all of their parent routes types. Without this, those precious search params you parsed out of your layout and pathless layout routes, 3 levels up, would be lost to the JS void.

So, don't forget to pass the parent route to your child routes!

For the types of your router to work with top-level exports like Link, useNavigate, useParams, etc. they must permeate the type-script module boundary and be registered right into the library. To do this, we use declaration merging on the exported Register interface.

By registering your router with the module, you can now use the exported hooks, components, and utilities with your router's exact types.

Component context is a wonderful tool in React and other frameworks for providing dependencies to components. However, if that context is changing types as it moves throughout your component hierarchy, it becomes impossible for TypeScript to know how to infer those changes. To get around this, context-based hooks and components require that you give them a hint on how and where they are being used.

Every hook and component that requires a context hint will have a from param where you can pass the ID or path of the route you are rendering within.

🧠 Quick tip: If your component is code-split, you can use the getRouteApi function to avoid having to pass in the Route.fullPath to get access to the typed useParams() and useSearch() hooks.

The from property is optional, which means if you don't pass it, you'll get the router's best guess on what types will be available. Usually, that means you'll get a union of all of the types of all of the routes in the router.

It's technically possible to pass a from that satisfies TypeScript, but may not match the actual route you are re

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const parentRoute = createRoute({
  getParentRoute: () => parentRoute,
})
```

Example 2 (javascript):
```javascript
const parentRoute = createRoute({
  getParentRoute: () => parentRoute,
})
```

Example 3 (javascript):
```javascript
const parentRoute = createRoute({
  getParentRoute: () => parentRoute,
})
```

Example 4 (javascript):
```javascript
const parentRoute = createRoute({
  getParentRoute: () => parentRoute,
})
```

---

## SSR

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/ssr

**Contents:**
- Non-Streaming SSR
  - Automatic Server History
  - Automatic Loader Dehydration/Hydration
  - Router Creation
  - Rendering the Application on the Server
- Rendering the Application on the Client
- Streaming SSR
- Streaming Dehydration/Hydration
- Data Serialization

While every effort has been made to separate these APIs from changes to Tanstack Start, there are underlying shared implementations internally. Therefore these can be subject to change and should be regarded as experimental until Start reaches stable status.

Server Side Rendering (SSR) is the process of rendering a component on the server and sending the HTML markup to the client. The client then hydrates the markup into a fully interactive component.

There are usually two different flavors of SSR to be considered:

This guide will explain how to implement both flavors of SSR with TanStack Router!

Non-Streaming server-side rendering is the classic process of rendering the markup for your entire application page on the server and sending the completed HTML markup (and data) to the client. The client then hydrates the markup into a fully interactive application again.

To implement non-streaming SSR with TanStack Router, you will need the following utilities:

On the client, Router defaults to using an instance of createBrowserHistory, which is the preferred type of history to use on the client. On the server, however, you will want to use an instance of createMemoryHistory instead. This is because createBrowserHistory uses the window object, which does not exist on the server. This is handled automatically for you in the RouterServer component.

Resolved loader data fetched by routes is automatically dehydrated and rehydrated by TanStack Router so long as you complete the standard SSR steps outlined in this guide.

⚠️ If you are using deferred data streaming, you will also need to ensure that you have implemented the SSR Streaming & Stream Transform pattern near the end of this guide.

For more information on how to utilize data loading, see the Data Loading guide.

Since your router will exist both on the server and the client, it's important that you create your router in a way that is consistent between both of these environments. The easiest way to do this is to expose a createRouter function in a shared file that can be imported and called by both your server and client entry files.

Now that you have a router instance that has loaded all the critical data for the current URL, you can render your application on the server:

using defaultRenderHandler

using renderRouterToString

NOTE: The createRequestHandler method requires a web api standard Request object, while the handler method will return a web api standard Response promise.

Should you be us

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// src/router.tsx
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanstackRouter({ routeTree })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

Example 2 (python):
```python
// src/router.tsx
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanstackRouter({ routeTree })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

Example 3 (python):
```python
// src/router.tsx
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanstackRouter({ routeTree })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

Example 4 (python):
```python
// src/router.tsx
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanstackRouter({ routeTree })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

---

## Render Optimizations

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/render-optimizations

**Contents:**
- structural sharing
- fine-grained selectors
  - structural sharing with fine-grained selectors
    - Enable it by default in the router options:
    - Enable it per hook usage as shown here:

TanStack Router includes several optimizations to ensure your components only re-render when necessary. These optimizations include:

TanStack Router uses a technique called "structural sharing" to preserve as many references as possible between re-renders, which is particularly useful for state stored in the URL, such as search parameters.

For example, consider a details route with two search parameters, foo and bar, accessed like this:

When only bar is changed by navigating from /details?foo=f1&bar=b1 to /details?foo=f1&bar=b2, search.foo will be referentially stable and only search.bar will be replaced.

You can access and subscribe to the router state using various hooks like useRouterState, useSearch, and others. If you only want a specific component to re-render when a particular subset of the router state such as a subset of the search parameters changes, you can use partial subscriptions with the select property.

The select function can perform various calculations on the router state, allowing you to return different types of values, such as objects. For example:

Although this works, it will cause your component to re-render each time, since select is now returning a new object each time it’s called.

You can avoid this re-rendering issue by using "structural sharing" as described above. By default, structural sharing is turned off to maintain backward compatibility, but this may change in v2.

To enable structural sharing for fine grained selectors, you have two options:

Structural sharing only works with JSON-compatible data. This means you cannot use select to return items like class instances if structural sharing is enabled.

In line with TanStack Router's type-safe design, TypeScript will raise an error if you attempt the following:

If structural sharing is enabled by default in the router options, you can prevent this error by setting structuralSharing: false.

**Examples:**

Example 1 (javascript):
```javascript
const search = Route.useSearch()
```

Example 2 (javascript):
```javascript
const search = Route.useSearch()
```

Example 3 (javascript):
```javascript
const search = Route.useSearch()
```

Example 4 (javascript):
```javascript
const search = Route.useSearch()
```

---

## Path Params

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/path-params

**Contents:**
- Path Params can be used by child routes
- Path Params in Loaders
- Path Params in Components
- Path Params outside of Routes
- Navigating with Path Params
- Prefixes and Suffixes for Path Params
  - Defining Prefixes
  - Defining Suffixes
  - Combining Prefixes and Suffixes
- Optional Path Parameters

Path params are used to match a single segment (the text until the next /) and provide its value back to you as a named variable. They are defined by using the $ character prefix in the path, followed by the key variable to assign it to. The following are valid path param paths:

Because path param routes only match to the next /, child routes can be created to continue expressing hierarchy:

Let's create a post route file that uses a path param to match the post ID:

Once a path param has been parsed, it is available to all child routes. This means that if we define a child route to our postRoute, we can use the postId variable from the URL in the child route's path!

Path params are passed to the loader as a params object. The keys of this object are the names of the path params, and the values are the values that were parsed out of the actual URL path. For example, if we were to visit the /blog/123 URL, the params object would be { postId: '123' }:

The params object is also passed to the beforeLoad option:

If we add a component to our postRoute, we can access the postId variable from the URL by using the route's useParams hook:

🧠 Quick tip: If your component is code-split, you can use the getRouteApi function to avoid having to import the Route configuration to get access to the typed useParams() hook.

You can also use the globally exported useParams hook to access any parsed path params from any component in your app. You'll need to pass the strict: false option to useParams, denoting that you want to access the params from an ambiguous location:

When navigating to a route with path params, TypeScript will require you to pass the params either as an object or as a function that returns an object of params.

Let's see what an object style looks like:

And here's what a function style looks like:

Notice that the function style is useful when you need to persist params that are already in the URL for other routes. This is because the function style will receive the current params as an argument, allowing you to modify them as needed and return the final params object.

You can also use prefixes and suffixes with path params to create more complex routing patterns. This allows you to match specific URL structures while still capturing the dynamic segments.

When using either prefixes or suffixes, you can define them by wrapping the path param in curly braces {} and placing the prefix or suffix before or after the variable name.

Prefixes are defined 

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
})
```

Example 2 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
})
```

Example 3 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
})
```

Example 4 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    return fetchPost(params.postId)
  },
})
```

---

## Preloading

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/preloading

**Contents:**
- Supported Preloading Strategies
- How long does preloaded data stay in memory?
- Preload Delay
- Built-in Preloading & preloadStaleTime
- Preloading with External Libraries
- Preloading Manually

Preloading in TanStack Router is a way to load a route before the user actually navigates to it. This is useful for routes that are likely to be visited by the user next. For example, if you have a list of posts and the user is likely to click on one of them, you can preload the post route so that it's ready to go when the user clicks on it.

Preloaded route matches are temporarily cached in memory with a few important caveats:

If you need more control over preloading, caching and/or garbage collection of preloaded data, you should use an external caching library like TanStack Query.

The simplest way to preload routes for your application is to set the defaultPreload option to intent for your entire router:

This will turn on intent preloading by default for all <Link> components in your application. You can also set the preload prop on individual <Link> components to override the default behavior.

By default, preloading will start after 50ms of the user hovering or touching a <Link> component. You can change this delay by setting the defaultPreloadDelay option on your router:

You can also set the preloadDelay prop on individual <Link> components to override the default behavior on a per-link basis.

If you're using the built-in loaders, you can control how long preloaded data is considered fresh until another preload is triggered by setting either routerOptions.defaultPreloadStaleTime or routeOptions.preloadStaleTime to a number of milliseconds. By default, preloaded data is considered fresh for 30 seconds..

To change this, you can set the defaultPreloadStaleTime option on your router:

Or, you can use the routeOptions.preloadStaleTime option on individual routes:

When integrating external caching libraries like React Query, which have their own mechanisms for determining stale data, you may want to override the default preloading and stale-while-revalidate logic of TanStack Router. These libraries often use options like staleTime to control the freshness of data.

To customize the preloading behavior in TanStack Router and fully leverage your external library's caching strategy, you can bypass the built-in caching by setting routerOptions.defaultPreloadStaleTime or routeOptions.preloadStaleTime to 0. This ensures that all preloads are marked as stale internally, and loaders are always invoked, allowing your external library, such as React Query, to manage data loading and caching.

This would then allow you, for instance, to use an option like Reac

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  defaultPreload: 'intent',
})
```

Example 2 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  defaultPreload: 'intent',
})
```

Example 3 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  defaultPreload: 'intent',
})
```

Example 4 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  defaultPreload: 'intent',
})
```

---

## Code Splitting

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting

**Contents:**
- How does TanStack Router split code?
- Encapsulating a route's files into a directory
- Approaches to code splitting
- Using automatic code-splitting✨
- Using the .lazy.tsx suffix
  - Example code splitting with .lazy.tsx
- Using Virtual Routes
- Code-Based Splitting
- Data Loader Splitting
- Manually accessing Route APIs in other files with the getRouteApi helper

Code splitting and lazy loading is a powerful technique for improving the bundle size and load performance of an application.

TanStack Router separates code into two categories:

Critical Route Configuration - The code that is required to render the current route and kick off the data loading process as early as possible.

Non-Critical/Lazy Route Configuration - The code that is not required to match the route, and can be loaded on-demand.

🧠 Why is the loader not split?

The loader is already an asynchronous boundary, so you pay double to both get the chunk and wait for the loader to execute.

Categorically, it is less likely to contribute to a large bundle size than a component.

The loader is one of the most important preloadable assets for a route, especially if you're using a default preload intent, like hovering over a link, so it's important for the loader to be available without any additional async overhead.

Knowing the disadvantages of splitting the loader, if you still want to go ahead with it, head over to the Data Loader Splitting section.

Since TanStack Router's file-based routing system is designed to support both flat and nested file structures, it's possible to encapsulate a route's files into a single directory without any additional configuration.

To encapsulate a route's files into a directory, move the route file itself into a .route file within a directory with the same name as the route file.

For example, if you have a route file named posts.tsx, you would create a new directory named posts and move the posts.tsx file into that directory, renaming it to route.tsx.

TanStack Router supports multiple approaches to code splitting. If you are using code-based routing, skip to the Code-Based Splitting section.

When you are using file-based routing, you can use the following approaches to code splitting:

This is the easiest and most powerful way to code split your route files.

When using the autoCodeSplitting feature, TanStack Router will automatically code split your route files based on the non-critical route configuration mentioned above.

The automatic code-splitting feature is ONLY available when you are using file-based routing with one of our supported bundlers. This will NOT work if you are only using the CLI (@tanstack/router-cli).

To enable automatic code-splitting, you just need to add the following to the configuration of your TanStack Router Bundler Plugin:

That's it! TanStack Router will automatically code-split all

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      // ...
      autoCodeSplitting: true,
    }),
    react(), // Make sure to add this plugin after the TanStack Router Bundler plugin
  ],
})
```

Example 2 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      // ...
      autoCodeSplitting: true,
    }),
    react(), // Make sure to add this plugin after the TanStack Router Bundler plugin
  ],
})
```

Example 3 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      // ...
      autoCodeSplitting: true,
    }),
    react(), // Make sure to add this plugin after the TanStack Router Bundler plugin
  ],
})
```

Example 4 (python):
```python
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      // ...
      autoCodeSplitting: true,
    }),
    react(), // Make sure to add this plugin after the TanStack Router Bundler plugin
  ],
})
```

---

## Not Found Errors

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors

**Contents:**
- Overview
- The notFoundMode option
  - notFoundMode: 'fuzzy'
  - notFoundMode: 'root'
- Configuring a route's notFoundComponent
- Default Router-Wide Not Found Handling
- Throwing your own notFound errors
- Specifying Which Routes Handle Not Found Errors
  - Manually targeting the root route
  - Throwing Not Found Errors in Components

⚠️ This page covers the newer notFound function and notFoundComponent API for handling not found errors. The NotFoundRoute route is deprecated and will be removed in a future release. See Migrating from NotFoundRoute for more information.

There are 2 uses for not-found errors in TanStack Router:

Under the hood, both of these cases are implemented using the same notFound function and notFoundComponent API.

When TanStack Router encounters a pathname that doesn't match any known route pattern OR partially matches a route pattern but with extra trailing pathname segments, it will automatically throw a not-found error.

Depending on the notFoundMode option, the router will handle these automatic errors differently::

By default, the router's notFoundMode is set to fuzzy, which indicates that if a pathname doesn't match any known route, the router will attempt to use the closest matching route with children/(an outlet) and a configured not found component.

❓ Why is this the default? Fuzzy matching to preserve as much parent layout as possible for the user gives them more context to navigate to a useful location based on where they thought they would arrive.

The nearest suitable route is found using the following criteria:

For example, consider the following route tree:

If provided the path of /posts/1/edit, the following component structure will be rendered:

The notFoundComponent of the posts route will be rendered because it is the nearest suitable parent route with children (and therefore an outlet) and a notFoundComponent configured.

When notFoundMode is set to root, all not-found errors will be handled by the root route's notFoundComponent instead of bubbling up from the nearest fuzzy-matched route.

For example, consider the following route tree:

If provided the path of /posts/1/edit, the following component structure will be rendered:

The notFoundComponent of the __root__ route will be rendered because the notFoundMode is set to root.

To handle both types of not-found errors, you can attach a notFoundComponent to a route. This component will be rendered when a not-found error is thrown.

For example, configuring a notFoundComponent for a /settings route to handle non-existing settings pages:

Or configuring a notFoundComponent for a /posts/$postId route to handle posts that don't exist:

You may want to provide a default not-found component for every route in your app with child routes.

Why only routes with children? Leaf-node routes (routes w

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
export const Route = createFileRoute('/settings')({
  component: () => {
    return (
      <div>
        <p>Settings page</p>
        <Outlet />
      </div>
    )
  },
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>
  },
})
```

Example 2 (javascript):
```javascript
export const Route = createFileRoute('/settings')({
  component: () => {
    return (
      <div>
        <p>Settings page</p>
        <Outlet />
      </div>
    )
  },
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>
  },
})
```

Example 3 (javascript):
```javascript
export const Route = createFileRoute('/settings')({
  component: () => {
    return (
      <div>
        <p>Settings page</p>
        <Outlet />
      </div>
    )
  },
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>
  },
})
```

Example 4 (javascript):
```javascript
export const Route = createFileRoute('/settings')({
  component: () => {
    return (
      <div>
        <p>Settings page</p>
        <Outlet />
      </div>
    )
  },
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>
  },
})
```

---

## Creating a Router

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/creating-a-router

**Contents:**
- The Router Class
- Route Tree
  - Filesystem Route Tree
  - Code-Based Route Tree
- Router Type Safety
- 404 Not Found Route
- Other Options

When you're ready to start using your router, you'll need to create a new Router instance. The router instance is the core brains of TanStack Router and is responsible for managing the route tree, matching routes, and coordinating navigations and route transitions. It also serves as a place to configure router-wide settings.

You'll probably notice quickly that the Router constructor requires a routeTree option. This is the route tree that the router will use to match routes and render components.

Whether you used file-based routing or code-based routing, you'll need to pass your route tree to the createRouter function:

If you used our recommended file-based routing, then it's likely your generated route tree file was created at the default src/routeTree.gen.ts location. If you used a custom location, then you'll need to import your route tree from that location.

If you used code-based routing, then you likely created your route tree manually using the root route's addChildren method:

DO NOT SKIP THIS SECTION! ⚠️

TanStack Router provides amazing support for TypeScript, even for things you wouldn't expect like bare imports straight from the library! To make this possible, you must register your router's types using TypeScripts' Declaration Merging feature. This is done by extending the Register interface on @tanstack/react-router with a router property that has the type of your router instance:

With your router registered, you'll now get type-safety across your entire project for anything related to routing.

As promised in earlier guides, we'll now cover the notFoundRoute option. This option is used to configure a route that will render when no other suitable match is found. This is useful for rendering a 404 page or redirecting to a default route.

If you are using either file-based or code-based routing, then you'll need to add a notFoundComponent key to createRootRoute:

There are many other options that can be passed to the Router constructor. You can find a full list of them in the API Reference.

**Examples:**

Example 1 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
})
```

Example 2 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
})
```

Example 3 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
})
```

Example 4 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
})
```

---

## Authenticated Routes

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes

**Contents:**
- The route.beforeLoad Option
- Redirecting
- Non-Redirected Authentication
- Authentication using React context/hooks
- Related How-To Guides
- Examples

Authentication is an extremely common requirement for web applications. In this guide, we'll walk through how to use TanStack Router to build protected routes, and how to redirect users to login if they try to access them.

The route.beforeLoad option allows you to specify a function that will be called before a route is loaded. It receives all of the same arguments that the route.loader function does. This is a great place to check if a user is authenticated, and redirect them to a login page if they are not.

The beforeLoad function runs in relative order to these other route loading functions:

It's important to know that the beforeLoad function for a route is called before any of its child routes' beforeLoad functions. It is essentially a middleware function for the route and all of its children.

If you throw an error in beforeLoad, none of its children will attempt to load.

While not required, some authentication flows require redirecting to a login page. To do this, you can throw a redirect() from beforeLoad:

The redirect() function takes all of the same options as the navigate function, so you can pass options like replace: true if you want to replace the current history entry instead of adding a new one.

Once you have authenticated a user, it's also common practice to redirect them back to the page they were trying to access. To do this, you can utilize the redirect search param that we added in our original redirect. Since we'll be replacing the entire URL with what it was, router.history.push is better suited for this than router.navigate:

Some applications choose to not redirect users to a login page, and instead keep the user on the same page and show a login form that either replaces the main content or hides it via a modal. This is also possible with TanStack Router by simply short circuiting rendering the <Outlet /> that would normally render the child routes:

This keeps the user on the same page, but still allows you to render a login form. Once the user is authenticated, you can simply render the <Outlet /> and the child routes will be rendered.

If your authentication flow relies on interactions with React context and/or hooks, you'll need to pass down your authentication state to TanStack Router using router.context option.

React hooks are not meant to be consumed outside of React components. If you need to use a hook outside of a React component, you need to extract the returned state from the hook in a component that wraps your 

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})
```

Example 2 (javascript):
```javascript
// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})
```

Example 3 (javascript):
```javascript
// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})
```

Example 4 (javascript):
```javascript
// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})
```

---

## Navigation

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/navigation

**Contents:**
- Everything is Relative
- Shared Navigation API
  - ToOptions Interface
  - NavigateOptions Interface
  - LinkOptions Interface
- Navigation API
- <Link> Component
  - Absolute Links
  - Dynamic Links
  - Relative Links

Believe it or not, every navigation within an app is relative, even if you aren't using explicit relative path syntax (../../somewhere). Any time a link is clicked or an imperative navigation call is made, you will always have an origin path and a destination path which means you are navigating from one route to another route.

TanStack Router keeps this constant concept of relative navigation in mind for every navigation, so you'll constantly see two properties in the API:

⚠️ If a from route path isn't provided the router will assume you are navigating from the root / route and only auto-complete absolute paths. After all, you need to know where you are from in order to know where you're going 😉.

Every navigation and route matching API in TanStack Router uses the same core interface with minor differences depending on the API. This means that you can learn navigation and route matching once and use the same syntax and concepts across the library.

This is the core ToOptions interface that is used in every navigation and route matching API:

🧠 Every route object has a to property, which can be used as the to for any navigation or route matching API. Where possible, this will allow you to avoid plain strings and use type-safe route references instead:

This is the core NavigateOptions interface that extends ToOptions. Any API that is actually performing a navigation will use this interface:

Anywhere an actual <a> tag the LinkOptions interface which extends NavigateOptions will be available:

With relative navigation and all of the interfaces in mind now, let's talk about the different flavors of navigation API at your disposal:

⚠️ None of these APIs are a replacement for server-side redirects. If you need to redirect a user immediately from one route to another before mounting your application, use a server-side redirect instead of a client-side navigation.

The Link component is the most common way to navigate within an app. It renders an actual <a> tag with a valid href attribute which can be clicked or even cmd/ctrl + clicked to open in a new tab. It also supports any normal <a> attributes including target to open links in new windows, etc.

In addition to the LinkOptions interface, the Link component also supports the following props:

Let's make a simple static link!

Dynamic links are links that have dynamic segments in them. For example, a link to a blog post might look like this:

Keep in mind that normally dynamic segment params are string valu

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
type ToOptions<
  TRouteTree extends AnyRoute = AnyRoute,
  TFrom extends RoutePaths<TRouteTree> | string = string,
  TTo extends string = '',
> = {
  // `from` is an optional route ID or path. If it is not supplied, only absolute paths will be auto-completed and type-safe. It's common to supply the route.fullPath of the origin route you are rendering from for convenience. If you don't know the origin route, leave this empty and work with absolute paths or unsafe relative paths.
  from?: string
  // `to` can be an absolute route path or a relative path from the `from` option to a valid route p
...
```

Example 2 (javascript):
```javascript
type ToOptions<
  TRouteTree extends AnyRoute = AnyRoute,
  TFrom extends RoutePaths<TRouteTree> | string = string,
  TTo extends string = '',
> = {
  // `from` is an optional route ID or path. If it is not supplied, only absolute paths will be auto-completed and type-safe. It's common to supply the route.fullPath of the origin route you are rendering from for convenience. If you don't know the origin route, leave this empty and work with absolute paths or unsafe relative paths.
  from?: string
  // `to` can be an absolute route path or a relative path from the `from` option to a valid route p
...
```

Example 3 (javascript):
```javascript
type ToOptions<
  TRouteTree extends AnyRoute = AnyRoute,
  TFrom extends RoutePaths<TRouteTree> | string = string,
  TTo extends string = '',
> = {
  // `from` is an optional route ID or path. If it is not supplied, only absolute paths will be auto-completed and type-safe. It's common to supply the route.fullPath of the origin route you are rendering from for convenience. If you don't know the origin route, leave this empty and work with absolute paths or unsafe relative paths.
  from?: string
  // `to` can be an absolute route path or a relative path from the `from` option to a valid route p
...
```

Example 4 (javascript):
```javascript
type ToOptions<
  TRouteTree extends AnyRoute = AnyRoute,
  TFrom extends RoutePaths<TRouteTree> | string = string,
  TTo extends string = '',
> = {
  // `from` is an optional route ID or path. If it is not supplied, only absolute paths will be auto-completed and type-safe. It's common to supply the route.fullPath of the origin route you are rendering from for convenience. If you don't know the origin route, leave this empty and work with absolute paths or unsafe relative paths.
  from?: string
  // `to` can be an absolute route path or a relative path from the `from` option to a valid route p
...
```

---

## Route Masking

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/route-masking

**Contents:**
- How does route masking work?
- How do I use route masking?
  - Imperative route masking
  - Declarative route masking
- Unmasking when sharing the URL
- Local Unmasking Defaults
- Unmasking on page reload

Route masking is a way to mask the actual URL of a route that gets persisted to the browser's history and URL bar. This is useful for scenarios where you want to show a different URL than the one that is actually being navigated to and then falling back to the displayed URL when it is shared and (optionally) when the page is reloaded. Here's a few examples:

Each of these scenarios can be achieved with route masking and even extended to support more advanced patterns like parallel routes.

You do not need to understand how route masking works in order to use it. This section is for those who are curious about how it works under the hood. Skip to How do I use route masking? to learn how to use it!.

Route masking utilizes the location.state API to store the desired runtime location inside of the location that will get written to the URL. It stores this runtime location under the __tempLocation state property:

When the router parses a location from history with the location.state.__tempLocation property, it will use that location instead of the one that was parsed from the URL. This allows you to navigate to a route like /photos/5 and have the router actually navigate to /photo/5/modal instead. When this happens, the history location is saved back into the location.maskedLocation property, just in case we need to know what the actual URL is. One example of where this is used is in the Devtools where we detect if a route is masked and show the actual URL instead of the masked one!

Remember, you don't need to worry about any of this. It's all handled for you automatically under the hood!

Route masking is a simple API that can be used in 2 ways:

When using either route masking APIs, the mask option accepts the same navigation object that the <Link> and navigate() APIs accept. This means you can use the same to, replace, state, and search options that you're already familiar with. The only difference is that the mask option will be used to mask the URL of the route being navigated to.

🧠 The mask option is also type-safe! This means that if you're using TypeScript, you'll get type errors if you try to pass an invalid navigation object to the mask option. Booyah!

The <Link> and navigate() APIs both accept a mask option that can be used to mask the URL of the route being navigated to. Here's an example of using it with the <Link> component:

And here's an example of using it with the navigate() API:

In addition to the imperative API, you can also use the Rou

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const location = {
  pathname: '/photos/5',
  search: '',
  hash: '',
  state: {
    key: 'wesdfs',
    __tempKey: 'sadfasd',
    __tempLocation: {
      pathname: '/photo/5/modal',
      search: '',
      hash: '',
      state: {},
    },
  },
}
```

Example 2 (javascript):
```javascript
const location = {
  pathname: '/photos/5',
  search: '',
  hash: '',
  state: {
    key: 'wesdfs',
    __tempKey: 'sadfasd',
    __tempLocation: {
      pathname: '/photo/5/modal',
      search: '',
      hash: '',
      state: {},
    },
  },
}
```

Example 3 (javascript):
```javascript
const location = {
  pathname: '/photos/5',
  search: '',
  hash: '',
  state: {
    key: 'wesdfs',
    __tempKey: 'sadfasd',
    __tempLocation: {
      pathname: '/photo/5/modal',
      search: '',
      hash: '',
      state: {},
    },
  },
}
```

Example 4 (javascript):
```javascript
const location = {
  pathname: '/photos/5',
  search: '',
  hash: '',
  state: {
    key: 'wesdfs',
    __tempKey: 'sadfasd',
    __tempLocation: {
      pathname: '/photo/5/modal',
      search: '',
      hash: '',
      state: {},
    },
  },
}
```

---

## Parallel Routes

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/parallel-routes

We haven't covered this yet. Stay tuned!

---

## Link Options

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/link-options

**Contents:**
  - Using linkOptions function to create re-usable options
  - An array of linkOptions

You may want to reuse options that are intended to be passed to Link, redirect or navigate. In which case you may decide an object literal is a good way to represent options passed to Link.

There are a few problems here. dashboardLinkOptions.to is inferred as string which by default will resolve to every route when passed to Link, navigate or redirect (this particular issue could be fixed by as const). The other issue here is we do not know dashboardLinkOptions even passes the type checker until it is spread into Link. We could very easily create incorrect navigation options and only when the options are spread into Link do we know there is a type error.

linkOptions is a function which type checks an object literal and returns the inferred input as is. This provides type safety on options exactly like Link before it is used allowing for easier maintenance and re-usability. Our above example using linkOptions looks like this:

This allows eager type checking of dashboardLinkOptions which can then be re-used anywhere

When creating navigation you might loop over an array to construct a navigation bar. In which case linkOptions can be used to type check an array of object literals which are intended for Link props

The input of linkOptions is inferred and returned, as shown with the use of label as this does not exist on Link props

**Examples:**

Example 1 (javascript):
```javascript
const dashboardLinkOptions = {
  to: '/dashboard',
  search: { search: '' },
}

function DashboardComponent() {
  return <Link {...dashboardLinkOptions} />
}
```

Example 2 (javascript):
```javascript
const dashboardLinkOptions = {
  to: '/dashboard',
  search: { search: '' },
}

function DashboardComponent() {
  return <Link {...dashboardLinkOptions} />
}
```

Example 3 (javascript):
```javascript
const dashboardLinkOptions = {
  to: '/dashboard',
  search: { search: '' },
}

function DashboardComponent() {
  return <Link {...dashboardLinkOptions} />
}
```

Example 4 (javascript):
```javascript
const dashboardLinkOptions = {
  to: '/dashboard',
  search: { search: '' },
}

function DashboardComponent() {
  return <Link {...dashboardLinkOptions} />
}
```

---

## Static Route Data

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/static-route-data

**Contents:**
- Example
- Enforcing Static Data
- Optional Static Data

When creating routes, you can optionally specify a staticData property in the route's options. This object can literally contain anything you want as long as it's synchronously available when you create your route.

In addition to being able to access this data from the route itself, you can also access it from any match under the match.staticData property.

You can then access this data anywhere you have access to your routes, including matches that can be mapped back to their routes.

If you want to enforce that a route has static data, you can use declaration merging to add a type to the route's static option:

Now, if you try to create a route without the customData property, you'll get a type error:

If you want to make static data optional, simply add a ? to the property:

As long as there are any required properties on the StaticDataRouteOption, you'll be required to pass in an object.

**Examples:**

Example 1 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  staticData: {
    customData: 'Hello!',
  },
})
```

Example 2 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  staticData: {
    customData: 'Hello!',
  },
})
```

Example 3 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  staticData: {
    customData: 'Hello!',
  },
})
```

Example 4 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  staticData: {
    customData: 'Hello!',
  },
})
```

---

## Deferred Data Loading

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/deferred-data-loading

**Contents:**
- Deferred Data Loading with Await
- Deferred Data Loading with External libraries
- Caching and Invalidation
- SSR & Streaming Deferred Data
- SSR Streaming Lifecycle

TanStack Router is designed to run loaders in parallel and wait for all of them to resolve before rendering the next route. This is great most of the time, but occasionally, you may want to show the user something sooner while the rest of the data loads in the background.

Deferred data loading is a pattern that allows the router to render the next location's critical data/markup while slower, non-critical route data is resolved in the background. This process works on both the client and server (via streaming) and is a great way to improve the perceived performance of your application.

If you are using a library like TanStack Query or any other data fetching library, then deferred data loading works a bit differently. Skip ahead to the Deferred Data Loading with External Libraries section for more information.

To defer slow or non-critical data, return an unawaited/unresolved promise anywhere in your loader response:

As soon as any awaited promises are resolved, the next route will begin rendering while the deferred promises continue to resolve.

In the component, deferred promises can be resolved and utilized using the Await component:

If your component is code-split, you can use the getRouteApi function to avoid having to import the Route configuration to get access to the typed useLoaderData() hook.

The Await component resolves the promise by triggering the nearest suspense boundary until it is resolved, after which it renders the component's children as a function with the resolved data.

If the promise is rejected, the Await component will throw the serialized error, which can be caught by the nearest error boundary.

In React 19, you can use the use() hook instead of Await

When your strategy for fetching information for the route relies on External Data Loading with an external library like TanStack Query, deferred data loading works a bit differently, as the library handles the data fetching and caching for you outside of TanStack Router.

So, instead of using defer and Await, you'll instead want to use the Route's loader to kick off the data fetching and then use the library's hooks to access the data in your components.

Then in your component, you can use the library's hooks to access the data:

Streamed promises follow the same lifecycle as the loader data they are associated with. They can even be preloaded!

Streaming requires a server that supports it and for TanStack Router to be configured to use it properly.

Please read the entire 

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// src/routes/posts.$postId.tsx
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async () => {
    // Fetch some slower data, but do not await it
    const slowDataPromise = fetchSlowData()

    // Fetch and await some data that resolves quickly
    const fastData = await fetchFastData()

    return {
      fastData,
      deferredSlowData: slowDataPromise,
    }
  },
})
```

Example 2 (python):
```python
// src/routes/posts.$postId.tsx
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async () => {
    // Fetch some slower data, but do not await it
    const slowDataPromise = fetchSlowData()

    // Fetch and await some data that resolves quickly
    const fastData = await fetchFastData()

    return {
      fastData,
      deferredSlowData: slowDataPromise,
    }
  },
})
```

Example 3 (python):
```python
// src/routes/posts.$postId.tsx
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async () => {
    // Fetch some slower data, but do not await it
    const slowDataPromise = fetchSlowData()

    // Fetch and await some data that resolves quickly
    const fastData = await fetchFastData()

    return {
      fastData,
      deferredSlowData: slowDataPromise,
    }
  },
})
```

Example 4 (python):
```python
// src/routes/posts.$postId.tsx
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async () => {
    // Fetch some slower data, but do not await it
    const slowDataPromise = fetchSlowData()

    // Fetch and await some data that resolves quickly
    const fastData = await fetchFastData()

    return {
      fastData,
      deferredSlowData: slowDataPromise,
    }
  },
})
```

---

## Router Context

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/router-context

**Contents:**
- Typed Router Context
- Passing the initial Router Context
  - Invalidating the Router Context
- Using the Router Context
  - How about an external data fetching library?
- How about using React Context/Hooks?
- Modifying the Router Context
- Processing Accumulated Route Context

TanStack Router's router context is a very powerful tool that can be used for dependency injection among many other things. Aptly named, the router context is passed through the router and down through each matching route. At each route in the hierarchy, the context can be modified or added to. Here's a few ways you might use the router context practically:

These are just suggested uses of the router context. You can use it for whatever you want!

Like everything else, the root router context is strictly typed. This type can be augmented via any route's beforeLoad option as it is merged down the route match tree. To constrain the type of the root router context, you must use the createRootRouteWithContext<YourContextTypeHere>()(routeOptions) function to create a new router context instead of the createRootRoute() function to create your root route. Here's an example:

MyRouterContext only needs to contain content that will be passed directly to createRouter below. All other context added in beforeLoad will be inferred.

The router context is passed to the router at instantiation time. You can pass the initial router context to the router via the context option:

If your context has any required properties, you will see a TypeScript error if you don't pass them in the initial router context. If all of your context properties are optional, you will not see a TypeScript error and passing the context will be optional. If you don't pass a router context, it defaults to {}.

If you need to invalidate the context state you are passing into the router, you can call the invalidate method to tell the router to recompute the context. This is useful when you need to update the context state and have the router recompute the context for all routes.

Once you have defined the router context type, you can use it in your route definitions:

You can even inject data fetching and mutation implementations themselves! In fact, this is highly recommended 😜

Let's try this with a simple function to fetch some todos:

When trying to use React Context or Hooks in your route's beforeLoad or loader functions, it's important to remember React's Rules of Hooks. You can't use hooks in a non-React function, so you can't use hooks in your beforeLoad or loader functions.

So, how do we use React Context or Hooks in our route's beforeLoad or loader functions? We can use the router context to pass down the React Context or Hooks to our route's beforeLoad or loader functions.

Let's look a

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'

interface MyRouterContext {
  user: User
}

// Use the routerContext to create your root route
const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

const routeTree = rootRoute.addChildren([
  // ...
])

// Use the routerContext to create your router
const router = createRouter({
  routeTree,
})
```

Example 2 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'

interface MyRouterContext {
  user: User
}

// Use the routerContext to create your root route
const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

const routeTree = rootRoute.addChildren([
  // ...
])

// Use the routerContext to create your router
const router = createRouter({
  routeTree,
})
```

Example 3 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'

interface MyRouterContext {
  user: User
}

// Use the routerContext to create your root route
const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

const routeTree = rootRoute.addChildren([
  // ...
])

// Use the routerContext to create your router
const router = createRouter({
  routeTree,
})
```

Example 4 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'

interface MyRouterContext {
  user: User
}

// Use the routerContext to create your root route
const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

const routeTree = rootRoute.addChildren([
  // ...
])

// Use the routerContext to create your router
const router = createRouter({
  routeTree,
})
```

---

## Scroll Restoration

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/scroll-restoration

**Contents:**
- Hash/Top-of-Page Scrolling
- Scroll-to-top & Nested Scrollable Areas
- Scroll Restoration
- Custom Cache Keys
- Examples
- Preventing Scroll Restoration
- Manual Scroll Restoration
- Scroll Behavior

Out of the box, TanStack Router supports both hash scrolling and top-of-page scrolling without any additional configuration.

By default, scroll-to-top mimics the behavior of the browser, which means only the window itself is scrolled to the top after successful navigation. For many apps however, it's common for the main scrollable area to be a nested div or similar because of advanced layouts. If you would like TanStack Router to also scroll these main scrollable areas for you, you can add selectors to target them using the routerOptions.scrollToTopSelectors:

For complex selectors that cannot be simply resolved using document.querySelector(selector), you can pass functions that return HTML elements to routerOptions.scrollToTopSelectors:

These selectors are handled in addition to window which cannot be disabled currently.

Scroll restoration is the process of restoring the scroll position of a page when the user navigates back to it. This is normally a built-in feature for standard HTML based websites, but can be difficult to replicate for SPA applications because:

Not only that, but it's very common for applications to have multiple scrollable areas within an app, not just the body. For example, a chat application might have a scrollable sidebar and a scrollable chat area. In this case, you would want to restore the scroll position of both areas independently.

To alleviate this problem, TanStack Router provides a scroll restoration component and hook that handle the process of monitoring, caching and restoring scroll positions for you.

That may sound like a lot, but for you, it's as simple as this:

The <ScrollRestoration /> component still works, but has been deprecated.

Falling in behind Remix's own Scroll Restoration APIs, you can also customize the key used to cache scroll positions for a given scrollable area using the getKey option. This could be used, for example, to force the same scroll position to be used regardless of the users browser history.

The getKey option receives the relevant Location state from TanStack Router and expects you to return a string to uniquely identify the scrollable measurements for that state.

The default getKey is (location) => location.state.__TSR_key!, where __TSR_key is the unique key generated for each entry in the history.

Older versions, prior to v1.121.34, used state.key as the default key, but this has been deprecated in favor of state.__TSR_key. For now, location.state.key will still be available for c

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const router = createRouter({
  scrollToTopSelectors: ['#main-scrollable-area'],
})
```

Example 2 (javascript):
```javascript
const router = createRouter({
  scrollToTopSelectors: ['#main-scrollable-area'],
})
```

Example 3 (javascript):
```javascript
const router = createRouter({
  scrollToTopSelectors: ['#main-scrollable-area'],
})
```

Example 4 (javascript):
```javascript
const router = createRouter({
  scrollToTopSelectors: ['#main-scrollable-area'],
})
```

---

## Document Head Management

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management

**Contents:**
- Managing the Document Head
  - Deduping
  - <HeadContent />
  - Start/Full-Stack Applications
  - Single-Page Applications
- Managing Body Scripts
  - <Scripts />
  - Example

Document head management is the process of managing the head, title, meta, link, and script tags of a document and TanStack Router provides a robust way to manage the document head for full-stack applications that use Start and for single-page applications that use @tanstack/react-router. It provides:

For full-stack applications that use Start, and even for single-page applications that use @tanstack/react-router, managing the document head is a crucial part of any application for the following reasons:

To manage the document head, it's required that you render both the <HeadContent /> and <Scripts /> components and use the routeOptions.head property to manage the head of a route, which returns an object with title, meta, links, styles, and scripts properties.

Out of the box, TanStack Router will dedupe title and meta tags, preferring the last occurrence of each tag found in nested routes.

The <HeadContent /> component is required to render the head, title, meta, link, and head-related script tags of a document.

It should be rendered either in the <head> tag of your root layout or as high up in the component tree as possible if your application doesn't or can't manage the <head> tag.

First, remove the <title> tag from the the index.html if you have set any.

In addition to scripts that can be rendered in the <head> tag, you can also render scripts in the <body> tag using the routeOptions.scripts property. This is useful for loading scripts (even inline scripts) that require the DOM to be loaded, but before the main entry point of your application (which includes hydration if you're using Start or a full-stack implementation of TanStack Router).

To do this, you must:

The <Scripts /> component is required to render the body scripts of a document. It should be rendered either in the <body> tag of your root layout or as high up in the component tree as possible if your application doesn't or can't manage the <body> tag.

**Examples:**

Example 1 (javascript):
```javascript
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'My App is a web application',
      },
      {
        title: 'My App',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    styles: [
      {
        media: 'all and (max-width: 500px)',
        children: `p {
                  color: blue;
                  background-color: yellow;
                }`,
      },
    ],
    scripts: [
      {
        src: 'https://www.google-analytics.com/analytics.js',
      },
    ],
...
```

Example 2 (javascript):
```javascript
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'My App is a web application',
      },
      {
        title: 'My App',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    styles: [
      {
        media: 'all and (max-width: 500px)',
        children: `p {
                  color: blue;
                  background-color: yellow;
                }`,
      },
    ],
    scripts: [
      {
        src: 'https://www.google-analytics.com/analytics.js',
      },
    ],
...
```

Example 3 (javascript):
```javascript
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'My App is a web application',
      },
      {
        title: 'My App',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    styles: [
      {
        media: 'all and (max-width: 500px)',
        children: `p {
                  color: blue;
                  background-color: yellow;
                }`,
      },
    ],
    scripts: [
      {
        src: 'https://www.google-analytics.com/analytics.js',
      },
    ],
...
```

Example 4 (javascript):
```javascript
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'My App is a web application',
      },
      {
        title: 'My App',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    styles: [
      {
        media: 'all and (max-width: 500px)',
        children: `p {
                  color: blue;
                  background-color: yellow;
                }`,
      },
    ],
    scripts: [
      {
        src: 'https://www.google-analytics.com/analytics.js',
      },
    ],
...
```

---

## Navigation Blocking

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/navigation-blocking

**Contents:**
- How does navigation blocking work?
- How do I use navigation blocking?
- Hook/logical-based blocking
- Component-based blocking
- How can I show a custom UI?
  - Hook/logical-based custom UI with resolver
  - Hook/logical-based custom UI without resolver
  - Component-based custom UI

Navigation blocking is a way to prevent navigation from happening. This is typical if a user attempts to navigate while they:

In these situations, a prompt or custom UI should be shown to the user to confirm they want to navigate away.

Navigation blocking adds one or more layers of "blockers" to the entire underlying history API. If any blockers are present, navigation will be paused via one of the following ways:

There are 2 ways to use navigation blocking:

Let's imagine we want to prevent navigation if a form is dirty. We can do this by using the useBlocker hook:

shouldBlockFn gives you type safe access to the current and next location:

Note that even if shouldBlockFn returns false, the browser's beforeunload event may still be triggered on page reloads or tab closing. To gain control over this, you can use the enableBeforeUnload option to conditionally register the beforeunload handler:

You can find more information about the useBlocker hook in the API reference.

In addition to logical/hook based blocking, you can use the Block component to achieve similar results:

In most cases, using window.confirm in the shouldBlockFn function with withResolver: false in the hook is enough since it will clearly show the user that the navigation is being blocked and resolve the blocking based on their response.

However, in some situations, you might want to show a custom UI that is intentionally less disruptive and more integrated with your app's design.

Note: The return value of shouldBlockFn does not resolve the blocking if withResolver is true.

Similarly to the hook, the Block component returns the same state and functions as render props:

**Examples:**

Example 1 (python):
```python
import { useBlocker } from '@tanstack/react-router'

function MyComponent() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  useBlocker({
    shouldBlockFn: () => {
      if (!formIsDirty) return false

      const shouldLeave = confirm('Are you sure you want to leave?')
      return !shouldLeave
    },
  })

  // ...
}
```

Example 2 (python):
```python
import { useBlocker } from '@tanstack/react-router'

function MyComponent() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  useBlocker({
    shouldBlockFn: () => {
      if (!formIsDirty) return false

      const shouldLeave = confirm('Are you sure you want to leave?')
      return !shouldLeave
    },
  })

  // ...
}
```

Example 3 (python):
```python
import { useBlocker } from '@tanstack/react-router'

function MyComponent() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  useBlocker({
    shouldBlockFn: () => {
      if (!formIsDirty) return false

      const shouldLeave = confirm('Are you sure you want to leave?')
      return !shouldLeave
    },
  })

  // ...
}
```

Example 4 (python):
```python
import { useBlocker } from '@tanstack/react-router'

function MyComponent() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  useBlocker({
    shouldBlockFn: () => {
      if (!formIsDirty) return false

      const shouldLeave = confirm('Are you sure you want to leave?')
      return !shouldLeave
    },
  })

  // ...
}
```

---

## Outlets

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/outlets

**Contents:**
- The Outlet Component

Nested routing means that routes can be nested within other routes, including the way they render. So how do we tell our routes where to render this nested content?

The Outlet component is used to render the next potentially matching child route. <Outlet /> doesn't take any props and can be rendered anywhere within a route's component tree. If there is no matching child route, <Outlet /> will render null.

If a route's component is left undefined, it will render an <Outlet /> automatically.

A great example is configuring the root route of your application. Let's give our root route a component that renders a title, then an <Outlet /> for our top-level routes to render.

**Examples:**

Example 1 (python):
```python
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <h1>My App</h1>
      <Outlet /> {/* This is where child routes will render */}
    </div>
  )
}
```

Example 2 (python):
```python
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <h1>My App</h1>
      <Outlet /> {/* This is where child routes will render */}
    </div>
  )
}
```

Example 3 (python):
```python
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <h1>My App</h1>
      <Outlet /> {/* This is where child routes will render */}
    </div>
  )
}
```

Example 4 (python):
```python
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <h1>My App</h1>
      <Outlet /> {/* This is where child routes will render */}
    </div>
  )
}
```

---

## Data Loading

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/data-loading

**Contents:**
- The route loading lifecycle
- To Router Cache or not to Router Cache?
- Using the Router Cache
- Route loaders
- loader Parameters
- Consuming data from loaders
- Dependency-based Stale-While-Revalidate Caching
  - Key options
  - ⚠️ Some Important Defaults
  - Using loaderDeps to access search params

Data loading is a common concern for web applications and is related to routing. When loading a page for your app, it's ideal if all of the page's async requirements are fetched and fulfilled as early as possible, in parallel. The router is the best place to coordinate these async dependencies as it's usually the only place in your app that knows where users are headed before content is rendered.

You may be familiar with getServerSideProps from Next.js or loaders from Remix/React-Router. TanStack Router has similar functionality to preload/load assets on a per-route basis in parallel allowing it to render as quickly as possible as it fetches via suspense.

Beyond these normal expectations of a router, TanStack Router goes above and beyond and provides built-in SWR Caching, a long-term in-memory caching layer for route loaders. This means that you can use TanStack Router to both preload data for your routes so they load instantaneously or temporarily cache route data for previously visited routes to use again later.

Every time a URL/history update is detected, the router executes the following sequence:

There is a high possibility that TanStack's router cache will be a good fit for most smaller to medium size applications, but it's important to understand the tradeoffs of using it vs a more robust caching solution like TanStack Query:

TanStack Router Cache Pros:

TanStack Router Cache Cons:

If you know right away that you'd like to or need to use something more robust like TanStack Query, skip to the External Data Loading guide.

The router cache is built-in and is as easy as returning data from any route's loader function. Let's learn how!

Route loader functions are called when a route match is loaded. They are called with a single parameter which is an object containing many helpful properties. We'll go over those in a bit, but first, let's look at an example of a route loader function:

The loader function receives a single object with the following properties:

Using these parameters, we can do a lot of cool things, but first, let's take a look at how we can control it and when the loader function is called.

To consume data from a loader, use the useLoaderData hook defined on your Route object.

If you don't have ready access to your route object (i.e. you're deep in the component tree for the current route), you can use getRouteApi to access the same hook (as well as the other hooks on the Route object). This should be preferred over importing t

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
// routes/posts.tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
})
```

Example 2 (javascript):
```javascript
// routes/posts.tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
})
```

Example 3 (javascript):
```javascript
// routes/posts.tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
})
```

Example 4 (javascript):
```javascript
// routes/posts.tsx
export const Route = createFileRoute('/posts')({
  loader: () => fetchPosts(),
})
```

---

## Search Params

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/search-params

**Contents:**
- Why not just use URLSearchParams?
- Search Params, the "OG" State Manager
- JSON-first Search Params
- Validating and Typing Search Params
  - Enter Validation + TypeScript!
  - Validating Search Params
    - Adapters
  - Zod
  - Valibot
  - Arktype

Similar to how TanStack Query made handling server-state in your React and Solid applications a breeze, TanStack Router aims to unlock the power of URL search params in your applications.

🧠 If you are on a really old browser, like IE11, you may need to use a polyfill for URLSearchParams.

We get it, you've been hearing a lot of "use the platform" lately and for the most part, we agree. However, we also believe it's important to recognize where the platform falls short for more advanced use-cases and we believe URLSearchParams is one of these circumstances.

Traditional Search Param APIs usually assume a few things:

Reality is very different from these assumptions though.

You've probably seen search params like ?page=3 or ?filter-name=tanner in the URL. There is no question that this is truly a form of global state living inside of the URL. It's valuable to store specific pieces of state in the URL because:

To achieve the above, the first step built in to TanStack Router is a powerful search param parser that automatically converts the search string of your URL to structured JSON. This means that you can store any JSON-serializable data structure in your search params and it will be parsed and serialized as JSON. This is a huge improvement over URLSearchParams which has limited support for array-like structures and nested data.

For example, navigating to the following route:

Will result in the following URL:

When this URL is parsed, the search params will be accurately converted back to the following JSON:

If you noticed, there are a few things going on here:

🧠 It's common for other tools to assume that search params are always flat and string-based which is why we've chosen to keep things URLSearchParam compliant at the first level. This ultimately means that even though TanStack Router is managing your nested search params as JSON, other tools will still be able to write to the URL and read first-level params normally.

Despite TanStack Router being able to parse search params into reliable JSON, they ultimately still came from a user-facing raw-text input. Similar to other serialization boundaries, this means that before you consume search params, they should be validated into a format that your application can trust and rely on.

TanStack Router provides convenient APIs for validating and typing search params. This all starts with the Route's validateSearch option:

In the above example, we're validating the search params of the Route and retur

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const link = (
  <Link
    to="/shop"
    search={{
      pageIndex: 3,
      includeCategories: ['electronics', 'gifts'],
      sortBy: 'price',
      desc: true,
    }}
  />
)
```

Example 2 (javascript):
```javascript
const link = (
  <Link
    to="/shop"
    search={{
      pageIndex: 3,
      includeCategories: ['electronics', 'gifts'],
      sortBy: 'price',
      desc: true,
    }}
  />
)
```

Example 3 (javascript):
```javascript
const link = (
  <Link
    to="/shop"
    search={{
      pageIndex: 3,
      includeCategories: ['electronics', 'gifts'],
      sortBy: 'price',
      desc: true,
    }}
  />
)
```

Example 4 (javascript):
```javascript
const link = (
  <Link
    to="/shop"
    search={{
      pageIndex: 3,
      includeCategories: ['electronics', 'gifts'],
      sortBy: 'price',
      desc: true,
    }}
  />
)
```

---

## Custom Search Param Serialization

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/custom-search-param-serialization

**Contents:**
- Using Base64
- Using the query-string library
- Using the JSURL2 library
- Using the Zipson library
  - Safe Binary Encoding/Decoding

By default, TanStack Router parses and serializes your URL Search Params automatically using JSON.stringify and JSON.parse. This process involves escaping and unescaping the search string, which is a common practice for URL search params, in addition to the serialization and deserialization of the search object.

For instance, using the default configuration, if you have the following search object:

It would be serialized and escaped into the following search string:

We can implement the default behavior with the following code:

However, this default behavior may not be suitable for all use cases. For example, you may want to use a different serialization format, such as base64 encoding, or you may want to use a purpose-built serialization/deserialization library, like query-string, JSURL2, or Zipson.

This can be achieved by providing your own serialization and deserialization functions to the parseSearch and stringifySearch options in the Router configuration. When doing this, you can utilize TanStack Router's built-in helper functions, parseSearchWith and stringifySearchWith, to simplify the process.

An important aspect of serialization and deserialization, is that you are able to get the same object back after deserialization. This is important because if the serialization and deserialization process is not done correctly, you may lose some information. For example, if you are using a library that does not support nested objects, you may lose the nested object when deserializing the search string.

Here are some examples of how you can customize the search param serialization in TanStack Router:

It's common to base64 encode your search params to achieve maximum compatibility across browsers and URL unfurlers, etc. This can be done with the following code:

⚠️ Why does this snippet not use atob/btoa?

So, if we were to turn the previous object into a search string using this configuration, it would look like this:

If you are serializing user input into Base64, you run the risk of causing a collision with the URL deserialization. This can lead to unexpected behavior, such as the URL not being parsed correctly or being interpreted as a different value. To avoid this, you should encode the search params using a safe binary encoding/decoding method (see below).

The query-string library is a popular for being able to reliably parse and stringify query strings. You can use it to customize the serialization format of your search params. This can be done

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const search = {
  page: 1,
  sort: 'asc',
  filters: { author: 'tanner', min_words: 800 },
}
```

Example 2 (javascript):
```javascript
const search = {
  page: 1,
  sort: 'asc',
  filters: { author: 'tanner', min_words: 800 },
}
```

Example 3 (javascript):
```javascript
const search = {
  page: 1,
  sort: 'asc',
  filters: { author: 'tanner', min_words: 800 },
}
```

Example 4 (javascript):
```javascript
const search = {
  page: 1,
  sort: 'asc',
  filters: { author: 'tanner', min_words: 800 },
}
```

---

## Data Mutations

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/data-mutations

**Contents:**
- Invalidating TanStack Router after a mutation
- Long-term mutation State
- Using mutation keys
- Using the router.subscribe method

Since TanStack router does not store or cache data, it's role in data mutation is slim to none outside of reacting to potential URL side-effects from external mutation events. That said, we've compiled a list of mutation-related features you might find useful and libraries that implement them.

Look for and use mutation utilities that support:

Some suggested libraries:

Similar to data fetching, mutation state isn't a one-size-fits-all solution, so you'll need to pick a solution that fits your needs and your team's needs. We recommend trying out a few different solutions and seeing what works best for you.

⚠️ Still here? Submission state is an interesting topic when it comes to persistence. Do you keep every mutation around forever? How do you know when to get rid of it? What if the user navigates away from the screen and then back? Let's dig in!

TanStack Router comes with short-term caching built-in. So even though we're not storing any data after a route match is unmounted, there is a high probability that if any mutations are made related to the data stored in the Router, the current route matches' data could become stale.

When mutations related to loader data are made, we can use router.invalidate to force the router to reload all of the current route matches:

Invalidating all of the current route matches happens in the background, so existing data will continue to be served until the new data is ready, just as if you were navigating to a new route.

If you want to await the invalidation until all loaders have finished, pass {sync: true} into router.invalidate:

Regardless of the mutation library used, mutations often create state related to their submission. While most mutations are set-and-forget, some mutation states are more long-lived, either to support optimistic UI or to provide feedback to the user about the status of their submissions. Most state managers will correctly keep this submission state around and expose it to make it possible to show UI elements like loading spinners, success messages, error messages, etc.

Let's consider the following interactions:

Without notifying your mutation management library about the route change, it's possible that your submission state could still be around and your user would still see the "Post updated successfully" message when they return to the previous screen. This is not ideal. Obviously, our intent wasn't to keep this mutation state around forever, right?!

Hopefully and hypothetically, the 

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const router = useRouter()

const addTodo = async (todo: Todo) => {
  try {
    await api.addTodo()
    router.invalidate()
  } catch {
    //
  }
}
```

Example 2 (javascript):
```javascript
const router = useRouter()

const addTodo = async (todo: Todo) => {
  try {
    await api.addTodo()
    router.invalidate()
  } catch {
    //
  }
}
```

Example 3 (javascript):
```javascript
const router = useRouter()

const addTodo = async (todo: Todo) => {
  try {
    await api.addTodo()
    router.invalidate()
  } catch {
    //
  }
}
```

Example 4 (javascript):
```javascript
const router = useRouter()

const addTodo = async (todo: Todo) => {
  try {
    await api.addTodo()
    router.invalidate()
  } catch {
    //
  }
}
```

---

## History Types

**URL:** https://tanstack.com/router/latest/docs/framework/react/guide/history-types

**Contents:**
- Browser Routing
- Hash Routing
- Memory Routing

While it's not required to know the @tanstack/history API itself to use TanStack Router, it's a good idea to understand how it works. Under the hood, TanStack Router requires and uses a history abstraction to manage the routing history.

If you don't create a history instance, a browser-oriented instance of this API is created for you when the router is initialized. If you need a special history API type, You can use the @tanstack/history package to create your own:

Once you have a history instance, you can pass it to the Router constructor:

The createBrowserHistory is the default history type. It uses the browser's history API to manage the browser history.

Hash routing can be helpful if your server doesn't support rewrites to index.html for HTTP requests (among other environments that don't have a server).

Memory routing is useful in environments that are not a browser or when you do not want components to interact with the URL.

Refer to the SSR Guide for usage on the server for server-side rendering.

**Examples:**

Example 1 (python):
```python
import { createMemoryHistory, createRouter } from '@tanstack/react-router'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'], // Pass your initial url
})

const router = createRouter({ routeTree, history: memoryHistory })
```

Example 2 (python):
```python
import { createMemoryHistory, createRouter } from '@tanstack/react-router'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'], // Pass your initial url
})

const router = createRouter({ routeTree, history: memoryHistory })
```

Example 3 (python):
```python
import { createMemoryHistory, createRouter } from '@tanstack/react-router'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'], // Pass your initial url
})

const router = createRouter({ routeTree, history: memoryHistory })
```

Example 4 (python):
```python
import { createMemoryHistory, createRouter } from '@tanstack/react-router'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'], // Pass your initial url
})

const router = createRouter({ routeTree, history: memoryHistory })
```

---
