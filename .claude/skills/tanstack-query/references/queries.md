# Tanstack-Query - Queries

**Pages:** 33

---

## hydration

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/hydration

**Contents:**
- dehydrate
  - Limitations
- hydrate
  - Limitations
- HydrationBoundary

dehydrate creates a frozen representation of a cache that can later be hydrated with HydrationBoundary or hydrate. This is useful for passing prefetched queries from server to client or persisting queries to localStorage or other persistent locations. It only includes currently successful queries by default.

Some storage systems (such as browser Web Storage API) require values to be JSON serializable. If you need to dehydrate values that are not automatically serializable to JSON (like Error or undefined), you have to serialize them for yourself. Since only successful queries are included per default, to also include Errors, you have to provide shouldDehydrateQuery, e.g.:

hydrate adds a previously dehydrated state into a cache.

If the queries you're trying to hydrate already exist in the queryCache, hydrate will only overwrite them if the data is newer than the data present in the cache. Otherwise, it will not get applied.

HydrationBoundary adds a previously dehydrated state into the queryClient that would be returned by useQueryClient(). If the client already contains data, the new queries will be intelligently merged based on update timestamp.

Note: Only queries can be dehydrated with an HydrationBoundary.

**Examples:**

Example 1 (python):
```python
import { dehydrate } from '@tanstack/react-query'

const dehydratedState = dehydrate(queryClient, {
  shouldDehydrateQuery,
  shouldDehydrateMutation,
})
```

Example 2 (python):
```python
import { dehydrate } from '@tanstack/react-query'

const dehydratedState = dehydrate(queryClient, {
  shouldDehydrateQuery,
  shouldDehydrateMutation,
})
```

Example 3 (python):
```python
import { dehydrate } from '@tanstack/react-query'

const dehydratedState = dehydrate(queryClient, {
  shouldDehydrateQuery,
  shouldDehydrateMutation,
})
```

Example 4 (python):
```python
import { dehydrate } from '@tanstack/react-query'

const dehydratedState = dehydrate(queryClient, {
  shouldDehydrateQuery,
  shouldDehydrateMutation,
})
```

---

## Comparison | React Query vs SWR vs Apollo vs RTK Query vs React Router

**URL:** https://tanstack.com/query/latest/docs/framework/react/comparison

**Contents:**
  - Notes

This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) using the "Edit this page on Github" link at the bottom of this page.

Feature/Capability Key:

1 Lagged Query Data - React Query provides a way to continue to see an existing query's data while the next query loads (similar to the same UX that suspense will soon provide natively). This is extremely important when writing pagination UIs or infinite loading UIs where you do not want to show a hard loading state whenever a new query is requested. Other libraries do not have this capability and render a hard loading state for the new query (unless it has been prefetched), while the new query loads.

2 Render Optimization - React Query has excellent rendering performance. By default, it will automatically track which fields are accessed and only re-render if one of them changes. If you would like to opt-out of this optimization, setting notifyOnChangeProps to 'all' will re-render your components whenever the query is updated. For example because it has new data, or to indicate it is fetching. React Query also batches updates together to make sure your application only re-renders once when multiple components are using the same query. If you are only interested in the data or error properties, you can reduce the number of renders even more by setting notifyOnChangeProps to ['data', 'error'].

3 Partial query matching - Because React Query uses deterministic query key serialization, this allows you to manipulate variable groups of queries without having to know each individual query-key that you want to match, eg. you can refetch every query that starts with todos in its key, regardless of variables, or you can target specific queries with (or without) variables or nested properties, and even use a filter function to only match queries that pass your specific conditions.

4 Pre-usage Query Configuration - This is simply a fancy name for being able to configure how queries and mutations will behave before they are used. For instance, a query can be fully configured with defaults beforehand and when the time comes to use it, only useQuery({ queryKey }) is necessary, instead of being required to pass the fetcher and/or options with every usage. SWR does have a partial form of this feature by allowing you to pre-configure a default fetcher, but only a

*[Content truncated]*

---

## QueryClientProvider

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider

Use the QueryClientProvider component to connect and provide a QueryClient to your application:

**Examples:**

Example 1 (python):
```python
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

Example 2 (python):
```python
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

Example 3 (python):
```python
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

Example 4 (python):
```python
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

---

## useQueryClient

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient

The useQueryClient hook returns the current QueryClient instance.

**Examples:**

Example 1 (python):
```python
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
```

Example 2 (python):
```python
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
```

Example 3 (python):
```python
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
```

Example 4 (python):
```python
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
```

---

## useIsFetching

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useIsFetching

useIsFetching is an optional hook that returns the number of the queries that your application is loading or fetching in the background (useful for app-wide loading indicators).

**Examples:**

Example 1 (python):
```python
import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

Example 2 (python):
```python
import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

