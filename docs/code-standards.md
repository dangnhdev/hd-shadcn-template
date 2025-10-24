# Code Standards & Best Practices

## Overview

This document defines the coding standards, patterns, and best practices for the Shadcn Starter Template project. All contributors must adhere to these standards to maintain code quality, consistency, and maintainability.

## General Principles

### YAGNI (You Aren't Gonna Need It)
- Don't implement features until they're needed
- Avoid speculative generalization
- Start simple, refactor when requirements evolve

### KISS (Keep It Simple, Stupid)
- Prefer simple solutions over complex ones
- Write code that's easy to understand
- Avoid premature optimization

### DRY (Don't Repeat Yourself)
- Extract repeated logic into reusable functions
- Use composition over duplication
- Create shared utilities for common patterns

### File Size Management
- **Maximum file size:** 500 lines
- Split large files into smaller, focused modules
- Use composition over inheritance
- Extract utility functions into separate modules
- Create dedicated service classes for business logic

## TypeScript Standards

### Type Safety

#### Always Use Explicit Types for Function Parameters
```typescript
// ✅ Good
function processUser(user: User, options: ProcessOptions): Result {
  // ...
}

// ❌ Bad
function processUser(user, options) {
  // ...
}
```

#### Use Type Inference for Variables When Obvious
```typescript
// ✅ Good - inference is clear
const count = 5
const users = await fetchUsers()

// ✅ Good - explicit when not obvious
const result: ApiResponse<User> = await api.getUser()

// ❌ Bad - unnecessary explicit types
const count: number = 5
```

#### Prefer Interfaces for Object Shapes
```typescript
// ✅ Good
interface UserProfile {
  id: string
  name: string
  email: string
}

// ❌ Bad (use interface instead)
type UserProfile = {
  id: string
  name: string
  email: string
}
```

#### Use Type Aliases for Unions and Utility Types
```typescript
// ✅ Good
type Status = 'pending' | 'approved' | 'rejected'
type Optional<T> = T | null | undefined
```

### Naming Conventions

#### PascalCase for Types, Interfaces, Classes, Components
```typescript
// Types & Interfaces
interface UserAccount { }
type ApiResponse<T> = { }

// Classes
class DatabaseService { }

// React Components
function UserProfile() { }
```

#### camelCase for Variables, Functions, Methods
```typescript
// Variables
const userCount = 10
const isAuthenticated = true

// Functions
function getUserById(id: string) { }

// Methods
class UserService {
  async fetchUser(id: string) { }
}
```

#### UPPER_SNAKE_CASE for Constants
```typescript
const MAX_RETRY_ATTEMPTS = 3
const API_BASE_URL = 'https://api.example.com'
const DEFAULT_TIMEOUT_MS = 5000
```

#### Prefix Private Members with Underscore (Optional)
```typescript
class UserService {
  private _cache: Map<string, User>

  private _invalidateCache() {
    this._cache.clear()
  }
}
```

### Imports Organization

#### Import Order
1. React and core dependencies
2. Third-party libraries
3. Internal modules (absolute imports with `@/`)
4. Relative imports
5. Types (if not inline)
6. Styles

```typescript
// 1. React and core
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

// 2. Third-party
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

// 3. Internal (absolute)
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-client'

// 4. Relative
import { Header } from './header'
import { formatDate } from './utils'

// 5. Types
import type { User, ApiResponse } from '@/types'

// 6. Styles
import './styles.css'
```

#### Use Named Exports (Prefer Over Default)
```typescript
// ✅ Good
export function Button(props: ButtonProps) { }
export const config = { }

// ❌ Avoid (makes refactoring harder)
export default Button
```

#### Exception: Default Exports for Route Components
```typescript
// TanStack Router routes should use default exports
export default function SignInPage() {
  return <div>Sign In</div>
}
```

## React Standards

### Component Structure

