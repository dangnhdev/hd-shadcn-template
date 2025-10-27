# Tanstack-Router - Routing

**Pages:** 94

---

## LLM Assistance Support

**URL:** https://tanstack.com/router/latest/docs/framework/react/llm-support

**Contents:**
- Installation
- Supported Editors

TanStack Router's documentation is integrated into its NPM module, making it available to install as LLM assistance rules. These rules can be integrated into various editors to provide context-aware help using vibe-rules.

To use vibe-rules, install it globally using your package manager of choice. For example, with pnpm:

Once installed, you can then run it in the editor of your choice. For example, to integrate with Cursor:

vibe-rules supports a variety of editors, including windsurf, claude-code, and more. For more information on supported editors and how to set them up, refer to the vibe-rules documentation.

If you're using Yarn Workspaces, you will need to add the following configuration to your .yarnrc.yaml file of your application that uses TanStack Router:

**Examples:**

Example 1 (unknown):
```unknown
pnpm add -g vibe-rules
```

Example 2 (unknown):
```unknown
pnpm add -g vibe-rules
```

Example 3 (unknown):
```unknown
pnpm add -g vibe-rules
```

Example 4 (unknown):
```unknown
pnpm add -g vibe-rules
```

---

## HistoryState interface

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/historyStateInterface

The HistoryState interface is an interface exported by the history package that describes the shape of the state object that can be used in conjunction with the history package and the window.location API.

You can extend this interface to add additional properties to the state object across your application.

**Examples:**

Example 1 (unknown):
```unknown
// src/main.tsx
declare module '@tanstack/react-router' {
  // ...

  interface HistoryState {
    additionalRequiredProperty: number
    additionalProperty?: string
  }
}
```

Example 2 (unknown):
```unknown
// src/main.tsx
declare module '@tanstack/react-router' {
  // ...

  interface HistoryState {
    additionalRequiredProperty: number
    additionalProperty?: string
  }
}
```

Example 3 (unknown):
```unknown
// src/main.tsx
declare module '@tanstack/react-router' {
  // ...

  interface HistoryState {
    additionalRequiredProperty: number
    additionalProperty?: string
  }
}
```

Example 4 (unknown):
```unknown
// src/main.tsx
declare module '@tanstack/react-router' {
  // ...

  interface HistoryState {
    additionalRequiredProperty: number
    additionalProperty?: string
  }
}
```

---

## Decisions on Developer Experience

**URL:** https://tanstack.com/router/latest/docs/framework/react/decisions-on-dx

**Contents:**
- TanStack Router's origin story
- How does TanStack Router achieve this?
- 1. Why is the Router's configuration done this way?
- 2. Declaring the Router instance for type inference
- 3. Why is file-based routing the preferred way to define routes?

When people first start using TanStack Router, they often have a lot of questions that revolve around the following themes:

Why do I have to do things this way?

Why is it done this way? and not that way?

I'm used to doing it this way, why should I change?

And they are all valid questions. For the most part, people are used to using routing libraries that are very similar to each other. They all have a similar API, similar concepts, and similar ways of doing things.

But TanStack Router is different. It's not your average routing library. It's not your average state management library. It's not your average anything.

It's important to remember that TanStack Router's origins stem from Nozzle.io's need for a client-side routing solution that offered a first-in-class URL Search Parameters experience without compromising on the type-safety that was required to power its complex dashboards.

And so, from TanStack Router's very inception, every facet of its design was meticulously thought out to ensure that its type-safety and developer experience were second to none.

TypeScript! TypeScript! TypeScript!

Every aspect of TanStack Router is designed to be as type-safe as possible, and this is achieved by leveraging TypeScript's type system to its fullest extent. This involves using some very advanced and complex types, type inference, and other features to ensure that the developer experience is as smooth as possible.

But to achieve this, we had to make some decisions that deviate from the norms in the routing world.

TLDR; All the design decisions in the developer experience of using TanStack Router are made so that you can have a best-in-class type-safety experience without compromising on the control, flexibility, and maintainability of your route configurations.

When you want to leverage the TypeScript's inference features to its fullest, you'll quickly realize that Generics are your best friend. And so, TanStack Router uses Generics everywhere to ensure that the types of your routes are inferred as much as possible.

This means that you have to define your routes in a way that allows TypeScript to infer the types of your routes as much as possible.

Can I use JSX to define my routes?

Using JSX for defining your routes is out of the question, as TypeScript will not be able to infer the route configuration types of your router.

And since this would mean that you'd have to manually type the to prop of the <Link> component and wouldn't catch any errors u

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
// ⛔️ This is not possible
function App() {
  return (
    <Router>
      <Route path="/posts" component={PostsPage} />
      <Route path="/posts/$postId" component={PostIdPage} />
      {/* ... */}
    </Router>
    // ^? TypeScript cannot infer the routes in this configuration
  )
}
```

Example 2 (unknown):
```unknown
// ⛔️ This is not possible
function App() {
  return (
    <Router>
      <Route path="/posts" component={PostsPage} />
      <Route path="/posts/$postId" component={PostIdPage} />
      {/* ... */}
    </Router>
    // ^? TypeScript cannot infer the routes in this configuration
  )
}
```

Example 3 (unknown):
```unknown
// ⛔️ This is not possible
function App() {
  return (
    <Router>
      <Route path="/posts" component={PostsPage} />
      <Route path="/posts/$postId" component={PostIdPage} />
      {/* ... */}
    </Router>
    // ^? TypeScript cannot infer the routes in this configuration
  )
}
```

Example 4 (unknown):
```unknown
// ⛔️ This is not possible
function App() {
  return (
    <Router>
      <Route path="/posts" component={PostsPage} />
      <Route path="/posts/$postId" component={PostIdPage} />
      {/* ... */}
    </Router>
    // ^? TypeScript cannot infer the routes in this configuration
  )
}
```

---

## createRootRoute function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteFunction

**Contents:**
- createRootRoute options
- createRootRoute returns
- Examples

The createRootRoute function returns a new root route instance. A root route instance can then be used to create a route-tree.

The options that will be used to configure the root route instance.

A new Route instance.

**Examples:**

Example 1 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 2 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 3 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 4 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

---

## useMatches hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchesHook

**Contents:**
- useMatches options
  - opts.select option
  - opts.structuralSharing option
- useMatches returns
- Examples

The useMatches hook returns all of the RouteMatch objects from the router regardless of its callers position in the React component tree.

If you only want the parent or child matches, then you can use the useParentMatches or the useChildMatches based on the selection you need.

The useMatches hook accepts a single optional argument, an options object.

**Examples:**

Example 1 (python):
```python
import { useMatches } from '@tanstack/react-router'

function Component() {
  const matches = useMatches()
  //     ^? [RouteMatch, RouteMatch, ...]
  // ...
}
```

Example 2 (python):
```python
import { useMatches } from '@tanstack/react-router'

function Component() {
  const matches = useMatches()
  //     ^? [RouteMatch, RouteMatch, ...]
  // ...
}
```

Example 3 (python):
```python
import { useMatches } from '@tanstack/react-router'

function Component() {
  const matches = useMatches()
  //     ^? [RouteMatch, RouteMatch, ...]
  // ...
}
```

Example 4 (python):
```python
import { useMatches } from '@tanstack/react-router'

function Component() {
  const matches = useMatches()
  //     ^? [RouteMatch, RouteMatch, ...]
  // ...
}
```

---

## ToOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/ToOptionsType

The ToOptions type contains several properties that can be used to describe a router destination.

**Examples:**

Example 1 (javascript):
```javascript
type ToOptions = {
  from?: ValidRoutePath | string
  to?: ValidRoutePath | string
  hash?: true | string | ((prev?: string) => string)
  state?: true | HistoryState | ((prev: HistoryState) => HistoryState)
} & SearchParamOptions &
  PathParamOptions

type SearchParamOptions = {
  search?: true | TToSearch | ((prev: TFromSearch) => TToSearch)
}

type PathParamOptions = {
  path?: true | Record<string, TPathParam> | ((prev: TFromParams) => TToParams)
}
```

Example 2 (javascript):
```javascript
type ToOptions = {
  from?: ValidRoutePath | string
  to?: ValidRoutePath | string
  hash?: true | string | ((prev?: string) => string)
  state?: true | HistoryState | ((prev: HistoryState) => HistoryState)
} & SearchParamOptions &
  PathParamOptions

type SearchParamOptions = {
  search?: true | TToSearch | ((prev: TFromSearch) => TToSearch)
}

type PathParamOptions = {
  path?: true | Record<string, TPathParam> | ((prev: TFromParams) => TToParams)
}
```

Example 3 (javascript):
```javascript
type ToOptions = {
  from?: ValidRoutePath | string
  to?: ValidRoutePath | string
  hash?: true | string | ((prev?: string) => string)
  state?: true | HistoryState | ((prev: HistoryState) => HistoryState)
} & SearchParamOptions &
  PathParamOptions

type SearchParamOptions = {
  search?: true | TToSearch | ((prev: TFromSearch) => TToSearch)
}

type PathParamOptions = {
  path?: true | Record<string, TPathParam> | ((prev: TFromParams) => TToParams)
}
```

Example 4 (javascript):
```javascript
type ToOptions = {
  from?: ValidRoutePath | string
  to?: ValidRoutePath | string
  hash?: true | string | ((prev?: string) => string)
  state?: true | HistoryState | ((prev: HistoryState) => HistoryState)
} & SearchParamOptions &
  PathParamOptions

type SearchParamOptions = {
  search?: true | TToSearch | ((prev: TFromSearch) => TToSearch)
}

type PathParamOptions = {
  path?: true | Record<string, TPathParam> | ((prev: TFromParams) => TToParams)
}
```

---

## Devtools

**URL:** https://tanstack.com/router/latest/docs/framework/react/devtools

**Contents:**
- Installation
- Import the Devtools
- Using Devtools in production
- Using inside of the RouterProvider
- Manually passing the Router Instance
- Floating Mode
  - Devtools Options
- Fixed Mode
- Embedded Mode
  - DevtoolsPanel Options

Link, take this sword... I mean Devtools!... to help you on your way!

Wave your hands in the air and shout hooray because TanStack Router comes with dedicated devtools! 🥳

When you begin your TanStack Router journey, you'll want these devtools by your side. They help visualize all of the inner workings of TanStack Router and will likely save you hours of debugging if you find yourself in a pinch!

The devtools are a separate package that you need to install:

The Devtools, if imported as TanStackRouterDevtools will not be shown in production. If you want to have devtools in an environment with process.env.NODE_ENV === 'production', use instead TanStackRouterDevtoolsInProd, which has all the same options:

The easiest way for the devtools to work is to render them inside of your root route (or any other route). This will automatically connect the devtools to the router instance.

If rendering the devtools inside of the RouterProvider isn't your cup of tea, a router prop for the devtools accepts the same router instance you pass to the Router component. This makes it possible to place the devtools anywhere on the page, not just inside the provider:

Floating Mode will mount the devtools as a fixed, floating element in your app and provide a toggle in the corner of the screen to show and hide the devtools. This toggle state will be stored and remembered in localStorage across reloads.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

To control the position of the devtools, import the TanStackRouterDevtoolsPanel:

It can then be attached to provided shadow DOM target:

Click here to see a live example of this in StackBlitz.

Embedded Mode will embed the devtools as a regular component in your application. You can style it however you'd like after that!

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/react-router-devtools
```

Example 2 (unknown):
```unknown
npm install @tanstack/react-router-devtools
```

Example 3 (unknown):
```unknown
npm install @tanstack/react-router-devtools
```

Example 4 (unknown):
```unknown
npm install @tanstack/react-router-devtools
```

---

## CatchNotFound Component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/catchNotFoundComponent

**Contents:**
- CatchNotFound props
  - props.children prop
  - props.fallback prop
  - props.onCatch prop
- CatchNotFound returns
- Examples

The CatchNotFound component is a component that catches not-found errors thrown by its children, renders a fallback component and optionally calls the onCatch callback. It resets when the pathname changes.

The CatchNotFound component accepts the following props:

**Examples:**

Example 1 (python):
```python
import { CatchNotFound } from '@tanstack/react-router'

function Component() {
  return (
    <CatchNotFound
      fallback={(error) => <p>Not found error! {JSON.stringify(error)}</p>}
    >
      <ComponentThatMightThrowANotFoundError />
    </CatchNotFound>
  )
}
```

Example 2 (python):
```python
import { CatchNotFound } from '@tanstack/react-router'

function Component() {
  return (
    <CatchNotFound
      fallback={(error) => <p>Not found error! {JSON.stringify(error)}</p>}
    >
      <ComponentThatMightThrowANotFoundError />
    </CatchNotFound>
  )
}
```

Example 3 (python):
```python
import { CatchNotFound } from '@tanstack/react-router'

function Component() {
  return (
    <CatchNotFound
      fallback={(error) => <p>Not found error! {JSON.stringify(error)}</p>}
    >
      <ComponentThatMightThrowANotFoundError />
    </CatchNotFound>
  )
}
```

Example 4 (python):
```python
import { CatchNotFound } from '@tanstack/react-router'

function Component() {
  return (
    <CatchNotFound
      fallback={(error) => <p>Not found error! {JSON.stringify(error)}</p>}
    >
      <ComponentThatMightThrowANotFoundError />
    </CatchNotFound>
  )
}
```

---

## RouterEvents type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouterEventsType

**Contents:**
- RouterEvents properties
  - type property
  - fromLocation property
  - toLocation property
  - pathChanged property
  - hrefChanged property
- Example

The RouterEvents type contains all of the events that the router can emit. Each top-level key of this type, represents the name of an event that the router can emit. The values of the keys are the event payloads.

Once an event is emitted, the following properties will be present on the event payload.

**Examples:**

Example 1 (unknown):
```unknown
type RouterEvents = {
  onBeforeNavigate: {
    type: 'onBeforeNavigate'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onBeforeLoad: {
    type: 'onBeforeLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onLoad: {
    type: 'onLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onResolved: {
    type: 'onResolved'
    fromLocation?: ParsedLocation
    toLocation: ParsedL
...
```

Example 2 (unknown):
```unknown
type RouterEvents = {
  onBeforeNavigate: {
    type: 'onBeforeNavigate'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onBeforeLoad: {
    type: 'onBeforeLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onLoad: {
    type: 'onLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onResolved: {
    type: 'onResolved'
    fromLocation?: ParsedLocation
    toLocation: ParsedL
...
```

Example 3 (unknown):
```unknown
type RouterEvents = {
  onBeforeNavigate: {
    type: 'onBeforeNavigate'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onBeforeLoad: {
    type: 'onBeforeLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onLoad: {
    type: 'onLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onResolved: {
    type: 'onResolved'
    fromLocation?: ParsedLocation
    toLocation: ParsedL
...
```

Example 4 (unknown):
```unknown
type RouterEvents = {
  onBeforeNavigate: {
    type: 'onBeforeNavigate'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onBeforeLoad: {
    type: 'onBeforeLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onLoad: {
    type: 'onLoad'
    fromLocation?: ParsedLocation
    toLocation: ParsedLocation
    pathChanged: boolean
    hrefChanged: boolean
  }
  onResolved: {
    type: 'onResolved'
    fromLocation?: ParsedLocation
    toLocation: ParsedL
...
```

---

## Route class

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouteClass

**Contents:**
- Route constructor
  - Constructor options
  - Constructor returns
- Examples

This class has been deprecated and will be removed in the next major version of TanStack Router. Please use the createRoute function instead.

The Route class implements the RouteApi class and can be used to create route instances. A route instance can then be used to create a route tree.

The Route constructor accepts an object as its only argument.

A new Route instance.

**Examples:**

Example 1 (python):
```python
import { Route } from '@tanstack/react-router'
import { rootRoute } from './__root'

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = indexRoute.useLoaderData()
  return <div>{data}</div>
}
```

Example 2 (python):
```python
import { Route } from '@tanstack/react-router'
import { rootRoute } from './__root'

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = indexRoute.useLoaderData()
  return <div>{data}</div>
}
```

Example 3 (python):
```python
import { Route } from '@tanstack/react-router'
import { rootRoute } from './__root'

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = indexRoute.useLoaderData()
  return <div>{data}</div>
}
```