Example 3 (python):
```python
import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

Example 4 (python):
```python
import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

---

## useMutationState

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useMutationState

useMutationState is a hook that gives you access to all mutations in the MutationCache. You can pass filters to it to narrow down your mutations, and select to transform the mutation state.

Example 1: Get all variables of all running mutations

Example 2: Get all data for specific mutations via the mutationKey

Example 3: Access the latest mutation data via the mutationKey. Each invocation of mutate adds a new entry to the mutation cache for gcTime milliseconds.

To access the latest invocation, you can check for the last item that useMutationState returns.

**Examples:**

Example 1 (python):
```python
import { useMutationState } from '@tanstack/react-query'

const variables = useMutationState({
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

Example 2 (python):
```python
import { useMutationState } from '@tanstack/react-query'

const variables = useMutationState({
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

Example 3 (python):
```python
import { useMutationState } from '@tanstack/react-query'

const variables = useMutationState({
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

Example 4 (python):
```python
import { useMutationState } from '@tanstack/react-query'

const variables = useMutationState({
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

---

## Videos & Talks

**URL:** https://tanstack.com/query/latest/docs/framework/react/videos

Click here to view the Repository used for the above presentation

---

## useSuspenseInfiniteQuery

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseInfiniteQuery

The same as for useInfiniteQuery, except for:

Same object as useInfiniteQuery, except that:

Cancellation does not work.

**Examples:**

Example 1 (javascript):
```javascript
const result = useSuspenseInfiniteQuery(options)
```

Example 2 (javascript):
```javascript
const result = useSuspenseInfiniteQuery(options)
```

Example 3 (javascript):
```javascript
const result = useSuspenseInfiniteQuery(options)
```

Example 4 (javascript):
```javascript
const result = useSuspenseInfiniteQuery(options)
```

---

## Devtools

**URL:** https://tanstack.com/query/latest/docs/framework/react/devtools

**Contents:**
- Install and Import the Devtools
- Floating Mode
  - Options
- Embedded Mode
  - Options
- Devtools in production
  - Modern bundlers

Wave your hands in the air and shout hooray because React Query comes with dedicated devtools! 🥳

When you begin your React Query journey, you'll want these devtools by your side. They help visualize all the inner workings of React Query and will likely save you hours of debugging if you find yourself in a pinch!

For Chrome, Firefox, and Edge users: Third-party browser extensions are available for debugging TanStack Query directly in browser DevTools. These provide the same functionality as the framework-specific devtools packages:

For React Native users: A third-party native macOS app is available for debugging React Query in ANY js-based application. Monitor queries across devices in real-time. Check it out here: rn-better-dev-tools

Note that since version 5, the dev tools support observing mutations as well.

The devtools are a separate package that you need to install:

For Next 13+ App Dir you must install it as a dev dependency for it to work.

You can import the devtools like this:

By default, React Query Devtools are only included in bundles when process.env.NODE_ENV === 'development', so you don't need to worry about excluding them during a production build.

Floating Mode will mount the devtools as a fixed, floating element in your app and provide a toggle in the corner of the screen to show and hide the devtools. This toggle state will be stored and remembered in localStorage across reloads.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

Embedded mode will show the development tools as a fixed element in your application, so you can use our panel in your own development tools.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

Devtools are excluded in production builds. However, it might be desirable to lazy load the devtools in production:

With this, calling window.toggleDevtools() will download the devtools bundle and show them.

If your bundler supports package exports, you can use the following import path:

For TypeScript, you would need to set moduleResolution: 'nodenext' in your tsconfig, which requires at least TypeScript v4.7.

**Examples:**

Example 1 (unknown):
```unknown
npm i @tanstack/react-query-devtools
```

Example 2 (unknown):
```unknown
npm i @tanstack/react-query-devtools
```

Example 3 (unknown):
```unknown
npm i @tanstack/react-query-devtools
```

Example 4 (unknown):
```unknown
npm i @tanstack/react-query-devtools
```

---

## useQueryErrorResetBoundary

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useQueryErrorResetBoundary

This hook will reset any query errors within the closest QueryErrorResetBoundary. If there is no boundary defined it will reset them globally:

**Examples:**

Example 1 (python):
```python
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

Example 2 (python):
```python
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

Example 3 (python):
```python
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

Example 4 (python):
```python
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

---

## queryOptions

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions

**Contents:**
- Further reading

You can generally pass everything to queryOptions that you can also pass to useQuery. Some options will have no effect when then forwarded to a function like queryClient.prefetchQuery, but TypeScript will still be fine with those excess properties.

To learn more about QueryOptions, have a look at The Query Options API from the Community Resources.

**Examples:**

Example 1 (unknown):
```unknown
queryOptions({
  queryKey,
  ...options,
})
```

Example 2 (unknown):
```unknown
queryOptions({
  queryKey,
  ...options,
})
```

Example 3 (unknown):
```unknown
queryOptions({
  queryKey,
  ...options,
})
```

Example 4 (unknown):
```unknown
queryOptions({
  queryKey,
  ...options,
})
```

---

## useMutation

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

Parameter2 (QueryClient)

**Examples:**

Example 1 (javascript):
```javascript
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

Example 2 (javascript):
```javascript
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

Example 3 (javascript):
```javascript
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

Example 4 (javascript):
```javascript
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

---

## persistQueryClient

**URL:** https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient

**Contents:**
- Build Persisters
- How It Works
  - Cache Busting
  - Removal
- API
  - persistQueryClientSave
  - persistQueryClientSubscribe
  - persistQueryClientRestore
  - persistQueryClient
  - Options

This is set of utilities for interacting with "persisters" which save your queryClient for later use. Different persisters can be used to store your client and cache to many different storage layers.

IMPORTANT - for persist to work properly, you probably want to pass QueryClient a gcTime value to override the default during hydration (as shown above).

If it is not set when creating the QueryClient instance, it will default to 300000 (5 minutes) for hydration, and the stored cache will be discarded after 5 minutes of inactivity. This is the default garbage collection behavior.

It should be set as the same value or higher than persistQueryClient's maxAge option. E.g. if maxAge is 24 hours (the default) then gcTime should be 24 hours or higher. If lower than maxAge, garbage collection will kick in and discard the stored cache earlier than expected.

You can also pass it Infinity to disable garbage collection behavior entirely.

Due to a JavaScript limitation, the maximum allowed gcTime is about 24 days, although it is possible to work around this limit using timeoutManager.setTimeoutProvider.

Sometimes you may make changes to your application or data that immediately invalidate any and all cached data. If and when this happens, you can pass a buster string option. If the cache that is found does not also have that buster string, it will be discarded. The following several functions accept this option:

If data is found to be any of the following:

the persister removeClient() is called and the cache is immediately discarded.

You can use this to explicitly persist the cache at the moment(s) you choose.

Runs persistQueryClientSave whenever the cache changes for your queryClient. For example: you might initiate the subscribe when a user logs-in and checks "Remember me".

You can use this to restore the cache at moment(s) you choose.

Takes the following actions:

This functionality is preserved from version 3.x.

All options available are as follows:

There are actually three interfaces available:

persistQueryClient will try to restore the cache and automatically subscribes to further changes, thus syncing your client to the provided storage.

However, restoring is asynchronous, because all persisters are async by nature, which means that if you render your App while you are restoring, you might get into race conditions if a query mounts and fetches at the same time.

Further, if you subscribe to changes outside of the React component lifecycle, you have 

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})
```

Example 2 (javascript):
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})
```

Example 3 (javascript):
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})
```

Example 4 (javascript):
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})
```

