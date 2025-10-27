# Tanstack-Query - Guide

**Pages:** 37

---

## Testing

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/testing

**Contents:**
- Our First Test
- Turn off retries
- Set gcTime to Infinity with Jest
- Testing Network Calls
- Testing Load More / Infinite Scroll
- Further reading

React Query works by means of hooks - either the ones we offer or custom ones that wrap around them.

With React 17 or earlier, writing unit tests for these custom hooks can be done by means of the React Hooks Testing Library library.

Install this by running:

(The react-test-renderer library is needed as a peer dependency of @testing-library/react-hooks, and needs to correspond to the version of React that you are using.)

Note: when using React 18 or later, renderHook is available directly through the @testing-library/react package, and @testing-library/react-hooks is no longer required.

Once installed, a simple test can be written. Given the following custom hook:

We can write a test for this as follows:

Note that we provide a custom wrapper that builds the QueryClient and QueryClientProvider. This helps to ensure that our test is completely isolated from any other tests.

It is possible to write this wrapper only once, but if so we need to ensure that the QueryClient gets cleared before every test, and that tests don't run in parallel otherwise one test will influence the results of others.

The library defaults to three retries with exponential backoff, which means that your tests are likely to timeout if you want to test an erroneous query. The easiest way to turn retries off is via the QueryClientProvider. Let's extend the above example:

This will set the defaults for all queries in the component tree to "no retries". It is important to know that this will only work if your actual useQuery has no explicit retries set. If you have a query that wants 5 retries, this will still take precedence, because defaults are only taken as a fallback.

If you use Jest, you can set the gcTime to Infinity to prevent "Jest did not exit one second after the test run completed" error message. This is the default behavior on the server, and is only necessary to set if you are explicitly setting a gcTime.

The primary use for React Query is to cache network requests, so it's important that we can test our code is making the correct network requests in the first place.

There are plenty of ways that these can be tested, but for this example we are going to use nock.

Given the following custom hook:

We can write a test for this as follows:

Here we are making use of waitFor and waiting until the query status indicates that the request has succeeded. This way we know that our hook has finished and should have the correct data. Note: when using React 18, the semantic

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

Example 2 (unknown):
```unknown
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

Example 3 (unknown):
```unknown
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

Example 4 (unknown):
```unknown
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

---

## Dependent Queries

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries

**Contents:**
- useQuery dependent Query
- useQueries dependent Query
- A note about performance

Dependent (or serial) queries depend on previous ones to finish before they can execute. To achieve this, it's as easy as using the enabled option to tell a query when it is ready to run:

The projects query will start in:

As soon as the user is available, the projects query will be enabled and will then transition to:

Once we have the projects, it will go to:

Dynamic parallel query - useQueries can depend on a previous query also, here's how to achieve this:

Note that useQueries return an array of query results

Dependent queries by definition constitutes a form of request waterfall, which hurts performance. If we pretend both queries take the same amount of time, doing them serially instead of in parallel always takes twice as much time, which is especially hurtful when it happens on a client that has high latency. If you can, it's always better to restructure the backend APIs so that both queries can be fetched in parallel, though that might not always be practically feasible.

In the example above, instead of first fetching getUserByEmail to be able to getProjectsByUser, introducing a new getProjectsByUserEmail query would flatten the waterfall.

**Examples:**

Example 1 (javascript):
```javascript
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

Example 2 (javascript):
```javascript
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

Example 3 (javascript):
```javascript
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

Example 4 (javascript):
```javascript
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

---

## Query Retries

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/query-retries

**Contents:**
- Retry Delay

When a useQuery query fails (the query function throws an error), TanStack Query will automatically retry the query if that query's request has not reached the max number of consecutive retries (defaults to 3) or a function is provided to determine if a retry is allowed.

You can configure retries both on a global level and an individual query level.

On the server, retries default to 0 to make server rendering as fast as possible.

Info: Contents of the error property will be part of failureReason response property of useQuery until the last retry attempt. So in above example any error contents will be part of failureReason property for first 9 retry attempts (Overall 10 attempts) and finally they will be part of error after last attempt if error persists after all retry attempts.

By default, retries in TanStack Query do not happen immediately after a request fails. As is standard, a back-off delay is gradually applied to each retry attempt.

The default retryDelay is set to double (starting at 1000ms) with each attempt, but not exceed 30 seconds:

Though it is not recommended, you can obviously override the retryDelay function/integer in both the Provider and individual query options. If set to an integer instead of a function the delay will always be the same amount of time:

**Examples:**

Example 1 (python):
```python
import { useQuery } from '@tanstack/react-query'

// Make a specific query retry a certain number of times
const result = useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10, // Will retry failed requests 10 times before displaying an error
})
```

Example 2 (python):
```python
import { useQuery } from '@tanstack/react-query'

// Make a specific query retry a certain number of times
const result = useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10, // Will retry failed requests 10 times before displaying an error
})
```

Example 3 (python):
```python
import { useQuery } from '@tanstack/react-query'

// Make a specific query retry a certain number of times
const result = useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10, // Will retry failed requests 10 times before displaying an error
})
```

Example 4 (python):
```python
import { useQuery } from '@tanstack/react-query'

// Make a specific query retry a certain number of times
const result = useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10, // Will retry failed requests 10 times before displaying an error
})
```

---

## Infinite Queries

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries

**Contents:**
- Example
- What happens when an infinite query needs to be refetched?
- What if I want to implement a bi-directional infinite list?
- What if I want to show the pages in reversed order?
- What if I want to manually update the infinite query?
  - Manually removing first page:
  - Manually removing a single value from an individual page:
  - Keep only the first page:
- What if I want to limit the number of pages?
- What if my API doesn't return a cursor?

Rendering lists that can additively "load more" data onto an existing set of data or "infinite scroll" is also a very common UI pattern. TanStack Query supports a useful version of useQuery called useInfiniteQuery for querying these types of lists.

When using useInfiniteQuery, you'll notice a few things are different:

Note: Options initialData or placeholderData need to conform to the same structure of an object with data.pages and data.pageParams properties.

Let's assume we have an API that returns pages of projects 3 at a time based on a cursor index along with a cursor that can be used to fetch the next group of projects:

With this information, we can create a "Load More" UI by:

It's essential to understand that calling fetchNextPage while an ongoing fetch is in progress runs the risk of overwriting data refreshes happening in the background. This situation becomes particularly critical when rendering a list and triggering fetchNextPage simultaneously.

Remember, there can only be a single ongoing fetch for an InfiniteQuery. A single cache entry is shared for all pages, attempting to fetch twice simultaneously might lead to data overwrites.

If you intend to enable simultaneous fetching, you can utilize the { cancelRefetch: false } option (default: true) within fetchNextPage.

To ensure a seamless querying process without conflicts, it's highly recommended to verify that the query is not in an isFetching state, especially if the user won't directly control that call.

When an infinite query becomes stale and needs to be refetched, each group is fetched sequentially, starting from the first one. This ensures that even if the underlying data is mutated, we're not using stale cursors and potentially getting duplicates or skipping records. If an infinite query's results are ever removed from the queryCache, the pagination restarts at the initial state with only the initial group being requested.

Bi-directional lists can be implemented by using the getPreviousPageParam, fetchPreviousPage, hasPreviousPage and isFetchingPreviousPage properties and functions.

Sometimes you may want to show the pages in reversed order. If this is case, you can use the select option:

Make sure to always keep the same data structure of pages and pageParams!

In some use cases you may want to limit the number of pages stored in the query data to improve the performance and UX:

The solution is to use a "Limited Infinite Query". This is made possible by using the maxPages op

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
fetch('/api/projects?cursor=0')
// { data: [...], nextCursor: 3}
fetch('/api/projects?cursor=3')
// { data: [...], nextCursor: 6}
fetch('/api/projects?cursor=6')
// { data: [...], nextCursor: 9}
fetch('/api/projects?cursor=9')
// { data: [...] }
```

Example 2 (unknown):
```unknown
fetch('/api/projects?cursor=0')
// { data: [...], nextCursor: 3}
fetch('/api/projects?cursor=3')
// { data: [...], nextCursor: 6}
fetch('/api/projects?cursor=6')
// { data: [...], nextCursor: 9}
fetch('/api/projects?cursor=9')
// { data: [...] }
```

Example 3 (unknown):
```unknown
fetch('/api/projects?cursor=0')
// { data: [...], nextCursor: 3}
fetch('/api/projects?cursor=3')
// { data: [...], nextCursor: 6}
fetch('/api/projects?cursor=6')
// { data: [...], nextCursor: 9}
fetch('/api/projects?cursor=9')
// { data: [...] }
```

Example 4 (unknown):
```unknown
fetch('/api/projects?cursor=0')
// { data: [...], nextCursor: 3}
fetch('/api/projects?cursor=3')
// { data: [...], nextCursor: 6}
fetch('/api/projects?cursor=6')
// { data: [...], nextCursor: 9}
fetch('/api/projects?cursor=9')
// { data: [...] }
```

---

## Performance & Request Waterfalls

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/request-waterfalls

