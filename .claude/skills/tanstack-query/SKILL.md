---
name: tanstack-query
description: TanStack Query - Powerful data synchronization for React. Use for server state management, caching, background updates, mutations, and API data fetching.
---

# TanStack Query Skill

Comprehensive assistance with TanStack Query (React Query) development, generated from official documentation. TanStack Query is a powerful asynchronous state management library for handling server state, data fetching, caching, and synchronization in React applications.

## When to Use This Skill

This skill should be triggered when:
- Setting up data fetching with `useQuery`, `useMutation`, or `useInfiniteQuery`
- Implementing caching strategies for API data
- Working with query invalidation, refetching, or optimistic updates
- Debugging TanStack Query cache behavior or stale data issues
- Configuring `QueryClient` or `QueryClientProvider`
- Implementing pagination or infinite scroll with TanStack Query
- Testing components that use TanStack Query hooks
- Optimizing performance with query prefetching or dependent queries
- Managing server state synchronization in React applications
- Migrating from other state management solutions to TanStack Query

## Key Concepts

### Server State vs Client State
**Server State** is data that:
- Is persisted remotely (not controlled by you)
- Requires asynchronous APIs for fetching/updating
- Can become outdated and needs synchronization
- Can be shared across multiple users

TanStack Query specializes in managing server state, unlike traditional state management libraries designed for client state.

### Core Concepts
- **Query**: A declarative dependency on an asynchronous source of data tied to a unique key
- **Mutation**: Functions to create/update/delete data on the server
- **Query Key**: A unique identifier for queries used for caching and refetching
- **Query Client**: The central cache manager for all queries and mutations
- **Stale Time**: How long data is considered fresh before refetching
- **Cache Time (gcTime)**: How long inactive data stays in cache

## Quick Reference

### 1. Basic Query Setup

The most fundamental pattern - setting up TanStack Query in your app:

```typescript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </div>
  )
}
```

### 2. Query Keys with Variables

Query keys should include all variables that affect the data being fetched:

```typescript
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  })
}
```

### 3. Mutations for Data Updates

Use mutations to create, update, or delete data:

```typescript
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

function Todos() {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>{query.data?.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>

      <button onClick={() => mutation.mutate({ title: 'New Todo' })}>
        Add Todo
      </button>
    </div>
  )
}
```

### 4. Dependent Queries

Execute queries sequentially when one depends on data from another:

```javascript
// Get the user first
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects (only when userId exists)
const { status, data: projects } = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  enabled: !!userId, // Query won't execute until userId exists
})
```

### 5. Infinite Queries (Pagination/Load More)

Implement infinite scroll or "load more" functionality:

```typescript
import { useInfiniteQuery } from '@tanstack/react-query'

function Projects() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam = 0 }) => fetchProjects(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    initialPageParam: 0,
  })

  return (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </React.Fragment>
      ))}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
    </>
  )
}
```

### 6. Placeholder Data for Better UX

Show preview data while the full query loads:

```typescript
function Todo({ todoId }) {
  const result = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetch(`/todos/${todoId}`),
    placeholderData: {
      id: todoId,
      title: 'Loading...',
      body: 'Please wait...'
    },
  })
}
```

### 7. Query Retries Configuration

Control how queries retry on failure:

```typescript
import { useQuery } from '@tanstack/react-query'

// Retry failed requests 10 times before displaying an error
const result = useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10,
})

// Or disable retries entirely (useful for testing)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Turns retries off globally
    },
  },
})
```

### 8. Testing with TanStack Query

Proper setup for testing components using TanStack Query:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Turn off retries for tests
      },
    },
  })
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

test('my custom hook', async () => {
  const { result } = renderHook(() => useCustomHook(), {
    wrapper: createWrapper(),
  })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))
})
```

### 9. Persisting Query State

Save and restore query state for offline support:

```typescript
import { persistQueryClientSave } from '@tanstack/react-query-persist-client'

