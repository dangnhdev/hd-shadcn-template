---
name: tanstack-router
description: TanStack Router - Type-safe routing for React applications. Use for client-side routing, route-based code splitting, nested routes, and type-safe navigation.
---

# TanStack Router Skill

Comprehensive assistance with TanStack Router development, generated from official documentation.

## When to Use This Skill

This skill should be triggered when:
- Setting up or configuring TanStack Router in a React application
- Creating file-based or code-based route definitions
- Implementing type-safe navigation with full TypeScript inference
- Working with search parameters (query strings) in a type-safe manner
- Implementing data loading, loaders, and route context
- Configuring route-based code splitting and lazy loading
- Migrating from React Router or React Location
- Creating custom Link components or integrating with UI libraries
- Debugging routing issues or understanding route matching
- Setting up nested routes and route hierarchies
- Working with route parameters (path params and search params)
- Implementing route guards, authentication flows, or redirects

## Key Concepts

### Type Safety First
TanStack Router is built from the ground up with TypeScript in mind. Every route, parameter, and navigation is fully type-safe with complete inference.

### Search Parameters as First-Class Citizens
Unlike other routers, TanStack Router treats search parameters (query strings) as a powerful state management solution - they're validated, typed, and easy to work with.

### File-Based and Code-Based Routing
You can define routes using files (recommended for type safety and scalability) or in code (for simple projects or specific use cases).

### Route Context
Routes can pass data down to their children through context, with full type safety.

### Data Loading
Built-in loader functions with caching support, designed to work seamlessly with data fetching libraries like TanStack Query.

## Quick Reference

### 1. Basic File-Based Route Setup

**Installing dependencies:**
```bash
npm install @tanstack/react-router @tanstack/react-router-devtools
npm install -D @tanstack/router-plugin
```

**Vite configuration:**
```typescript
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

### 2. Creating a Root Route with Context

```typescript
// src/routes/__root.tsx
import { createRootRouteWithContext } from '@tanstack/react-router'

interface MyRouterContext {
  auth: AuthContext
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
      </nav>
      <Outlet />
    </>
  )
}
```

### 3. Type-Safe Link Navigation

```tsx
// Type-safe link with params
<Link
  to="/blog/post/$postId"
  params={{ postId: 'my-first-blog-post' }}
  activeProps={{
    style: { fontWeight: 'bold' }
  }}
>
  Read Post
</Link>

// Preload on hover/touchstart
<Link
  to="/blog/post/$postId"
  params={{ postId: '123' }}
  preload="intent"
>
  Blog Post
</Link>
```

### 4. Working with Search Parameters

```typescript
// Using select to transform search params
const result = Route.useSearch({
  select: (search) => ({
    foo: search.foo,
    message: `Hello ${search.foo}`,
  }),
})

// The result is fully typed based on your route's search schema
```

### 5. Route Configuration Options

```typescript
// Allow custom characters in path params
const router = createRouter({
  // ...
  pathParamsAllowedCharacters: ['@'],
})

// Configure preload staleness
const router = createRouter({
  // ...
  defaultPreloadStaleTime: 0,
})
```

### 6. Route Remounting on Param Changes

```typescript
// Remount component when params change
export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
  remountDeps: ({ params }) => params,
})
```

### 7. Creating Custom Link Components

```typescript
import { createLink, LinkComponent } from '@tanstack/react-router'

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add custom props
}

const CustomLinkComponent = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (props, ref) => {
    return (
      <a ref={ref} {...props} className="custom-link-styles" />
    )
  },
)

const CreatedLink = createLink(CustomLinkComponent)

export const CustomLink: LinkComponent<typeof CustomLinkComponent> = (props) => {
  return <CreatedLink {...props} />
}
```

### 8. Type Utilities for Generic Components

```typescript
import { ValidateLinkOptions, RegisteredRouter } from '@tanstack/react-router'

interface MenuProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  items: ValidateLinkOptions<TRouter, TOptions>[]
}

// Create type-safe menu components
export function Menu<TRouter extends RegisteredRouter, TOptions>(
  props: MenuProps<TRouter, TOptions>,
) {
  return (
    <nav>
      {props.items.map((item, i) => (
        <Link key={i} {...item} />
      ))}
    </nav>
  )
}
```

### 9. CLI Commands

```bash
# Watch mode for route generation
tsr watch

# Generate route tree
tsr generate
```

### 10. Using Devtools

```typescript
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// Inside your root route component
function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