**Contents:**
- What is a Request Waterfall?
- Request Waterfalls & React Query
  - Single Component Waterfalls / Serial Queries
  - Nested Component Waterfalls
  - Code Splitting
- Summary and takeaways

Application performance is a broad and complex area and while React Query can't make your APIs faster, there are still things to be mindful about in how you use React Query to ensure the best performance.

The biggest performance footgun when using React Query, or indeed any data fetching library that lets you fetch data inside of components, is request waterfalls. The rest of this page will explain what they are, how you can spot them and how you can restructure your application or APIs to avoid them.

The Prefetching & Router Integration guide builds on this and teaches you how to prefetch data ahead of time when it's not possible or feasible to restructure your application or APIs.

The Server Rendering & Hydration guide teaches you how to prefetch data on the server and pass that data down to the client so you don't have to fetch it again.

The Advanced Server Rendering guide further teaches you how to apply these patterns to Server Components and Streaming Server Rendering.

A request waterfall is what happens when a request for a resource (code, css, images, data) does not start until after another request for a resource has finished.

Consider a web page. Before you can load things like the CSS, JS etc, the browser first needs to load the markup. This is a request waterfall.

If you fetch your CSS inside a JS file, you now have a double waterfall:

If that CSS uses a background image, it's a triple waterfall:

The best way to spot and analyze your request waterfalls is usually by opening your browsers devtools "Network" tab.

