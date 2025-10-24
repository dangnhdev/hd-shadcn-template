# Better Auth UI - Email OTP Integration (Simplified)

**Date**: 2025-10-24
**Status**: Ready to implement
**Approach**: Use `<AuthView>` component (10x simpler than custom forms)

---

## Key Discovery

Better Auth UI **DOES** provide pre-built auth views via `<AuthView pathname="sign-in">` that automatically:
- ✅ Handles email OTP flow
- ✅ Manages form state + validation
- ✅ Includes resend logic
- ✅ Shows error messages
- ✅ Styled with shadcn/ui
- ✅ Dark mode ready

**Result**: ~70% less code than custom forms.

---

## What's Already Done ✅

- Better Auth v1.3.29 backend configured
- Email OTP plugin enabled (`otpLength: 6`, `expiresIn: 300s`)
- Convex integration working
- Resend email sending tested
- Packages installed: `@daveyplate/better-auth-ui@3.2.6`

---

## Implementation Plan (2 hours)

### Phase 1: Setup (30min)

#### 1.1 Add Tailwind Import

**File**: `src/index.css` (or `src/styles/globals.css`)

```css
@import "@daveyplate/better-auth-ui/css";
```

#### 1.2 Create Auth Client

**File**: `src/lib/auth-client.ts` (NEW)

```typescript
import { createAuthClient } from 'better-auth/react'
import { emailOTPClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  plugins: [emailOTPClient()]
})

// Export hooks
export const {
  useSession,
  signOut,
  emailOtp: { sendVerificationOtp, verifyEmail }
} = authClient
```

**Notes**:
- `baseURL` must match backend `SITE_URL`
- Exports OTP-specific methods

#### 1.3 Add Providers

**File**: `src/main.tsx`

```typescript
import { ConvexAuthProvider } from '@convex-dev/better-auth/react'
import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { authClient } from './lib/auth-client'

// Existing imports...
import { ConvexProvider } from 'convex/react'
import { convexClient } from './convex-client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convexClient}>
      <ConvexAuthProvider>
        <AuthUIProvider authClient={authClient}>
          <RouterProvider router={router} />
        </AuthUIProvider>
      </ConvexAuthProvider>
    </ConvexProvider>
  </StrictMode>
)
```

**Order matters**: ConvexProvider → ConvexAuthProvider → AuthUIProvider

#### 1.4 Environment Variable

**File**: `.env.local`

```bash
VITE_SITE_URL=http://localhost:5173

# Already configured:
# SITE_URL=http://localhost:5173
# CONVEX_DEPLOYMENT=...
# RESEND_API_KEY=...
# BETTER_AUTH_SECRET=...
```

---

### Phase 2: Auth Pages (45min)

#### 2.1 Create Auth Route Handler

**File**: `src/routes/auth.$pathname.tsx` (NEW - TanStack Router)

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { AuthView } from '@daveyplate/better-auth-ui'

export const Route = createFileRoute('/auth/$pathname')({
  component: AuthPage
})

function AuthPage() {
  const { pathname } = Route.useParams()

  return (
    <main className="container flex min-h-screen items-center justify-center p-4">
      <AuthView pathname={pathname} />
    </main>
  )
}
```

**Routes handled automatically**:
- `/auth/sign-in` - Email OTP sign-in
- `/auth/sign-up` - Registration
- `/auth/sign-out` - Sign-out action
- `/auth/settings` - User settings (protected)

#### 2.2 Delete Old Auth Components

**Remove**:
```bash
rm -rf src/features/auth/sign-in/components/user-auth-form.tsx
rm -rf src/features/auth/otp/
rm -rf src/features/auth/forgot-password/
rm -rf src/stores/auth-store.ts  # Mock auth
```

**Keep** (for now):
- `src/features/auth/auth-layout.tsx` (wrapper for branding)

#### 2.3 Update Sign-In Route

**File**: `src/features/auth/sign-in/index.tsx`

**Before**: Custom form with mock auth
**After**: Redirect to Better Auth UI

```typescript
import { Navigate } from '@tanstack/react-router'

export default function SignInPage() {
  return <Navigate to="/auth/sign-in" />
}
```

**Or delete entirely** and update routing to `/auth/sign-in` directly.

---

### Phase 3: Session & Protected Routes (30min)

#### 3.1 Protected Route Wrapper

**File**: `src/components/auth/protected-route.tsx` (NEW)

```typescript
import { useSession } from '@/lib/auth-client'
import { Navigate } from '@tanstack/react-router'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to="/auth/sign-in" />
  }

  return <>{children}</>
}
```

#### 3.2 Update Nav User Component

**File**: `src/components/layout/nav-user.tsx`

**Replace mock user data**:

```typescript
import { useSession, signOut } from '@/lib/auth-client'