// Subscribe to cache changes and persist them
persistQueryClientSubscribe({
  queryClient,
  persister,
  buster: '',
  dehydrateOptions: undefined,
})
```

### 10. Using Devtools

Install and use the React Query Devtools for debugging:

```bash
npm i @tanstack/react-query-devtools
```

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

### **getting_started.md** (4 pages)
Core introduction to TanStack Query covering:
- **Motivation**: Why TanStack Query exists and what problems it solves
- **Basic setup**: Installing and configuring TanStack Query
- **First query**: Simple example fetching GitHub repository data
- **Installation options**: NPM and CDN installation methods
- **Requirements**: Browser compatibility and recommended tools

**Best for**: First-time users learning TanStack Query fundamentals, understanding the difference between server and client state.

### **guide.md** (37 pages)
In-depth guides on advanced topics including:
- **Testing**: How to test components using TanStack Query hooks
- **Dependent Queries**: Sequential queries where one depends on another
- **Query Retries**: Configuring retry behavior and delays
- **Infinite Queries**: Implementing pagination and infinite scroll
- **Performance**: Avoiding request waterfalls and optimizing data fetching
- **Prefetching**: Loading data before it's needed
- **Server Rendering**: SSR and hydration strategies

**Best for**: Intermediate to advanced users implementing complex data fetching patterns, performance optimization, and production best practices.

### **queries.md** (33 pages)
API reference and detailed documentation:
- **Hydration/Dehydration**: Server-side rendering and state persistence
- **Comparison**: How TanStack Query compares to SWR, Apollo, RTK Query
- **QueryClientProvider**: Setting up the query client context
- **useQueryClient**: Accessing the query client in components
- **useIsFetching**: Global loading state tracking
- **useMutationState**: Accessing mutation state across components
- **useSuspenseInfiniteQuery**: Suspense-enabled infinite queries
- **Devtools**: Development tools for debugging queries
- **Error boundaries**: Handling query errors with error boundaries

**Best for**: Looking up specific APIs, understanding advanced features, implementing SSR, or migrating from other libraries.

## Working with This Skill

### For Beginners
1. **Start here**: Read `getting_started.md` to understand the motivation and basic setup
2. **Try the basic example**: Implement a simple `useQuery` to fetch data from an API
3. **Learn mutations**: Experiment with `useMutation` to create/update/delete data
4. **Install devtools**: Use React Query Devtools to visualize cache behavior
5. **Practice query keys**: Understand how query keys affect caching and refetching

### For Intermediate Users
1. **Master dependent queries**: Implement sequential data fetching with the `enabled` option
2. **Optimize performance**: Learn about prefetching and avoiding request waterfalls
3. **Implement pagination**: Use `useInfiniteQuery` for infinite scroll or load more buttons
4. **Configure retries**: Understand retry strategies and exponential backoff
5. **Write tests**: Learn proper testing setup with custom wrappers

### For Advanced Users
1. **SSR and hydration**: Implement server-side rendering with dehydrate/hydrate
2. **Optimistic updates**: Update UI immediately before server confirmation
3. **Custom query configuration**: Set up pre-configured queries for your API
4. **Performance tuning**: Optimize stale time, cache time, and render performance
5. **Advanced patterns**: Implement custom hooks, middleware, and query orchestration

### Navigation Tips
- Use the **Quick Reference** section above for common code patterns
- Check **reference files** for detailed explanations of specific features
- Search for keywords like "retry", "infinite", "mutation", "testing" in the reference docs
- When debugging, install devtools first to visualize what's happening
- For performance issues, start with the "Performance & Request Waterfalls" section in `guide.md`

## Common Patterns & Best Practices

### Query Key Structure
```typescript
// ✅ Good - Hierarchical and specific
['todos', 'list', { filters, sort }]
['todos', 'detail', todoId]
['user', userId, 'posts']

// ❌ Bad - Too generic or inconsistent
['getTodos']
[todoId]
['user', 'posts', userId] // Inconsistent ordering
```

### Mutation with Invalidation
```typescript
const mutation = useMutation({
  mutationFn: updateTodo,
  onSuccess: () => {
    // Invalidate related queries
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

### Global Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})
```

## Troubleshooting

### Common Issues
1. **Queries refetching too often**: Increase `staleTime`
2. **Data disappearing from cache**: Increase `gcTime`
3. **Tests timing out**: Set `retry: false` in test configuration
4. **Infinite loops**: Check that query keys are stable (not recreated every render)
5. **Mutations not updating UI**: Call `invalidateQueries` or use optimistic updates

### Getting Help
- Check the devtools to see query status, cache contents, and fetch timing
- Look for the specific hook or feature in the reference files
- Search for error messages in `guide.md` or `queries.md`
- Review the comparison table if migrating from another library

## Resources

### Official Links
- **Documentation**: https://tanstack.com/query/latest/docs/
- **GitHub**: https://github.com/TanStack/query
- **Examples**: Check the official docs for StackBlitz examples

### Tools & Extensions
- **React Query Devtools**: Browser extension and package for debugging
- **ESLint Plugin**: `@tanstack/eslint-plugin-query` for catching bugs
- **Persist Client**: For offline support and state persistence

## Notes

- This skill was automatically generated from official TanStack Query documentation
- All code examples are extracted from the official docs and tested patterns
- Language tags reflect actual code syntax (TypeScript/JavaScript)
- Examples prioritize practical, copy-paste-ready code snippets

## Updating

To refresh this skill with updated documentation:
1. Re-run the documentation scraper with the same configuration
2. The skill will be rebuilt with the latest information from TanStack Query docs
3. Review Quick Reference examples to ensure they reflect current best practices