Each waterfall represents at least one roundtrip to the server, unless the resource is locally cached (in practice, some of these waterfalls might represent more than one roundtrip because the browser needs to establish a connection which requires some back and forth, but let's ignore that here). Because of this, the negative effects of request waterfalls are highly dependent on the users latency. Consider the example of the triple waterfall, which actually represents 4 server roundtrips. With 250ms latency, which is not uncommon on 3g networks or in bad network conditions, we end up with a total time of 4*250=1000ms only counting latency. If we were able to flatten that to the first example with only 2 roundtrips, we get 500ms instead, possibly loading that background image in half the time!

Now let's consider React Query. We'll focus on the case without Server Rendering first. Before we can even start making a query, we need

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
1. |-> Markup
2.   |-> CSS
2.   |-> JS
2.   |-> Image
```

Example 2 (unknown):
```unknown
1. |-> Markup
2.   |-> CSS
2.   |-> JS
2.   |-> Image
```

Example 3 (unknown):
```unknown
1. |-> Markup
2.   |-> CSS
2.   |-> JS
2.   |-> Image
```

Example 4 (unknown):
```unknown
1. |-> Markup
2.   |-> CSS
2.   |-> JS
2.   |-> Image
```

---

## Migrating to TanStack Query v5

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5

**Contents:**
- Breaking Changes
  - Supports a single signature, one object
  - queryClient.getQueryData now accepts queryKey only as an Argument
  - queryClient.getQueryState now accepts queryKey only as an Argument
    - Codemod
  - Callbacks on useQuery (and QueryObserver) have been removed
  - The refetchInterval callback function only gets query passed
  - The remove method has been removed from useQuery
  - The minimum required TypeScript version is now 4.7
  - The isDataEqual option has been removed from useQuery

v5 is a major version, so there are some breaking changes to be aware of:

useQuery and friends used to have many overloads in TypeScript: different ways how the function could be invoked. Not only was this tough to maintain, type wise, it also required a runtime check to see which types the first and the second parameter were, to correctly create options.

now we only support the object format.

queryClient.getQueryData argument is changed to accept only a queryKey

queryClient.getQueryState argument is changed to accept only a queryKey

To make the remove overloads migration easier, v5 comes with a codemod.

The codemod is a best efforts attempt to help you migrate the breaking change. Please review the generated code thoroughly! Also, there are edge cases that cannot be found by the code mod, so please keep an eye on the log output.

If you want to run it against .js or .jsx files, please use the command below:

If you want to run it against .ts or .tsx files, please use the command below:

Please note in the case of TypeScript you need to use tsx as the parser; otherwise, the codemod won't be applied properly!

Note: Applying the codemod might break your code formatting, so please don't forget to run prettier and/or eslint after you've applied the codemod!

A few notes about how codemod works:

onSuccess, onError and onSettled have been removed from Queries. They haven't been touched for Mutations. Please see this RFC for motivations behind this change and what to do instead.

This streamlines how callbacks are invoked (the refetchOnWindowFocus, refetchOnMount and refetchOnReconnect callbacks all only get the query passed as well), and it fixes some typing issues when callbacks get data transformed by select.

You can still access data with query.state.data, however, it will not be data that has been transformed by select. If you need to access the transformed data, you can call the transformation again on query.state.data.

Previously, remove method used to remove the query from the queryCache without informing observers about it. It was best used to remove data imperatively that is no longer needed, e.g. when logging a user out.

But It doesn't make much sense to do this while a query is still active, because it will just trigger a hard loading state with the next re-render.

if you still need to remove a query, you can use queryClient.removeQueries({queryKey: key})

Mainly because an important fix was shipped around type inference. Please see this T

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
useQuery(key, fn, options) // [!code --]
useQuery({ queryKey, queryFn, ...options }) // [!code ++]
useInfiniteQuery(key, fn, options) // [!code --]
useInfiniteQuery({ queryKey, queryFn, ...options }) // [!code ++]
useMutation(fn, options) // [!code --]
useMutation({ mutationFn, ...options }) // [!code ++]
useIsFetching(key, filters) // [!code --]
useIsFetching({ queryKey, ...filters }) // [!code ++]
useIsMutating(key, filters) // [!code --]
useIsMutating({ mutationKey, ...filters }) // [!code ++]
```

Example 2 (unknown):
```unknown
useQuery(key, fn, options) // [!code --]
useQuery({ queryKey, queryFn, ...options }) // [!code ++]
useInfiniteQuery(key, fn, options) // [!code --]
useInfiniteQuery({ queryKey, queryFn, ...options }) // [!code ++]
useMutation(fn, options) // [!code --]
useMutation({ mutationFn, ...options }) // [!code ++]
useIsFetching(key, filters) // [!code --]
useIsFetching({ queryKey, ...filters }) // [!code ++]
useIsMutating(key, filters) // [!code --]
useIsMutating({ mutationKey, ...filters }) // [!code ++]
```

Example 3 (unknown):
```unknown
useQuery(key, fn, options) // [!code --]
useQuery({ queryKey, queryFn, ...options }) // [!code ++]
useInfiniteQuery(key, fn, options) // [!code --]
useInfiniteQuery({ queryKey, queryFn, ...options }) // [!code ++]
useMutation(fn, options) // [!code --]
useMutation({ mutationFn, ...options }) // [!code ++]
useIsFetching(key, filters) // [!code --]
useIsFetching({ queryKey, ...filters }) // [!code ++]
useIsMutating(key, filters) // [!code --]
useIsMutating({ mutationKey, ...filters }) // [!code ++]
```

Example 4 (unknown):
```unknown
useQuery(key, fn, options) // [!code --]
useQuery({ queryKey, queryFn, ...options }) // [!code ++]
useInfiniteQuery(key, fn, options) // [!code --]
useInfiniteQuery({ queryKey, queryFn, ...options }) // [!code ++]
useMutation(fn, options) // [!code --]
useMutation({ mutationFn, ...options }) // [!code ++]
useIsFetching(key, filters) // [!code --]
useIsFetching({ queryKey, ...filters }) // [!code ++]
useIsMutating(key, filters) // [!code --]
useIsMutating({ mutationKey, ...filters }) // [!code ++]
```

---

## Parallel Queries

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/parallel-queries

**Contents:**
- Manual Parallel Queries
- Dynamic Parallel Queries with useQueries

"Parallel" queries are queries that are executed in parallel, or at the same time so as to maximize fetching concurrency.

When the number of parallel queries does not change, there is no extra effort to use parallel queries. Just use any number of TanStack Query's useQuery and useInfiniteQuery hooks side-by-side!

When using React Query in suspense mode, this pattern of parallelism does not work, since the first query would throw a promise internally and would suspend the component before the other queries run. To get around this, you'll either need to use the useSuspenseQueries hook (which is suggested) or orchestrate your own parallelism with separate components for each useSuspenseQuery instance.

If the number of queries you need to execute is changing from render to render, you cannot use manual querying since that would violate the rules of hooks. Instead, TanStack Query provides a useQueries hook, which you can use to dynamically execute as many queries in parallel as you'd like.

useQueries accepts an options object with a queries key whose value is an array of query objects. It returns an array of query results:

**Examples:**

Example 1 (javascript):
```javascript
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

Example 2 (javascript):
```javascript
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

Example 3 (javascript):
```javascript
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

Example 4 (javascript):
```javascript
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

---

## Query Invalidation

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation

**Contents:**
- Query Matching with invalidateQueries

Waiting for queries to become stale before they are fetched again doesn't always work, especially when you know for a fact that a query's data is out of date because of something the user has done. For that purpose, the QueryClient has an invalidateQueries method that lets you intelligently mark queries as stale and potentially refetch them too!

Note: Where other libraries that use normalized caches would attempt to update local queries with the new data either imperatively or via schema inference, TanStack Query gives you the tools to avoid the manual labor that comes with maintaining normalized caches and instead prescribes targeted invalidation, background-refetching and ultimately atomic updates.

When a query is invalidated with invalidateQueries, two things happen:

When using APIs like invalidateQueries and removeQueries (and others that support partial query matching), you can match multiple queries by their prefix, or get really specific and match an exact query. For information on the types of filters you can use, please see Query Filters.

In this example, we can use the todos prefix to invalidate any queries that start with todos in their query key:

You can even invalidate queries with specific variables by passing a more specific query key to the invalidateQueries method:

The invalidateQueries API is very flexible, so even if you want to only invalidate todos queries that don't have any more variables or subkeys, you can pass an exact: true option to the invalidateQueries method:

If you find yourself wanting even more granularity, you can pass a predicate function to the invalidateQueries method. This function will receive each Query instance from the query cache and allow you to return true or false for whether you want to invalidate that query:

**Examples:**

Example 1 (unknown):
```unknown
// Invalidate every query in the cache
queryClient.invalidateQueries()
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

Example 2 (unknown):
```unknown
// Invalidate every query in the cache
queryClient.invalidateQueries()
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

Example 3 (unknown):
```unknown
// Invalidate every query in the cache
queryClient.invalidateQueries()
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

Example 4 (unknown):
```unknown
// Invalidate every query in the cache
queryClient.invalidateQueries()
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

---

## Mutations

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/mutations

**Contents:**
- Resetting Mutation State
- Mutation Side Effects
  - Consecutive mutations
- Promises
- Retry
- Persist mutations
  - Persisting Offline mutations
- Mutation Scopes
- Further reading

Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a useMutation hook.

Here's an example of a mutation that adds a new todo to the server:

A mutation can only be in one of the following states at any given moment:

Beyond those primary states, more information is available depending on the state of the mutation:

In the example above, you also saw that you can pass variables to your mutations function by calling the mutate function with a single variable or object.

Even with just variables, mutations aren't all that special, but when used with the onSuccess option, the Query Client's invalidateQueries method and the Query Client's setQueryData method, mutations become a very powerful tool.

IMPORTANT: The mutate function is an asynchronous function, which means you cannot use it directly in an event callback in React 16 and earlier. If you need to access the event in onSubmit you need to wrap mutate in another function. This is due to React event pooling.

It's sometimes the case that you need to clear the error or data of a mutation request. To do this, you can use the reset function to handle this:

useMutation comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle. These come in handy for both invalidating and refetching queries after mutations and even optimistic updates

When returning a promise in any of the callback functions it will first be awaited before the next callback is called:

You might find that you want to trigger additional callbacks beyond the ones defined on useMutation when calling mutate. This can be used to trigger component-specific side effects. To do that, you can provide any of the same callback options to the mutate function after your mutation variable. Supported options include: onSuccess, onError and onSettled. Please keep in mind that those additional callbacks won't run if your component unmounts before the mutation finishes.

There is a slight difference in handling onSuccess, onError and onSettled callbacks when it comes to consecutive mutations. When passed to the mutate function, they will be fired up only once and only if the component is still mounted. This is due to the fact that mutation observer is removed and resubscribed every time when the mutate function is called. On the contrary, useMutation handlers execute for each mutate call.

Be aware that most lik

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/todos', newTodo)
    },
  })

  return (
    <div>
      {mutation.isPending ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          <
...
```

Example 2 (javascript):
```javascript
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/todos', newTodo)
    },
  })

  return (
    <div>
      {mutation.isPending ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          <
...
```

Example 3 (javascript):
```javascript
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/todos', newTodo)
    },
  })

  return (
    <div>
      {mutation.isPending ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          <
...
```

Example 4 (javascript):
```javascript
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/todos', newTodo)
    },
  })

  return (
    <div>
      {mutation.isPending ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          <
...
```

---

## Server Rendering & Hydration

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/ssr

**Contents:**
- Server Rendering & React Query
- A quick note on Suspense
- Initial setup
- Get started fast with initialData
- Using the Hydration APIs
  - Full Next.js pages router example
  - Full Remix example
- Optional - Remove boilerplate
- Prefetching dependent queries
- Error handling

In this guide you'll learn how to use React Query with server rendering.

See the guide on Prefetching & Router Integration for some background. You might also want to check out the Performance & Request Waterfalls guide before that.

For advanced server rendering patterns, such as streaming, Server Components and the new Next.js app router, see the Advanced Server Rendering guide.

If you just want to see some code, you can skip ahead to the Full Next.js pages router example or the Full Remix example below.

So what is server rendering anyway? The rest of this guide will assume you are familiar with the concept, but let's spend some time to look at how it relates to React Query. Server rendering is the act of generating the initial html on the server, so that the user has some content to look at as soon as the page loads. This can happen on demand when a page is requested (SSR). It can also happen ahead of time either because a previous request was cached, or at build time (SSG).

If you've read the Request Waterfalls guide, you might remember this:

With a client rendered application, these are the minimum 3 server roundtrips you will need to make before getting any content on the screen for the user. One way of viewing server rendering is that it turns the above into this:

As soon as 1. is complete, the user can see the content and when 2. finishes, the page is interactive and clickable. Because the markup also contains the initial data we need, step 3. does not need to run on the client at all, at least until you want to revalidate the data for some reason.

This is all from the clients perspective. On the server, we need to prefetch that data before we generate/render the markup, we need to dehydrate that data into a serializable format we can embed in the markup, and on the client we need to hydrate that data into a React Query cache so we can avoid doing a new fetch on the client.

Read on to learn how to implement these three steps with React Query.

This guide uses the regular useQuery API. While we don't necessarily recommend it, it is possible to replace this with useSuspenseQuery instead as long as you always prefetch all your queries. The upside is that you get to use <Suspense> for loading states on the client.

If you do forget to prefetch a query when you are using useSuspenseQuery, the consequences will depend on the framework you are using. In some cases, the data will Suspend and get fetched on the server but never be hydrated to the cl

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
1. |-> Markup (without content)
2.   |-> JS
3.     |-> Query
```

Example 2 (unknown):
```unknown
1. |-> Markup (without content)
2.   |-> JS
3.     |-> Query
```

Example 3 (unknown):
```unknown
1. |-> Markup (without content)
2.   |-> JS
3.     |-> Query
```

Example 4 (unknown):
```unknown
1. |-> Markup (without content)
2.   |-> JS
3.     |-> Query
```

---

## Initial Query Data

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data

**Contents:**
- Using initialData to prepopulate a query
  - staleTime and initialDataUpdatedAt
  - Initial Data Function
  - Initial Data from Cache
  - Initial Data from the cache with initialDataUpdatedAt
  - Conditional Initial Data from Cache
- Further reading

There are many ways to supply initial data for a query to the cache before you need it:

There may be times when you already have the initial data for a query available in your app and can simply provide it directly to your query. If and when this is the case, you can use the config.initialData option to set the initial data for a query and skip the initial loading state!

IMPORTANT: initialData is persisted to the cache, so it is not recommended to provide placeholder, partial or incomplete data to this option and instead use placeholderData

By default, initialData is treated as totally fresh, as if it were just fetched. This also means that it will affect how it is interpreted by the staleTime option.

If you configure your query observer with initialData, and no staleTime (the default staleTime: 0), the query will immediately refetch when it mounts:

If you configure your query observer with initialData and a staleTime of 1000 ms, the data will be considered fresh for that same amount of time, as if it was just fetched from your query function.

So what if your initialData isn't totally fresh? That leaves us with the last configuration that is actually the most accurate and uses an option called initialDataUpdatedAt. This option allows you to pass a numeric JS timestamp in milliseconds of when the initialData itself was last updated, e.g. what Date.now() provides. Take note that if you have a unix timestamp, you'll need to convert it to a JS timestamp by multiplying it by 1000.

This option allows the staleTime to be used for its original purpose, determining how fresh the data needs to be, while also allowing the data to be refetched on mount if the initialData is older than the staleTime. In the example above, our data needs to be fresh within 1 minute, and we can hint to the query when the initialData was last updated so the query can decide for itself whether the data needs to be refetched again or not.

If you would rather treat your data as prefetched data, we recommend that you use the prefetchQuery or fetchQuery APIs to populate the cache beforehand, thus letting you configure your staleTime independently from your initialData

If the process for accessing a query's initial data is intensive or just not something you want to perform on every render, you can pass a function as the initialData value. This function will be executed only once when the query is initialized, saving you precious memory and/or CPU:

In some circumstances, you may be ab

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
})
```

Example 2 (javascript):
```javascript
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
})
```

Example 3 (javascript):
```javascript
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
})
```

Example 4 (javascript):
```javascript
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
})
```

---

## Prefetching & Router Integration

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/prefetching

**Contents:**
- prefetchQuery & prefetchInfiniteQuery
- Prefetch in event handlers
- Prefetch in components
  - Dependent Queries & Code Splitting
- Router Integration
- Manually Priming a Query
- Further reading

When you know or suspect that a certain piece of data will be needed, you can use prefetching to populate the cache with that data ahead of time, leading to a faster experience.

There are a few different prefetching patterns:

In this guide, we'll take a look at the first three, while the fourth will be covered in depth in the Server Rendering & Hydration guide and the Advanced Server Rendering guide.

One specific use of prefetching is to avoid Request Waterfalls, for an in-depth background and explanation of those, see the Performance & Request Waterfalls guide.

Before jumping into the different specific prefetch patterns, let's look at the prefetchQuery and prefetchInfiniteQuery functions. First a few basics:

This is how you use prefetchQuery:

Infinite Queries can be prefetched like regular Queries. Per default, only the first page of the Query will be prefetched and will be stored under the given QueryKey. If you want to prefetch more than one page, you can use the pages option, in which case you also have to provide a getNextPageParam function:

Next, let's look at how you can use these and other ways to prefetch in different situations.

A straightforward form of prefetching is doing it when the user interacts with something. In this example we'll use queryClient.prefetchQuery to start a prefetch on onMouseEnter or onFocus.

Prefetching during the component lifecycle is useful when we know some child or descendant will need a particular piece of data, but we can't render that until some other query has finished loading. Let's borrow an example from the Request Waterfall guide to explain:

This results in a request waterfall looking like this:

As mentioned in that guide, one way to flatten this waterfall and improve performance is to hoist the getArticleCommentsById query to the parent and pass down the result as a prop, but what if this is not feasible or desirable, for example when the components are unrelated and have multiple levels between them?

In that case, we can instead prefetch the query in the parent. The simplest way to do this is to use a query but ignore the result:

This starts fetching 'article-comments' immediately and flattens the waterfall:

If you want to prefetch together with Suspense, you will have to do things a bit differently. You can't use useSuspenseQueries to prefetch, since the prefetch would block the component from rendering. You also can not use useQuery for the prefetch, because that wouldn't start the prefetch 

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
```