Example 4 (python):
```python
import { Route } from '@tanstack/react-router'
import { rootRoute } from './__root'

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = indexRoute.useLoaderData()
  return <div>{data}</div>
}
```

---

## MatchRouteOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/MatchRouteOptionsType

**Contents:**
- MatchRouteOptions properties
  - pending property
  - caseSensitive property
  - includeSearch property
  - fuzzy property

The MatchRouteOptions type is used to describe the options that can be used when matching a route.

The MatchRouteOptions type has the following properties:

**Examples:**

Example 1 (unknown):
```unknown
interface MatchRouteOptions {
  pending?: boolean
  caseSensitive?: boolean
  includeSearch?: boolean
  fuzzy?: boolean
}
```

Example 2 (unknown):
```unknown
interface MatchRouteOptions {
  pending?: boolean
  caseSensitive?: boolean
  includeSearch?: boolean
  fuzzy?: boolean
}
```

Example 3 (unknown):
```unknown
interface MatchRouteOptions {
  pending?: boolean
  caseSensitive?: boolean
  includeSearch?: boolean
  fuzzy?: boolean
}
```

Example 4 (unknown):
```unknown
interface MatchRouteOptions {
  pending?: boolean
  caseSensitive?: boolean
  includeSearch?: boolean
  fuzzy?: boolean
}
```

---

## useChildMatches hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useChildMatchesHook

**Contents:**
- useChildMatches options
  - opts.select option
  - opts.structuralSharing option
- useChildMatches returns
- Examples

The useChildMatches hook returns all of the child RouteMatch objects from the closest match down to the leaf-most match. It does not include the current match, which can be obtained using the useMatch hook.

If the router has pending matches and they are showing their pending component fallbacks, router.state.pendingMatches will used instead of router.state.matches.

The useChildMatches hook accepts a single optional argument, an options object.

**Examples:**

Example 1 (python):
```python
import { useChildMatches } from '@tanstack/react-router'

function Component() {
  const childMatches = useChildMatches()
  // ...
}
```

Example 2 (python):
```python
import { useChildMatches } from '@tanstack/react-router'

function Component() {
  const childMatches = useChildMatches()
  // ...
}
```

Example 3 (python):
```python
import { useChildMatches } from '@tanstack/react-router'

function Component() {
  const childMatches = useChildMatches()
  // ...
}
```

Example 4 (python):
```python
import { useChildMatches } from '@tanstack/react-router'

function Component() {
  const childMatches = useChildMatches()
  // ...
}
```

---

## Virtual File Routes

**URL:** https://tanstack.com/router/latest/docs/framework/react/routing/virtual-file-routes

**Contents:**
- Configuration
- Configuration via the TanStackRouter Plugin
- Creating Virtual File Routes
- Virtual Root Route
- Virtual Route
- Virtual Index Route
- Virtual Pathless Route
- Physical Virtual Routes
- Virtual Routes inside of TanStack Router File Based routing
- Inception

We'd like to thank the Remix team for pioneering the concept of virtual file routes. We've taken inspiration from their work and adapted it to work with TanStack Router's existing file-based route-tree generation.

Virtual file routes are a powerful concept that allows you to build a route tree programmatically using code that references real files in your project. This can be useful if:

Here's a quick example of using virtual file routes to map a route tree to a set of real files in your project:

Virtual file routes can be configured either via:

If you're using the TanStackRouter plugin for Vite/Rspack/Webpack, you can configure virtual file routes by passing the path of your routes file to the virtualRoutesConfig option when setting up the plugin:

Or, you choose to define the virtual routes directly in the configuration:

To create virtual file routes, you'll need to import the @tanstack/virtual-file-routes package. This package provides a set of functions that allow you to create virtual routes that reference real files in your project. A few utility functions are exported from the package:

The rootRoute function is used to create a virtual root route. It takes a file name and an array of children routes. Here's an example of a virtual root route:

The route function is used to create a virtual route. It takes a path, a file name, and an array of children routes. Here's an example of a virtual route:

You can also define a virtual route without a file name. This allows to set a common path prefix for its children:

The index function is used to create a virtual index route. It takes a file name. Here's an example of a virtual index route:

The layout function is used to create a virtual pathless route. It takes a file name, an array of children routes, and an optional pathless ID. Here's an example of a virtual pathless route:

You can also specify a pathless ID to give the route a unique identifier that is different from the filename:

Physical virtual routes are a way to "mount" a directory of good ol' TanStack Router File Based routing convention under a specific URL path. This can be useful if you are using virtual routes to customize a small portion of your route tree high up in the hierarchy, but want to use the standard file-based routing convention for sub-routes and directories.

Consider the following file structure:

Let's use virtual routes to customize our route tree for everything but posts, then use physical virtual routes to mount t

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// routes.ts
import {
  rootRoute,
  route,
  index,
  layout,
  physical,
} from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [
  index('index.tsx'),
  layout('pathlessLayout.tsx', [
    route('/dashboard', 'app/dashboard.tsx', [
      index('app/dashboard-index.tsx'),
      route('/invoices', 'app/dashboard-invoices.tsx', [
        index('app/invoices-index.tsx'),
        route('$id', 'app/invoice-detail.tsx'),
      ]),
    ]),
    physical('/posts', 'posts'),
  ]),
])
```

Example 2 (python):
```python
// routes.ts
import {
  rootRoute,
  route,
  index,
  layout,
  physical,
} from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [
  index('index.tsx'),
  layout('pathlessLayout.tsx', [
    route('/dashboard', 'app/dashboard.tsx', [
      index('app/dashboard-index.tsx'),
      route('/invoices', 'app/dashboard-invoices.tsx', [
        index('app/invoices-index.tsx'),
        route('$id', 'app/invoice-detail.tsx'),
      ]),
    ]),
    physical('/posts', 'posts'),
  ]),
])
```

Example 3 (python):
```python
// routes.ts
import {
  rootRoute,
  route,
  index,
  layout,
  physical,
} from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [
  index('index.tsx'),
  layout('pathlessLayout.tsx', [
    route('/dashboard', 'app/dashboard.tsx', [
      index('app/dashboard-index.tsx'),
      route('/invoices', 'app/dashboard-invoices.tsx', [
        index('app/invoices-index.tsx'),
        route('$id', 'app/invoice-detail.tsx'),
      ]),
    ]),
    physical('/posts', 'posts'),
  ]),
])
```

Example 4 (python):
```python
// routes.ts
import {
  rootRoute,
  route,
  index,
  layout,
  physical,
} from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [
  index('index.tsx'),
  layout('pathlessLayout.tsx', [
    route('/dashboard', 'app/dashboard.tsx', [
      index('app/dashboard-index.tsx'),
      route('/invoices', 'app/dashboard-invoices.tsx', [
        index('app/invoices-index.tsx'),
        route('$id', 'app/invoice-detail.tsx'),
      ]),
    ]),
    physical('/posts', 'posts'),
  ]),
])
```

---

## useMatch hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchHook

**Contents:**
- useMatch options
  - opts.from option
  - opts.strict option
  - opts.select option
  - opts.structuralSharing option
  - opts.shouldThrow option
- useMatch returns
- Examples
  - Accessing a route match
  - Accessing the root route's match

The useMatch hook returns a RouteMatch in the component tree. The raw route match contains all of the information about a route match in the router and also powers many other hooks under the hood like useParams, useLoaderData, useRouteContext, and useSearch.

The useMatch hook accepts a single argument, an options object.

**Examples:**

Example 1 (python):
```python
import { useMatch } from '@tanstack/react-router'

function Component() {
  const match = useMatch({ from: '/posts/$postId' })
  //     ^? strict match for RouteMatch
  // ...
}
```

Example 2 (python):
```python
import { useMatch } from '@tanstack/react-router'

function Component() {
  const match = useMatch({ from: '/posts/$postId' })
  //     ^? strict match for RouteMatch
  // ...
}
```

Example 3 (python):
```python
import { useMatch } from '@tanstack/react-router'

function Component() {
  const match = useMatch({ from: '/posts/$postId' })
  //     ^? strict match for RouteMatch
  // ...
}
```

Example 4 (python):
```python
import { useMatch } from '@tanstack/react-router'

function Component() {
  const match = useMatch({ from: '/posts/$postId' })
  //     ^? strict match for RouteMatch
  // ...
}
```

---

## Code-Based Routing

**URL:** https://tanstack.com/router/latest/docs/framework/react/routing/code-based-routing

**Contents:**
- ⚠️ Before You Start
- Route Trees
- Anatomy of a Route
- Manually building the route tree
- Routing Concepts for Code-Based Routing
- The Root Route
- Basic Routes
- Index Routes
- Dynamic Route Segments
- Splat / Catch-All Routes

Code-based routing is not recommended for most applications. It is recommended to use File-Based Routing instead.

Code-based routing is no different from file-based routing in that it uses the same route tree concept to organize, match and compose matching routes into a component tree. The only difference is that instead of using the filesystem to organize your routes, you use code.

Let's consider the same route tree from the Route Trees & Nesting guide, and convert it to code-based routing:

Here is the file-based version:

And here is a summarized code-based version:

All other routes other than the root route are configured using the createRoute function:

The getParentRoute option is a function that returns the parent route of the route you're creating.

❓❓❓ "Wait, you're making me pass the parent route for every route I make?"

Absolutely! The reason for passing the parent route has everything to do with the magical type safety of TanStack Router. Without the parent route, TypeScript would have no idea what types to supply your route with!

For every route that's NOT the Root Route or a Pathless Layout Route, a path option is required. This is the path that will be matched against the URL pathname to determine if the route is a match.

When configuring route path option on a route, it ignores leading and trailing slashes (this does not include "index" route paths /). You can include them if you want, but they will be normalized internally by TanStack Router. Here is a table of valid paths and what they will be normalized to:

When building a route tree in code, it's not enough to define the parent route of each route. You must also construct the final route tree by adding each route to its parent route's children array. This is because the route tree is not built automatically for you like it is in file-based routing.

But before you can go ahead and build the route tree, you need to understand how the Routing Concepts for Code-Based Routing work.

Believe it or not, file-based routing is really a superset of code-based routing and uses the filesystem and a bit of code-generation abstraction on top of it to generate this structure you see above automatically.

We're going to assume you've read the Routing Concepts guide and are familiar with each of these main concepts:

Now, let's take a look at how to create each of these route types in code.

Creating a root route in code-based routing is thankfully the same as doing so in file-based routing. Cal

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
routes/
├── __root.tsx
├── index.tsx
├── about.tsx
├── posts/
│   ├── index.tsx
│   ├── $postId.tsx
├── posts.$postId.edit.tsx
├── settings/
│   ├── profile.tsx
│   ├── notifications.tsx
├── _pathlessLayout.tsx
├── _pathlessLayout/
│   ├── route-a.tsx
├── ├── route-b.tsx
├── files/
│   ├── $.tsx
```

Example 2 (unknown):
```unknown
routes/
├── __root.tsx
├── index.tsx
├── about.tsx
├── posts/
│   ├── index.tsx
│   ├── $postId.tsx
├── posts.$postId.edit.tsx
├── settings/
│   ├── profile.tsx
│   ├── notifications.tsx
├── _pathlessLayout.tsx
├── _pathlessLayout/
│   ├── route-a.tsx
├── ├── route-b.tsx
├── files/
│   ├── $.tsx
```

Example 3 (unknown):
```unknown
routes/
├── __root.tsx
├── index.tsx
├── about.tsx
├── posts/
│   ├── index.tsx
│   ├── $postId.tsx
├── posts.$postId.edit.tsx
├── settings/
│   ├── profile.tsx
│   ├── notifications.tsx
├── _pathlessLayout.tsx
├── _pathlessLayout/
│   ├── route-a.tsx
├── ├── route-b.tsx
├── files/
│   ├── $.tsx
```

Example 4 (unknown):
```unknown
routes/
├── __root.tsx
├── index.tsx
├── about.tsx
├── posts/
│   ├── index.tsx
│   ├── $postId.tsx
├── posts.$postId.edit.tsx
├── settings/
│   ├── profile.tsx
│   ├── notifications.tsx
├── _pathlessLayout.tsx
├── _pathlessLayout/
│   ├── route-a.tsx
├── ├── route-b.tsx
├── files/
│   ├── $.tsx
```

---

## File Naming Conventions

**URL:** https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions

**Contents:**
- Dynamic Path Params
- Pathless Routes

File-based routing requires that you follow a few simple file naming conventions to ensure that your routes are generated correctly. The concepts these conventions enable are covered in detail in the Route Trees & Nesting guide.

💡 Remember: The file-naming conventions for your project could be affected by what options are configured.

To escape a trailing underscore, for example /posts[_].tsx, usage of the upgraded Non-Nested Routes is required.

Dynamic path params can be used in both flat and directory routes to create routes that can match a dynamic segment of the URL path. Dynamic path params are denoted by the $ character in the filename:

We'll learn more about dynamic path params in the Path Params guide.

Pathless routes wrap child routes with either logic or a component without requiring a URL path. Non-path routes are denoted by the _ character in the filename:

To learn more about pathless routes, see the Routing Concepts - Pathless Routes guide.

---

## useRouterState hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterStateHook

**Contents:**
- useRouterState options
  - opts.select option
  - opts.structuralSharing option
- useRouterState returns
- Examples

The useRouterState method is a hook that returns the current internal state of the router. This hook is useful for accessing the current state of the router in a component.

If you want to access the current location or the current matches, you should try out the useLocation and useMatches hooks first. These hooks are designed to be more ergonomic and easier to use than accessing the router state directly.

The useRouterState hook accepts an optional options object.

**Examples:**

Example 1 (python):
```python
import { useRouterState } from '@tanstack/react-router'

function Component() {
  const state = useRouterState()
  //    ^ RouterState

  // OR

  const selected = useRouterState({
    select: (state) => state.location,
  })
  //    ^ ParsedLocation

  // ...
}
```

Example 2 (python):
```python
import { useRouterState } from '@tanstack/react-router'

function Component() {
  const state = useRouterState()
  //    ^ RouterState

  // OR

  const selected = useRouterState({
    select: (state) => state.location,
  })
  //    ^ ParsedLocation

  // ...
}
```

Example 3 (python):
```python
import { useRouterState } from '@tanstack/react-router'

function Component() {
  const state = useRouterState()
  //    ^ RouterState

  // OR

  const selected = useRouterState({
    select: (state) => state.location,
  })
  //    ^ ParsedLocation

  // ...
}
```

Example 4 (python):
```python
import { useRouterState } from '@tanstack/react-router'

function Component() {
  const state = useRouterState()
  //    ^ RouterState

  // OR

  const selected = useRouterState({
    select: (state) => state.location,
  })
  //    ^ ParsedLocation

  // ...
}
```

---

## useCanGoBack hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useCanGoBack

**Contents:**
- useCanGoBack returns
- Limitations
- Examples
  - Showing a back button

The useCanGoBack hook returns a boolean representing if the router history can safely go back without exiting the application.

⚠️ The following new useCanGoBack API is currently experimental.

The router history index is reset after a navigation with reloadDocument set as true. This causes the router history to consider the new location as the initial one and will cause useCanGoBack to return false.

**Examples:**

Example 1 (python):
```python
import { useRouter, useCanGoBack } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div>
      {canGoBack ? (
        <button onClick={() => router.history.back()}>Go back</button>
      ) : null}

      {/* ... */}
    </div>
  )
}
```

Example 2 (python):
```python
import { useRouter, useCanGoBack } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div>
      {canGoBack ? (
        <button onClick={() => router.history.back()}>Go back</button>
      ) : null}

      {/* ... */}
    </div>
  )
}
```

Example 3 (python):
```python
import { useRouter, useCanGoBack } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div>
      {canGoBack ? (
        <button onClick={() => router.history.back()}>Go back</button>
      ) : null}

      {/* ... */}
    </div>
  )
}
```

Example 4 (python):
```python
import { useRouter, useCanGoBack } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <div>
      {canGoBack ? (
        <button onClick={() => router.history.back()}>Go back</button>
      ) : null}

      {/* ... */}
    </div>
  )
}
```

---

## NavigateOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/NavigateOptionsType