#### Functional Components with TypeScript
```typescript
// ✅ Good - Props interface, clear structure
interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  // Handlers
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Effects
  useEffect(() => {
    // ...
  }, [user.id])

  // Early returns
  if (!user) return null

  // Render
  return (
    <div>
      {/* ... */}
    </div>
  )
}
```

#### Component Organization
1. Props interface
2. Component declaration
3. State declarations
4. Refs
5. Computed values
6. Effects
7. Event handlers
8. Helper functions
9. Early returns
10. Main render

### Hooks Best Practices

#### Custom Hooks Start with `use`
```typescript
// ✅ Good
export function useUserProfile(userId: string) {
  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  return { profile: data, isLoading: !data }
}
```

#### Extract Complex Logic to Custom Hooks
```typescript
// ✅ Good - logic extracted
function UserDashboard() {
  const { profile, isLoading } = useUserProfile(userId)
  const { settings } = useUserSettings(userId)

  return <div>{/* ... */}</div>
}

// ❌ Bad - too much logic in component
function UserDashboard() {
  const [profile, setProfile] = useState(null)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setProfile)
  }, [userId])

  useEffect(() => {
    fetchSettings(userId).then(setSettings)
  }, [userId])

  return <div>{/* ... */}</div>
}
```

#### Hooks Dependencies Must Be Complete
```typescript
// ✅ Good
useEffect(() => {
  fetchData(userId, filter)
}, [userId, filter])

// ❌ Bad - missing dependency
useEffect(() => {
  fetchData(userId, filter)
}, [userId])
```

### State Management

#### Use TanStack Query for Server State
```typescript
// ✅ Good - server state managed by React Query
function UserList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  return <div>{/* ... */}</div>
}
```

#### Use useState for Local UI State
```typescript
// ✅ Good - local UI state
function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return <div>{/* ... */}</div>
}
```

#### Use Zustand for Global Client State
```typescript
// ✅ Good - global client state (theme, preferences)
import { create } from 'zustand'

interface AppState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
```

### Conditional Rendering

#### Use Early Returns for Guards
```typescript
// ✅ Good
function UserProfile({ user }: Props) {
  if (!user) return null
  if (user.deleted) return <DeletedUserMessage />

  return <div>{/* main content */}</div>
}

// ❌ Bad - nested ternaries
function UserProfile({ user }: Props) {
  return user ? (
    user.deleted ? <DeletedUserMessage /> : <div>{/* main content */}</div>
  ) : null
}
```

#### Use Logical AND for Simple Conditions
```typescript
// ✅ Good
{isAuthenticated && <UserMenu />}

// ❌ Bad - unnecessary ternary
{isAuthenticated ? <UserMenu /> : null}
```

#### Use Ternary for True/False Branches
```typescript
// ✅ Good
{isLoading ? <Spinner /> : <Content />}
```

## File Structure Standards

### Frontend Structure

```
src/
├── components/          # Shared components
│   ├── ui/             # Base UI components (Shadcn)
│   ├── layout/         # Layout components
│   └── [feature]/      # Feature-specific shared components
│
├── features/           # Feature modules (self-contained)
│   └── [feature]/
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       ├── lib/        # Feature-specific utilities
│       └── index.tsx   # Feature entry point
│
├── routes/             # TanStack Router routes
│   ├── __root.tsx      # Root layout
│   ├── (auth)/         # Route group (no layout)
│   ├── _authenticated/ # Layout route (with auth)
│   └── index.tsx       # Home page
│
├── lib/                # Shared utilities
│   ├── auth-client.ts  # Auth configuration
│   ├── utils.ts        # Helper functions
│   └── constants.ts    # App constants
│
├── hooks/              # Shared custom hooks
├── context/            # React context providers
├── styles/             # Global styles
├── config/             # Configuration files
└── main.tsx            # App entry point
```

### Backend Structure (Convex)