Example 2 (javascript):
```javascript
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
```

Example 3 (javascript):
```javascript
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
```

Example 4 (javascript):
```javascript
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
```

---

## Migrating to React Query 4

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-4

**Contents:**
- Breaking Changes
  - react-query is now @tanstack/react-query
    - Codemod
  - Query Keys (and Mutation Keys) need to be an Array
    - Codemod
  - The idle state has been removed
    - disabled queries
  - new API for useQueries
  - Undefined is an illegal cache value for successful queries
  - Queries and mutations, per default, need network connection to run

v4 is a major version, so there are some breaking changes to be aware of:

You will need to un-/install dependencies and change the imports:

To make the import migration easier, v4 comes with a codemod.

The codemod is a best efforts attempt to help you migrate the breaking change. Please review the generated code thoroughly! Also, there are edge cases that cannot be found by the code mod, so please keep an eye on the log output.

You can easily apply it by using one (or both) of the following commands:

If you want to run it against .js or .jsx files, please use the command below:

If you want to run it against .ts or .tsx files, please use the command below:

Please note in the case of TypeScript you need to use tsx as the parser; otherwise, the codemod won't be applied properly!

Note: Applying the codemod might break your code formatting, so please don't forget to run prettier and/or eslint after you've applied the codemod!

Note: The codemod will only change the imports - you still have to install the separate devtools package manually.

In v3, Query and Mutation Keys could be a String or an Array. Internally, React Query has always worked with Array Keys only, and we've sometimes exposed this to consumers. For example, in the queryFn, you would always get the key as an Array to make working with Default Query Functions easier.

However, we have not followed this concept through to all apis. For example, when using the predicate function on Query Filters you would get the raw Query Key. This makes it difficult to work with such functions if you use Query Keys that are mixed Arrays and Strings. The same was true when using global callbacks.

To streamline all apis, we've decided to make all keys Arrays only:

To make this migration easier, we decided to deliver a codemod.

The codemod is a best efforts attempt to help you migrate the breaking change. Please review the generated code thoroughly! Also, there are edge cases that cannot be found by the code mod, so please keep an eye on the log output.

You can easily apply it by using one (or both) of the following commands:

If you want to run it against .js or .jsx files, please use the command below:

If you want to run it against .ts or .tsx files, please use the command below:

Please note in the case of TypeScript you need to use tsx as the parser; otherwise, the codemod won't be applied properly!

Note: Applying the codemod might break your code formatting, so please don't forget to run prettier a

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npm uninstall react-query
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

Example 2 (unknown):
```unknown
npm uninstall react-query
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

Example 3 (unknown):
```unknown
npm uninstall react-query
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

Example 4 (unknown):
```unknown
npm uninstall react-query
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

---

## Render Optimizations

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations

**Contents:**
- structural sharing
  - referential identity
- tracked properties
- select
  - memoization
- Further Reading

React Query applies a couple of optimizations automatically to ensure that your components only re-render when they actually need to. This is done by the following means:

React Query uses a technique called "structural sharing" to ensure that as many references as possible will be kept intact between re-renders. If data is fetched over the network, usually, you'll get a completely new reference by json parsing the response. However, React Query will keep the original reference if nothing changed in the data. If a subset changed, React Query will keep the unchanged parts and only replace the changed parts.

Note: This optimization only works if the queryFn returns JSON compatible data. You can turn it off by setting structuralSharing: false globally or on a per-query basis, or you can implement your own structural sharing by passing a function to it.

The top level object returned from useQuery, useInfiniteQuery, useMutation and the Array returned from useQueries is not referentially stable. It will be a new reference on every render. However, the data properties returned from these hooks will be as stable as possible.

React Query will only trigger a re-render if one of the properties returned from useQuery is actually "used". This is done by using Proxy object. This avoids a lot of unnecessary re-renders, e.g. because properties like isFetching or isStale might change often, but are not used in the component.

You can customize this feature by setting notifyOnChangeProps manually globally or on a per-query basis. If you want to turn that feature off, you can set notifyOnChangeProps: 'all'.

Note: The get trap of a proxy is invoked by accessing a property, either via destructuring or by accessing it directly. If you use object rest destructuring, you will disable this optimization. We have a lint rule to guard against this pitfall.

You can use the select option to select a subset of the data that your component should subscribe to. This is useful for highly optimized data transformations or to avoid unnecessary re-renders.

A component using the useTodoCount custom hook will only re-render if the length of the todos changes. It will not re-render if e.g. the name of a todo changed.

Note: select operates on successfully cached data and is not the appropriate place to throw errors. The source of truth for errors is the queryFn, and a select function that returns an error results in data being undefined and isSuccess being true. We recommend handling error

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
export const useTodos = (select) => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
  })
}

export const useTodoCount = () => {
  return useTodos((data) => data.length)
}
```

Example 2 (javascript):
```javascript
export const useTodos = (select) => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
  })
}

export const useTodoCount = () => {
  return useTodos((data) => data.length)
}
```

Example 3 (javascript):
```javascript
export const useTodos = (select) => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
  })
}

export const useTodoCount = () => {
  return useTodos((data) => data.length)
}
```

Example 4 (javascript):
```javascript
export const useTodos = (select) => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
  })
}

export const useTodoCount = () => {
  return useTodos((data) => data.length)
}
```

---

## Network Mode

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/network-mode

**Contents:**
- Network Mode: online
- Network Mode: always
- Network Mode: offlineFirst
- Devtools
- Signature

TanStack Query provides three different network modes to distinguish how Queries and Mutations should behave if you have no network connection. This mode can be set for each Query / Mutation individually, or globally via the query / mutation defaults.

Since TanStack Query is most often used for data fetching in combination with data fetching libraries, the default network mode is online.

In this mode, Queries and Mutations will not fire unless you have network connection. This is the default mode. If a fetch is initiated for a query, it will always stay in the state (pending, error, success) it is in if the fetch cannot be made because there is no network connection. However, a fetchStatus is exposed additionally. This can be either:

The flags isFetching and isPaused are derived from this state and exposed for convenience.

Keep in mind that it might not be enough to check for pending state to show a loading spinner. Queries can be in state: 'pending', but fetchStatus: 'paused' if they are mounting for the first time, and you have no network connection.

If a query runs because you are online, but you go offline while the fetch is still happening, TanStack Query will also pause the retry mechanism. Paused queries will then continue to run once you re-gain network connection. This is independent of refetchOnReconnect (which also defaults to true in this mode), because it is not a refetch, but rather a continue. If the query has been cancelled in the meantime, it will not continue.

In this mode, TanStack Query will always fetch and ignore the online / offline state. This is likely the mode you want to choose if you use TanStack Query in an environment where you don't need an active network connection for your Queries to work - e.g. if you just read from AsyncStorage, or if you just want to return Promise.resolve(5) from your queryFn.

This mode is the middle ground between the first two options, where TanStack Query will run the queryFn once, but then pause retries. This is very handy if you have a serviceWorker that intercepts a request for caching like in an offline-first PWA, or if you use HTTP caching via the Cache-Control header.

In those situations, the first fetch might succeed because it comes from an offline storage / cache. However, if there is a cache miss, the network request will go out and fail, in which case this mode behaves like an online query - pausing retries.

The TanStack Query Devtools will show Queries in a paused state if they w

*[Content truncated]*