export function NavUser() {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name?.[0] || user.email[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name || 'User'}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

#### 3.3 Add Protected Route to Dashboard

**File**: `src/routes/_authenticated.tsx` (or wherever dashboard routes are)

```typescript
import { ProtectedRoute } from '@/components/auth/protected-route'

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
})
```

---

### Phase 4: Testing (15min)

#### Test Checklist

**Sign-In Flow**:
1. Navigate to `/auth/sign-in`
2. Enter email → Submit
3. Check email (Resend dashboard: https://resend.com/emails)
4. Enter 6-digit OTP → Submit
5. Should redirect to `/` (or dashboard)

**Session Persistence**:
1. Refresh page → Should stay signed in
2. Close browser → Reopen → Should stay signed in

**Protected Routes**:
1. Sign out
2. Try accessing `/dashboard` → Redirect to `/auth/sign-in`
3. Sign in → Access `/dashboard` → Success

**Error Handling**:
1. Wrong OTP → Error message shown
2. Expired OTP → Error + resend option
3. Too many attempts → Locked (3 attempts max)

---

## File Checklist

### New Files ✅
- [ ] `src/lib/auth-client.ts`
- [ ] `src/routes/auth.$pathname.tsx`
- [ ] `src/components/auth/protected-route.tsx`

### Modified Files ✏️
- [ ] `src/index.css` (add Tailwind import)
- [ ] `src/main.tsx` (add providers)
- [ ] `src/components/layout/nav-user.tsx` (use real session)
- [ ] `.env.local` (add VITE_SITE_URL)

### Deleted Files 🗑️
- [ ] `src/features/auth/sign-in/components/user-auth-form.tsx`
- [ ] `src/features/auth/otp/` (entire directory)
- [ ] `src/features/auth/forgot-password/` (entire directory)
- [ ] `src/stores/auth-store.ts`

### Optional Cleanup 🧹
- [ ] Delete `src/features/auth/sign-in/index.tsx` (redirect not needed)
- [ ] Delete `src/features/auth/sign-up/` (if not customizing)
- [ ] Update routing to use `/auth/*` directly

---

## Code Comparison

**Custom OTP Form** (old approach): ~150 lines
```typescript
// Two-step form
// Email validation
// OTP input component
// Resend logic
// Error handling
// Loading states
// Form submission
// Session management
```

**Better Auth UI** (new approach): ~10 lines
```typescript
import { AuthView } from '@daveyplate/better-auth-ui'

<AuthView pathname="sign-in" />
```

**Savings**: 140 lines, ~1 hour dev time

---

## AuthView Features (Built-in)

- ✅ Email validation
- ✅ OTP input (6-digit)
- ✅ Resend OTP button (with countdown)
- ✅ Error messages
- ✅ Loading states
- ✅ Rate limiting UI
- ✅ Responsive layout
- ✅ Dark mode
- ✅ Accessible (ARIA labels)
- ✅ TypeScript types

---

## Backend Configuration

**No changes needed**. Backend already configured:

```typescript
// convex/auth.ts
emailOTP({
  otpLength: 6,          // ✅ Matches Better Auth UI
  expiresIn: 300,        // ✅ 5 minutes
  allowedAttempts: 3,    // ✅ Rate limiting
  storeOTP: "plain"      // ✅ Storage method
})
```

---

## Success Criteria

**Functional**:
- ✅ User receives OTP email (<10s)
- ✅ OTP verification works (<2s)
- ✅ Session persists across refreshes
- ✅ Protected routes redirect correctly
- ✅ Sign-out clears session

**Code Quality**:
- ✅ TypeScript compilation passes
- ✅ No console errors
- ✅ Components follow shadcn/ui patterns
- ✅ Dark mode works

**Performance**:
- ✅ Email delivery: <10 seconds
- ✅ OTP verification: <2 seconds
- ✅ Session check: <100ms
- ✅ Route protection: <50ms

---

## Timeline

**Phase 1** (Setup): 30 min
**Phase 2** (Auth Pages): 45 min
**Phase 3** (Session): 30 min
**Phase 4** (Testing): 15 min

**Total**: ~2 hours

---

## Next Steps

1. Add Tailwind import to `src/index.css`
2. Create `src/lib/auth-client.ts`
3. Add providers to `src/main.tsx`
4. Create `src/routes/auth.$pathname.tsx`
5. Update `nav-user.tsx` to use real session
6. Delete old auth components
7. Test sign-in flow

---

## Troubleshooting

**Issue**: OTP not received
**Fix**: Check Resend dashboard logs at https://resend.com/emails

**Issue**: "CORS error"
**Fix**: Ensure `VITE_SITE_URL` matches `SITE_URL` in backend

**Issue**: Session not persisting
**Fix**: Check `ConvexAuthProvider` wraps `AuthUIProvider`

**Issue**: Protected routes not working
**Fix**: Ensure `ProtectedRoute` checks `session?.user` (not just `session`)

---

## References

- Better Auth UI Docs: https://better-auth-ui.com/integrations/react
- Better Auth OTP Plugin: https://www.better-auth.com/docs/plugins/email-otp
- Convex Better Auth: https://labs.convex.dev/auth/config/better-auth
- Backend Config: `convex/auth.ts:36-49`