**Contents:**
- NavigateOptions properties
  - replace
  - resetScroll
  - hashScrollIntoView
  - viewTransition
  - ignoreBlocker
  - reloadDocument
  - href

The NavigateOptions type is used to describe the options that can be used when describing a navigation action in TanStack Router.

The NavigateOptions object accepts the following properties:

This can be used instead of to to navigate to a fully built href, e.g. pointing to an external target.

**Examples:**

Example 1 (unknown):
```unknown
type NavigateOptions = ToOptions & {
  replace?: boolean
  resetScroll?: boolean
  hashScrollIntoView?: boolean | ScrollIntoViewOptions
  viewTransition?: boolean | ViewTransitionOptions
  ignoreBlocker?: boolean
  reloadDocument?: boolean
  href?: string
}
```

Example 2 (unknown):
```unknown
type NavigateOptions = ToOptions & {
  replace?: boolean
  resetScroll?: boolean
  hashScrollIntoView?: boolean | ScrollIntoViewOptions
  viewTransition?: boolean | ViewTransitionOptions
  ignoreBlocker?: boolean
  reloadDocument?: boolean
  href?: string
}
```

Example 3 (unknown):
```unknown
type NavigateOptions = ToOptions & {
  replace?: boolean
  resetScroll?: boolean
  hashScrollIntoView?: boolean | ScrollIntoViewOptions
  viewTransition?: boolean | ViewTransitionOptions
  ignoreBlocker?: boolean
  reloadDocument?: boolean
  href?: string
}
```

Example 4 (unknown):
```unknown
type NavigateOptions = ToOptions & {
  replace?: boolean
  resetScroll?: boolean
  hashScrollIntoView?: boolean | ScrollIntoViewOptions
  viewTransition?: boolean | ViewTransitionOptions
  ignoreBlocker?: boolean
  reloadDocument?: boolean
  href?: string
}
```

---

## useBlocker hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useBlockerHook

**Contents:**
- useBlocker options
  - options.shouldBlockFn option
  - options.disabled option
  - options.enableBeforeUnload option
  - options.withResolver option
  - options.blockerFn option (⚠️ deprecated)
  - options.condition option (⚠️ deprecated)
- useBlocker returns
- Examples
  - Basic usage

The useBlocker method is a hook that blocks navigation when a condition is met.

⚠️ The following new useBlocker API is currently experimental.

The useBlocker hook accepts a single required argument, an option object:

An object with the controls to allow manual blocking and unblocking of navigation.

void when withResolver is false

Two common use cases for the useBlocker hook are:

**Examples:**

Example 1 (unknown):
```unknown
interface ShouldBlockFnLocation<...> {
  routeId: TRouteId
  fullPath: TFullPath
  pathname: string
  params: TAllParams
  search: TFullSearchSchema
}

type ShouldBlockFnArgs = {
  current: ShouldBlockFnLocation
  next: ShouldBlockFnLocation
  action: HistoryAction
}
```

Example 2 (unknown):
```unknown
interface ShouldBlockFnLocation<...> {
  routeId: TRouteId
  fullPath: TFullPath
  pathname: string
  params: TAllParams
  search: TFullSearchSchema
}

type ShouldBlockFnArgs = {
  current: ShouldBlockFnLocation
  next: ShouldBlockFnLocation
  action: HistoryAction
}
```

Example 3 (unknown):
```unknown
interface ShouldBlockFnLocation<...> {
  routeId: TRouteId
  fullPath: TFullPath
  pathname: string
  params: TAllParams
  search: TFullSearchSchema
}

type ShouldBlockFnArgs = {
  current: ShouldBlockFnLocation
  next: ShouldBlockFnLocation
  action: HistoryAction
}
```

Example 4 (unknown):
```unknown
interface ShouldBlockFnLocation<...> {
  routeId: TRouteId
  fullPath: TFullPath
  pathname: string
  params: TAllParams
  search: TFullSearchSchema
}

type ShouldBlockFnArgs = {
  current: ShouldBlockFnLocation
  next: ShouldBlockFnLocation
  action: HistoryAction
}
```

---

## CatchBoundary component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/catchBoundaryComponent

**Contents:**
- CatchBoundary props
  - props.getResetKey prop
  - props.children prop
  - props.errorComponent prop
  - props.onCatch prop
- CatchBoundary returns
- Examples

The CatchBoundary component is a component that catches errors thrown by its children, renders an error component and optionally calls the onCatch callback. It also accepts a getResetKey function that can be used to declaratively reset the component's state when the key changes.

The CatchBoundary component accepts the following props:

**Examples:**

Example 1 (python):
```python
import { CatchBoundary } from '@tanstack/react-router'

function Component() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => console.error(error)}
    >
      <div>My Component</div>
    </CatchBoundary>
  )
}
```

Example 2 (python):
```python
import { CatchBoundary } from '@tanstack/react-router'

function Component() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => console.error(error)}
    >
      <div>My Component</div>
    </CatchBoundary>
  )
}
```

Example 3 (python):
```python
import { CatchBoundary } from '@tanstack/react-router'

function Component() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => console.error(error)}
    >
      <div>My Component</div>
    </CatchBoundary>
  )
}
```

Example 4 (python):
```python
import { CatchBoundary } from '@tanstack/react-router'

function Component() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => console.error(error)}
    >
      <div>My Component</div>
    </CatchBoundary>
  )
}
```

---

## redirect function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/redirectFunction

**Contents:**
- redirect options
- redirect returns
- Examples

The redirect function returns a new Redirect object that can be either returned or thrown from places like a Route's beforeLoad or loader callbacks to trigger redirect to a new location.

The redirect function accepts a single argument, the options to determine the redirect behavior.

**Examples:**

Example 1 (python):
```python
import { redirect } from '@tanstack/react-router'

const route = createRoute({
  // throwing an internal redirect object using 'to' property
  loader: () => {
    if (!user) {
      throw redirect({
        to: '/login',
      })
    }
  },
  // throwing an external redirect object using 'href' property
  loader: () => {
    if (needsExternalAuth) {
      throw redirect({
        href: 'https://authprovider.com/login',
      })
    }
  },
  // or forcing `redirect` to throw itself
  loader: () => {
    if (!user) {
      redirect({
        to: '/login',
        throw: true,
      })
    }
  },
...
```

Example 2 (python):
```python
import { redirect } from '@tanstack/react-router'

const route = createRoute({
  // throwing an internal redirect object using 'to' property
  loader: () => {
    if (!user) {
      throw redirect({
        to: '/login',
      })
    }
  },
  // throwing an external redirect object using 'href' property
  loader: () => {
    if (needsExternalAuth) {
      throw redirect({
        href: 'https://authprovider.com/login',
      })
    }
  },
  // or forcing `redirect` to throw itself
  loader: () => {
    if (!user) {
      redirect({
        to: '/login',
        throw: true,
      })
    }
  },
...
```

Example 3 (python):
```python
import { redirect } from '@tanstack/react-router'

const route = createRoute({
  // throwing an internal redirect object using 'to' property
  loader: () => {
    if (!user) {
      throw redirect({
        to: '/login',
      })
    }
  },
  // throwing an external redirect object using 'href' property
  loader: () => {
    if (needsExternalAuth) {
      throw redirect({
        href: 'https://authprovider.com/login',
      })
    }
  },
  // or forcing `redirect` to throw itself
  loader: () => {
    if (!user) {
      redirect({
        to: '/login',
        throw: true,
      })
    }
  },
...
```

Example 4 (python):
```python
import { redirect } from '@tanstack/react-router'

const route = createRoute({
  // throwing an internal redirect object using 'to' property
  loader: () => {
    if (!user) {
      throw redirect({
        to: '/login',
      })
    }
  },
  // throwing an external redirect object using 'href' property
  loader: () => {
    if (needsExternalAuth) {
      throw redirect({
        href: 'https://authprovider.com/login',
      })
    }
  },
  // or forcing `redirect` to throw itself
  loader: () => {
    if (!user) {
      redirect({
        to: '/login',
        throw: true,
      })
    }
  },
...
```

---

## useParentMatches hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useParentMatchesHook

**Contents:**
- useParentMatches options
  - opts.select option
  - opts.structuralSharing option
- useParentMatches returns
- Examples

The useParentMatches hook returns all of the parent RouteMatch objects from the root down to the immediate parent of the current match in context. It does not include the current match, which can be obtained using the useMatch hook.

If the router has pending matches and they are showing their pending component fallbacks, router.state.pendingMatches will used instead of router.state.matches.

The useParentMatches hook accepts an optional options object.

**Examples:**

Example 1 (python):
```python
import { useParentMatches } from '@tanstack/react-router'

function Component() {
  const parentMatches = useParentMatches()
  //    ^ [RouteMatch, RouteMatch, ...]
}
```

Example 2 (python):
```python
import { useParentMatches } from '@tanstack/react-router'

function Component() {
  const parentMatches = useParentMatches()
  //    ^ [RouteMatch, RouteMatch, ...]
}
```

Example 3 (python):
```python
import { useParentMatches } from '@tanstack/react-router'

function Component() {
  const parentMatches = useParentMatches()
  //    ^ [RouteMatch, RouteMatch, ...]
}
```

Example 4 (python):
```python
import { useParentMatches } from '@tanstack/react-router'

function Component() {
  const parentMatches = useParentMatches()
  //    ^ [RouteMatch, RouteMatch, ...]
}
```

---

## LinkOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/LinkOptionsType

**Contents:**
- LinkOptions properties
  - target
  - activeOptions
  - preload
  - preloadDelay
  - disabled

The LinkOptions type extends the NavigateOptions type and contains additional options that can be used by TanStack Router when handling actual anchor element attributes.

The LinkOptions object accepts/contains the following properties:

**Examples:**

Example 1 (unknown):
```unknown
type LinkOptions = NavigateOptions & {
  target?: HTMLAnchorElement['target']
  activeOptions?: ActiveOptions
  preload?: false | 'intent'
  preloadDelay?: number
  disabled?: boolean
}
```

Example 2 (unknown):
```unknown
type LinkOptions = NavigateOptions & {
  target?: HTMLAnchorElement['target']
  activeOptions?: ActiveOptions
  preload?: false | 'intent'
  preloadDelay?: number
  disabled?: boolean
}
```

Example 3 (unknown):
```unknown
type LinkOptions = NavigateOptions & {
  target?: HTMLAnchorElement['target']
  activeOptions?: ActiveOptions
  preload?: false | 'intent'
  preloadDelay?: number
  disabled?: boolean
}
```

Example 4 (unknown):
```unknown
type LinkOptions = NavigateOptions & {
  target?: HTMLAnchorElement['target']
  activeOptions?: ActiveOptions
  preload?: false | 'intent'
  preloadDelay?: number
  disabled?: boolean
}
```

---

## useNavigate hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useNavigateHook

**Contents:**
- useNavigate options
  - opts.from option
- useNavigate returns
- navigate function
  - navigate function options
  - navigate function returns
- Examples

The useNavigate hook is a hook that returns a navigate function that can be used to navigate to a new location. This includes changes to the pathname, search params, hash, and location state.

The useNavigate hook accepts a single argument, an options object.

The navigate function is a function that can be used to navigate to a new location.

The navigate function accepts a single argument, an options object.

**Examples:**

Example 1 (python):
```python
import { useNavigate } from '@tanstack/react-router'

function PostsPage() {
  const navigate = useNavigate({ from: '/posts' })
  const handleClick = () => navigate({ search: { page: 2 } })
  // ...
}

function Component() {
  const navigate = useNavigate()
  return (
    <div>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
          })
        }
      >
        Posts
      </button>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
            search: { page: 2 },
          })
        }
      >
        Posts (Page 2)
     
...
```

Example 2 (python):
```python
import { useNavigate } from '@tanstack/react-router'

function PostsPage() {
  const navigate = useNavigate({ from: '/posts' })
  const handleClick = () => navigate({ search: { page: 2 } })
  // ...
}

function Component() {
  const navigate = useNavigate()
  return (
    <div>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
          })
        }
      >
        Posts
      </button>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
            search: { page: 2 },
          })
        }
      >
        Posts (Page 2)
     
...
```

Example 3 (python):
```python
import { useNavigate } from '@tanstack/react-router'

function PostsPage() {
  const navigate = useNavigate({ from: '/posts' })
  const handleClick = () => navigate({ search: { page: 2 } })
  // ...
}

function Component() {
  const navigate = useNavigate()
  return (
    <div>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
          })
        }
      >
        Posts
      </button>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
            search: { page: 2 },
          })
        }
      >
        Posts (Page 2)
     
...
```

Example 4 (python):
```python
import { useNavigate } from '@tanstack/react-router'

function PostsPage() {
  const navigate = useNavigate({ from: '/posts' })
  const handleClick = () => navigate({ search: { page: 2 } })
  // ...
}

function Component() {
  const navigate = useNavigate()
  return (
    <div>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
          })
        }
      >
        Posts
      </button>
      <button
        onClick={() =>
          navigate({
            to: '/posts',
            search: { page: 2 },
          })
        }
      >
        Posts (Page 2)
     
...
```

---

## createLazyFileRoute function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createLazyFileRouteFunction

**Contents:**
- createLazyFileRoute options
  - path
  - createLazyFileRoute returns
  - Examples

The createLazyFileRoute function is used for creating a partial file-based route route instance that is lazily loaded when matched. This route instance can only be used to configure the non-critical properties of the route, such as component, pendingComponent, errorComponent, and the notFoundComponent.

The createLazyFileRoute function accepts a single argument of type string that represents the path of the file that the route will be generated from.

A new function that accepts a single argument of partial of the type RouteOptions that will be used to configure the file Route instance.

⚠️ Note: For tsr generate and tsr watch to work properly, the file route instance must be exported from the file using the Route identifier.

**Examples:**

Example 1 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

Example 2 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

Example 3 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

Example 4 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

---

## Register type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RegisterType

**Contents:**
- Examples

This type is used to register a route tree with a router instance. Doing so unlocks the full type safety of TanStack Router, including top-level exports from the @tanstack/react-router package.

To register a route tree with a router instance, use declaration merging to add the type of your router instance to the Register interface under the router property:

**Examples:**

Example 1 (unknown):
```unknown
export type Register = {
  // router: [Your router type here]
}
```

Example 2 (unknown):
```unknown
export type Register = {
  // router: [Your router type here]
}
```

Example 3 (unknown):
```unknown
export type Register = {
  // router: [Your router type here]
}
```

Example 4 (unknown):
```unknown
export type Register = {
  // router: [Your router type here]
}
```

---

## How to Set Up Role-Based Access Control

**URL:** https://tanstack.com/router/latest/docs/framework/react/how-to/setup-rbac

**Contents:**
- Quick Start
- Extend Authentication Context
  - 1. Add Roles to User Type
  - 2. Update Router Context Types
- Create Role-Protected Routes
  - 1. Admin-Only Routes
  - 2. Multiple Role Access
  - 3. Permission-Based Routes
- Create Specific Protected Pages
  - 1. Admin Dashboard

This guide covers implementing role-based access control (RBAC) and permission-based routing in TanStack Router applications.

Extend your authentication context to include roles and permissions, create role-protected layout routes, and use beforeLoad to check user permissions before rendering routes.

Update your authentication context to include roles:

Update src/routes/__root.tsx:

Create src/routes/_authenticated/_admin.tsx:

Create src/routes/_authenticated/_moderator.tsx:

Create src/routes/_authenticated/_users.tsx:

Create src/routes/_authenticated/_admin/dashboard.tsx:

Create src/routes/_authenticated/_users/manage.tsx:

Create src/routes/unauthorized.tsx:

Create src/hooks/usePermissions.ts:

Create src/components/PermissionGuard.tsx:

Problem: User roles/permissions are undefined in routes.

Solution: Ensure your authentication API returns complete user data:

Problem: Users locked out of areas they should access.

Solution: Use hierarchical permissions and role inheritance:

Problem: Too many permission checks slowing down renders.

Solution: Memoize permission computations:

After setting up RBAC, you might want to:

**Examples:**

Example 1 (python):
```python
// src/auth.tsx
import React, { createContext, useContext, useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  roles: string[]
  permissions: string[]
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined
...
```