---

## Window Focus Refetching

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/window-focus-refetching

**Contents:**
    - Disabling Globally
    - Disabling Per-Query
- Custom Window Focus Event
- Managing Focus in React Native
- Managing focus state

If a user leaves your application and returns and the query data is stale, TanStack Query automatically requests fresh data for you in the background. You can disable this globally or per-query using the refetchOnWindowFocus option:

In rare circumstances, you may want to manage your own window focus events that trigger TanStack Query to revalidate. To do this, TanStack Query provides a focusManager.setEventListener function that supplies you the callback that should be fired when the window is focused and allows you to set up your own events. When calling focusManager.setEventListener, the previously set handler is removed (which in most cases will be the default handler) and your new handler is used instead. For example, this is the default handler:

Instead of event listeners on window, React Native provides focus information through the AppState module. You can use the AppState "change" event to trigger an update when the app state changes to "active":

**Examples:**

Example 1 (javascript):
```javascript
//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

Example 2 (javascript):
```javascript
//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

Example 3 (javascript):
```javascript
//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

Example 4 (javascript):
```javascript
//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

---

## Invalidations from Mutations

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations

**Contents:**
- Further reading

Invalidating queries is only half the battle. Knowing when to invalidate them is the other half. Usually when a mutation in your app succeeds, it's VERY likely that there are related queries in your application that need to be invalidated and possibly refetched to account for the new changes from your mutation.

For example, assume we have a mutation to post a new todo:

When a successful postTodo mutation happens, we likely want all todos queries to get invalidated and possibly refetched to show the new todo item. To do this, you can use useMutation's onSuccess options and the client's invalidateQueries function:

Returning a Promise on onSuccess makes sure the data is updated before the mutation is entirely complete (i.e., isPending is true until onSuccess is fulfilled)

You can wire up your invalidations to happen using any of the callbacks available in the useMutation hook

For a technique to automatically invalidate Queries after Mutations, have a look at Automatic Query Invalidation after Mutations from the Community Resources.

**Examples:**

Example 1 (javascript):
```javascript
const mutation = useMutation({ mutationFn: postTodo })
```

Example 2 (javascript):
```javascript
const mutation = useMutation({ mutationFn: postTodo })
```

Example 3 (javascript):
```javascript
const mutation = useMutation({ mutationFn: postTodo })
```

Example 4 (javascript):
```javascript
const mutation = useMutation({ mutationFn: postTodo })
```

---

## Background Fetching Indicators

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/background-fetching-indicators

**Contents:**
- Displaying Global Background Fetching Loading State

A query's status === 'pending' state is sufficient enough to show the initial hard-loading state for a query, but sometimes you may want to display an additional indicator that a query is refetching in the background. To do this, queries also supply you with an isFetching boolean that you can use to show that it's in a fetching state, regardless of the state of the status variable:

In addition to individual query loading states, if you would like to show a global loading indicator when any queries are fetching (including in the background), you can use the useIsFetching hook:

**Examples:**

Example 1 (javascript):
```javascript
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return status === 'pending' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  )
}
```

Example 2 (javascript):
```javascript
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return status === 'pending' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  )
}
```

Example 3 (javascript):
```javascript
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return status === 'pending' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  )
}
```

Example 4 (javascript):
```javascript
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return status === 'pending' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  )
}
```

---

## Query Cancellation

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

**Contents:**
- Default behavior
- Using fetch
- Using axios v0.22.0+
  - Using axios with version lower than v0.22.0
- Using XMLHttpRequest
- Using graphql-request
- Using graphql-request with version lower than v4.0.0
- Manual Cancellation
- Cancel Options
- Limitations

TanStack Query provides each query function with an AbortSignal instance. When a query becomes out-of-date or inactive, this signal will become aborted. This means that all queries are cancellable, and you can respond to the cancellation inside your query function if desired. The best part about this is that it allows you to continue to use normal async/await syntax while getting all the benefits of automatic cancellation.

The AbortController API is available in most runtime environments, but if your runtime environment does not support it, you will need to provide a polyfill. There are several available.

By default, queries that unmount or become unused before their promises are resolved are not cancelled. This means that after the promise has resolved, the resulting data will be available in the cache. This is helpful if you've started receiving a query, but then unmount the component before it finishes. If you mount the component again and the query has not been garbage collected yet, data will be available.

However, if you consume the AbortSignal, the Promise will be cancelled (e.g. aborting the fetch) and therefore, also the Query must be cancelled. Cancelling the query will result in its state being reverted to its previous state.

An AbortSignal can be set in the client request method.

An AbortSignal can be set in the GraphQLClient constructor.

You might want to cancel a query manually. For example, if the request takes a long time to finish, you can allow the user to click a cancel button to stop the request. To do this, you just need to call queryClient.cancelQueries({ queryKey }), which will cancel the query and revert it back to its previous state. If you have consumed the signal passed to the query function, TanStack Query will additionally also cancel the Promise.

Cancel options are used to control the behavior of query cancellation operations.

A cancel options object supports the following properties:

Cancellation does not work when working with Suspense hooks: useSuspenseQuery, useSuspenseQueries and useSuspenseInfiniteQuery.

**Examples:**

Example 1 (javascript):
```javascript
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch('/todos', {
      // Pass the signal to one fetch
      signal,
    })
    const todos = await todosResponse.json()

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      })
      return response.json()
    })

    return Promise.all(todoDetails)
  },
})
```

Example 2 (javascript):
```javascript
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch('/todos', {
      // Pass the signal to one fetch
      signal,
    })
    const todos = await todosResponse.json()

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      })
      return response.json()
    })

    return Promise.all(todoDetails)
  },
})
```

Example 3 (javascript):
```javascript
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch('/todos', {
      // Pass the signal to one fetch
      signal,
    })
    const todos = await todosResponse.json()

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      })
      return response.json()
    })

    return Promise.all(todoDetails)
  },
})
```

Example 4 (javascript):
```javascript
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch('/todos', {
      // Pass the signal to one fetch
      signal,
    })
    const todos = await todosResponse.json()

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      })
      return response.json()
    })

    return Promise.all(todoDetails)
  },
})
```

---

## Query Keys

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

**Contents:**
- Simple Query Keys
- Array Keys with variables
- Query Keys are hashed deterministically!
- If your query function depends on a variable, include it in your query key
- Further reading

At its core, TanStack Query manages query caching for you based on query keys. Query keys have to be an Array at the top level, and can be as simple as an Array with a single string, or as complex as an array of many strings and nested objects. As long as the query key is serializable using JSON.stringify, and unique to the query's data, you can use it!

The simplest form of a key is an array with constants values. This format is useful for:

When a query needs more information to uniquely describe its data, you can use an array with a string and any number of serializable objects to describe it. This is useful for:

This means that no matter the order of keys in objects, all of the following queries are considered equal:

The following query keys, however, are not equal. Array item order matters!

Since query keys uniquely describe the data they are fetching, they should include any variables you use in your query function that change. For example:

Note that query keys act as dependencies for your query functions. Adding dependent variables to your query key will ensure that queries are cached independently, and that any time a variable changes, queries will be refetched automatically (depending on your staleTime settings). See the exhaustive-deps section for more information and examples.

For tips on organizing Query Keys in larger applications, have a look at Effective React Query Keys and check the Query Key Factory Package from the Community Resources.

**Examples:**

Example 1 (unknown):
```unknown
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

Example 2 (unknown):
```unknown
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

Example 3 (unknown):
```unknown
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

Example 4 (unknown):
```unknown
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

---

## Query Functions

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/query-functions

**Contents:**
- Handling and Throwing Errors
- Usage with fetch and other clients that do not throw by default
- Query Function Variables
  - QueryFunctionContext

A query function can be literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error.

All of the following are valid query function configurations:

For TanStack Query to determine a query has errored, the query function must throw or return a rejected Promise. Any error that is thrown in the query function will be persisted on the error state of the query.

While most utilities like axios or graphql-request automatically throw errors for unsuccessful HTTP calls, some utilities like fetch do not throw errors by default. If that's the case, you'll need to throw them on your own. Here is a simple way to do that with the popular fetch API:

Query keys are not just for uniquely identifying the data you are fetching, but are also conveniently passed into your query function as part of the QueryFunctionContext. While not always necessary, this makes it possible to extract your query functions if needed:

The QueryFunctionContext is the object passed to each query function. It consists of:

Additionally, Infinite Queries get the following options passed:

**Examples:**

Example 1 (javascript):
```javascript
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

Example 2 (javascript):
```javascript
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

Example 3 (javascript):
```javascript
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

Example 4 (javascript):
```javascript
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

---

## Query Options

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/query-options

One of the best ways to share queryKey and queryFn between multiple places, yet keep them co-located to one another, is to use the queryOptions helper. At runtime, this helper just returns whatever you pass into it, but it has a lot of advantages when using it with TypeScript. You can define all possible options for a query in one place, and you'll also get type inference and type safety for all of them.

For Infinite Queries, a separate infiniteQueryOptions helper is available.

You can still override some options at the component level. A very common and useful pattern is to create per-component select functions:

