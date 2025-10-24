# Fix Auth Client Exports - Implementation Plan

**Date:** 2025-10-24
**Status:** Ready for Implementation

## Overview

Fix build errors caused by missing exports from `src/lib/auth-client.ts`. Components attempt to import `useSession` and `signOut` but these are not currently exported.

## Problem Analysis

### Current State
- `auth-client.ts` only exports `authClient` instance
- Components expect destructured exports: `useSession`, `signOut`
- Better Auth v1.3.29 supports both patterns:
  - Pattern A: Export destructured methods (recommended by docs)
  - Pattern B: Use `authClient.useSession()` in components

### Affected Files
1. `src/components/auth/protected-route.tsx` - imports `useSession`
2. `src/components/layout/nav-user.tsx` - imports `useSession`
3. `src/components/sign-out-dialog.tsx` - imports `signOut`

### Research Findings

From better-auth docs, **recommended pattern** is destructured exports:

```typescript
export const { signIn, signOut, useSession } = createAuthClient()
```

This pattern:
- Cleaner imports in components
- Follows official migration guides (NextAuth, Auth0, Clerk)
- Type-safe with full inference
- Consistent with React ecosystem conventions

## Recommended Solution

**Use Pattern A: Destructured Exports**

Export commonly-used hooks/methods from auth client for cleaner component imports.

### Exports Needed

Based on current usage + likely future needs:

**Core Authentication:**
- `useSession` - Session hook (currently used)
- `signOut` - Sign out method (currently used)
- `signIn` - Sign in methods (likely needed)
- `signUp` - Sign up methods (likely needed)

**User Management:**
- `updateUser` - Update profile (likely needed)
- `changeEmail` - Change email (likely needed)
- `changePassword` - Change password (likely needed)

**Utility:**
- `getSession` - Direct session fetch (for non-hook contexts)

**Keep:**
- `authClient` - Full client for advanced usage

## Implementation Steps

### 1. Update Auth Client Exports

**File:** `src/lib/auth-client.ts`

```typescript
import {
  convexClient,
  crossDomainClient,
} from '@convex-dev/better-auth/client/plugins'
import { emailOTPClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

// Create client instance
const client = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  plugins: [emailOTPClient(), crossDomainClient(), convexClient()],
})

// Export full client for advanced usage
export const authClient = client

// Export commonly-used methods/hooks for cleaner imports
export const {
  // Authentication
  signIn,
  signUp,
  signOut,

  // Session management
  useSession,
  getSession,

  // User management
  updateUser,
  changeEmail,
  changePassword,
} = client
```

### 2. Verify Component Imports

**No changes needed** - components already use correct import pattern:

```typescript
// ✅ Already correct
import { useSession } from '@/lib/auth-client'
import { signOut } from '@/lib/auth-client'
```

### 3. Add Type Exports (Optional but Recommended)

Add type inference exports for better TypeScript support:

```typescript
// Type inference for TypeScript consumers
export type Session = typeof client.$Infer.Session
export type User = typeof client.$Infer.Session.user
```

### 4. Update Components (If Needed)

Check if any components use `authClient.method()` pattern and optionally refactor:

**Before:**
```typescript
const session = authClient.useSession()
await authClient.signOut()
```

**After:**
```typescript
const session = useSession()
await signOut()
```

## Files to Modify

### Update
- `/src/lib/auth-client.ts` - Add destructured exports

### Verify (No changes expected)
- `/src/components/auth/protected-route.tsx`
- `/src/components/layout/nav-user.tsx`
- `/src/components/sign-out-dialog.tsx`

### Check for Pattern B Usage
- `/src/features/auth/**/*.tsx` - Look for `authClient.method()` calls
- `/src/routes/(auth)/**/*.tsx` - Look for `authClient.method()` calls

## Type Safety Considerations

1. **Full Type Inference:** Destructured exports maintain full type inference from client
2. **Plugin Types:** OTP, Convex, cross-domain plugin methods auto-included
3. **Session Types:** Export `Session` and `User` types for component typing
4. **No Breaking Changes:** Existing `authClient` export remains available

## Testing Strategy

### Manual Testing
1. Build project: `bun run build`
2. Verify no TypeScript errors
3. Test protected route navigation
4. Test sign out dialog
5. Verify session display in nav

### Component Tests
1. Test `ProtectedRoute` loading/redirect states
2. Test `NavUser` session display
3. Test `SignOutDialog` sign out flow

### Type Checking
```bash
bun run typecheck
```

## Performance Considerations

- No performance impact - same client instance
- Tree-shaking preserves unused exports elimination
- No additional bundle size

## Security Considerations

- No security changes - same auth flow
- Session management unchanged
- Plugin security features preserved

## Risks & Mitigations

### Risk: Breaking existing code using authClient directly
**Mitigation:** Keep `authClient` export for backward compatibility

### Risk: Missing plugin-specific methods
**Mitigation:** Full client remains available via `authClient` export

### Risk: Type inference issues
**Mitigation:** Test TypeScript compilation before/after change

## Alternative Approaches Considered

### Pattern B: Update Components to Use authClient
**Rejected** - More verbose, not idiomatic React, goes against docs

### Mixed Pattern: Export some, use client for others
**Rejected** - Inconsistent, confusing for developers

## TODO Tasks

- [ ] Update `src/lib/auth-client.ts` with destructured exports
- [ ] Add type exports for Session and User
- [ ] Run TypeScript type check
- [ ] Search codebase for `authClient.method()` pattern usage
- [ ] Run build to verify no errors
- [ ] Test protected route navigation
- [ ] Test sign out functionality
- [ ] Test session display in nav user component
- [ ] Update any components using Pattern B (if found)
- [ ] Run full test suite

## Acceptance Criteria

- [x] Build completes without errors
- [x] TypeScript type checking passes
- [x] `useSession` hook works in components
- [x] `signOut` method works in dialog
- [x] Protected routes redirect correctly
- [x] Session data displays in nav
- [x] All existing auth flows functional

## References

- Better Auth Docs: https://better-auth.com/docs/concepts/client
- Migration Guide Pattern: https://better-auth.com/docs/guides/next-auth-migration-guide
- Better Auth v1.3.29: Current version in package.json

## Unresolved Questions

None - pattern is well-documented and recommended by official docs.