Example 2 (python):
```python
// src/auth.tsx
import React, { createContext, useContext, useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  roles: string[]
  permissions: string[]
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined
...
```

Example 3 (python):
```python
// src/auth.tsx
import React, { createContext, useContext, useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  roles: string[]
  permissions: string[]
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined
...
```

Example 4 (python):
```python
// src/auth.tsx
import React, { createContext, useContext, useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  roles: string[]
  permissions: string[]
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined
...
```

---

## useLoaderData hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDataHook

**Contents:**
- useLoaderData options
  - opts.from option
  - opts.strict option
  - opts.select option
  - opts.structuralSharing option
- useLoaderData returns
- Examples

The useLoaderData hook returns the loader data from the closest RouteMatch in the component tree.

The useLoaderData hook accepts an options object.

**Examples:**

Example 1 (python):
```python
import { useLoaderData } from '@tanstack/react-router'

function Component() {
  const loaderData = useLoaderData({ from: '/posts/$postId' })
  //     ^? { postId: string, body: string, ... }
  // ...
}
```

Example 2 (python):
```python
import { useLoaderData } from '@tanstack/react-router'

function Component() {
  const loaderData = useLoaderData({ from: '/posts/$postId' })
  //     ^? { postId: string, body: string, ... }
  // ...
}
```

Example 3 (python):
```python
import { useLoaderData } from '@tanstack/react-router'

function Component() {
  const loaderData = useLoaderData({ from: '/posts/$postId' })
  //     ^? { postId: string, body: string, ... }
  // ...
}
```

Example 4 (python):
```python
import { useLoaderData } from '@tanstack/react-router'

function Component() {
  const loaderData = useLoaderData({ from: '/posts/$postId' })
  //     ^? { postId: string, body: string, ... }
  // ...
}
```

---

## LinkProps type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/LinkPropsType

**Contents:**
- LinkProps properties
    - children

The LinkProps type extends the ActiveLinkOptions and React.AnchorHTMLAttributes<HTMLAnchorElement> types and contains additional props specific to the Link component.

**Examples:**

Example 1 (javascript):
```javascript
type LinkProps = ActiveLinkOptions &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    children?:
      | React.ReactNode
      | ((state: { isActive: boolean }) => React.ReactNode)
  }
```

Example 2 (javascript):
```javascript
type LinkProps = ActiveLinkOptions &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    children?:
      | React.ReactNode
      | ((state: { isActive: boolean }) => React.ReactNode)
  }
```

Example 3 (javascript):
```javascript
type LinkProps = ActiveLinkOptions &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    children?:
      | React.ReactNode
      | ((state: { isActive: boolean }) => React.ReactNode)
  }
```

Example 4 (javascript):
```javascript
type LinkProps = ActiveLinkOptions &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    children?:
      | React.ReactNode
      | ((state: { isActive: boolean }) => React.ReactNode)
  }
```

---

## useAwaited hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useAwaitedHook

**Contents:**
- useAwaited options
  - options.promise option
- useAwaited returns
- Examples

The useAwaited method is a hook that suspends until the provided promise is resolved or rejected.

The useAwaited hook accepts a single argument, an options object.

**Examples:**

Example 1 (python):
```python
import { useAwaited } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  const data = useAwaited({ promise: myDeferredPromise })
  // ...
}
```

Example 2 (python):
```python
import { useAwaited } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  const data = useAwaited({ promise: myDeferredPromise })
  // ...
}
```

Example 3 (python):
```python
import { useAwaited } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  const data = useAwaited({ promise: myDeferredPromise })
  // ...
}
```

Example 4 (python):
```python
import { useAwaited } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  const data = useAwaited({ promise: myDeferredPromise })
  // ...
}
```

---

## How to Set Up Authentication Providers

**URL:** https://tanstack.com/router/latest/docs/framework/react/how-to/setup-auth-providers

**Contents:**
- Quick Start
- Auth0 Integration
  - 1. Install Auth0
  - 2. Set Up Environment Variables
  - 3. Create Auth0 Wrapper
  - 4. Update App Configuration
  - 5. Create Protected Routes
- Clerk Integration
  - 1. Install Clerk
  - 2. Set Up Environment Variables

This guide covers integrating popular authentication services (Auth0, Clerk, Supabase) with TanStack Router.

Choose an authentication provider, install their SDK, wrap your router with their context, and adapt their auth state to work with TanStack Router's context system.

Add to your .env file:

Create src/auth/auth0.tsx:

Create src/routes/_authenticated.tsx:

Add to your .env file:

Create src/auth/clerk.tsx:

Create src/routes/sign-in.tsx:

Create src/routes/sign-up.tsx:

Create src/routes/_authenticated.tsx:

Add to your .env file:

Create src/auth/supabase.tsx:

Create src/routes/login.tsx:

Problem: Auth context is undefined in components.

Solution: Ensure the provider wrapper is above RouterProvider:

Problem: App stuck on loading screen.

Solution: Check if auth provider properly sets isLoading to false:

Problem: Continuous redirects between login and protected routes.

Solution: Handle Auth0's automatic redirects properly:

After integrating authentication providers, you might want to:

**Examples:**

Example 1 (unknown):
```unknown
npm install @auth0/auth0-react
```

Example 2 (unknown):
```unknown
npm install @auth0/auth0-react
```

Example 3 (unknown):
```unknown
npm install @auth0/auth0-react
```

Example 4 (unknown):
```unknown
npm install @auth0/auth0-react
```

---

## getRouteApi function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/getRouteApiFunction

**Contents:**
- getRouteApi options
  - routeId option
- getRouteApi returns
- Examples

The getRouteApi function provides type-safe version of common hooks like useParams, useSearch, useRouteContext, useNavigate, useLoaderData, and useLoaderDeps that are pre-bound to a specific route ID and corresponding registered route types.

The getRouteApi function accepts a single argument, a routeId string literal.

**Examples:**

Example 1 (python):
```python
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts')

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

Example 2 (python):
```python
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts')

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

Example 3 (python):
```python
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts')

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

Example 4 (python):
```python
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts')

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

---

## Await component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/awaitComponent

**Contents:**
- Await props
  - props.promise prop
  - props.children prop
- Await returns
- Examples

The Await component is a component that suspends until the provided promise is resolved or rejected. This is only necessary for React 18. If you are using React 19, you can use the use() hook instead.

The Await component accepts the following props:

**Examples:**

Example 1 (python):
```python
import { Await } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

Example 2 (python):
```python
import { Await } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

Example 3 (python):
```python
import { Await } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

Example 4 (python):
```python
import { Await } from '@tanstack/react-router'