---

## usePrefetchQuery

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/usePrefetchQuery

You can pass everything to usePrefetchQuery that you can pass to queryClient.prefetchQuery. Remember that some of them are required as below:

queryFn: (context: QueryFunctionContext) => Promise<TData>

The usePrefetchQuery does not return anything, it should be used just to fire a prefetch during render, before a suspense boundary that wraps a component that uses useSuspenseQuery.

**Examples:**

Example 1 (unknown):
```unknown
usePrefetchQuery(options)
```

Example 2 (unknown):
```unknown
usePrefetchQuery(options)
```

Example 3 (unknown):
```unknown
usePrefetchQuery(options)
```

Example 4 (unknown):
```unknown
usePrefetchQuery(options)
```

---

## usePrefetchInfiniteQuery

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/usePrefetchInfiniteQuery

You can pass everything to usePrefetchInfiniteQuery that you can pass to queryClient.prefetchInfiniteQuery. Remember that some of them are required as below:

queryFn: (context: QueryFunctionContext) => Promise<TData>

initialPageParam: TPageParam

getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null

The usePrefetchInfiniteQuery does not return anything, it should be used just to fire a prefetch during render, before a suspense boundary that wraps a component that uses useSuspenseInfiniteQuery

**Examples:**

Example 1 (unknown):
```unknown
usePrefetchInfiniteQuery(options)
```

Example 2 (unknown):
```unknown
usePrefetchInfiniteQuery(options)
```

Example 3 (unknown):
```unknown
usePrefetchInfiniteQuery(options)
```

Example 4 (unknown):
```unknown
usePrefetchInfiniteQuery(options)
```

---

## broadcastQueryClient (Experimental)

**URL:** https://tanstack.com/query/latest/docs/framework/react/plugins/broadcastQueryClient

**Contents:**
- Installation
- Usage
- API
  - broadcastQueryClient
  - Options