**Examples:**

Example 1 (python):
```python
import { queryOptions } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

Example 2 (python):
```python
import { queryOptions } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

Example 3 (python):
```python
import { queryOptions } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

Example 4 (python):
```python
import { queryOptions } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

---

## Placeholder Query Data

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/placeholder-query-data

**Contents:**
- What is placeholder data?
- Placeholder Data as a Value
  - Placeholder Data Memoization
- Placeholder Data as a Function
  - Placeholder Data from Cache
- Further reading

Placeholder data allows a query to behave as if it already has data, similar to the initialData option, but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake) data to render the query successfully while the actual data is fetched in the background.

Example: An individual blog post query could pull "preview" data from a parent list of blog posts that only include title and a small snippet of the post body. You would not want to persist this partial data to the query result of the individual query, but it is useful for showing the content layout as quickly as possible while the actual query finishes to fetch the entire object.

There are a few ways to supply placeholder data for a query to the cache before you need it:

When we use placeholderData, our Query will not be in a pending state - it will start out as being in success state, because we have data to display - even if that data is just "placeholder" data. To distinguish it from "real" data, we will also have the isPlaceholderData flag set to true on the Query result.

If the process for accessing a query's placeholder data is intensive or just not something you want to perform on every render, you can memoize the value:

placeholderData can also be a function, where you can get access to the data and Query meta information of a "previous" successful Query. This is useful for situations where you want to use the data from one query as the placeholder data for another query. When the QueryKey changes, e.g. from ['todos', 1] to ['todos', 2], we can keep displaying "old" data instead of having to show a loading spinner while data is transitioning from one Query to the next. For more information, see Paginated Queries.

In some circumstances, you may be able to provide the placeholder data for a query from the cached result of another. A good example of this would be searching the cached data from a blog post list query for a preview version of the post, then using that as the placeholder data for your individual post query:

For a comparison between Placeholder Data and Initial Data, have a look at the Community Resources.

**Examples:**

Example 1 (javascript):
```javascript
function Todos() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData: placeholderTodos,
  })
}
```

Example 2 (javascript):
```javascript
function Todos() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData: placeholderTodos,
  })
}
```

Example 3 (javascript):
```javascript
function Todos() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData: placeholderTodos,
  })
}
```

Example 4 (javascript):
```javascript
function Todos() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData: placeholderTodos,
  })
}
```

---

## Optimistic Updates

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

**Contents:**
- Via the UI
  - If the mutation and the query don't live in the same component
- Via the cache
  - Updating a list of todos when adding a new todo
  - Updating a single todo
- When to use what
- Further reading

React Query provides two ways to optimistically update your UI before a mutation has completed. You can either use the onMutate option to update your cache directly, or leverage the returned variables to update your UI from the useMutation result.

This is the simpler variant, as it doesn't interact with the cache directly.

you will then have access to addTodoMutation.variables, which contain the added todo. In your UI list, where the query is rendered, you can append another item to the list while the mutation isPending:

We're rendering a temporary item with a different opacity as long as the mutation is pending. Once it completes, the item will automatically no longer be rendered. Given that the refetch succeeded, we should see the item as a "normal item" in our list.

If the mutation errors, the item will also disappear. But we could continue to show it, if we want, by checking for the isError state of the mutation. variables are not cleared when the mutation errors, so we can still access them, maybe even show a retry button:

This approach works very well if the mutation and the query live in the same component. However, you also get access to all mutations in other components via the dedicated useMutationState hook. It is best combined with a mutationKey:

variables will be an Array, because there might be multiple mutations running at the same time. If we need a unique key for the items, we can also select mutation.state.submittedAt. This will even make displaying concurrent optimistic updates a breeze.

When you optimistically update your state before performing a mutation, there is a chance that the mutation will fail. In most of these failure cases, you can just trigger a refetch for your optimistic queries to revert them to their true server state. In some circumstances though, refetching may not work correctly and the mutation error could represent some type of server issue that won't make it possible to refetch. In this event, you can instead choose to roll back your update.

To do this, useMutation's onMutate handler option allows you to return a value that will later be passed to both onError and onSettled handlers as the last argument. In most cases, it is most useful to pass a rollback function.

You can also use the onSettled function in place of the separate onError and onSuccess handlers if you wish:

If you only have one place where the optimistic result should be shown, using variables and updating the UI directly is the approach th

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  // make sure to _return_ the Promise from the query invalidation
  // so that the mutation stays in `pending` state until the refetch is finished
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const { isPending, submittedAt, variables, mutate, isError } = addTodoMutation
```

Example 2 (javascript):
```javascript
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  // make sure to _return_ the Promise from the query invalidation
  // so that the mutation stays in `pending` state until the refetch is finished
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const { isPending, submittedAt, variables, mutate, isError } = addTodoMutation
```

Example 3 (javascript):
```javascript
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  // make sure to _return_ the Promise from the query invalidation
  // so that the mutation stays in `pending` state until the refetch is finished
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const { isPending, submittedAt, variables, mutate, isError } = addTodoMutation
```

Example 4 (javascript):
```javascript
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  // make sure to _return_ the Promise from the query invalidation
  // so that the mutation stays in `pending` state until the refetch is finished
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const { isPending, submittedAt, variables, mutate, isError } = addTodoMutation
```

---

## Paginated / Lagged Queries

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries

**Contents:**
- Better Paginated Queries with placeholderData
- Lagging Infinite Query results with placeholderData

Rendering paginated data is a very common UI pattern and in TanStack Query, it "just works" by including the page information in the query key:

However, if you run this simple example, you might notice something strange:

The UI jumps in and out of the success and pending states because each new page is treated like a brand new query.

This experience is not optimal and unfortunately is how many tools today insist on working. But not TanStack Query! As you may have guessed, TanStack Query comes with an awesome feature called placeholderData that allows us to get around this.

Consider the following example where we would ideally want to increment a pageIndex (or cursor) for a query. If we were to use useQuery, it would still technically work fine, but the UI would jump in and out of the success and pending states as different queries are created and destroyed for each page or cursor. By setting placeholderData to (previousData) => previousData or keepPreviousData function exported from TanStack Query, we get a few new things:

While not as common, the placeholderData option also works flawlessly with the useInfiniteQuery hook, so you can seamlessly allow your users to continue to see cached data while infinite query keys change over time.

**Examples:**

Example 1 (javascript):
```javascript
const result = useQuery({
  queryKey: ['projects', page],
  queryFn: fetchProjects,
})
```

Example 2 (javascript):
```javascript
const result = useQuery({
  queryKey: ['projects', page],
  queryFn: fetchProjects,
})
```

Example 3 (javascript):
```javascript
const result = useQuery({
  queryKey: ['projects', page],
  queryFn: fetchProjects,
})
```

Example 4 (javascript):
```javascript
const result = useQuery({
  queryKey: ['projects', page],
  queryFn: fetchProjects,
})
```

---

## Filters

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/filters

**Contents:**
- Query Filters
- Mutation Filters
- Utils
  - matchQuery
  - matchMutation

Some methods within TanStack Query accept a QueryFilters or MutationFilters object.

A query filter is an object with certain conditions to match a query with:

A query filter object supports the following properties:

A mutation filter is an object with certain conditions to match a mutation with:

A mutation filter object supports the following properties:

Returns a boolean that indicates whether a query matches the provided set of query filters.

Returns a boolean that indicates whether a mutation matches the provided set of mutation filters.

**Examples:**

Example 1 (unknown):
```unknown
// Cancel all queries
await queryClient.cancelQueries()

// Remove all inactive queries that begin with `posts` in the key
queryClient.removeQueries({ queryKey: ['posts'], type: 'inactive' })

// Refetch all active queries
await queryClient.refetchQueries({ type: 'active' })

// Refetch all active queries that begin with `posts` in the key
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
```

Example 2 (unknown):
```unknown
// Cancel all queries
await queryClient.cancelQueries()

// Remove all inactive queries that begin with `posts` in the key
queryClient.removeQueries({ queryKey: ['posts'], type: 'inactive' })

// Refetch all active queries
await queryClient.refetchQueries({ type: 'active' })

// Refetch all active queries that begin with `posts` in the key
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
```

Example 3 (unknown):
```unknown
// Cancel all queries
await queryClient.cancelQueries()

// Remove all inactive queries that begin with `posts` in the key
queryClient.removeQueries({ queryKey: ['posts'], type: 'inactive' })

// Refetch all active queries
await queryClient.refetchQueries({ type: 'active' })

// Refetch all active queries that begin with `posts` in the key
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
```

Example 4 (unknown):
```unknown
// Cancel all queries
await queryClient.cancelQueries()

// Remove all inactive queries that begin with `posts` in the key
queryClient.removeQueries({ queryKey: ['posts'], type: 'inactive' })

// Refetch all active queries
await queryClient.refetchQueries({ type: 'active' })