```
convex/
├── _generated/         # Auto-generated types
├── [feature]/          # Feature modules
│   ├── queries.ts      # Read operations
│   ├── mutations.ts    # Write operations
│   └── schema.ts       # Feature schema (if needed)
│
├── emails/             # Email templates
│   ├── components/     # Reusable email components
│   └── [template].tsx  # Email templates
│
├── test/               # Integration tests
│   └── [feature].test.ts
│
├── schema.ts           # Main database schema
├── auth.ts             # Authentication setup
├── http.ts             # HTTP endpoints
└── convex.config.ts    # Convex configuration
```

## Naming Conventions

### Files and Folders

#### Component Files: kebab-case.tsx
```
user-profile.tsx
data-table.tsx
auth-layout.tsx
```

#### Utility Files: kebab-case.ts
```
format-date.ts
api-client.ts
auth-utils.ts
```

#### Route Files: TanStack Router Convention
```
index.tsx           # /
about.tsx           # /about
users.$id.tsx       # /users/:id
_authenticated/     # Layout group
(auth)/            # Route group (no layout)
```

#### Test Files: Same Name with .test.ts(x)
```
user-service.ts
user-service.test.ts

UserCard.tsx
UserCard.test.tsx
```

### Folders: kebab-case
```
components/ui/
features/user-profile/
lib/api-client/
```

## Code Quality Standards

### ESLint Configuration

The project uses ESLint 9 flat config with TypeScript support.

**Enabled Rules:**
- TypeScript strict type checking
- React hooks rules
- No unused variables
- No console.log in production
- Consistent import order

**Configuration:** `/Users/dangnhdev/dev/node/hd-shadcn-template/eslint.config.js`

### Prettier Configuration

**Settings:**
- Semi: true
- Single quotes: true
- Tab width: 2
- Trailing comma: es5
- Print width: 80

**Configuration:** `/Users/dangnhdev/dev/node/hd-shadcn-template/prettier.config.cjs`

### Pre-commit Checks

Before committing code:
1. Run linting: `pnpm lint`
2. Run type checking: `pnpm typecheck`
3. Run tests: `pnpm test:run`
4. Format code: `pnpm format`

## Error Handling

### Frontend Error Handling

#### Try-Catch for Async Operations
```typescript
// ✅ Good
async function fetchUserData(userId: string) {
  try {
    const data = await api.getUser(userId)
    return { data, error: null }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return { data: null, error }
  }
}
```

#### React Query Error Handling
```typescript
// ✅ Good - centralized error handling
const { data, error, isError } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  onError: (error) => {
    toast.error('Failed to load user')
  },
})

if (isError) {
  return <ErrorMessage error={error} />
}
```

#### Error Boundaries for Component Errors
```typescript
// ✅ Good - catch component errors
import { ErrorBoundary } from 'react-error-boundary'

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Routes />
    </ErrorBoundary>
  )
}
```

### Backend Error Handling (Convex)

#### Throw Errors with Meaningful Messages
```typescript
// ✅ Good
import { ConvexError } from 'convex/values'

export const updateUser = mutation({
  args: { userId: v.id('users'), name: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId)

    if (!user) {
      throw new ConvexError('User not found')
    }

    if (!user.email) {
      throw new ConvexError('User email is required')
    }

    await ctx.db.patch(args.userId, { name: args.name })
  },
})
```

#### Handle Authentication Errors
```typescript
// ✅ Good
import { getUser } from './auth'

export const protectedQuery = query({
  args: {},
  handler: async (ctx) => {
    const user = await getUser(ctx)

    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    // ... query logic
  },
})
```

## Testing Standards

### Test File Organization

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { convexTest } from '../test/setup'
import { api } from './_generated/api'

describe('User Service', () => {
  beforeEach(() => {
    // Setup
  })

  afterEach(() => {
    // Cleanup
  })

  describe('getUserById', () => {
    it('should return user when found', async () => {
      // Arrange
      const userId = await convexTest.mutation(api.users.create, {
        name: 'Test User',
        email: 'test@example.com',
      })

      // Act
      const user = await convexTest.query(api.users.getById, { userId })

      // Assert
      expect(user).toBeDefined()
      expect(user?.name).toBe('Test User')
    })

    it('should return null when user not found', async () => {
      // Act
      const user = await convexTest.query(api.users.getById, {
        userId: 'invalid-id',
      })

      // Assert
      expect(user).toBeNull()
    })
  })
})
```

### Testing Best Practices

#### Use Descriptive Test Names
```typescript
// ✅ Good
it('should send OTP email when user requests sign in')
it('should throw error when email is invalid')
it('should redirect to dashboard after successful login')