VERY IMPORTANT: This utility is currently in an experimental stage. This means that breaking changes will happen in minor AND patch releases. Use at your own risk. If you choose to rely on this in production in an experimental stage, please lock your version to a patch-level version to avoid unexpected breakages.

broadcastQueryClient is a utility for broadcasting and syncing the state of your queryClient between browser tabs/windows with the same origin.

This utility comes as a separate package and is available under the '@tanstack/query-broadcast-client-experimental' import.

Import the broadcastQueryClient function, and pass it your QueryClient instance, and optionally, set a broadcastChannel.

Pass this function a QueryClient instance and optionally, a broadcastChannel.

An object of options:

The default options are:

**Examples:**

Example 1 (python):
```python
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

const queryClient = new QueryClient()

broadcastQueryClient({
  queryClient,
  broadcastChannel: 'my-app',
})
```

Example 2 (python):
```python
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

const queryClient = new QueryClient()

broadcastQueryClient({
  queryClient,
  broadcastChannel: 'my-app',
})
```

Example 3 (python):
```python
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

const queryClient = new QueryClient()

broadcastQueryClient({
  queryClient,
  broadcastChannel: 'my-app',
})
```

Example 4 (python):
```python
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

const queryClient = new QueryClient()

broadcastQueryClient({
  queryClient,
  broadcastChannel: 'my-app',
})
```

---

## useQuery

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

Parameter2 (QueryClient)

**Examples:**

Example 1 (javascript):
```javascript
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  isEnabled,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    
...
```

Example 2 (javascript):
```javascript
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  isEnabled,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    
...
```

Example 3 (javascript):
```javascript
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  isEnabled,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    
...
```

Example 4 (javascript):
```javascript
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  isEnabled,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    
...
```

---

## createSyncStoragePersister

**URL:** https://tanstack.com/query/latest/docs/framework/react/plugins/createSyncStoragePersister

**Contents:**
- Deprecated
- Installation
- Usage
- Retries
  - Predefined strategies
- API
  - createSyncStoragePersister
  - Options
    - serialize and deserialize options

This plugin is deprecated and will be removed in the next major version. You can simply use '@tanstack/query-async-storage-persister' instead.

This utility comes as a separate package and is available under the '@tanstack/query-sync-storage-persister' import.

Persistence can fail, e.g. if the size exceeds the available space on the storage. Errors can be handled gracefully by providing a retry function to the persister.

The retry function receives the persistedClient it tried to save, as well as the error and the errorCount as input. It is expected to return a new PersistedClient, with which it tries to persist again. If undefined is returned, there will be no further attempt to persist.

Per default, no retry will occur. You can use one of the predefined strategies to handle retries. They can be imported from '@tanstack/react-query-persist-client':

Call this function to create a syncStoragePersister that you can use later with persistQueryClient.

The default options are:

There is a limit to the amount of data which can be stored in localStorage. If you need to store more data in localStorage, you can override the serialize and deserialize functions to compress and decompress the data using a library like lz-string.

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

Example 2 (unknown):
```unknown
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

Example 3 (unknown):
```unknown
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

Example 4 (unknown):
```unknown
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

---

## GraphQL

**URL:** https://tanstack.com/query/latest/docs/framework/react/graphql

**Contents:**
- Type-Safety and Code Generation

Because React Query's fetching mechanisms are agnostically built on Promises, you can use React Query with literally any asynchronous data fetching client, including GraphQL!

Keep in mind that React Query does not support normalized caching. While a vast majority of users do not actually need a normalized cache or even benefit from it as much as they believe they do, there may be very rare circumstances that may warrant it so be sure to check with us first to make sure it's truly something you need!

React Query, used in combination with graphql-request^5 and GraphQL Code Generator provides full-typed GraphQL operations:

You can find a complete example in the repo

Get started with the dedicated guide on GraphQL Code Generator documentation.

**Examples:**

Example 1 (python):
```python
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)

