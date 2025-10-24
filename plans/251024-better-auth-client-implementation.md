# Better Auth Client Implementation Plan

**Date**: 2025-10-24
**Status**: In Progress (Phase 2-5)
**Dependencies**: Backend completed (Phase 0-1) ✅

---

## Context

**What's Done**:
- ✅ Better Auth v1.3.29 + Email OTP plugin configured
- ✅ Convex integration (@convex-dev/better-auth)
- ✅ HTTP routes at `/api/auth`
- ✅ React Email templates (verify, magic-link, reset, OTP)
- ✅ Resend integration working

**What's Left**:
- Phase 2: Client setup
- Phase 3: UI components
- Phase 4: Testing
- Phase 5: Production

**Decisions**:
- Use Better Auth UI (@daveyplate/better-auth-ui v3.2.6)
- Implement client first, testing later

---

## Phase 2: Client Setup (~45 min)

### 2.1 Create Auth Client (`src/lib/auth-client.ts`)

```typescript
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL || 'http://localhost:3000'
})

export const {
  signIn,
  signOut,
  useSession,
  signUp,
  // Email OTP methods
  sendOtp,
  verifyOtp
} = authClient
```

**Notes**:
- Uses Vite env vars
- Exports hooks + methods
- Includes OTP methods from plugin

### 2.2 Add ConvexBetterAuthProvider

**File**: `src/main.tsx`

```typescript
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { convexClient } from './convex-client'

// Wrap app with ConvexBetterAuthProvider
<ConvexProvider client={convexClient}>
  <ConvexBetterAuthProvider>
    <AuthUIProvider> {/* Phase 3 */}
      <App />
    </AuthUIProvider>
  </ConvexBetterAuthProvider>
</ConvexProvider>
```

**Purpose**:
- Syncs Better Auth session with Convex
- Enables auth in Convex queries/mutations
- Required for backend auth to work

### 2.3 Environment Variables

**File**: `.env.local`

```bash
# Better Auth
VITE_BETTER_AUTH_URL=http://localhost:5173

# Already configured:
# CONVEX_DEPLOYMENT=...
# RESEND_API_KEY=...
# BETTER_AUTH_SECRET=...
```

**Validation**:
```bash
bun run typecheck  # Should pass
```

---

## Phase 3: Better Auth UI Integration (~1 hour)

### 3.1 Add AuthUIProvider

**Install**: Already installed (@daveyplate/better-auth-ui v3.2.6)

**File**: `src/main.tsx`

```typescript
import { AuthUIProvider } from '@daveyplate/better-auth-ui'

<AuthUIProvider authClient={authClient}>
  <App />
</AuthUIProvider>
```

**Purpose**: Provides UI components with auth context

### 3.2 Replace Sign-In Page

**Current**: Template auth routes exist (`src/app/auth/sign-in.tsx`, `otp.tsx`)

**Action**: Replace with Better Auth UI components

**File**: `src/app/auth/sign-in.tsx`

```typescript
import { SignIn } from '@daveyplate/better-auth-ui'

export function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        otpEnabled={true}
        redirectTo="/dashboard"
      />
    </div>
  )
}
```

**Features**:
- Email OTP (6-digit code)
- Auto-redirect after sign-in
- Shadcn-styled
- Dark mode support

### 3.3 Add User Button

**File**: `src/layouts/main-layout.tsx` (or header component)

```typescript
import { UserButton } from '@daveyplate/better-auth-ui'

export function MainLayout() {
  return (
    <header>
      <UserButton
        showEmail={true}
        appearance={{
          elements: {
            userButtonPopover: 'rounded-lg border shadow-lg'
          }
        }}
      />
    </header>
  )
}
```

**Features**:
- Avatar display
- Email/name
- Sign-out button
- Dropdown menu

### 3.4 Protected Routes

**File**: `src/components/auth/protected-route.tsx`

```typescript
import { useSession } from '@/lib/auth-client'
import { Navigate } from '@tanstack/react-router'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to="/auth/sign-in" />
  }

  return <>{children}</>
}
```

**Usage**:
```typescript
// In route config
<Route path="/dashboard" component={DashboardPage} />
// Wrap with ProtectedRoute in component
```

### 3.5 Conditional Rendering

**Components**: `<SignedIn>`, `<SignedOut>`

**File**: `src/app/home.tsx`