function Component() {
  const { deferredPromise } = route.useLoaderData()

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

---

## DefaultGlobalNotFound component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/defaultGlobalNotFoundComponent

**Contents:**
- DefaultGlobalNotFound returns

The DefaultGlobalNotFound component is a component that renders "Not Found" on the root route when there is no other route that matches and a notFoundComponent is not provided.

**Examples:**

Example 1 (unknown):
```unknown
<p>Not Found</p>
```

Example 2 (unknown):
```unknown
<p>Not Found</p>
```

Example 3 (unknown):
```unknown
<p>Not Found</p>
```

Example 4 (unknown):
```unknown
<p>Not Found</p>
```

---

## RouteOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouteOptionsType

**Contents:**
- RouteOptions properties
  - getParentRoute method
  - path property
  - id property
  - component property
  - errorComponent property
  - pendingComponent property
  - notFoundComponent property
  - validateSearch method
  - search.middlewares property

The RouteOptions type is used to describe the options that can be used when creating a route.

The RouteOptions type accepts an object with the following properties:

🚧 opts.navigate has been deprecated and will be removed in the next major release. Use throw redirect({ to: '/somewhere' }) instead. Read more about the redirect function here.

🚧 opts.navigate has been deprecated and will be removed in the next major release. Use throw redirect({ to: '/somewhere' }) instead. Read more about the redirect function here.

Example: If you want to configure to remount a route component upon params change, use:

**Examples:**

Example 1 (javascript):
```javascript
type beforeLoad = (
  opts: RouteMatch & {
    search: TFullSearchSchema
    abortController: AbortController
    preload: boolean
    params: TAllParams
    context: TParentContext
    location: ParsedLocation
    navigate: NavigateFn<AnyRoute> // @deprecated
    buildLocation: BuildLocationFn<AnyRoute>
    cause: 'enter' | 'stay'
  },
) => Promise<TRouteContext> | TRouteContext | void
```

Example 2 (javascript):
```javascript
type beforeLoad = (
  opts: RouteMatch & {
    search: TFullSearchSchema
    abortController: AbortController
    preload: boolean
    params: TAllParams
    context: TParentContext
    location: ParsedLocation
    navigate: NavigateFn<AnyRoute> // @deprecated
    buildLocation: BuildLocationFn<AnyRoute>
    cause: 'enter' | 'stay'
  },
) => Promise<TRouteContext> | TRouteContext | void
```

Example 3 (javascript):
```javascript
type beforeLoad = (
  opts: RouteMatch & {
    search: TFullSearchSchema
    abortController: AbortController
    preload: boolean
    params: TAllParams
    context: TParentContext
    location: ParsedLocation
    navigate: NavigateFn<AnyRoute> // @deprecated
    buildLocation: BuildLocationFn<AnyRoute>
    cause: 'enter' | 'stay'
  },
) => Promise<TRouteContext> | TRouteContext | void
```

Example 4 (javascript):
```javascript
type beforeLoad = (
  opts: RouteMatch & {
    search: TFullSearchSchema
    abortController: AbortController
    preload: boolean
    params: TAllParams
    context: TParentContext
    location: ParsedLocation
    navigate: NavigateFn<AnyRoute> // @deprecated
    buildLocation: BuildLocationFn<AnyRoute>
    cause: 'enter' | 'stay'
  },
) => Promise<TRouteContext> | TRouteContext | void
```

---

## Router API

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router

---

## createRouter function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction

**Contents:**
- createRouter options
- createRouter returns
- Examples

The createRouter function accepts a RouterOptions object and creates a new Router instance.

**Examples:**

Example 1 (python):
```python
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

Example 2 (python):
```python
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

Example 3 (python):
```python
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

Example 4 (python):
```python
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

---

## Router Class

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouterClass

**Contents:**
- Router constructor
  - Constructor options
  - Constructor returns
- Examples

This class has been deprecated and will be removed in the next major version of TanStack Router. Please use the createRouter function instead.

The Router class is used to instantiate a new router instance.

The Router constructor accepts a single argument: the options that will be used to configure the router instance.

**Examples:**

Example 1 (python):
```python
import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = new Router({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

Example 2 (python):
```python
import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = new Router({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

Example 3 (python):
```python
import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = new Router({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

Example 4 (python):
```python
import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = new Router({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

---

## RootRoute class

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RootRouteClass

**Contents:**
- RootRoute constructor
  - Constructor options
- Constructor returns
- Examples

This class has been deprecated and will be removed in the next major version of TanStack Router. Please use the createRootRoute function instead.

The RootRoute class extends the Route class and can be used to create a root route instance. A root route instance can then be used to create a route tree.

The RootRoute constructor accepts an object as its only argument.

The options that will be used to configure the root route instance.

A new Route instance.

**Examples:**

Example 1 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 2 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 3 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 4 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

---

## useMatchRoute hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchRouteHook

**Contents:**
- useMatchRoute returns
- matchRoute function
  - matchRoute function options
  - matchRoute function returns
- Examples

The useMatchRoute hook is a hook that returns a matchRoute function that can be used to match a route against either the current or pending location.

The matchRoute function is a function that can be used to match a route against either the current or pending location.

The matchRoute function accepts a single argument, an options object.

**Examples:**

Example 1 (python):
```python
import { useMatchRoute } from '@tanstack/react-router'

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts/$postId' })
  //    ^ { postId: '123' }
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts' })
  //    ^ false
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts', fuzzy: true })
  //    ^ {}
}

// Current location: /posts
// Pending loca
...
```

Example 2 (python):
```python
import { useMatchRoute } from '@tanstack/react-router'

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts/$postId' })
  //    ^ { postId: '123' }
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts' })
  //    ^ false
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts', fuzzy: true })
  //    ^ {}
}

// Current location: /posts
// Pending loca
...
```

Example 3 (python):
```python
import { useMatchRoute } from '@tanstack/react-router'

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts/$postId' })
  //    ^ { postId: '123' }
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts' })
  //    ^ false
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts', fuzzy: true })
  //    ^ {}
}

// Current location: /posts
// Pending loca
...
```

Example 4 (python):
```python
import { useMatchRoute } from '@tanstack/react-router'

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts/$postId' })
  //    ^ { postId: '123' }
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts' })
  //    ^ false
}

// Current location: /posts/123
function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts', fuzzy: true })
  //    ^ {}
}

// Current location: /posts
// Pending loca
...
```

---

## Outlet component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/outletComponent

**Contents:**
- Outlet props
- Outlet returns

The Outlet component is a component that can be used to render the next child route of a parent route.

The Outlet component does not accept any props.

---

## Redirect type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RedirectType

**Contents:**
- Redirect properties
  - statusCode property
  - throw property
  - headers property
  - Navigation Properties

The Redirect type is used to represent a redirect action in TanStack Router.

The Redirect object accepts/contains the following properties:

Since Redirect extends NavigateOptions, it also supports navigation properties:

Important: For external URLs, always use the href property instead of to. The to property is designed for internal navigation within your application.

**Examples:**

Example 1 (unknown):
```unknown
export type Redirect = {
  statusCode?: number
  throw?: any
  headers?: HeadersInit
} & NavigateOptions
```

Example 2 (unknown):
```unknown
export type Redirect = {
  statusCode?: number
  throw?: any
  headers?: HeadersInit
} & NavigateOptions
```

Example 3 (unknown):
```unknown
export type Redirect = {
  statusCode?: number
  throw?: any
  headers?: HeadersInit
} & NavigateOptions
```

Example 4 (unknown):
```unknown
export type Redirect = {
  statusCode?: number
  throw?: any
  headers?: HeadersInit
} & NavigateOptions
```

---

## RouteApi Type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouteApiType

**Contents:**
- RouteApi properties and methods
  - useMatch method
  - useRouteContext method
  - useSearch method
  - useParams method
  - useLoaderData method
  - useLoaderDeps method
  - useNavigate method

The RouteApi describes an instance that provides type-safe versions of common hooks like useParams, useSearch, useRouteContext, useNavigate, useLoaderData, and useLoaderDeps that are pre-bound to a specific route ID and corresponding registered route types.

The RouteApi has the following properties and methods:

**Examples:**

Example 1 (javascript):
```javascript
useMatch<TSelected = TAllContext>(opts?: {
    select?: (match: TAllContext) => TSelected
  }): TSelected
```

Example 2 (javascript):
```javascript
useMatch<TSelected = TAllContext>(opts?: {
    select?: (match: TAllContext) => TSelected
  }): TSelected
```

Example 3 (javascript):
```javascript
useMatch<TSelected = TAllContext>(opts?: {
    select?: (match: TAllContext) => TSelected
  }): TSelected
```

Example 4 (javascript):
```javascript
useMatch<TSelected = TAllContext>(opts?: {
    select?: (match: TAllContext) => TSelected
  }): TSelected
```

---

## useLocation hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useLocationHook

**Contents:**
- useLocation options
  - opts.select option
- useLocation returns
- Examples

The useLocation method is a hook that returns the current location object. This hook is useful for when you want to perform some side effect whenever the current location changes.

The useLocation hook accepts an optional options object.

**Examples:**

Example 1 (python):
```python
import { useLocation } from '@tanstack/react-router'

function Component() {
  const location = useLocation()
  //    ^ ParsedLocation

  // OR

  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  //    ^ string

  // ...
}
```

Example 2 (python):
```python
import { useLocation } from '@tanstack/react-router'

function Component() {
  const location = useLocation()
  //    ^ ParsedLocation

  // OR

  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  //    ^ string

  // ...
}
```

Example 3 (python):
```python
import { useLocation } from '@tanstack/react-router'

function Component() {
  const location = useLocation()
  //    ^ ParsedLocation

  // OR

  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  //    ^ string

  // ...
}
```

Example 4 (python):
```python
import { useLocation } from '@tanstack/react-router'

function Component() {
  const location = useLocation()
  //    ^ ParsedLocation

  // OR

  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  //    ^ string

  // ...
}
```

---

## useSearch hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useSearchHook

**Contents:**
- useSearch options
  - opts.from option
  - opts.shouldThrow option
  - opts.select option
  - opts.structuralSharing option
  - opts.strict option
- useSearch returns
- Examples

The useSearch method is a hook that returns the current search query parameters as an object for the current location. This hook is useful for accessing the current search string and query parameters in a component.

The useSearch hook accepts an options object.

**Examples:**

Example 1 (python):
```python
import { useSearch } from '@tanstack/react-router'

function Component() {
  const search = useSearch({ from: '/posts/$postId' })
  //    ^ FullSearchSchema

  // OR

  const selected = useSearch({
    from: '/posts/$postId',
    select: (search) => search.postView,
  })
  //    ^ string

  // OR

  const looseSearch = useSearch({ strict: false })
  //    ^ Partial<FullSearchSchema>

  // ...
}
```

Example 2 (python):
```python
import { useSearch } from '@tanstack/react-router'

function Component() {
  const search = useSearch({ from: '/posts/$postId' })
  //    ^ FullSearchSchema

  // OR

  const selected = useSearch({
    from: '/posts/$postId',
    select: (search) => search.postView,
  })
  //    ^ string

  // OR

  const looseSearch = useSearch({ strict: false })
  //    ^ Partial<FullSearchSchema>

  // ...
}
```

Example 3 (python):
```python
import { useSearch } from '@tanstack/react-router'

function Component() {
  const search = useSearch({ from: '/posts/$postId' })
  //    ^ FullSearchSchema

  // OR

  const selected = useSearch({
    from: '/posts/$postId',
    select: (search) => search.postView,
  })
  //    ^ string

  // OR

  const looseSearch = useSearch({ strict: false })
  //    ^ Partial<FullSearchSchema>

  // ...
}
```

Example 4 (python):
```python
import { useSearch } from '@tanstack/react-router'

function Component() {
  const search = useSearch({ from: '/posts/$postId' })
  //    ^ FullSearchSchema

  // OR

  const selected = useSearch({
    from: '/posts/$postId',
    select: (search) => search.postView,
  })
  //    ^ string

  // OR

  const looseSearch = useSearch({ strict: false })
  //    ^ Partial<FullSearchSchema>

  // ...
}
```

---

## MatchRoute component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/matchRouteComponent

**Contents:**
- MatchRoute props
  - ...props prop
  - children prop
- MatchRoute returns
- Examples

A component version of the useMatchRoute hook. It accepts the same options as the useMatchRoute with additional props to aid in conditional rendering.

The MatchRoute component accepts the same options as the useMatchRoute hook with additional props to aid in conditional rendering.

Either the children prop or the return value of the children function.

**Examples:**

Example 1 (python):
```python
import { MatchRoute } from '@tanstack/react-router'

function Component() {
  return (
    <div>
      <MatchRoute to="/posts/$postId" params={{ postId: '123' }} pending>
        {(match) => <Spinner show={!!match} wait="delay-50" />}
      </MatchRoute>
    </div>
  )
}
```

Example 2 (python):
```python
import { MatchRoute } from '@tanstack/react-router'

function Component() {
  return (
    <div>
      <MatchRoute to="/posts/$postId" params={{ postId: '123' }} pending>
        {(match) => <Spinner show={!!match} wait="delay-50" />}
      </MatchRoute>
    </div>
  )
}
```

Example 3 (python):
```python
import { MatchRoute } from '@tanstack/react-router'

function Component() {
  return (
    <div>
      <MatchRoute to="/posts/$postId" params={{ postId: '123' }} pending>
        {(match) => <Spinner show={!!match} wait="delay-50" />}
      </MatchRoute>
    </div>
  )
}
```

Example 4 (python):
```python
import { MatchRoute } from '@tanstack/react-router'

function Component() {
  return (
    <div>
      <MatchRoute to="/posts/$postId" params={{ postId: '123' }} pending>
        {(match) => <Spinner show={!!match} wait="delay-50" />}
      </MatchRoute>
    </div>
  )
}
```

---

## Router type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouterType

**Contents:**
- Router properties and methods
  - .update method
  - state property
  - .subscribe method
  - .matchRoutes method
  - .cancelMatch method
  - .cancelMatches method
  - .buildLocation method
  - .commitLocation method
  - .navigate method

The Router type is used to describe a router instance.

An instance of the Router has the following properties and methods:

⚠️⚠️⚠️ router.state is always up to date, but NOT REACTIVE. If you use router.state in a component, the component will not re-render when the router state changes. To get a reactive version of the router state, use the useRouterState hook.

Builds a new parsed location object that can be used later to navigate to a new location.

Commits a new location object to the browser history.

Navigates to a new location.

Invalidates route matches by forcing their beforeLoad and load functions to be called again.

Remove cached route matches.

Loads all of the currently matched route matches and resolves when they are all loaded and ready to be rendered.

⚠️⚠️⚠️ router.load() respects route.staleTime and will not forcefully reload a route match if it is still fresh. If you need to forcefully reload a route match, use router.invalidate() instead.

Preloads all of the matches that match the provided NavigateOptions.

⚠️⚠️⚠️ Preloaded route matches are not stored long-term in the router state. They are only stored until the next attempted navigation action.

Loads the JS chunk of the route.

Matches a pathname and search params against the router's route tree and returns a route match's params or false if no match was found.

Dehydrates the router's critical state into a serializable object that can be sent to the client in an initial request.

Hydrates the router's critical state from a serializable object that was sent from the server in an initial request.

**Examples:**

Example 1 (javascript):
```javascript
type commitLocation = (
  location: ParsedLocation & {
    replace?: boolean
    resetScroll?: boolean
    hashScrollIntoView?: boolean | ScrollIntoViewOptions
    ignoreBlocker?: boolean
  },
) => Promise<void>
```

Example 2 (javascript):
```javascript
type commitLocation = (
  location: ParsedLocation & {
    replace?: boolean
    resetScroll?: boolean
    hashScrollIntoView?: boolean | ScrollIntoViewOptions
    ignoreBlocker?: boolean
  },
) => Promise<void>
```

Example 3 (javascript):
```javascript
type commitLocation = (
  location: ParsedLocation & {
    replace?: boolean
    resetScroll?: boolean
    hashScrollIntoView?: boolean | ScrollIntoViewOptions
    ignoreBlocker?: boolean
  },
) => Promise<void>
```

Example 4 (javascript):
```javascript
type commitLocation = (
  location: ParsedLocation & {
    replace?: boolean
    resetScroll?: boolean
    hashScrollIntoView?: boolean | ScrollIntoViewOptions
    ignoreBlocker?: boolean
  },
) => Promise<void>
```

---

## ViewTransitionOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/ViewTransitionOptionsType

**Contents:**
- ViewTransitionOptions properties
  - types property

The ViewTransitionOptions type is used to define a viewTransition type.

The ViewTransitionOptions type accepts an object with a single property:

**Examples:**

Example 1 (javascript):
```javascript
interface ViewTransitionOptions {
  types:
    | Array<string>
    | ((locationChangeInfo: {
        fromLocation?: ParsedLocation
        toLocation: ParsedLocation
        pathChanged: boolean
        hrefChanged: boolean
        hashChanged: boolean
      }) => Array<string> | false)
}
```

Example 2 (javascript):
```javascript
interface ViewTransitionOptions {
  types:
    | Array<string>
    | ((locationChangeInfo: {
        fromLocation?: ParsedLocation
        toLocation: ParsedLocation
        pathChanged: boolean
        hrefChanged: boolean
        hashChanged: boolean
      }) => Array<string> | false)
}
```

Example 3 (javascript):
```javascript
interface ViewTransitionOptions {
  types:
    | Array<string>
    | ((locationChangeInfo: {
        fromLocation?: ParsedLocation
        toLocation: ParsedLocation
        pathChanged: boolean
        hrefChanged: boolean
        hashChanged: boolean
      }) => Array<string> | false)
}
```

Example 4 (javascript):
```javascript
interface ViewTransitionOptions {
  types:
    | Array<string>
    | ((locationChangeInfo: {
        fromLocation?: ParsedLocation
        toLocation: ParsedLocation
        pathChanged: boolean
        hrefChanged: boolean
        hashChanged: boolean
      }) => Array<string> | false)
}
```

---

## useRouteContext hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useRouteContextHook

**Contents:**
- useRouteContext options
  - opts.from option
  - opts.select option
- useRouteContext returns
- Examples

The useRouteContext method is a hook that returns the current context for the current route. This hook is useful for accessing the current route context in a component.

The useRouteContext hook accepts an options object.

**Examples:**

Example 1 (python):
```python
import { useRouteContext } from '@tanstack/react-router'

function Component() {
  const context = useRouteContext({ from: '/posts/$postId' })
  //    ^ RouteContext

  // OR

  const selected = useRouteContext({
    from: '/posts/$postId',
    select: (context) => context.postId,
  })
  //    ^ string

  // ...
}
```

Example 2 (python):
```python
import { useRouteContext } from '@tanstack/react-router'

function Component() {
  const context = useRouteContext({ from: '/posts/$postId' })
  //    ^ RouteContext

  // OR

  const selected = useRouteContext({
    from: '/posts/$postId',
    select: (context) => context.postId,
  })
  //    ^ string

  // ...
}
```

Example 3 (python):
```python
import { useRouteContext } from '@tanstack/react-router'

function Component() {
  const context = useRouteContext({ from: '/posts/$postId' })
  //    ^ RouteContext

  // OR

  const selected = useRouteContext({
    from: '/posts/$postId',
    select: (context) => context.postId,
  })
  //    ^ string

  // ...
}
```

Example 4 (python):
```python
import { useRouteContext } from '@tanstack/react-router'

function Component() {
  const context = useRouteContext({ from: '/posts/$postId' })
  //    ^ RouteContext

  // OR

  const selected = useRouteContext({
    from: '/posts/$postId',
    select: (context) => context.postId,
  })
  //    ^ string

  // ...
}
```

---

## NotFoundError

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/NotFoundErrorType

**Contents:**
- NotFoundError properties
  - global property (⚠️ deprecated, use routeId: rootRouteId instead)
  - data property
  - throw property
  - route property
  - headers property

The NotFoundError type is used to represent a not-found error in TanStack Router.

The NotFoundError object accepts/contains the following properties:

**Examples:**

Example 1 (unknown):
```unknown
export type NotFoundError = {
  global?: boolean
  data?: any
  throw?: boolean
  routeId?: string
  headers?: HeadersInit
}
```

Example 2 (unknown):
```unknown
export type NotFoundError = {
  global?: boolean
  data?: any
  throw?: boolean
  routeId?: string
  headers?: HeadersInit
}
```

Example 3 (unknown):
```unknown
export type NotFoundError = {
  global?: boolean
  data?: any
  throw?: boolean
  routeId?: string
  headers?: HeadersInit
}
```

Example 4 (unknown):
```unknown
export type NotFoundError = {
  global?: boolean
  data?: any
  throw?: boolean
  routeId?: string
  headers?: HeadersInit
}
```

---

## defer function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/deferFunction

**Contents:**
- defer options
- defer returns
- Examples

You don't need to call defer manually anymore, Promises are handled automatically now.

The defer function wraps a promise with a deferred state object that can be used to inspect the promise's state. This deferred promise can then be passed to the useAwaited hook or the <Await> component for suspending until the promise is resolved or rejected.

The defer function accepts a single argument, the promise to wrap with a deferred state object.

**Examples:**

Example 1 (python):
```python
import { defer } from '@tanstack/react-router'

const route = createRoute({
  loader: () => {
    const deferredPromise = defer(fetch('/api/data'))
    return { deferredPromise }
  },
  component: MyComponent,
})

function MyComponent() {
  const { deferredPromise } = Route.useLoaderData()

  const data = useAwaited({ promise: deferredPromise })

  // or

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

Example 2 (python):
```python
import { defer } from '@tanstack/react-router'

const route = createRoute({
  loader: () => {
    const deferredPromise = defer(fetch('/api/data'))
    return { deferredPromise }
  },
  component: MyComponent,
})

function MyComponent() {
  const { deferredPromise } = Route.useLoaderData()

  const data = useAwaited({ promise: deferredPromise })

  // or

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

Example 3 (python):
```python
import { defer } from '@tanstack/react-router'

const route = createRoute({
  loader: () => {
    const deferredPromise = defer(fetch('/api/data'))
    return { deferredPromise }
  },
  component: MyComponent,
})

function MyComponent() {
  const { deferredPromise } = Route.useLoaderData()

  const data = useAwaited({ promise: deferredPromise })

  // or

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

Example 4 (python):
```python
import { defer } from '@tanstack/react-router'

const route = createRoute({
  loader: () => {
    const deferredPromise = defer(fetch('/api/data'))
    return { deferredPromise }
  },
  component: MyComponent,
})

function MyComponent() {
  const { deferredPromise } = Route.useLoaderData()

  const data = useAwaited({ promise: deferredPromise })

  // or

  return (
    <Await promise={deferredPromise}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Await>
  )
}
```

---

## ActiveLinkOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/ActiveLinkOptionsType

**Contents:**
- ActiveLinkOptions properties
  - activeProps
  - inactiveProps

The ActiveLinkOptions type extends the LinkOptions type and contains additional options that can be used to describe how a link should be styled when it is active.

The ActiveLinkOptions object accepts/contains the following properties:

**Examples:**

Example 1 (javascript):
```javascript
type ActiveLinkOptions = LinkOptions & {
  activeProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
  inactiveProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
}
```

Example 2 (javascript):
```javascript
type ActiveLinkOptions = LinkOptions & {
  activeProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
  inactiveProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
}
```

Example 3 (javascript):
```javascript
type ActiveLinkOptions = LinkOptions & {
  activeProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
  inactiveProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
}
```

Example 4 (javascript):
```javascript
type ActiveLinkOptions = LinkOptions & {
  activeProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
  inactiveProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
}
```

---

## createFileRoute function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction

**Contents:**
- createFileRoute options
  - path option
- createFileRoute returns
- Examples

The createFileRoute function is a factory that can be used to create a file-based route instance. This route instance can then be used to automatically generate a route tree with the tsr generate and tsr watch commands.

The createFileRoute function accepts a single argument of type string that represents the path of the file that the route will be generated from.

A new function that accepts a single argument of type RouteOptions that will be used to configure the file Route instance.

⚠️ Note: For tsr generate and tsr watch to work properly, the file route instance must be exported from the file using the Route identifier.

**Examples:**

Example 1 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 2 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 3 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 4 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

---

## FileRoute class

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/FileRouteClass

**Contents:**
- FileRoute constructor
  - Constructor options
  - Constructor returns
- FileRoute methods
  - .createRoute method
    - .createRoute options
    - .createRoute returns
  - Examples

This class has been deprecated and will be removed in the next major version of TanStack Router. Please use the createFileRoute function instead.

The FileRoute class is a factory that can be used to create a file-based route instance. This route instance can then be used to automatically generate a route tree with the tsr generate and tsr watch commands.

The FileRoute constructor accepts a single argument: the path of the file that the route will be generated for.

The FileRoute class implements the following method(s):

The createRoute method is a method that can be used to configure the file route instance. It accepts a single argument: the options that will be used to configure the file route instance.

A Route instance that can be used to configure the route to be inserted into the route-tree.

⚠️ Note: For tsr generate and tsr watch to work properly, the file route instance must be exported from the file using the Route identifier.

**Examples:**

Example 1 (python):
```python
import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/').createRoute({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 2 (python):
```python
import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/').createRoute({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 3 (python):
```python
import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/').createRoute({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 4 (python):
```python
import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/').createRoute({
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

---

## Comparison | TanStack Router & TanStack Start vs Next.js vs React Router / Remix

**URL:** https://tanstack.com/router/latest/docs/framework/react/comparison

Choosing a routing solution? This side‑by‑side comparison highlights key features, trade‑offs, and common use cases to help you quickly evaluate how each option fits your project’s needs.

While we aim to provide an accurate and fair comparison, please note that this table may not capture every nuance or recent update of each library. We recommend reviewing the official documentation and trying out each solution to make the most informed decision for your specific use case.

If you find any discrepancies or have suggestions for improvement, please don't hesitate to contribute via the "Edit this page on GitHub" link at the bottom of this page or open an issue in the TanStack Router GitHub repository.

Feature/Capability Key:

---

## useLinkProps hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useLinkPropsHook

**Contents:**
- useLinkProps options
- useLinkProps returns

The useLinkProps hook that takes an object as its argument and returns a React.AnchorHTMLAttributes<HTMLAnchorElement> props object. These props can then be safely applied to an anchor element to create a link that can be used to navigate to the new location. This includes changes to the pathname, search params, hash, and location state.

**Examples:**

Example 1 (unknown):
```unknown
type UseLinkPropsOptions = ActiveLinkOptions &
  React.AnchorHTMLAttributes<HTMLAnchorElement>
```

Example 2 (unknown):
```unknown
type UseLinkPropsOptions = ActiveLinkOptions &
  React.AnchorHTMLAttributes<HTMLAnchorElement>
```

Example 3 (unknown):
```unknown
type UseLinkPropsOptions = ActiveLinkOptions &
  React.AnchorHTMLAttributes<HTMLAnchorElement>
```

Example 4 (unknown):
```unknown
type UseLinkPropsOptions = ActiveLinkOptions &
  React.AnchorHTMLAttributes<HTMLAnchorElement>
```

---

## File-Based Routing

**URL:** https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing

**Contents:**
- What is File-Based Routing?
- /s or .s?
- Directory Routes
- Flat Routes
- Mixed Flat and Directory Routes
- Getting started with File-Based Routing

Most of the TanStack Router documentation is written for file-based routing and is intended to help you understand in more detail how to configure file-based routing and the technical details behind how it works. While file-based routing is the preferred and recommended way to configure TanStack Router, you can also use code-based routing if you prefer.

File-based routing is a way to configure your routes using the filesystem. Instead of defining your route structure via code, you can define your routes using a series of files and directories that represent the route hierarchy of your application. This brings a number of benefits:

While directories have long been used to represent route hierarchy, file-based routing introduces an additional concept of using the . character in the file-name to denote a route nesting. This allows you to avoid creating directories for few deeply nested routes and continue to use directories for wider route hierarchies. Let's take a look at some examples!

Directories can be used to denote route hierarchy, which can be useful for organizing multiple routes into logical groups and also cutting down on the filename length for large groups of deeply nested routes.

See the example below:

Flat routing gives you the ability to use .s to denote route nesting levels.

This can be useful when you have a large number of uniquely deeply nested routes and want to avoid creating directories for each one:

See the example below:

It's extremely likely that a 100% directory or flat route structure won't be the best fit for your project, which is why TanStack Router allows you to mix both flat and directory routes together to create a route tree that uses the best of both worlds where it makes sense:

See the example below:

Both flat and directory routes can be mixed together to create a route tree that uses the best of both worlds where it makes sense.

If you find that the default file-based routing structure doesn't fit your needs, you can always use Virtual File Routes to control the source of your routes whilst still getting the awesome performance benefits of file-based routing.

To get started with file-based routing, you'll need to configure your project's bundler to use the TanStack Router Plugin or the TanStack Router CLI.

To enable file-based routing, you'll need to be using React with a supported bundler. See if your bundler is listed in the configuration guides below.

When using TanStack Router's file-based routing through

*[Content truncated]*

---

## ParsedLocation type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/ParsedLocationType

The ParsedLocation type represents a parsed location in TanStack Router. It contains a lot of useful information about the current location, including the pathname, search params, hash, location state, and route masking information.

**Examples:**

Example 1 (unknown):
```unknown
interface ParsedLocation {
  href: string
  pathname: string
  search: TFullSearchSchema
  searchStr: string
  state: ParsedHistoryState
  hash: string
  maskedLocation?: ParsedLocation
  unmaskOnReload?: boolean
}
```

Example 2 (unknown):
```unknown
interface ParsedLocation {
  href: string
  pathname: string
  search: TFullSearchSchema
  searchStr: string
  state: ParsedHistoryState
  hash: string
  maskedLocation?: ParsedLocation
  unmaskOnReload?: boolean
}
```

Example 3 (unknown):
```unknown
interface ParsedLocation {
  href: string
  pathname: string
  search: TFullSearchSchema
  searchStr: string
  state: ParsedHistoryState
  hash: string
  maskedLocation?: ParsedLocation
  unmaskOnReload?: boolean
}
```

Example 4 (unknown):
```unknown
interface ParsedLocation {
  href: string
  pathname: string
  search: TFullSearchSchema
  searchStr: string
  state: ParsedHistoryState
  hash: string
  maskedLocation?: ParsedLocation
  unmaskOnReload?: boolean
}
```

---

## AsyncRouteComponent type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/AsyncRouteComponentType

The AsyncRouteComponent type is used to describe a code-split route component that can be preloaded using a component.preload() method.

**Examples:**

Example 1 (javascript):
```javascript
type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
  preload?: () => Promise<void>
}
```

Example 2 (javascript):
```javascript
type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
  preload?: () => Promise<void>
}
```

Example 3 (javascript):
```javascript
type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
  preload?: () => Promise<void>
}
```

Example 4 (javascript):
```javascript
type AsyncRouteComponent<TProps> = SyncRouteComponent<TProps> & {
  preload?: () => Promise<void>
}
```

---

## createLazyRoute function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createLazyRouteFunction

**Contents:**
- createLazyRoute options
  - id
  - createLazyRoute returns
  - Examples

The createLazyRoute function is used for creating a partial code-based route route instance that is lazily loaded when matched. This route instance can only be used to configure the non-critical properties of the route, such as component, pendingComponent, errorComponent, and the notFoundComponent.

The createLazyRoute function accepts a single argument of type string that represents the id of the route.

A new function that accepts a single argument of partial of the type RouteOptions that will be used to configure the file Route instance.

⚠️ Note: This route instance must be manually lazily loaded against its critical route instance using the lazy method returned by the createRoute function.

**Examples:**

Example 1 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

Example 2 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

Example 3 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

Example 4 (unknown):
```unknown
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

---

## createRootRouteWithContext function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteWithContextFunction

**Contents:**
- createRootRouteWithContext generics
  - TRouterContext generic
- createRootRouteWithContext returns
- Examples

The createRootRouteWithContext function is a helper function that can be used to create a root route instance that requires a context type to be fulfilled when the router is created.

The createRootRouteWithContext function accepts a single generic argument:

**Examples:**

Example 1 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

Example 2 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

Example 3 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

Example 4 (python):
```python
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

---

## Search middleware to strip search params

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/stripSearchParamsFunction

**Contents:**
- stripSearchParams props
- Examples

stripSearchParams is a search middleware that allows to remove search params.

stripSearchParams accepts one of the following inputs:

**Examples:**

Example 1 (python):
```python
import { z } from 'zod'
import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const defaultValues = {
  one: 'abc',
  two: 'xyz',
}

const searchSchema = z.object({
  one: z.string().default(defaultValues.one),
  two: z.string().default(defaultValues.two),
})

export const Route = createFileRoute('/')({
  validateSearch: zodValidator(searchSchema),
  search: {
    // strip default values
    middlewares: [stripSearchParams(defaultValues)],
  },
})
```

Example 2 (python):
```python
import { z } from 'zod'
import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const defaultValues = {
  one: 'abc',
  two: 'xyz',
}

const searchSchema = z.object({
  one: z.string().default(defaultValues.one),
  two: z.string().default(defaultValues.two),
})

export const Route = createFileRoute('/')({
  validateSearch: zodValidator(searchSchema),
  search: {
    // strip default values
    middlewares: [stripSearchParams(defaultValues)],
  },
})
```

Example 3 (python):
```python
import { z } from 'zod'
import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const defaultValues = {
  one: 'abc',
  two: 'xyz',
}

const searchSchema = z.object({
  one: z.string().default(defaultValues.one),
  two: z.string().default(defaultValues.two),
})

export const Route = createFileRoute('/')({
  validateSearch: zodValidator(searchSchema),
  search: {
    // strip default values
    middlewares: [stripSearchParams(defaultValues)],
  },
})
```

Example 4 (python):
```python
import { z } from 'zod'
import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const defaultValues = {
  one: 'abc',
  two: 'xyz',
}

const searchSchema = z.object({
  one: z.string().default(defaultValues.one),
  two: z.string().default(defaultValues.two),
})

export const Route = createFileRoute('/')({
  validateSearch: zodValidator(searchSchema),
  search: {
    // strip default values
    middlewares: [stripSearchParams(defaultValues)],
  },
})
```

---

## ClientOnly Component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/clientOnlyComponent

**Contents:**
- Props
  - props.fallback prop
  - props.children prop
- Returns
- Examples

The ClientOnly component is used to render a components only in the client, without breaking the server-side rendering due to hydration errors. It accepts a fallback prop that will be rendered if the JS is not yet loaded in the client.

The ClientOnly component accepts the following props:

The fallback component to render if the JS is not yet loaded in the client.

The component to render if the JS is loaded in the client.

**Examples:**

Example 1 (python):
```python
// src/routes/dashboard.tsx
import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import {
  Charts,
  FallbackCharts,
} from './charts-that-break-server-side-rendering'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  // ... other route options
})

function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <ClientOnly fallback={<FallbackCharts />}>
        <Charts />
      </ClientOnly>
    </div>
  )
}
```

Example 2 (python):
```python
// src/routes/dashboard.tsx
import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import {
  Charts,
  FallbackCharts,
} from './charts-that-break-server-side-rendering'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  // ... other route options
})