// ❌ Bad
it('works')
it('test user')
```

#### Test Real Behavior, Not Implementation
```typescript
// ✅ Good - test behavior
it('should display error message when login fails', async () => {
  const { getByText, getByLabelText } = render(<SignIn />)

  fireEvent.change(getByLabelText('Email'), {
    target: { value: 'invalid@example.com' },
  })
  fireEvent.click(getByText('Sign In'))

  await waitFor(() => {
    expect(getByText('Invalid credentials')).toBeInTheDocument()
  })
})

// ❌ Bad - test implementation
it('should call signIn function with email', () => {
  const signIn = vi.fn()
  const { getByLabelText } = render(<SignIn signIn={signIn} />)

  fireEvent.change(getByLabelText('Email'), {
    target: { value: 'test@example.com' },
  })

  expect(signIn).toHaveBeenCalledWith('test@example.com')
})
```

#### Avoid Mocks When Possible
```typescript
// ✅ Good - test real Convex function
it('should create user in database', async () => {
  const userId = await convexTest.mutation(api.users.create, {
    name: 'John Doe',
    email: 'john@example.com',
  })

  const user = await convexTest.query(api.users.getById, { userId })
  expect(user?.name).toBe('John Doe')
})

// ❌ Bad - unnecessary mock
it('should create user in database', async () => {
  const mockCreate = vi.fn().mockResolvedValue('user-123')
  await mockCreate({ name: 'John Doe' })
  expect(mockCreate).toHaveBeenCalled()
})
```

## Comments and Documentation

### When to Comment

#### Use Comments for "Why", Not "What"
```typescript
// ✅ Good - explains why
// We use a 5-minute expiration to balance security and UX.
// Shorter expiration would annoy users, longer would be less secure.
const OTP_EXPIRATION_MS = 5 * 60 * 1000

// ❌ Bad - obvious from code
// Set OTP expiration to 5 minutes
const OTP_EXPIRATION_MS = 5 * 60 * 1000
```

#### Document Complex Algorithms
```typescript
// ✅ Good
/**
 * Calculates the optimal page size based on viewport height and item height.
 *
 * This algorithm ensures:
 * 1. At least one full screen of items is visible
 * 2. Some items are pre-rendered for smooth scrolling
 * 3. Memory usage is bounded by MAX_PAGE_SIZE
 *
 * @param viewportHeight - Height of the scrollable container
 * @param itemHeight - Average height of a single item
 * @returns Optimal number of items per page
 */