```typescript
import { SignedIn, SignedOut } from '@daveyplate/better-auth-ui'

export function HomePage() {
  return (
    <>
      <SignedOut>
        <Link to="/auth/sign-in">Sign In</Link>
      </SignedOut>
      <SignedIn>
        <Link to="/dashboard">Dashboard</Link>
      </SignedIn>
    </>
  )
}
```

---

## Phase 4: Testing (~1 hour)

### 4.1 Manual Testing

**Test Flow**:
1. Navigate to `/auth/sign-in`
2. Enter email
3. Check email for OTP code
4. Enter OTP
5. Verify redirect to `/dashboard`
6. Check `UserButton` displays correctly
7. Test sign-out
8. Verify redirect to home

**Email Check**:
- Resend dashboard: https://resend.com/emails
- Logs should show delivery status

### 4.2 Protected Route Testing

**Test Cases**:
1. Access `/dashboard` without auth → redirect to sign-in
2. Sign in → access `/dashboard` → success
3. Sign out → access `/dashboard` → redirect to sign-in

### 4.3 Session Persistence

**Test**:
1. Sign in
2. Refresh page
3. Session should persist (no redirect)
4. Close browser
5. Reopen → session should restore

### 4.4 Error Handling

**Test**:
1. Invalid OTP code → error message
2. Expired OTP → error + resend option
3. Network failure → error message
4. Email not sent → error message

---

## Phase 5: Production Deployment (~30 min)

### 5.1 Environment Variables

**Production `.env`**:
```bash
# Convex
CONVEX_DEPLOYMENT=prod:your-deployment

# Better Auth
BETTER_AUTH_SECRET=<generate-new-secret>
VITE_BETTER_AUTH_URL=https://yourdomain.com

# Resend
RESEND_API_KEY=<production-api-key>
```

**Generate Secret**:
```bash
openssl rand -base64 32
```

### 5.2 Resend Domain Setup

**Steps**:
1. Add domain in Resend dashboard
2. Verify DNS records
3. Update `FROM_EMAIL` in `convex/resend.config.ts`
4. Test email delivery

**Production Email**:
```typescript
// convex/resend.config.ts
export const FROM_EMAIL = 'noreply@yourdomain.com'
```

### 5.3 Deploy

**Commands**:
```bash
# Deploy Convex
npx convex deploy --prod

# Build frontend
bun run build

# Deploy to hosting (Vercel, Netlify, etc.)
# ... deployment commands
```

### 5.4 Post-Deployment Testing

**Checklist**:
- [ ] Sign-in flow works
- [ ] Emails delivered
- [ ] Session persistence
- [ ] Protected routes work
- [ ] Sign-out works
- [ ] No console errors

---

## File Checklist

### New Files
- [ ] `src/lib/auth-client.ts`
- [ ] `src/components/auth/protected-route.tsx`

### Modified Files
- [ ] `src/main.tsx` (add providers)
- [ ] `src/app/auth/sign-in.tsx` (replace with Better Auth UI)
- [ ] `src/layouts/main-layout.tsx` (add UserButton)
- [ ] `.env.local` (add VITE_BETTER_AUTH_URL)

### Optional Updates
- [ ] Replace `src/app/auth/otp.tsx` with Better Auth UI
- [ ] Update routing for sign-up page
- [ ] Add loading states
- [ ] Add error boundaries

---

## Success Criteria

**Functional**:
- ✅ User can sign in with email OTP
- ✅ User can sign out
- ✅ Protected routes redirect correctly
- ✅ Session persists across refreshes
- ✅ Emails delivered successfully

**Code Quality**:
- ✅ TypeScript compilation passes
- ✅ No console errors
- ✅ Components follow shadcn conventions
- ✅ Dark mode works

**Performance**:
- ✅ Sign-in flow < 3 seconds
- ✅ Email delivery < 10 seconds
- ✅ Session check < 100ms

---

## Timeline

**Phase 2**: 45 min (client setup)
**Phase 3**: 1 hour (UI components)
**Phase 4**: 1 hour (testing)
**Phase 5**: 30 min (production)

**Total**: ~3 hours 15 min

---

## Next Steps

1. Start with Phase 2: Create `src/lib/auth-client.ts`
2. Add providers to `main.tsx`
3. Replace sign-in page with Better Auth UI
4. Test locally
5. Deploy to production

---

## References

- Better Auth Docs: https://www.better-auth.com
- Better Auth UI: https://github.com/daveyplate/better-auth-ui
- Convex Better Auth: https://labs.convex.dev/auth/config/better-auth
- Backend Implementation: `archive/better-auth-otp-phase1-summary.md`