function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <ClientOnly fallback={<FallbackCharts />}>
        <Charts />
      </ClientOnly>
    </div>
  )
}
```

Example 3 (python):
```python
// src/routes/dashboard.tsx
import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import {
  Charts,
  FallbackCharts,
} from './charts-that-break-server-side-rendering'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  // ... other route options
})

function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <ClientOnly fallback={<FallbackCharts />}>
        <Charts />
      </ClientOnly>
    </div>
  )
}
```

Example 4 (python):
```python
// src/routes/dashboard.tsx
import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import {
  Charts,
  FallbackCharts,
} from './charts-that-break-server-side-rendering'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  // ... other route options
})

function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <ClientOnly fallback={<FallbackCharts />}>
        <Charts />
      </ClientOnly>
    </div>
  )
}
```

---

## useLoaderDeps hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDepsHook

**Contents:**
- useLoaderDepsHook options
  - opts.from option
  - opts.select option
  - opts.structuralSharing option
- useLoaderDeps returns
- Examples

The useLoaderDeps hook is a hook that returns an object with the dependencies that are used to trigger the loader for a given route.

The useLoaderDepsHook hook accepts an options object.

**Examples:**

Example 1 (python):
```python
import { useLoaderDeps } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const deps = useLoaderDeps({ from: '/posts/$postId' })

  // OR

  const routeDeps = routeApi.useLoaderDeps()

  // OR

  const postId = useLoaderDeps({
    from: '/posts',
    select: (deps) => deps.view,
  })

  // ...
}
```

Example 2 (python):
```python
import { useLoaderDeps } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const deps = useLoaderDeps({ from: '/posts/$postId' })

  // OR

  const routeDeps = routeApi.useLoaderDeps()

  // OR

  const postId = useLoaderDeps({
    from: '/posts',
    select: (deps) => deps.view,
  })

  // ...
}
```

Example 3 (python):
```python
import { useLoaderDeps } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const deps = useLoaderDeps({ from: '/posts/$postId' })

  // OR

  const routeDeps = routeApi.useLoaderDeps()

  // OR

  const postId = useLoaderDeps({
    from: '/posts',
    select: (deps) => deps.view,
  })

  // ...
}
```

Example 4 (python):
```python
import { useLoaderDeps } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const deps = useLoaderDeps({ from: '/posts/$postId' })

  // OR

  const routeDeps = routeApi.useLoaderDeps()

  // OR

  const postId = useLoaderDeps({
    from: '/posts',
    select: (deps) => deps.view,
  })

  // ...
}
```

---

## useRouter hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterHook

**Contents:**
- useRouter returns
- Examples

The useRouter method is a hook that returns the current instance of Router from context. This hook is useful for accessing the router instance in a component.

⚠️⚠️⚠️ router.state is always up to date, but NOT REACTIVE. If you use router.state in a component, the component will not re-render when the router state changes. To get a reactive version of the router state, use the useRouterState hook.

**Examples:**

Example 1 (python):
```python
import { useRouter } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  //    ^ Router

  // ...
}
```

Example 2 (python):
```python
import { useRouter } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  //    ^ Router

  // ...
}
```

Example 3 (python):
```python
import { useRouter } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  //    ^ Router

  // ...
}
```

Example 4 (python):
```python
import { useRouter } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  //    ^ Router

  // ...
}
```

---

## lazyRouteComponent function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/lazyRouteComponentFunction

**Contents:**
- lazyRouteComponent options
  - importer option
  - exportName option
- lazyRouteComponent returns
- Examples

If you are using file-based routing, it's recommended to use the createLazyFileRoute function instead.

The lazyRouteComponent function can be used to create a one-off code-split route component that can be preloaded using a component.preload() method.

The lazyRouteComponent function accepts two arguments:

**Examples:**

Example 1 (python):
```python
import { lazyRouteComponent } from '@tanstack/react-router'

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(() => import('./Post')), // default export
})

// or

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(
    () => import('./Post'),
    'PostByIdPageComponent', // named export
  ),
})
```

Example 2 (python):
```python
import { lazyRouteComponent } from '@tanstack/react-router'

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(() => import('./Post')), // default export
})

// or

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(
    () => import('./Post'),
    'PostByIdPageComponent', // named export
  ),
})
```

Example 3 (python):
```python
import { lazyRouteComponent } from '@tanstack/react-router'

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(() => import('./Post')), // default export
})

// or

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(
    () => import('./Post'),
    'PostByIdPageComponent', // named export
  ),
})
```

Example 4 (python):
```python
import { lazyRouteComponent } from '@tanstack/react-router'

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(() => import('./Post')), // default export
})

// or

const route = createRoute({
  path: '/posts/$postId',
  component: lazyRouteComponent(
    () => import('./Post'),
    'PostByIdPageComponent', // named export
  ),
})
```

---

## createRouteMask function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createRouteMaskFunction

**Contents:**
- createRouteMask options
- createRouteMask returns
- Examples

The createRouteMask function is a helper function that can be used to create a route mask configuration that can be passed to the RouterOptions.routeMasks option.

**Examples:**

Example 1 (python):
```python
import { createRouteMask, createRouter } from '@tanstack/react-router'

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: '/photos/$photoId/modal',
  to: '/photos/$photoId',
  params: true,
})

// Set up a Router instance
const router = createRouter({
  routeTree,
  routeMasks: [photoModalToPhotoMask],
})
```

Example 2 (python):
```python
import { createRouteMask, createRouter } from '@tanstack/react-router'

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: '/photos/$photoId/modal',
  to: '/photos/$photoId',
  params: true,
})

// Set up a Router instance
const router = createRouter({
  routeTree,
  routeMasks: [photoModalToPhotoMask],
})
```

Example 3 (python):
```python
import { createRouteMask, createRouter } from '@tanstack/react-router'

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: '/photos/$photoId/modal',
  to: '/photos/$photoId',
  params: true,
})

// Set up a Router instance
const router = createRouter({
  routeTree,
  routeMasks: [photoModalToPhotoMask],
})
```

Example 4 (python):
```python
import { createRouteMask, createRouter } from '@tanstack/react-router'

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: '/photos/$photoId/modal',
  to: '/photos/$photoId',
  params: true,
})

// Set up a Router instance
const router = createRouter({
  routeTree,
  routeMasks: [photoModalToPhotoMask],
})
```

---

## Link component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent

**Contents:**
- Link props
  - ...props
- Link returns
- Examples

The Link component is a component that can be used to create a link that can be used to navigate to a new location. This includes changes to the pathname, search params, hash, and location state.

The Link component accepts the following props:

An anchor element that can be used to navigate to a new location.

**Examples:**

Example 1 (python):
```python
import { Link } from '@tanstack/react-router'