function calculatePageSize(viewportHeight: number, itemHeight: number): number {
  const itemsPerScreen = Math.ceil(viewportHeight / itemHeight)
  const bufferItems = Math.ceil(itemsPerScreen * 0.5) // 50% buffer
  const pageSize = itemsPerScreen + bufferItems

  return Math.min(pageSize, MAX_PAGE_SIZE)
}
```

#### Document Public APIs
```typescript
// ✅ Good
/**
 * Fetches user profile by ID.
 *
 * @param userId - The unique identifier of the user
 * @returns User profile or null if not found
 * @throws {ConvexError} If the user ID is invalid
 *
 * @example
 * const user = await getUserProfile('user-123')
 * if (user) {
 *   console.log(user.name)
 * }
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  // ...
}
```

### Avoid Over-Commenting

```typescript
// ❌ Bad - noise
// Get the user
const user = await getUser()

// Check if user exists
if (user) {
  // Update the user's name
  user.name = newName

  // Save the user
  await saveUser(user)
}
```

## Performance Best Practices

### Avoid Unnecessary Re-renders

#### Use React.memo for Expensive Components
```typescript
// ✅ Good
export const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
}: Props) {
  // ... expensive rendering logic
})
```

#### Use useMemo for Expensive Computations
```typescript
// ✅ Good
function DataTable({ items }: Props) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  return <div>{/* ... */}</div>
}
```

#### Use useCallback for Event Handlers Passed to Children
```typescript
// ✅ Good
function ParentComponent() {
  const handleClick = useCallback((id: string) => {
    // ... handle click
  }, [])

  return <ChildComponent onClick={handleClick} />
}
```

### Optimize Bundle Size

#### Use Dynamic Imports for Code Splitting
```typescript
// ✅ Good
const HeavyComponent = lazy(() => import('./heavy-component'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

#### Avoid Importing Entire Libraries
```typescript
// ✅ Good
import { format } from 'date-fns/format'

// ❌ Bad
import { format } from 'date-fns'
```

## Security Best Practices

### Input Validation

#### Always Validate User Input
```typescript
// ✅ Good
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
})

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    age: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate input
    const validated = userSchema.parse(args)

    // ... create user
  },
})
```

### Authentication

#### Always Check Authentication in Protected Routes
```typescript
// ✅ Good
export const protectedMutation = mutation({
  args: { /* ... */ },
  handler: async (ctx, args) => {
    const user = await getUser(ctx)

    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    // ... mutation logic
  },
})
```

#### Never Trust Client-Side Data
```typescript
// ❌ Bad - trusting client userId
export const updateUser = mutation({
  args: { userId: v.id('users'), name: v.string() },
  handler: async (ctx, args) => {
    // Client can pass any userId!
    await ctx.db.patch(args.userId, { name: args.name })
  },
})

// ✅ Good - use authenticated user
export const updateUser = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const user = await getUser(ctx)
    if (!user) throw new ConvexError('Unauthorized')

    // Update only the authenticated user
    await ctx.db.patch(user._id, { name: args.name })
  },
})
```

### Sensitive Data

#### Never Log Sensitive Information
```typescript
// ❌ Bad
console.log('User credentials:', password, apiKey)

// ✅ Good
console.log('User authentication attempt:', { email: user.email })
```

#### Never Commit Secrets to Git
```typescript
// ❌ Bad
const API_KEY = 'sk_live_abc123'

// ✅ Good
const API_KEY = import.meta.env.VITE_API_KEY
```

## Git Commit Standards

### Commit Message Format

Use Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, semicolons, etc.)
- **refactor:** Code refactoring
- **test:** Adding or updating tests
- **chore:** Maintenance tasks, dependency updates

#### Examples
```
feat(auth): add email OTP authentication

Implement passwordless authentication using email OTP.
- Add OTP generation and verification
- Integrate with Resend for email delivery
- Add email templates for OTP

Closes #123
```

```
fix(ui): correct button hover state in dark mode

The button hover state was using the wrong color variable
in dark mode, making it hard to see.
```

```
chore(deps): upgrade better-auth to v1.3.27

Downgrade from v1.3.29 due to cross-domain credential issues.
```

### Pre-Commit Rules

1. ✅ Run linting before commit
2. ✅ Run tests before push
3. ❌ DO NOT commit confidential information (.env, API keys, credentials)
4. ❌ NEVER add AI attribution signatures
5. ✅ Keep commits focused on actual code changes
6. ✅ Use conventional commit format

## Summary

These coding standards ensure:
- **Consistency:** Code looks like it was written by one person
- **Maintainability:** Easy to understand and modify
- **Quality:** Fewer bugs, better performance
- **Collaboration:** Clear expectations for all contributors

**Enforcement:**
- ESLint + Prettier (automated)
- Code reviews (manual)
- CI/CD checks (automated)

**Questions?**
Refer to existing codebase for examples or ask in GitHub Discussions.

---

**Last Updated:** 2025-10-25
**Maintained By:** docs-manager agent