// Refetch all active queries that begin with `posts` in the key
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
```

---

## Migrating to React Query 3

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-3

**Contents:**
- Overview
- Breaking Changes
  - The QueryCache has been split into a QueryClient and lower-level QueryCache and MutationCache instances.
  - ReactQueryConfigProvider and ReactQueryCacheProvider have both been replaced by QueryClientProvider
  - The default QueryCache is gone. For real this time!
  - The deprecated makeQueryCache utility has been removed.
  - QueryCache.prefetchQuery() has been moved to QueryClient.prefetchQuery()
  - ReactQueryErrorResetBoundary and QueryCache.resetErrorBoundaries() have been replaced by QueryErrorResetBoundary and useQueryErrorResetBoundary().
  - QueryCache.getQuery() has been replaced by QueryCache.find().
  - QueryCache.getQueries() has been moved to QueryCache.findAll().

Previous versions of React Query were awesome and brought some amazing new features, more magic, and an overall better experience to the library. They also brought on massive adoption and likewise a lot of refining fire (issues/contributions) to the library and brought to light a few things that needed more polish to make the library even better. v3 contains that very polish.

The QueryCache contains all queries, the MutationCache contains all mutations, and the QueryClient can be used to set configuration and to interact with them.

This has some benefits:

When creating a new QueryClient(), a QueryCache and MutationCache are automatically created for you if you don't supply them.

Default options for queries and mutations can now be specified in QueryClient:

Notice that it's now defaultOptions instead of defaultConfig

The QueryClientProvider component is now used to connect a QueryClient to your application:

As previously noted with a deprecation, there is no longer a default QueryCache that is created or exported from the main package. You must create your own via new QueryClient() or new QueryCache() (which you can then pass to new QueryClient({ queryCache }) )

It's been a long time coming, but it's finally gone :)

The new QueryClient.prefetchQuery() function is async, but does not return the data from the query. If you require the data, use the new QueryClient.fetchQuery() function

Together, these provide the same experience as before, but with added control to choose which component trees you want to reset. For more information, see:

QueryCache.find() should now be used to look up individual queries from a cache

QueryCache.findAll() should now be used to look up multiple queries from a cache

Notice that it's now a function instead of a property

It returns the provided queryClient for its component tree and shouldn't need much tweaking beyond a rename.

Inline functions are now the suggested way of passing parameters to your query functions:

If you still insist on not using inline functions, you can use the newly passed QueryFunctionContext:

They were previously added as the last query key parameter in your query function, but this proved to be difficult for some patterns

The new keepPreviousData options is available for both useQuery and useInfiniteQuery and will have the same "lagging" effect on your data:

The useInfiniteQuery() interface has changed to fully support bi-directional infinite lists.

One direction reversed:

This allows 

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { QueryClient } from 'react-query'

const queryClient = new QueryClient()
```

Example 2 (python):
```python
import { QueryClient } from 'react-query'

const queryClient = new QueryClient()
```

Example 3 (python):
```python
import { QueryClient } from 'react-query'

const queryClient = new QueryClient()
```

Example 4 (python):
```python
import { QueryClient } from 'react-query'

const queryClient = new QueryClient()
```

---

## Suspense

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/suspense

**Contents:**
  - throwOnError default
- Resetting Error Boundaries
- Fetch-on-render vs Render-as-you-fetch
- Suspense on the Server with streaming
- Using useQuery().promise and React.use() (Experimental)

React Query can also be used with React's Suspense for Data Fetching APIs. For this, we have dedicated hooks:

When using suspense mode, status states and error objects are not needed and are then replaced by usage of the React.Suspense component (including the use of the fallback prop and React error boundaries for catching errors). Please read the Resetting Error Boundaries and look at the Suspense Example for more information on how to set up suspense mode.

If you want mutations to propagate errors to the nearest error boundary (similar to queries), you can set the throwOnError option to true as well.

Enabling suspense mode for a query:

This works nicely in TypeScript, because data is guaranteed to be defined (as errors and loading states are handled by Suspense- and ErrorBoundaries).

On the flip side, you therefore can't conditionally enable / disable the Query. This generally shouldn't be necessary for dependent Queries because with suspense, all your Queries inside one component are fetched in serial.

placeholderData also doesn't exist for this Query. To prevent the UI from being replaced by a fallback during an update, wrap your updates that change the QueryKey into startTransition.

Not all errors are thrown to the nearest Error Boundary per default - we're only throwing errors if there is no other data to show. That means if a Query ever successfully got data in the cache, the component will render, even if data is stale. Thus, the default for throwOnError is:

Since you can't change throwOnError (because it would allow for data to become potentially undefined), you have to throw errors manually if you want all errors to be handled by Error Boundaries:

Whether you are using suspense or throwOnError in your queries, you will need a way to let queries know that you want to try again when re-rendering after some error occurred.

Query errors can be reset with the QueryErrorResetBoundary component or with the useQueryErrorResetBoundary hook.

When using the component it will reset any query errors within the boundaries of the component:

When using the hook it will reset any query errors within the closest QueryErrorResetBoundary. If there is no boundary defined it will reset them globally:

Out of the box, React Query in suspense mode works really well as a Fetch-on-render solution with no additional configuration. This means that when your components attempt to mount, they will trigger query fetching and suspend, but only once you have importe

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
import { useSuspenseQuery } from '@tanstack/react-query'

const { data } = useSuspenseQuery({ queryKey, queryFn })
```

Example 2 (python):
```python
import { useSuspenseQuery } from '@tanstack/react-query'

const { data } = useSuspenseQuery({ queryKey, queryFn })
```

Example 3 (python):
```python
import { useSuspenseQuery } from '@tanstack/react-query'

const { data } = useSuspenseQuery({ queryKey, queryFn })
```

Example 4 (python):
```python
import { useSuspenseQuery } from '@tanstack/react-query'

const { data } = useSuspenseQuery({ queryKey, queryFn })
```

---

## Queries

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/queries

**Contents:**
- Query Basics
  - FetchStatus
  - Why two different states?
- Further Reading

A query is a declarative dependency on an asynchronous source of data that is tied to a unique key. A query can be used with any Promise based method (including GET and POST methods) to fetch data from a server. If your method modifies data on the server, we recommend using Mutations instead.

To subscribe to a query in your components or custom hooks, call the useQuery hook with at least:

The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.

The query result returned by useQuery contains all of the information about the query that you'll need for templating and any other usage of the data:

The result object contains a few very important states you'll need to be aware of to be productive. A query can only be in one of the following states at any given moment:

Beyond those primary states, more information is available depending on the state of the query:

For most queries, it's usually sufficient to check for the isPending state, then the isError state, then finally, assume that the data is available and render the successful state:

If booleans aren't your thing, you can always use the status state as well:

TypeScript will also narrow the type of data correctly if you've checked for pending and error before accessing it.

In addition to the status field, you will also get an additional fetchStatus property with the following options:

Background refetches and stale-while-revalidate logic make all combinations for status and fetchStatus possible. For example:

So keep in mind that a query can be in pending state without actually fetching data. As a rule of thumb:

For an alternative way of performing status checks, have a look at the Community Resources.

**Examples:**

Example 1 (python):
```python
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

Example 2 (python):
```python
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

Example 3 (python):
```python
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