function Component() {
  return (
    <Link
      to="/somewhere/$somewhereId"
      params={{ somewhereId: 'baz' }}
      search={(prev) => ({ ...prev, foo: 'bar' })}
    >
      Click me
    </Link>
  )
}
```

Example 2 (python):
```python
import { Link } from '@tanstack/react-router'

function Component() {
  return (
    <Link
      to="/somewhere/$somewhereId"
      params={{ somewhereId: 'baz' }}
      search={(prev) => ({ ...prev, foo: 'bar' })}
    >
      Click me
    </Link>
  )
}
```

Example 3 (python):
```python
import { Link } from '@tanstack/react-router'

function Component() {
  return (
    <Link
      to="/somewhere/$somewhereId"
      params={{ somewhereId: 'baz' }}
      search={(prev) => ({ ...prev, foo: 'bar' })}
    >
      Click me
    </Link>
  )
}
```

Example 4 (python):
```python
import { Link } from '@tanstack/react-router'

function Component() {
  return (
    <Link
      to="/somewhere/$somewhereId"
      params={{ somewhereId: 'baz' }}
      search={(prev) => ({ ...prev, foo: 'bar' })}
    >
      Click me
    </Link>
  )
}
```

---

## Route type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouteType

**Contents:**
- Route properties and methods
  - .addChildren method
  - .update method
  - .lazy method
  - ...RouteApi methods

The Route type is used to describe a route instance.

An instance of the Route has the following properties and methods:

---

## UseMatchRouteOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/UseMatchRouteOptionsType

The UseMatchRouteOptions type extends the ToOptions type and describes additional options available when using the useMatchRoute hook.

**Examples:**

Example 1 (unknown):
```unknown
export type UseMatchRouteOptions = ToOptions & MatchRouteOptions
```

Example 2 (unknown):
```unknown
export type UseMatchRouteOptions = ToOptions & MatchRouteOptions
```

Example 3 (unknown):
```unknown
export type UseMatchRouteOptions = ToOptions & MatchRouteOptions
```

Example 4 (unknown):
```unknown
export type UseMatchRouteOptions = ToOptions & MatchRouteOptions
```

---

## Routing Concepts

**URL:** https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts

**Contents:**
- Anatomy of a Route
- The Root Route
- Basic Routes
- Index Routes
- Dynamic Route Segments
- Splat / Catch-All Routes
- Optional Path Parameters
- Layout Routes
- Pathless Layout Routes
- Non-Nested Routes

TanStack Router supports a number of powerful routing concepts that allow you to build complex and dynamic routing systems with ease.

Each of these concepts is useful and powerful, and we'll dive into each of them in the following sections.

All other routes, other than the Root Route, are configured using the createFileRoute function, which provides type safety when using file-based routing:

The createFileRoute function takes a single argument, the file-route's path as a string.

❓❓❓ "Wait, you're making me pass the path of the route file to createFileRoute?"

Yes! But don't worry, this path is automatically written and managed by the router for you via the TanStack Router Bundler Plugin or Router CLI. So, as you create new routes, move routes around or rename routes, the path will be updated for you automatically.

The reason for this pathname has everything to do with the magical type safety of TanStack Router. Without this pathname, TypeScript would have no idea what file we're in! (We wish TypeScript had a built-in for this, but they don't yet 🤷‍♂️)

The root route is the top-most route in the entire tree and encapsulates all other routes as children.

Even though it doesn't have a path, the root route has access to all of the same functionality as other routes including:

To create a root route, call the createRootRoute() function and export it as the Route variable in your route file:

To learn more about Context in TanStack Router, see the Router Context guide.

Basic routes match a specific path, for example /about, /settings, /settings/notifications are all basic routes, as they match the path exactly.

Let's take a look at an /about route:

Basic routes are simple and straightforward. They match the path exactly and render the provided component.

Index routes specifically target their parent route when it is matched exactly and no child route is matched.

Let's take a look at an index route for a /posts URL:

This route will be matched when the URL is /posts exactly.

Route path segments that start with a $ followed by a label are dynamic and capture that section of the URL into the params object for use in your application. For example, a pathname of /posts/123 would match the /posts/$postId route, and the params object would be { postId: '123' }.

These params are then usable in your route's configuration and components! Let's look at a posts.$postId.tsx route:

🧠 Dynamic segments work at each segment of the path. For example, you could hav

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: PostsComponent,
})
```

Example 2 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: PostsComponent,
})
```

Example 3 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: PostsComponent,
})
```

Example 4 (python):
```python
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: PostsComponent,
})
```

---

## rootRouteWithContext function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/rootRouteWithContextFunction

**Contents:**
- rootRouteWithContext generics
  - TRouterContext generic
- rootRouteWithContext returns
- Examples

This function is deprecated and will be removed in the next major version of TanStack Router. Please use the createRootRouteWithContext function instead.

The rootRouteWithContext function is a helper function that can be used to create a root route instance that requires a context type to be fulfilled when the router is created.

The rootRouteWithContext function accepts a single generic argument:

**Examples:**

Example 1 (python):
```python
import { rootRouteWithContext, createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = rootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

Example 2 (python):
```python
import { rootRouteWithContext, createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = rootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

Example 3 (python):
```python
import { rootRouteWithContext, createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = rootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

Example 4 (python):
```python
import { rootRouteWithContext, createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = rootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  // ... root route options
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})
```

---

## isNotFound function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/isNotFoundFunction

**Contents:**
- isNotFound options
  - input option
- isNotFound returns
- Examples

The isNotFound function can be used to determine if an object is a NotFoundError object.

The isNotFound function accepts a single argument, an input.

**Examples:**

Example 1 (python):
```python
import { isNotFound } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isNotFound(obj)) {
    // ...
  }
}
```

Example 2 (python):
```python
import { isNotFound } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isNotFound(obj)) {
    // ...
  }
}
```

Example 3 (python):
```python
import { isNotFound } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isNotFound(obj)) {
    // ...
  }
}
```

Example 4 (python):
```python
import { isNotFound } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isNotFound(obj)) {
    // ...
  }
}
```

---

## RouteMask type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouteMaskType

**Contents:**
- RouteMask properties
  - ...ToOptions
  - options.routeTree
  - options.unmaskOnReload

The RouteMask type extends the ToOptions type and has other the necessary properties to create a route mask.

The RouteMask type accepts an object with the following properties:

---

## notFound function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/notFoundFunction

**Contents:**
- notFound options
- notFound returns
- Examples

The notFound function returns a new NotFoundError object that can be either returned or thrown from places like a Route's beforeLoad or loader callbacks to trigger the notFoundComponent.

The notFound function accepts a single optional argument, the options to create the not-found error object.

**Examples:**

Example 1 (python):
```python
import { notFound, createFileRoute, rootRouteId } from '@tanstack/react-router'

const Route = new createFileRoute('/posts/$postId')({
  // throwing a not-found object
  loader: ({ context: { post } }) => {
    if (!post) {
      throw notFound()
    }
  },
  // or if you want to show a not-found on the whole page
  loader: ({ context: { team } }) => {
    if (!team) {
      throw notFound({ routeId: rootRouteId })
    }
  },
  // ... other route options
})
```

Example 2 (python):
```python
import { notFound, createFileRoute, rootRouteId } from '@tanstack/react-router'

const Route = new createFileRoute('/posts/$postId')({
  // throwing a not-found object
  loader: ({ context: { post } }) => {
    if (!post) {
      throw notFound()
    }
  },
  // or if you want to show a not-found on the whole page
  loader: ({ context: { team } }) => {
    if (!team) {
      throw notFound({ routeId: rootRouteId })
    }
  },
  // ... other route options
})
```

Example 3 (python):
```python
import { notFound, createFileRoute, rootRouteId } from '@tanstack/react-router'

const Route = new createFileRoute('/posts/$postId')({
  // throwing a not-found object
  loader: ({ context: { post } }) => {
    if (!post) {
      throw notFound()
    }
  },
  // or if you want to show a not-found on the whole page
  loader: ({ context: { team } }) => {
    if (!team) {
      throw notFound({ routeId: rootRouteId })
    }
  },
  // ... other route options
})
```

Example 4 (python):
```python
import { notFound, createFileRoute, rootRouteId } from '@tanstack/react-router'

const Route = new createFileRoute('/posts/$postId')({
  // throwing a not-found object
  loader: ({ context: { post } }) => {
    if (!post) {
      throw notFound()
    }
  },
  // or if you want to show a not-found on the whole page
  loader: ({ context: { team } }) => {
    if (!team) {
      throw notFound({ routeId: rootRouteId })
    }
  },
  // ... other route options
})
```

---

## useParams hook

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/useParamsHook

**Contents:**
- useParams options
  - opts.strict option
  - opts.shouldThrow option
  - opts.select option
  - opts.structuralSharing option
- useParams returns
- Examples

The useParams method returns all of the path parameters that were parsed for the closest match and all of its parent matches.

The useParams hook accepts an optional options object.

**Examples:**

Example 1 (python):
```python
import { useParams } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const params = useParams({ from: '/posts/$postId' })

  // OR

  const routeParams = routeApi.useParams()

  // OR

  const postId = useParams({
    from: '/posts/$postId',
    select: (params) => params.postId,
  })

  // OR

  const looseParams = useParams({ strict: false })

  // ...
}
```

Example 2 (python):
```python
import { useParams } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const params = useParams({ from: '/posts/$postId' })

  // OR

  const routeParams = routeApi.useParams()

  // OR

  const postId = useParams({
    from: '/posts/$postId',
    select: (params) => params.postId,
  })

  // OR

  const looseParams = useParams({ strict: false })

  // ...
}
```

Example 3 (python):
```python
import { useParams } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const params = useParams({ from: '/posts/$postId' })

  // OR

  const routeParams = routeApi.useParams()

  // OR

  const postId = useParams({
    from: '/posts/$postId',
    select: (params) => params.postId,
  })

  // OR

  const looseParams = useParams({ strict: false })

  // ...
}
```

Example 4 (python):
```python
import { useParams } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function Component() {
  const params = useParams({ from: '/posts/$postId' })

  // OR

  const routeParams = routeApi.useParams()

  // OR

  const postId = useParams({
    from: '/posts/$postId',
    select: (params) => params.postId,
  })

  // OR

  const looseParams = useParams({ strict: false })

  // ...
}
```

---

## RouterOptions

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType

**Contents:**
- RouterOptions properties
  - routeTree property
  - history property
  - stringifySearch method
  - parseSearch method
  - search.strict property
  - defaultPreload property
  - defaultPreloadDelay property
  - defaultComponent property
  - defaultErrorComponent property

The RouterOptions type contains all of the options that can be used to configure a router instance.

The RouterOptions type accepts an object with the following properties and methods:

Example:If you want to configure to remount all route components upon params change, use:

**Examples:**

Example 1 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  Wrap: ({ children }) => {
    return <MyContext.Provider value={myContext}>{children}</MyContext>
  },
})
```

Example 2 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  Wrap: ({ children }) => {
    return <MyContext.Provider value={myContext}>{children}</MyContext>
  },
})
```

Example 3 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  Wrap: ({ children }) => {
    return <MyContext.Provider value={myContext}>{children}</MyContext>
  },
})
```

Example 4 (python):
```python
import { createRouter } from '@tanstack/react-router'

const router = createRouter({
  // ...
  Wrap: ({ children }) => {
    return <MyContext.Provider value={myContext}>{children}</MyContext>
  },
})
```

---

## Search middleware to retain search params

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/retainSearchParamsFunction

**Contents:**
- retainSearchParams props
- Examples

retainSearchParams is a search middleware that allows to keep search params.

The retainSearchParams either accepts true or a list of keys of those search params that shall be retained. If true is passed in, all search params will be retained.

**Examples:**

Example 1 (python):
```python
import { z } from 'zod'
import { createRootRoute, retainSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const searchSchema = z.object({
  rootValue: z.string().optional(),
})

export const Route = createRootRoute({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [retainSearchParams(['rootValue'])],
  },
})
```

Example 2 (python):
```python
import { z } from 'zod'
import { createRootRoute, retainSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const searchSchema = z.object({
  rootValue: z.string().optional(),
})

export const Route = createRootRoute({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [retainSearchParams(['rootValue'])],
  },
})
```

Example 3 (python):
```python
import { z } from 'zod'
import { createRootRoute, retainSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const searchSchema = z.object({
  rootValue: z.string().optional(),
})

export const Route = createRootRoute({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [retainSearchParams(['rootValue'])],
  },
})
```

Example 4 (python):
```python
import { z } from 'zod'
import { createRootRoute, retainSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

const searchSchema = z.object({
  rootValue: z.string().optional(),
})

export const Route = createRootRoute({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [retainSearchParams(['rootValue'])],
  },
})
```

---

## Route Trees

**URL:** https://tanstack.com/router/latest/docs/framework/react/routing/route-trees

**Contents:**
- Route Trees
- Route Tree Configuration

TanStack Router uses a nested route tree to match up the URL with the correct component tree to render.

To build a route tree, TanStack Router supports:

Both methods support the exact same core features and functionality, but file-based routing requires less code for the same or better results. For this reason, file-based routing is the preferred and recommended way to configure TanStack Router. Most of the documentation is written from the perspective of file-based routing.

Nested routing is a powerful concept that allows you to use a URL to render a nested component tree. For example, given the URL of /blog/posts/123, you could create a route hierarchy that looks like this:

And render a component tree that looks like this:

Let's take that concept and expand it out to a larger site structure, but with file-names now:

The above is a valid route tree configuration that can be used with TanStack Router! There's a lot of power and convention to unpack with file-based routing, so let's break it down a bit.

Route trees can be configured using a few different ways:

Please be sure to check out the full documentation links above for each type of route tree, or just proceed to the next section to get started with file-based routing.

**Examples:**

Example 1 (unknown):
```unknown
├── blog
│   ├── posts
│   │   ├── $postId
```

Example 2 (unknown):
```unknown
├── blog
│   ├── posts
│   │   ├── $postId
```

Example 3 (unknown):
```unknown
├── blog
│   ├── posts
│   │   ├── $postId
```

Example 4 (unknown):
```unknown
├── blog
│   ├── posts
│   │   ├── $postId
```

---

## ErrorComponent component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/errorComponentComponent

**Contents:**
- ErrorComponent props
  - props.error prop
  - props.info prop
  - props.reset prop
- ErrorComponent returns

The ErrorComponent component is a component that renders an error message and optionally the error's message.

The ErrorComponent component accepts the following props:

---

## createRoute function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/createRouteFunction

**Contents:**
- createRoute options
- createRoute returns
- Examples

The createRoute function implements returns a Route instance. A route instance can then be passed to a root route's children to create a route tree, which is then passed to the router.

A new Route instance.

**Examples:**

Example 1 (python):
```python
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'

const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 2 (python):
```python
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'

const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 3 (python):
```python
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'

const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

Example 4 (python):
```python
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'

const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

---

## RouterState type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouterStateType

**Contents:**
- RouterState properties
  - status property
  - isLoading property
  - isTransitioning property
  - matches property
  - pendingMatches property
  - location property
  - resolvedLocation property

The RouterState type represents shape of the internal state of the router. The Router's internal state is useful, if you need to access certain internals of the router, such as any pending matches, is the router in its loading state, etc.

The RouterState type contains all of the properties that are available on the router state.

**Examples:**

Example 1 (unknown):
```unknown
type RouterState = {
  status: 'pending' | 'idle'
  isLoading: boolean
  isTransitioning: boolean
  matches: Array<RouteMatch>
  pendingMatches: Array<RouteMatch>
  location: ParsedLocation
  resolvedLocation: ParsedLocation
}
```

Example 2 (unknown):
```unknown
type RouterState = {
  status: 'pending' | 'idle'
  isLoading: boolean
  isTransitioning: boolean
  matches: Array<RouteMatch>
  pendingMatches: Array<RouteMatch>
  location: ParsedLocation
  resolvedLocation: ParsedLocation
}
```

Example 3 (unknown):
```unknown
type RouterState = {
  status: 'pending' | 'idle'
  isLoading: boolean
  isTransitioning: boolean
  matches: Array<RouteMatch>
  pendingMatches: Array<RouteMatch>
  location: ParsedLocation
  resolvedLocation: ParsedLocation
}
```