### getting_started.md
Contains installation guides, setup instructions, and migration guides:
- **Manual Setup**: Step-by-step setup for file-based and code-based routing
- **Installation with Vite**: Vite plugin configuration
- **Migration from React Router**: Checklist for migrating existing apps
- **Migration from React Location**: Detailed migration guide
- **Overview**: Core features and concepts

### guide.md (29 pages)
In-depth guides covering:
- **Automatic Code Splitting**: How to optimize bundle size with route-based code splitting
- **Custom Link Components**: Creating custom links with third-party libraries (React Aria, Chakra UI, MUI, Mantine)
- **Type Utilities**: ValidateLinkOptions, ValidateNavigateOptions, ValidateRedirectOptions
- **External Data Loading**: Integration with TanStack Query and other data fetching libraries

### routing.md (94 pages)
Comprehensive routing documentation including:
- **API Reference**: Complete documentation for all hooks, functions, and types
- **HistoryState Interface**: Working with browser history state
- **Design Decisions**: Understanding why TanStack Router works the way it does
- **LLM Assistance Support**: How to use vibe-rules with editors like Cursor and Claude Code
- Core routing concepts and patterns

## Working with This Skill

### For Beginners
1. Start by reading the **Overview** section in `getting_started.md` to understand TanStack Router's core philosophy
2. Follow the **Manual Setup** guide for hands-on installation
3. Review the Quick Reference examples above for common patterns
4. Use the Devtools to visualize your route tree and debug routing issues

### For Intermediate Users
1. Dive into `guide.md` for advanced patterns:
   - Setting up automatic code splitting
   - Creating custom Link components
   - Working with type utilities for generic components
2. Learn about search parameter validation and transformation
3. Explore route context and data loading patterns

### For Advanced Users
1. Study the **Type Utilities** section for building type-safe reusable components
2. Review **External Data Loading** for TanStack Query integration
3. Read **Design Decisions** to understand architectural choices
4. Implement custom route configurations with advanced options

### Navigation Tips
- Use `view references/getting_started.md` for installation and setup
- Use `view references/guide.md` for feature-specific guides
- Use `view references/routing.md` for API reference and detailed concepts
- Search within files for specific hooks, functions, or patterns

## Common Patterns

### Search Parameter Management
TanStack Router treats search parameters as a powerful state management tool - they're global, serializable, bookmarkable, and shareable. Use them for:
- Filter states
- Pagination
- Modal states
- Form data
- Any state that should survive page refresh

### Type-Safe Navigation
Every `to` prop in `<Link>` components is fully typed based on your route tree. TypeScript will autocomplete valid paths and require correct params.

### Route Context Inheritance
Router context is passed down the route tree and merged at each route. This enables dependency injection patterns with full type safety.

### File-Based Routing Benefits
- Automatic route tree generation
- Better code splitting
- Clearer project structure
- Improved type inference

## Best Practices

1. **Use File-Based Routing**: It provides better type inference and scales better than code-based routing
2. **Enable Auto Code Splitting**: Add `autoCodeSplitting: true` to your bundler config
3. **Leverage Search Parameters**: They're more powerful than you think - use them for UI state
4. **Type Your Route Context**: Use `createRootRouteWithContext` for dependency injection
5. **Install Devtools**: They're invaluable for debugging and understanding your route tree
6. **Use Preloading**: Add `preload="intent"` to links for better perceived performance
7. **Create Custom Links**: Use `createLink` for consistent styling and behavior across your app

## Integration Examples

### With TanStack Query
```typescript
// In your loader
export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(postQueryOptions(params.postId))
  },
})
```

### With Authentication
```typescript
// Use route context for auth
interface RouterContext {
  auth: AuthContext
}

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
})
```

## Resources

### Official Links
- Documentation: https://tanstack.com/router/latest
- GitHub: https://github.com/TanStack/router
- Examples: Check the TanStack Router repository for example projects

### Package Scripts
- `tsr watch`: Watch for route changes and regenerate route tree
- `tsr generate`: Generate route tree once

## Notes

- This skill was automatically generated from official TanStack Router documentation
- All code examples are extracted from the official docs and maintain accuracy
- Reference files preserve structure and examples from source documentation
- TanStack Router requires TypeScript for the best experience

## Troubleshooting

### Common Issues
1. **"Cannot use 'useNavigate' outside of context"**: Ensure all React Router imports are removed
2. **Type inference not working**: Make sure you're using file-based routing and the bundler plugin
3. **Routes not generating**: Check your `tsr.config.json` and ensure `tsr watch` is running
4. **Build errors**: Verify all route files follow the correct naming convention

## Updating

To refresh this skill with updated documentation:
1. Re-run the documentation scraper with the same configuration
2. The skill will be rebuilt with the latest information from TanStack Router docs