Example 4 (python):
```python
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

---

## Disabling/Pausing Queries

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries

**Contents:**
- Lazy Queries
  - isLoading (Previously: isInitialLoading)
- Typesafe disabling of queries using skipToken

If you ever want to disable a query from automatically running, you can use the enabled = false option. The enabled option also accepts a callback that returns a boolean.

When enabled is false:

TypeScript users may prefer to use skipToken as an alternative to enabled = false.

Permanently disabling a query opts out of many great features that TanStack Query has to offer (like background refetches), and it's also not the idiomatic way. It takes you from the declarative approach (defining dependencies when your query should run) into an imperative mode (fetch whenever I click here). It is also not possible to pass parameters to refetch. Oftentimes, all you want is a lazy query that defers the initial fetch:

The enabled option can not only be used to permanently disable a query, but also to enable / disable it at a later time. A good example would be a filter form where you only want to fire off the first request once the user has entered a filter value:

Lazy queries will be in status: 'pending' right from the start because pending means that there is no data yet. This is technically true, however, since we are not currently fetching any data (as the query is not enabled), it also means you likely cannot use this flag to show a loading spinner.

If you are using disabled or lazy queries, you can use the isLoading flag instead. It's a derived flag that is computed from:

isPending && isFetching

so it will only be true if the query is currently fetching for the first time.

If you are using TypeScript, you can use the skipToken to disable a query. This is useful when you want to disable a query based on a condition, but you still want to keep the query to be type safe.

IMPORTANT: refetch from useQuery will not work with skipToken. Other than that, skipToken works the same as enabled: false.

**Examples:**

Example 1 (javascript):
```javascript
function Todos() {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
    enabled: false,
  })

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? 
...
```

Example 2 (javascript):
```javascript
function Todos() {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
    enabled: false,
  })

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? 
...
```

Example 3 (javascript):
```javascript
function Todos() {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
    enabled: false,
  })

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? 
...
```

Example 4 (javascript):
```javascript
function Todos() {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
    enabled: false,
  })

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? 
...
```

---

## Caching Examples

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/caching

**Contents:**
- Basic Example

Please thoroughly read the Important Defaults before reading this guide

This caching example illustrates the story and lifecycle of:

Let's assume we are using the default gcTime of 5 minutes and the default staleTime of 0.

---

## Important Defaults

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults

**Contents:**
- Further Reading

Out of the box, TanStack Query is configured with aggressive but sane defaults. Sometimes these defaults can catch new users off guard or make learning/debugging difficult if they are unknown by the user. Keep them in mind as you continue to learn and use TanStack Query:

To change this behavior, you can configure your queries both globally and per-query using the staleTime option. Specifying a longer staleTime means queries will not refetch their data as often

A Query that has a staleTime set is considered fresh until that staleTime has elapsed.

Stale queries are refetched automatically in the background when:

Setting staleTime is the recommended way to avoid excessive refetches, but you can also customize the points in time for refetches by setting options like refetchOnMount, refetchOnWindowFocus and refetchOnReconnect.

Queries can optionally be configured with a refetchInterval to trigger refetches periodically, which is independent of the staleTime setting.

Query results that have no more active instances of useQuery, useInfiniteQuery or query observers are labeled as "inactive" and remain in the cache in case they are used again at a later time.

By default, "inactive" queries are garbage collected after 5 minutes.

To change this, you can alter the default gcTime for queries to something other than 1000 * 60 * 5 milliseconds.

Queries that fail are silently retried 3 times, with exponential backoff delay before capturing and displaying an error to the UI.

To change this, you can alter the default retry and retryDelay options for queries to something other than 3 and the default exponential backoff function.

Query results by default are structurally shared to detect if data has actually changed and if not, the data reference remains unchanged to better help with value stabilization with regards to useMemo and useCallback. If this concept sounds foreign, then don't worry about it! 99.9% of the time you will not need to disable this and it makes your app more performant at zero cost to you.

Structural sharing only works with JSON-compatible values, any other value types will always be considered as changed. If you are seeing performance issues because of large responses for example, you can disable this feature with the config.structuralSharing flag. If you are dealing with non-JSON compatible values in your query responses and still want to detect if data has changed or not, you can provide your own custom function as config.structuralSharing 

*[Content truncated]*

---

## Scroll Restoration

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/scroll-restoration

Traditionally, when you navigate to a previously visited page on a web browser, you would find that the page would be scrolled to the exact position where you were before you navigated away from that page. This is called scroll restoration and has been in a bit of a regression since web applications have started moving towards client side data fetching. With TanStack Query however, that's no longer the case.

Out of the box, "scroll restoration" for all queries (including paginated and infinite queries) Just Works™️ in TanStack Query. The reason for this is that query results are cached and able to be retrieved synchronously when a query is rendered. As long as your queries are being cached long enough (the default time is 5 minutes) and have not been garbage collected, scroll restoration will work out of the box all the time.

---

## Updates from Mutation Responses

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/updates-from-mutation-responses

**Contents:**
- Immutability

When dealing with mutations that update objects on the server, it's common for the new object to be automatically returned in the response of the mutation. Instead of refetching any queries for that item and wasting a network call for data we already have, we can take advantage of the object returned by the mutation function and update the existing query with the new data immediately using the Query Client's setQueryData method:

You might want to tie the onSuccess logic into a reusable mutation, for that you can create a custom hook like this:

Updates via setQueryData must be performed in an immutable way. DO NOT attempt to write directly to the cache by mutating data (that you retrieved from the cache) in place. It might work at first but can lead to subtle bugs along the way.

**Examples:**

Example 1 (javascript):
```javascript
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: (data) => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  },
})

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
})

// The query below will be updated with the response from the
// successful mutation
const { status, data, error } = useQuery({
  queryKey: ['todo', { id: 5 }],
  queryFn: fetchTodoById,
})
```

Example 2 (javascript):
```javascript
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: (data) => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  },
})

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
})

// The query below will be updated with the response from the
// successful mutation
const { status, data, error } = useQuery({
  queryKey: ['todo', { id: 5 }],
  queryFn: fetchTodoById,
})
```

Example 3 (javascript):
```javascript
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: (data) => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  },
})

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
})

// The query below will be updated with the response from the
// successful mutation
const { status, data, error } = useQuery({
  queryKey: ['todo', { id: 5 }],
  queryFn: fetchTodoById,
})
```

Example 4 (javascript):
```javascript
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: (data) => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  },
})

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
})

// The query below will be updated with the response from the
// successful mutation
const { status, data, error } = useQuery({
  queryKey: ['todo', { id: 5 }],
  queryFn: fetchTodoById,
})
```

---

## Does TanStack Query replace Redux, MobX or other global state managers?

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/does-this-replace-client-state

**Contents:**
- A Contrived Example

Well, let's start with a few important items:

With those points in mind, the short answer is that TanStack Query replaces the boilerplate code and related wiring used to manage cache data in your client-state and replaces it with just a few lines of code.

For a vast majority of applications, the truly globally accessible client state that is left over after migrating all of your async code to TanStack Query is usually very tiny.

There are still some circumstances where an application might indeed have a massive amount of synchronous client-only state (like a visual designer or music production application), in which case, you will probably still want a client state manager. In this situation it's important to note that TanStack Query is not a replacement for local/client state management. However, you can use TanStack Query alongside most client state managers with zero issues.

Here we have some "global" state being managed by a global state library:

Currently, the global state manager is caching 4 types of server-state: projects, teams, tasks, and users. If we were to move these server-state assets to TanStack Query, our remaining global state would look more like this:

This also means that with a few hook calls to useQuery and useMutation, we also get to remove any boilerplate code that was used to manage our server state e.g.

With all of those things removed, you may ask yourself, "Is it worth it to keep using our client state manager for this tiny global state?"

And that's up to you!

But TanStack Query's role is clear. It removes asynchronous wiring and boilerplate from your application and replaces it with just a few lines of code.

What are you waiting for, give it a go already!

**Examples:**

Example 1 (javascript):
```javascript
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
}
```

Example 2 (javascript):
```javascript
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
}
```

Example 3 (javascript):
```javascript
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
}
```

Example 4 (javascript):
```javascript
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
}
```

---

## Advanced Server Rendering

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

**Contents:**
- Server Components & Next.js app router
  - A quick note on terminology
  - Initial setup
  - Prefetching and de/hydrating data
  - Nesting Server Components
  - Alternative: Use a single queryClient for prefetching
  - Data ownership and revalidation
- Streaming with Server Components
- Experimental streaming without prefetching in Next.js
- Final words

Welcome to the Advanced Server Rendering guide, where you will learn all about using React Query with streaming, Server Components and the Next.js app router.

You might want to read the Server Rendering & Hydration guide before this one as it teaches the basics for using React Query with SSR, and Performance & Request Waterfalls as well as Prefetching & Router Integration also contains valuable background.

Before we start, let's note that while the initialData approach outlined in the SSR guide also works with Server Components, we'll focus this guide on the hydration APIs.

We won't cover Server Components in depth here, but the short version is that they are components that are guaranteed to only run on the server, both for the initial page view and also on page transitions. This is similar to how Next.js getServerSideProps/getStaticProps and Remix loader works, as these also always run on the server but while those can only return data, Server Components can do a lot more. The data part is central to React Query however, so let's focus on that.

How do we take what we learned in the Server Rendering guide about passing data prefetched in framework loaders to the app and apply that to Server Components and the Next.js app router? The best way to start thinking about this is to consider Server Components as "just" another framework loader.

So far in these guides, we've been talking about the server and the client. It's important to note that confusingly enough this does not match 1-1 with Server Components and Client Components. Server Components are guaranteed to only run on the server, but Client Components can actually run in both places. The reason for this is that they can also render during the initial server rendering pass.

One way to think of this is that even though Server Components also render, they happen during a "loader phase" (always happens on the server), while Client Components run during the "application phase". That application can run both on the server during SSR, and in for example a browser. Where exactly that application runs and if it runs during SSR or not might differ between frameworks.

The first step of any React Query setup is always to create a queryClient and wrap your application in a QueryClientProvider. With Server Components, this looks mostly the same across frameworks, one difference being the filename conventions:

This part is pretty similar to what we did in the SSR guide, we just need to split things up into

*[Content truncated]*

**Examples:**

Example 1 (python):
```python
// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = und
...
```

Example 2 (python):
```python
// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = und
...
```

Example 3 (python):
```python
// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = und
...
```

Example 4 (python):
```python
// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = und
...
```

---

## Default Query Function

**URL:** https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function

If you find yourself wishing for whatever reason that you could just share the same query function for your entire app and just use query keys to identify what it should fetch, you can do that by providing a default query function to TanStack Query:

If you ever want to override the default queryFn, you can just provide your own like you normally would.

**Examples:**

Example 1 (javascript):
```javascript
// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}

// All you have to do now is pass a key!
function Po
...
```

Example 2 (javascript):
```javascript
// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}

// All you have to do now is pass a key!
function Po
...
```

Example 3 (javascript):
```javascript
// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}

// All you have to do now is pass a key!
function Po
...
```

Example 4 (javascript):
```javascript
// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}

// All you have to do now is pass a key!
function Po
...
```

---