Example 4 (unknown):
```unknown
type RouterState = {
  status: 'pending' | 'idle'
  isLoading: boolean
  isTransitioning: boolean
  matches: Array<RouteMatch>
  pendingMatches: Array<RouteMatch>
  location: ParsedLocation
  resolvedLocation: ParsedLocation
}
```

---

## NotFoundRoute class

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/NotFoundRouteClass

**Contents:**
- Constructor options
- Examples

This class has been deprecated and will be removed in the next major version of TanStack Router. Please use the notFoundComponent route option that is present during route configuration. See the Not Found Errors guide for more information.

The NotFoundRoute class extends the Route class and can be used to create a not found route instance. A not found route instance can be passed to the routerOptions.notFoundRoute option to configure a default not-found/404 route for every branch of the route tree.

The NotFoundRoute constructor accepts an object as its only argument.

**Examples:**

Example 1 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 2 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 3 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

Example 4 (unknown):
```unknown
Omit<
  RouteOptions,
  | 'path'
  | 'id'
  | 'getParentRoute'
  | 'caseSensitive'
  | 'parseParams'
  | 'stringifyParams'
>
```

---

## RouteMatch type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouteMatchType

The RouteMatch type represents a route match in TanStack Router.

**Examples:**

Example 1 (unknown):
```unknown
interface RouteMatch {
  id: string
  routeId: string
  pathname: string
  params: Route['allParams']
  status: 'pending' | 'success' | 'error' | 'redirected' | 'notFound'
  isFetching: false | 'beforeLoad' | 'loader'
  showPending: boolean
  error: unknown
  paramsError: unknown
  searchError: unknown
  updatedAt: number
  loaderData?: Route['loaderData']
  context: Route['allContext']
  search: Route['fullSearchSchema']
  fetchedAt: number
  abortController: AbortController
  cause: 'enter' | 'stay'
  ssr?: boolean | 'data-only'
}
```

Example 2 (unknown):
```unknown
interface RouteMatch {
  id: string
  routeId: string
  pathname: string
  params: Route['allParams']
  status: 'pending' | 'success' | 'error' | 'redirected' | 'notFound'
  isFetching: false | 'beforeLoad' | 'loader'
  showPending: boolean
  error: unknown
  paramsError: unknown
  searchError: unknown
  updatedAt: number
  loaderData?: Route['loaderData']
  context: Route['allContext']
  search: Route['fullSearchSchema']
  fetchedAt: number
  abortController: AbortController
  cause: 'enter' | 'stay'
  ssr?: boolean | 'data-only'
}
```

Example 3 (unknown):
```unknown
interface RouteMatch {
  id: string
  routeId: string
  pathname: string
  params: Route['allParams']
  status: 'pending' | 'success' | 'error' | 'redirected' | 'notFound'
  isFetching: false | 'beforeLoad' | 'loader'
  showPending: boolean
  error: unknown
  paramsError: unknown
  searchError: unknown
  updatedAt: number
  loaderData?: Route['loaderData']
  context: Route['allContext']
  search: Route['fullSearchSchema']
  fetchedAt: number
  abortController: AbortController
  cause: 'enter' | 'stay'
  ssr?: boolean | 'data-only'
}
```

Example 4 (unknown):
```unknown
interface RouteMatch {
  id: string
  routeId: string
  pathname: string
  params: Route['allParams']
  status: 'pending' | 'success' | 'error' | 'redirected' | 'notFound'
  isFetching: false | 'beforeLoad' | 'loader'
  showPending: boolean
  error: unknown
  paramsError: unknown
  searchError: unknown
  updatedAt: number
  loaderData?: Route['loaderData']
  context: Route['allContext']
  search: Route['fullSearchSchema']
  fetchedAt: number
  abortController: AbortController
  cause: 'enter' | 'stay'
  ssr?: boolean | 'data-only'
}
```

---

## RouteApi class

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/RouteApiClass

**Contents:**
- Constructor options
  - opts.routeId option
- Constructor returns
- Examples

This class has been deprecated and will be removed in the next major version of TanStack Router. Please use the getRouteApi function instead.

The RouteApi class provides type-safe version of common hooks like useParams, useSearch, useRouteContext, useNavigate, useLoaderData, and useLoaderDeps that are pre-bound to a specific route ID and corresponding registered route types.

The RouteApi constructor accepts a single argument: the options that will be used to configure the RouteApi instance.

**Examples:**

Example 1 (python):
```python
import { RouteApi } from '@tanstack/react-router'

const routeApi = new RouteApi({ id: '/posts' })

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

Example 2 (python):
```python
import { RouteApi } from '@tanstack/react-router'

const routeApi = new RouteApi({ id: '/posts' })

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

Example 3 (python):
```python
import { RouteApi } from '@tanstack/react-router'

const routeApi = new RouteApi({ id: '/posts' })

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

Example 4 (python):
```python
import { RouteApi } from '@tanstack/react-router'

const routeApi = new RouteApi({ id: '/posts' })

export function PostsPage() {
  const posts = routeApi.useLoaderData()
  // ...
}
```

---

## Frequently Asked Questions

**URL:** https://tanstack.com/router/latest/docs/framework/react/faq

**Contents:**
- Why should you choose TanStack Router over another router?
- Is TanStack Router a framework?
- Should I commit my routeTree.gen.ts file into git?
- Can I conditionally render the Root Route component?

Welcome to the TanStack Router FAQ! Here you'll find answers to common questions about the TanStack Router. If you have a question that isn't answered here, please feel free to ask in the TanStack Discord.

To answer this question, it's important to view the other options in the space. There are many alternatives to choose from, but only a couple that are widely adopted and actively maintained:

These frameworks and routers have their strengths, but they also come with trade-offs that may not align with every project's needs. TanStack Router aims to strike a balance by offering routing APIs designed to improve the developer experience without sacrificing flexibility or performance.

TanStack Router itself is not a "framework" in the traditional sense, since it doesn't address a few other common full-stack concerns. However, TanStack Router has been designed to be upgradable to a full-stack framework when used in conjunction with other tools that address bundling, deployments, and server-side-specific functionality. This is why we are currently developing TanStack Start, a full-stack framework that is built on top of TanStack Router and Vite. For a deeper dive on the history of TanStack Router, feel free to read TanStack Router's History.

Yes! Although the route tree file (i.e., routeTree.gen.ts) is generated by TanStack Router, it is essentially part of your application’s runtime, not a build artifact. The route tree file is a critical part of your application’s source code, and it is used by TanStack Router to build your application’s routes at runtime.

You should commit this file into git so that other developers can use it to build your application.

No, the root route is always rendered as it is the entry point of your application.

If you need to conditionally render a route's component, this usually means that the page content needs to be different based on some condition (e.g. user authentication). For this use case, you should use a Layout Route or a Pathless Layout Route to conditionally render the content.

You can restrict access to these routes using a conditional check in the beforeLoad function of the route.

**Examples:**

Example 1 (python):
```python
// src/routes/_pathless-layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'

export const Route = createFileRoute('/_pathless-layout', {
  beforeLoad: async () => {
    // Check if the user is authenticated
    const authed = await isAuthenticated()
    if (!authed) {
      // Redirect the user to the login page
      return '/login'
    }
  },
  component: PathlessLayoutRouteComponent,
  // ...
})

function PathlessLayoutRouteComponent() {
  return (
    <div>
      <h1>You are authed</h1>
      <Outlet />
    </div>
  )

...
```

Example 2 (python):
```python
// src/routes/_pathless-layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'

export const Route = createFileRoute('/_pathless-layout', {
  beforeLoad: async () => {
    // Check if the user is authenticated
    const authed = await isAuthenticated()
    if (!authed) {
      // Redirect the user to the login page
      return '/login'
    }
  },
  component: PathlessLayoutRouteComponent,
  // ...
})

function PathlessLayoutRouteComponent() {
  return (
    <div>
      <h1>You are authed</h1>
      <Outlet />
    </div>
  )

...
```

Example 3 (python):
```python
// src/routes/_pathless-layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'

export const Route = createFileRoute('/_pathless-layout', {
  beforeLoad: async () => {
    // Check if the user is authenticated
    const authed = await isAuthenticated()
    if (!authed) {
      // Redirect the user to the login page
      return '/login'
    }
  },
  component: PathlessLayoutRouteComponent,
  // ...
})

function PathlessLayoutRouteComponent() {
  return (
    <div>
      <h1>You are authed</h1>
      <Outlet />
    </div>
  )

...
```

Example 4 (python):
```python
// src/routes/_pathless-layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'

export const Route = createFileRoute('/_pathless-layout', {
  beforeLoad: async () => {
    // Check if the user is authenticated
    const authed = await isAuthenticated()
    if (!authed) {
      // Redirect the user to the login page
      return '/login'
    }
  },
  component: PathlessLayoutRouteComponent,
  // ...
})

function PathlessLayoutRouteComponent() {
  return (
    <div>
      <h1>You are authed</h1>
      <Outlet />
    </div>
  )

...
```

---

## ToMaskOptions type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/ToMaskOptionsType

The ToMaskOptions type extends the ToOptions type and describes additional options available when using route masks.

**Examples:**

Example 1 (unknown):
```unknown
type ToMaskOptions = ToOptions & {
  unmaskOnReload?: boolean
}
```

Example 2 (unknown):
```unknown
type ToMaskOptions = ToOptions & {
  unmaskOnReload?: boolean
}
```

Example 3 (unknown):
```unknown
type ToMaskOptions = ToOptions & {
  unmaskOnReload?: boolean
}
```

Example 4 (unknown):
```unknown
type ToMaskOptions = ToOptions & {
  unmaskOnReload?: boolean
}
```

---

## isRedirect function

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/isRedirectFunction

**Contents:**
- isRedirect options
    - input
- isRedirect returns
- Examples

The isRedirect function can be used to determine if an object is a redirect object.

The isRedirect function accepts a single argument, an input.

**Examples:**

Example 1 (python):
```python
import { isRedirect } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isRedirect(obj)) {
    // ...
  }
}
```

Example 2 (python):
```python
import { isRedirect } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isRedirect(obj)) {
    // ...
  }
}
```

Example 3 (python):
```python
import { isRedirect } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isRedirect(obj)) {
    // ...
  }
}
```

Example 4 (python):
```python
import { isRedirect } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isRedirect(obj)) {
    // ...
  }
}
```

---

## Route Matching

**URL:** https://tanstack.com/router/latest/docs/framework/react/routing/route-matching

Route matching follows a consistent and predictable pattern. This guide will explain how route trees are matched.

When TanStack Router processes your route tree, all of your routes are automatically sorted to match the most specific routes first. This means that regardless of the order your route tree is defined, routes will always be sorted in this order:

Consider the following pseudo route tree:

After sorting, this route tree will become:

This final order represents the order in which routes will be matched based on specificity.

Using that route tree, let's follow the matching process for a few different URLs:

**Examples:**

Example 1 (unknown):
```unknown
Root
  - blog
    - $postId
    - /
    - new
  - /
  - *
  - about
  - about/us
```

Example 2 (unknown):
```unknown
Root
  - blog
    - $postId
    - /
    - new
  - /
  - *
  - about
  - about/us
```

Example 3 (unknown):
```unknown
Root
  - blog
    - $postId
    - /
    - new
  - /
  - *
  - about
  - about/us
```

Example 4 (unknown):
```unknown
Root
  - blog
    - $postId
    - /
    - new
  - /
  - *
  - about
  - about/us
```

---

## Link options

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/linkOptions

**Contents:**
- linkOptions props
  - ...props
- linkOptions returns
- Examples

linkOptions is a function which type checks an object literal with the intention of being used for Link, navigate or redirect

The linkOptions accepts the following option:

An object literal with the exact type inferred from the input

**Examples:**

Example 1 (javascript):
```javascript
const userLinkOptions = linkOptions({
  to: '/dashboard/users/user',
  search: {
    usersView: {
      sortBy: 'email',
      filterBy: 'filter',
    },
    userId: 0,
  },
})

function DashboardComponent() {
  return <Link {...userLinkOptions} />
}
```

Example 2 (javascript):
```javascript
const userLinkOptions = linkOptions({
  to: '/dashboard/users/user',
  search: {
    usersView: {
      sortBy: 'email',
      filterBy: 'filter',
    },
    userId: 0,
  },
})

function DashboardComponent() {
  return <Link {...userLinkOptions} />
}
```

Example 3 (javascript):
```javascript
const userLinkOptions = linkOptions({
  to: '/dashboard/users/user',
  search: {
    usersView: {
      sortBy: 'email',
      filterBy: 'filter',
    },
    userId: 0,
  },
})

function DashboardComponent() {
  return <Link {...userLinkOptions} />
}
```

Example 4 (javascript):
```javascript
const userLinkOptions = linkOptions({
  to: '/dashboard/users/user',
  search: {
    usersView: {
      sortBy: 'email',
      filterBy: 'filter',
    },
    userId: 0,
  },
})

function DashboardComponent() {
  return <Link {...userLinkOptions} />
}
```

---

## ParsedHistoryState type

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/ParsedHistoryStateType

The ParsedHistoryState type represents a parsed state object. Additionally to HistoryState, it contains the index and the unique key of the route.

**Examples:**

Example 1 (unknown):
```unknown
export type ParsedHistoryState = HistoryState & {
  key?: string // TODO: Remove in v2 - use __TSR_key instead
  __TSR_key?: string
  __TSR_index: number
}
```

Example 2 (unknown):
```unknown
export type ParsedHistoryState = HistoryState & {
  key?: string // TODO: Remove in v2 - use __TSR_key instead
  __TSR_key?: string
  __TSR_index: number
}
```

Example 3 (unknown):
```unknown
export type ParsedHistoryState = HistoryState & {
  key?: string // TODO: Remove in v2 - use __TSR_key instead
  __TSR_key?: string
  __TSR_index: number
}
```

Example 4 (unknown):
```unknown
export type ParsedHistoryState = HistoryState & {
  key?: string // TODO: Remove in v2 - use __TSR_key instead
  __TSR_key?: string
  __TSR_index: number
}
```

---

## How to Set Up Basic Authentication and Protected Routes

**URL:** https://tanstack.com/router/latest/docs/framework/react/how-to/setup-authentication

**Contents:**
- Quick Start
- Create Authentication Context
- Configure Router Context
  - 1. Set Up Router Context
  - 2. Configure Router
  - 3. Connect App with Authentication
- Create Protected Routes
  - 1. Create Authentication Layout Route
  - 2. Create Login Route
  - 3. Create Protected Dashboard

This guide covers implementing basic authentication patterns and protecting routes in TanStack Router applications.

Set up authentication by creating a context-aware router, implementing auth state management, and using beforeLoad for route protection. This guide focuses on the core authentication setup using React Context.

Update src/routes/__root.tsx:

Update src/router.tsx:

Create src/routes/_authenticated.tsx:

Create src/routes/login.tsx:

Create src/routes/_authenticated/dashboard.tsx:

Update your AuthProvider to restore authentication state on page refresh:

Before deploying authentication, ensure you have:

Problem: useAuth must be used within an AuthProvider error.

Solution: Ensure AuthProvider wraps your entire app and RouterProvider is inside it.

Problem: Authentication state resets when page refreshes.

Solution: Add token persistence as shown in the persistence section above.

Problem: Protected content briefly shows before redirecting to login.

Solution: Use beforeLoad instead of component-level auth checks:

After setting up basic authentication, you might want to:

**Examples:**

Example 1 (python):
```python
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] 
...
```

Example 2 (python):
```python
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] 
...
```

Example 3 (python):
```python
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] 
...
```

Example 4 (python):
```python
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] 
...
```

---

## Navigate component

**URL:** https://tanstack.com/router/latest/docs/framework/react/api/router/navigateComponent

**Contents:**
- Navigate props
  - ...options
- Navigate returns

The Navigate component is a component that can be used to navigate to a new location when rendered. This includes changes to the pathname, search params, hash, and location state. The underlying navigation will happen inside of a useEffect hook when successfully rendered.

The Navigate component accepts the following props:

---