function App() {
  // `data` is fully typed!
  const { data } = useQuery({
    queryKey: ['films'],
    queryFn: async () =>
      request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariabl
...
```

Example 2 (python):
```python
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)

function App() {
  // `data` is fully typed!
  const { data } = useQuery({
    queryKey: ['films'],
    queryFn: async () =>
      request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariabl
...
```

Example 3 (python):
```python
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)

function App() {
  // `data` is fully typed!
  const { data } = useQuery({
    queryKey: ['films'],
    queryFn: async () =>
      request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariabl
...
```

Example 4 (python):
```python
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)

function App() {
  // `data` is fully typed!
  const { data } = useQuery({
    queryKey: ['films'],
    queryFn: async () =>
      request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariabl
...
```

---

## QueryErrorResetBoundary

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/QueryErrorResetBoundary

When using suspense or throwOnError in your queries, you need a way to let queries know that you want to try again when re-rendering after some error occurred. With the QueryErrorResetBoundary component you can reset any query errors within the boundaries of the component.

**Examples:**

Example 1 (python):
```python
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <Page />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
```

Example 2 (python):
```python
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <Page />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
```

Example 3 (python):
```python
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <Page />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
```

Example 4 (python):
```python
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <Page />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
```

---

## useQueries

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useQueries

**Contents:**
- Combine
  - Memoization

The useQueries hook can be used to fetch a variable number of queries:

The useQueries hook accepts an options object with a queries key whose value is an array with query option objects identical to the useQuery hook (excluding the queryClient option - because the QueryClient can be passed in on the top level).

Having the same query key more than once in the array of query objects may cause some data to be shared between queries. To avoid this, consider de-duplicating the queries and map the results back to the desired structure.

The placeholderData option exists for useQueries as well, but it doesn't get information passed from previously rendered Queries like useQuery does, because the input to useQueries can be a different number of Queries on each render.

The useQueries hook returns an array with all the query results. The order returned is the same as the input order.

If you want to combine data (or other Query information) from the results into a single value, you can use the combine option. The result will be structurally shared to be as referentially stable as possible.

In the above example, combinedQueries will be an object with a data and a pending property. Note that all other properties of the Query results will be lost.

The combine function will only re-run if:

This means that an inlined combine function, as shown above, will run on every render. To avoid this, you can wrap the combine function in useCallback, or extract it to a stable function reference if it doesn't have any dependencies.

**Examples:**

Example 1 (javascript):
```javascript
const ids = [1, 2, 3]
const results = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
})
```

Example 2 (javascript):
```javascript
const ids = [1, 2, 3]
const results = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
})
```

Example 3 (javascript):
```javascript
const ids = [1, 2, 3]
const results = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
})
```

Example 4 (javascript):
```javascript
const ids = [1, 2, 3]
const results = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
})
```

---

## useSuspenseQuery

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery

The same as for useQuery, except for:

Same object as useQuery, except that:

Cancellation does not work.

**Examples:**

Example 1 (javascript):
```javascript
const result = useSuspenseQuery(options)
```

Example 2 (javascript):
```javascript
const result = useSuspenseQuery(options)
```

Example 3 (javascript):
```javascript
const result = useSuspenseQuery(options)
```

Example 4 (javascript):
```javascript
const result = useSuspenseQuery(options)
```

---

## TypeScript

**URL:** https://tanstack.com/query/latest/docs/framework/react/typescript

**Contents:**
- Type Inference
- Type Narrowing
- Typing the error field
  - Registering a global Error
- Typing meta
  - Registering global Meta
- Typing query and mutation keys
  - Registering the query and mutation key types
- Typing Query Options
- Typing Mutation Options

React Query is now written in TypeScript to make sure the library and your projects are type-safe!

Things to keep in mind:

Types in React Query generally flow through very well so that you don't have to provide type annotations for yourself

typescript playground

typescript playground

This works best if your queryFn has a well-defined returned type. Keep in mind that most data fetching libraries return any per default, so make sure to extract it to a properly typed function:

typescript playground

React Query uses a discriminated union type for the query result, discriminated by the status field and the derived status boolean flags. This will allow you to check for e.g. success status to make data defined:

typescript playground

The type for error defaults to Error, because that is what most users expect.

typescript playground

If you want to throw a custom error, or something that isn't an Error at all, you can specify the type of the error field:

However, this has the drawback that type inference for all other generics of useQuery will not work anymore. It is generally not considered a good practice to throw something that isn't an Error, so if you have a subclass like AxiosError you can use type narrowing to make the error field more specific:

typescript playground

TanStack Query v5 allows for a way to set a global Error type for everything, without having to specify generics on call-sides, by amending the Register interface. This will make sure inference still works, but the error field will be of the specified type. If you want to enforce that call-sides must do explicit type-narrowing, set defaultError to unknown:

Similarly to registering a global error type you can also register a global Meta type. This ensures the optional meta field on queries and mutations stays consistent and is type-safe. Note that the registered type must extend Record<string, unknown> so that meta remains an object.

Also similarly to registering a global error type, you can also register a global QueryKey and MutationKey type. This allows you to provide more structure to your keys, that matches your application's hierarchy, and have them be typed across all of the library's surface area. Note that the registered type must extend the Array type, so that your keys remain an array.

If you inline query options into useQuery, you'll get automatic type inference. However, you might want to extract the query options into a separate function to share them between useQuer

*[Content truncated]*

**Examples:**

Example 1 (javascript):
```javascript
const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

Example 2 (javascript):
```javascript
const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

Example 3 (javascript):
```javascript
const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

Example 4 (javascript):
```javascript
const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

---

## mutationOptions

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/mutationOptions

You can generally pass everything to mutationOptions that you can also pass to useMutation.

**Examples:**

Example 1 (unknown):
```unknown
mutationOptions({
  mutationFn,
  ...options,
})
```

Example 2 (unknown):
```unknown
mutationOptions({
  mutationFn,
  ...options,
})
```

Example 3 (unknown):
```unknown
mutationOptions({
  mutationFn,
  ...options,
})
```

Example 4 (unknown):
```unknown
mutationOptions({
  mutationFn,
  ...options,
})
```

---

## experimental_createQueryPersister

**URL:** https://tanstack.com/query/latest/docs/framework/react/plugins/createPersister

**Contents:**
- Installation
- Usage
  - Adapted defaults
- Additional utilities
  - persistQueryByKey(queryKey: QueryKey, queryClient: QueryClient): Promise<void>
  - retrieveQuery<T>(queryHash: string): Promise<T | undefined>
  - persisterGc(): Promise<void>
  - restoreQueries(queryClient: QueryClient, filters): Promise<void>
- API
  - experimental_createQueryPersister

This utility comes as a separate package and is available under the '@tanstack/query-persist-client-core' import.

Note: This util is also included in the @tanstack/react-query-persist-client package, so you do not need to install it separately if you are using that package.

This way, you do not need to store whole QueryClient, but choose what is worth to be persisted in your application. Each query is lazily restored (when the Query is first used) and persisted (after each run of the queryFn), so it does not need to be throttled. staleTime is also respected after restoring the Query, so if data is considered stale, it will be refetched immediately after restoring. If data is fresh, the queryFn will not run.

Garbage collecting a Query from memory does not affect the persisted data. That means Queries can be kept in memory for a shorter period of time to be more memory efficient. If they are used the next time, they will just be restored from the persistent storage again.

The createPersister plugin technically wraps the queryFn, so it doesn't restore if the queryFn doesn't run. In that way, it acts as a caching layer between the Query and the network. Thus, the networkMode defaults to 'offlineFirst' when a persister is used, so that restoring from the persistent storage can also happen even if there is no network connection.

Invoking experimental_createQueryPersister returns additional utilities in addition to persisterFn for easier implementation of userland functionalities.

This function will persist Query to storage and key defined when creating persister.This utility might be used along setQueryData to persist optimistic update to storage without waiting for invalidation.

This function would attempt to retrieve persisted query by queryHash.If query is expired, busted or malformed it would be removed from the storage instead, and undefined would be returned.

This function can be used to sporadically clean up stoage from expired, busted or malformed entries.

For this function to work, your storage must expose entries method that would return a key-value tuple array.For example Object.entries(localStorage) for localStorage or entries from idb-keyval.

This function can be used to restore queries that are currently stored by persister.For example when your app is starting up in offline mode, or you want all or only specific data from previous session to be immediately available without intermediate loading state.

The filter object supports the foll

*[Content truncated]*

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/query-persist-client-core
```

Example 2 (unknown):
```unknown
npm install @tanstack/query-persist-client-core
```

Example 3 (unknown):
```unknown
npm install @tanstack/query-persist-client-core
```

Example 4 (unknown):
```unknown
npm install @tanstack/query-persist-client-core
```

---

## useInfiniteQuery

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery

The options for useInfiniteQuery are identical to the useQuery hook with the addition of the following:

The returned properties for useInfiniteQuery are identical to the useQuery hook, with the addition of the following properties and a small difference in isRefetching and isRefetchError:

Keep in mind that imperative fetch calls, such as fetchNextPage, may interfere with the default refetch behaviour, resulting in outdated data. Make sure to call these functions only in response to user actions, or add conditions like hasNextPage && !isFetching.

**Examples:**

Example 1 (javascript):
```javascript
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

Example 2 (javascript):
```javascript
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

Example 3 (javascript):
```javascript
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

Example 4 (javascript):
```javascript
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

---

## useIsMutating

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useIsMutating

useIsMutating is an optional hook that returns the number of mutations that your application is fetching (useful for app-wide loading indicators).

**Examples:**

Example 1 (python):
```python
import { useIsMutating } from '@tanstack/react-query'
// How many mutations are fetching?
const isMutating = useIsMutating()
// How many mutations matching the posts prefix are fetching?
const isMutatingPosts = useIsMutating({ mutationKey: ['posts'] })
```

Example 2 (python):
```python
import { useIsMutating } from '@tanstack/react-query'
// How many mutations are fetching?
const isMutating = useIsMutating()
// How many mutations matching the posts prefix are fetching?
const isMutatingPosts = useIsMutating({ mutationKey: ['posts'] })
```

Example 3 (python):
```python
import { useIsMutating } from '@tanstack/react-query'
// How many mutations are fetching?
const isMutating = useIsMutating()
// How many mutations matching the posts prefix are fetching?
const isMutatingPosts = useIsMutating({ mutationKey: ['posts'] })
```

Example 4 (python):
```python
import { useIsMutating } from '@tanstack/react-query'
// How many mutations are fetching?
const isMutating = useIsMutating()
// How many mutations matching the posts prefix are fetching?
const isMutatingPosts = useIsMutating({ mutationKey: ['posts'] })
```

---

## createAsyncStoragePersister

**URL:** https://tanstack.com/query/latest/docs/framework/react/plugins/createAsyncStoragePersister

**Contents:**
- Installation
- Usage
- Retries
- API
  - createAsyncStoragePersister
  - Options

This utility comes as a separate package and is available under the '@tanstack/query-async-storage-persister' import.

Retries work the same as for a SyncStoragePersister, except that they can also be asynchronous. You can also use all the predefined retry handlers.

Call this function to create an asyncStoragePersister that you can use later with persistQueryClient.

The default options are:

**Examples:**

Example 1 (unknown):
```unknown
npm install @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

Example 2 (unknown):
```unknown
npm install @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

Example 3 (unknown):
```unknown
npm install @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

Example 4 (unknown):
```unknown
npm install @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

---

## Community Projects

**URL:** https://tanstack.com/query/latest/docs/framework/react/community/community-projects

**Contents:**
- Atomic CRM
- batshit
- Blitz
- Connect
- DevTools Browser Extensions
- GraphQL Code Generator
- Hey API
- Http-wizard
- Kubb
- NgQuery

There are lots of community projects that build on top of React Query and use it to provide additional functionality or enhanced developer experience. Projects are listed in alphabetical order. If you have a project that you would like to add to this list, please open a PR!

Please note that these projects are entirely community maintained. If you have questions about these projects, please reach out to the project maintainers.

A full-featured CRM built with React, react-admin, and Supabase.

Link: https://marmelab.com/atomic-crm/

A batch manager that will deduplicate and batch requests for a certain data type made within a window

Link: https://github.com/yornaath/batshit

The Missing Fullstack Toolkit for Next.js

Link: https://blitzjs.com/

A family of libraries for building building browser and gRPC-compatible HTTP APIs.

Link: https://connectrpc.com/docs

Browser extensions for Chrome, Firefox, and Edge that provide devtools for TanStack Query, allowing you to inspect and debug queries, mutations, and cache state directly in browser DevTools.

Generate React Query hooks from your GraphQL schema

Link: https://the-guild.dev/graphql/codegen

The OpenAPI to TypeScript codegen. Generate clients, SDKs, validators, and more.

Link: https://heyapi.dev/openapi-ts/plugins/tanstack-query

End-to-end type-safe Fastify API with typeScript magic ✨

Link: https://http-wizard.com

Generate SDKs for all your APIs

Link: https://www.kubb.dev/

Query adapter for Angular

Link: https://ngneat.github.io/query/

Automatic normalization and data updates for data fetching libraries

Link: https://github.com/klis87/normy

A tool for generating code based on an OpenAPI schema.

Link: https://github.com/fabien0102/openapi-codegen

Generate type-safe API clients and Hooks for TanStack Query directly from OpenAPI Documents. Zero-runtime overhead, Proxy-based design, seamless SSR support, and full TanStack Query functionality.

Link: https://github.com/OpenAPI-Qraft/openapi-qraft

Generate TanStack Query hooks based on an OpenAPI specification file.

Link: https://github.com/7nohe/openapi-react-query-codegen

Generate a zodios client from an OpenAPI specification

Link: https://github.com/astahmer/openapi-zod-client

A 2KB min, typesafe fetch wrapper that uses static TypeScript type inference and no runtime checks.

Link: https://openapi-ts.dev/openapi-react-query/

Easy to build APIs that are end-to-end type-safe and adhere to OpenAPI standards.

Link: https://orpc.unnoq.com/d

*[Content truncated]*

---

## React Native

**URL:** https://tanstack.com/query/latest/docs/framework/react/react-native

**Contents:**
- DevTools Support
- Online status management
- Refetch on App focus
- Refresh on Screen focus
- Disable queries on out of focus screens

React Query is designed to work out of the box with React Native.

There are several options available for React Native DevTools integration:

Native macOS App: A 3rd party app for debugging React Query in any js-based application: https://github.com/LovesWorking/rn-better-dev-tools

Flipper Plugin: A 3rd party plugin for Flipper users: https://github.com/bgaleotti/react-query-native-devtools

Reactotron Plugin: A 3rd party plugin for Reactotron users: https://github.com/hsndmr/reactotron-react-query

React Query already supports auto refetch on reconnect in web browser. To add this behavior in React Native you have to use React Query onlineManager as in the example below:

Instead of event listeners on window, React Native provides focus information through the AppState module. You can use the AppState "change" event to trigger an update when the app state changes to "active":

In some situations, you may want to refetch the query when a React Native Screen is focused again. This custom hook will refetch all active stale queries when the screen is focused again.

In the above code, the first focus (when the screen is initially mounted) is skipped because useFocusEffect calls our callback on mount in addition to screen focus.

If you don’t want certain queries to remain “live” while a screen is out of focus, you can use the subscribed prop on useQuery. This prop lets you control whether a query stays subscribed to updates. Combined with React Navigation’s useIsFocused, it allows you to seamlessly unsubscribe from queries when a screen isn’t in focus:

When subscribed is false, the query unsubscribes from updates and won’t trigger re-renders or fetch new data for that screen. Once it becomes true again (e.g., when the screen regains focus), the query re-subscribes and stays up to date.

**Examples:**

Example 1 (python):
```python
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

Example 2 (python):
```python
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

Example 3 (python):
```python
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

Example 4 (python):
```python
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

---

## useSuspenseQueries

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQueries

The same as for useQueries, except that each query can't have:

Same structure as useQueries, except that for each query:

Keep in mind that the component will only re-mount after all queries have finished loading. Hence, if a query has gone stale in the time it took for all the queries to complete, it will be fetched again at re-mount. To avoid this, make sure to set a high enough staleTime.

Cancellation does not work.

**Examples:**

Example 1 (javascript):
```javascript
const result = useSuspenseQueries(options)
```

Example 2 (javascript):
```javascript
const result = useSuspenseQueries(options)
```

Example 3 (javascript):
```javascript
const result = useSuspenseQueries(options)
```

Example 4 (javascript):
```javascript
const result = useSuspenseQueries(options)
```

---

## infiniteQueryOptions

**URL:** https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions

You can generally pass everything to infiniteQueryOptions that you can also pass to useInfiniteQuery. Some options will have no effect when then forwarded to a function like queryClient.prefetchInfiniteQuery, but TypeScript will still be fine with those excess properties.

See useInfiniteQuery for more information.

**Examples:**

Example 1 (unknown):
```unknown
infiniteQueryOptions({
  queryKey,
  ...options,
})
```

Example 2 (unknown):
```unknown
infiniteQueryOptions({
  queryKey,
  ...options,
})
```

Example 3 (unknown):
```unknown
infiniteQueryOptions({
  queryKey,
  ...options,
})
```

Example 4 (unknown):
```unknown
infiniteQueryOptions({
  queryKey,
  ...options,
})
```

---

## TkDodo's Blog

**URL:** https://tanstack.com/query/latest/docs/framework/react/community/tkdodos-blog

**Contents:**
- #1: Practical React Query
- #2: React Query Data Transformations
- #3: React Query Render Optimizations
- #4: Status Checks in React Query
- #5: Testing React Query
- #6: React Query and TypeScript
- #7: Using WebSockets with React Query
- #8: Effective React Query Keys
- #8a: Leveraging the Query Function Context
- #9: Placeholder and Initial Data in React Query

TanStack Query maintainer TkDodo has a series of blog posts about using and working with the library. Some articles show general best practices, but most have an opinionated point of view.

An advanced introduction to React Query, showing practical tips that go beyond the docs. It covers explaining the defaults (staleTime vs. gcTime), concepts like keeping server and client state separate, handling dependencies and creating custom hooks, as well as outlining why the enabled option is very powerful. Read more...

Learn the possibilities to perform the quite common and important task of transforming your data with React Query. From transforming in the queryFn to using the select option, this article outlines the pros and cons of all the different approaches. Read more...

Let's take a look at what you can do when your component re-renders too often when using React Query. The library is already pretty optimized, but there are still some opt-in features (like tracked queries) that you can use to avoid the isFetching transition. We're also looking into what structural sharing refers to. Read more...

We usually check for isPending first before checking for isError , but sometimes, checking if data is available should be the first thing to do. This article shows how the wrong status check order can negatively impact user experience. Read more...

The docs already cover pretty well what you need to do to get started when testing React Query. This article shows some additional tips (like turning off retries or silencing the console) you might want to follow when testing custom hooks or components using them. It also links to an example repository with tests for success and error states, powered by mock-service-worker. Read more...

Since React Query is written in TypeScript, it has great support for it. This blog post explains the various Generics, how you can leverage type inference to avoid having to explicitly type useQuery and friends, what to do with unknown errors, how type narrowing works and more! Read more...

A step-by-step guide on how to make real-time notifications work with React Query, with either event-based subscriptions or pushing full data directly to the client. Applicable to anything from the browser native WebSocket API over Firebase and even GraphQL subscriptions. Read more...

Most examples just use a simple String or Array Query Key, but how do you organize your keys effectively once your app grows past a todo list? This article shows how

*[Content truncated]*

---
