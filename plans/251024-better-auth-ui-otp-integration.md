# Better Auth UI - Email OTP Integration Plan

**Date**: 2025-10-24
**Status**: Ready for Implementation
**Dependencies**: Backend ✅ Better Auth v1.3.29 + Email OTP configured

---

## Current State Analysis

### Backend (Completed ✅)
- Better Auth v1.3.29 configured in `convex/auth.ts`
- Email OTP plugin active: 6-digit code, 5min expiry, 3 attempts
- Resend integration working via `convex/email.ts`
- HTTP routes registered at `/api/auth/*` via `convex/http.ts`
- ConvexBetterAuth component integrated

### Frontend (Template Code - Needs Replacement)
- **Mock auth**: `src/stores/auth-store.ts` (Zustand store with mock user)
- **Mock sign-in**: `src/features/auth/sign-in/components/user-auth-form.tsx` (fake email/password)
- **Template OTP page**: `src/features/auth/otp/index.tsx` (not connected to Better Auth)
- **Static user data**: `src/components/layout/nav-user.tsx` (hardcoded user)
- **No auth client**: No Better Auth React client exists
- **No providers**: ConvexBetterAuthProvider not in `main.tsx`

### Packages Installed
- `better-auth@1.3.29` ✅
- `@convex-dev/better-auth@0.9.6` ✅
- `@daveyplate/better-auth-ui@3.2.6` ✅
- `input-otp@1.4.2` ✅ (for OTP input component)

---

## Better Auth UI Analysis

### ❌ NO Pre-built Email OTP Components
**Finding**: `@daveyplate/better-auth-ui` does NOT provide specific OTP sign-in components.

**Available Components**:
- `<AuthView />` - Generic auth router (sign-in/sign-up/forgot-password)
- `<SignedIn />` / `<SignedOut />` - Conditional rendering
- `<RedirectToSignIn />` / `<RedirectToSignUp />` - Route protection
- `<UserButton />` - User dropdown menu
- `<SettingsCards />` - User settings management
- `<AuthLoading />` - Loading state wrapper

**Missing**: Email OTP specific UI (send code → enter code flow)

### ✅ What We CAN Use
1. **AuthUIProvider** - Auth context (required)
2. **SignedIn/SignedOut** - Conditional rendering
3. **RedirectToSignIn** - Protected routes
4. **useAuthenticate()** - Hook for route protection
5. **Localization** - Custom text for components

### 🛠️ What We MUST Build Custom
1. **Email OTP sign-in flow**: Send code → Enter code → Verify
2. **OTP input component**: Already have `input-otp` package
3. **Error handling**: Invalid/expired codes
4. **Resend logic**: Cooldown timer + resend button

---

## Implementation Strategy

### Approach: Hybrid (Better Auth UI + Custom OTP)
- Use Better Auth UI for: Provider setup, conditional rendering, route protection
- Build custom: Email OTP sign-in flow using Better Auth React client
- Keep: shadcn/ui consistency with existing template

---

## Step-by-Step Implementation

### PHASE 1: Client Setup (30min)

#### 1.1 Create Auth Client
**File**: `src/lib/auth-client.ts` (NEW)

```typescript
import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL!,
  plugins: [emailOTPClient()],
})

// Export hooks
export const { useSession, $Infer } = authClient
export type Session = typeof $Infer.Session.session
```

**Why**:
- Uses Convex Site URL (ends in `.site` not `.cloud`)
- Email OTP plugin adds `signIn.emailOtp()` and `verifyEmailOtp()` methods
- Exports typed session hook

#### 1.2 Add Providers to main.tsx
**File**: `src/main.tsx` (MODIFY)

**Changes**:
```typescript
import { ConvexReactClient } from "convex/react"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "./lib/auth-client"

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

// Inside ReactDOM.createRoot:
<ConvexAuthProvider client={convex}>
  <AuthUIProvider authClient={authClient}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FontProvider>
          <RouterProvider router={router} />
        </FontProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </AuthUIProvider>
</ConvexAuthProvider>
```

**Order matters**: ConvexAuthProvider → AuthUIProvider → QueryClient

#### 1.3 Update .env.local
**File**: `.env.local` (MODIFY)

Add:
```bash
# Already exists:
# VITE_CONVEX_SITE_URL=https://friendly-bear-949.convex.site

# No additional vars needed for client
```

---

### PHASE 2: Custom OTP Sign-In Flow (1.5 hours)

#### 2.1 OTP Sign-In Form Component
**File**: `src/features/auth/sign-in/components/email-otp-form.tsx` (NEW)

```typescript
import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Loader2, Mail } from "lucide-react"

type Step = "email" | "otp"

export function EmailOtpForm({ redirectTo }: { redirectTo?: string }) {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await authClient.signIn.emailOtp({ email })
      toast.success("Verification code sent! Check your email.")
      setStep("otp")
    } catch (error) {
      toast.error("Failed to send code. Try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await authClient.verifyEmailOtp({ email, otp })

      if (result.error) {
        toast.error(result.error.message || "Invalid code")
        return
      }

      toast.success("Sign-in successful!")
      navigate({ to: redirectTo || "/", replace: true })
    } catch (error) {
      toast.error("Verification failed. Try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setLoading(true)
    try {
      await authClient.signIn.emailOtp({ email })
      toast.success("New code sent!")
    } catch (error) {
      toast.error("Failed to resend code")
    } finally {
      setLoading(false)
    }
  }

  if (step === "otp") {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Code sent to <strong>{email}</strong>
          </p>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={() => setStep("email")}
            className="text-xs"
          >
            Change email
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Verification Code</Label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            className="w-full"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">
            Enter the 6-digit code from your email
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          Verify & Sign In
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleResend}
          disabled={loading}
        >
          Resend Code
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSendCode} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <p className="text-xs text-muted-foreground">
          We'll send you a verification code
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : <Mail />}
        Send Verification Code
      </Button>
    </form>
  )
}
```

**Features**:
- Two-step flow: email → OTP
- Uses `input-otp` component for 6-digit code
- Resend functionality
- Error handling with toast
- Auto-redirect after success

#### 2.2 Replace Sign-In Page
**File**: `src/features/auth/sign-in/index.tsx` (MODIFY)

```typescript
import { useSearch } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AuthLayout } from "../auth-layout"
import { EmailOtpForm } from "./components/email-otp-form"

export function SignIn() {
  const { redirect } = useSearch({ from: "/(auth)/sign-in" })

  return (
    <AuthLayout>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">Sign In</CardTitle>
          <CardDescription>
            Enter your email to receive a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailOtpForm redirectTo={redirect} />
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground px-8 text-center text-sm">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
```

**Changes**:
- Remove old `UserAuthForm`
- Add new `EmailOtpForm`
- Update description

---

### PHASE 3: Protected Routes & Session (45min)

#### 3.1 Protected Route Wrapper
**File**: `src/components/auth/protected-route.tsx` (NEW)

```typescript
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RedirectToSignIn />
      <SignedIn>{children}</SignedIn>
    </>
  )
}
```

**Usage in routes**:
```typescript
// Example: src/routes/_authenticated/index.tsx
import { ProtectedRoute } from "@/components/auth/protected-route"

export function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Dashboard content</div>
    </ProtectedRoute>
  )
}
```

#### 3.2 Update Nav User Component
**File**: `src/components/layout/nav-user.tsx` (MODIFY)

Replace hardcoded user with session:

```typescript
import { useSession } from "@/lib/auth-client"
import { SignedIn, SignedOut } from "@daveyplate/better-auth-ui"
import { Link } from "@tanstack/react-router"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"
import useDialogState from "@/hooks/use-dialog-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SignOutDialog } from "@/components/sign-out-dialog"

export function NavUser() {
  const { data: session } = useSession()
  const { isMobile } = useSidebar()
  const [open, setOpen] = useDialogState()

  const user = {
    name: session?.user?.name || session?.user?.email || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
  }

  return (
    <>
      <SignedIn>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ms-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-start text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/settings/account">
                      <BadgeCheck />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <CreditCard />
                      Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings/notifications">
                      <Bell />
                      Notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setOpen(true)}
                >
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <SignOutDialog open={!!open} onOpenChange={setOpen} />
      </SignedIn>

      <SignedOut>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/sign-in">
              <SidebarMenuButton size="lg">
                <LogOut className="rotate-180" />
                Sign In
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SignedOut>
    </>
  )
}
```

**Changes**:
- Remove `user` prop from component signature
- Use `useSession()` hook
- Wrap in `<SignedIn>` / `<SignedOut>`
- Show "Sign In" button when logged out

#### 3.3 Update SignOutDialog
**File**: `src/components/sign-out-dialog.tsx` (MODIFY)

Replace mock sign-out with real:

```typescript
import { useNavigate } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type SignOutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()

  async function handleSignOut() {
    try {
      await authClient.signOut()
      toast.success("Signed out successfully")
      navigate({ to: "/sign-in", replace: true })
    } catch (error) {
      toast.error("Failed to sign out")
      console.error(error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

#### 3.4 Update AppSidebar
**File**: `src/components/layout/app-sidebar.tsx` (MODIFY)

```typescript
import { useLayout } from "@/context/layout-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AppTitle } from "./app-title"
import { sidebarData } from "./data/sidebar-data"
import { NavGroup } from "./nav-group"
import { NavUser } from "./nav-user"

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser /> {/* Remove user prop */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
```

---

### PHASE 4: Cleanup & Testing (30min)

#### 4.1 Remove Old Files
**Delete**:
- ❌ `src/stores/auth-store.ts` (Zustand mock auth)
- ❌ `src/features/auth/sign-in/components/user-auth-form.tsx` (old form)
- ❌ `src/features/auth/otp/components/otp-form.tsx` (template OTP)
- ❌ `src/features/auth/otp/index.tsx` (template OTP page)
- ❌ `src/routes/(auth)/otp.tsx` (if exists)

#### 4.2 Update Route Config
Check TanStack Router routes - ensure no references to deleted components

#### 4.3 Testing Checklist
**Manual Tests**:
1. ✅ Navigate to `/sign-in`
2. ✅ Enter email → "Send Verification Code"
3. ✅ Check email for 6-digit OTP
4. ✅ Enter OTP → "Verify & Sign In"
5. ✅ Verify redirect to dashboard
6. ✅ Check sidebar shows user email/avatar
7. ✅ Test "Sign Out" → redirect to `/sign-in`
8. ✅ Test protected route without auth → redirect
9. ✅ Test session persistence (refresh page)
10. ✅ Test invalid OTP → error message
11. ✅ Test resend code → new email
12. ✅ Test expired code (wait 5min+)

**Error Cases**:
- Invalid OTP → show error toast
- Expired OTP → show error + resend option
- Network failure → show error message
- Email not found → backend handles

---

## File Checklist

### New Files
- ✅ `src/lib/auth-client.ts`
- ✅ `src/features/auth/sign-in/components/email-otp-form.tsx`
- ✅ `src/components/auth/protected-route.tsx`

### Modified Files
- ✅ `src/main.tsx` (add providers)
- ✅ `src/features/auth/sign-in/index.tsx` (replace form)
- ✅ `src/components/layout/nav-user.tsx` (use session)
- ✅ `src/components/layout/app-sidebar.tsx` (remove user prop)
- ✅ `src/components/sign-out-dialog.tsx` (real sign-out)

### Deleted Files
- ❌ `src/stores/auth-store.ts`
- ❌ `src/features/auth/sign-in/components/user-auth-form.tsx`
- ❌ `src/features/auth/otp/components/otp-form.tsx`
- ❌ `src/features/auth/otp/index.tsx`

### No Changes Needed
- ✅ `convex/auth.ts` (already configured)
- ✅ `convex/http.ts` (already configured)
- ✅ `.env.local` (already has VITE_CONVEX_SITE_URL)
- ✅ `package.json` (all deps installed)

---

## Timeline Estimate

**PHASE 1**: Client Setup - 30min
**PHASE 2**: OTP Sign-In Flow - 1.5 hours
**PHASE 3**: Protected Routes & Session - 45min
**PHASE 4**: Cleanup & Testing - 30min

**Total**: ~3 hours 15 min

---

## Success Criteria

### Functional
- ✅ User receives OTP email
- ✅ User enters OTP and signs in
- ✅ Session persists across refreshes
- ✅ Protected routes redirect unauthenticated users
- ✅ Sign-out works correctly
- ✅ User info displays in sidebar

### Code Quality
- ✅ TypeScript compilation passes
- ✅ No console errors
- ✅ shadcn/ui consistency maintained
- ✅ Dark mode works
- ✅ Responsive design

### Performance
- ✅ Email delivery < 10s
- ✅ OTP verification < 2s
- ✅ Session check < 100ms

---

## Known Limitations

### Email OTP Only
- No password fallback
- No social providers (GitHub/Google)
- No magic link option
- No passkeys

**Future Enhancement**: Add email/password as fallback if needed

### Better Auth UI Usage
- NOT using `<AuthView>` (doesn't support OTP)
- NOT using `<UserButton>` (custom nav-user instead)
- ONLY using: SignedIn, SignedOut, RedirectToSignIn, AuthUIProvider

### Custom Components Built
- Email OTP form (two-step flow)
- OTP input (using `input-otp`)
- Resend logic
- Error handling

---

## Unresolved Questions

1. **User Profile Management**: How to update user name/avatar after OTP sign-in?
   - Better Auth doesn't collect name during OTP flow
   - Options: Add profile completion step OR use email as name initially

2. **First-Time User Flow**: Distinguish sign-up vs sign-in?
   - Current: Same flow (OTP works for both)
   - Backend creates user if email doesn't exist
   - May want separate UI for clarity

3. **Session Duration**: How long should sessions last?
   - Better Auth default: 7 days
   - Configurable in `convex/auth.ts`

4. **Rate Limiting**: Prevent OTP spam?
   - Backend handles via `allowedAttempts: 3`
   - May need additional rate limiting per email

5. **Email Verification**: Require email verification?
   - Current: Not required (OTP confirms email ownership)
   - May want additional verification for sensitive operations

---

## Next Steps

1. **Start Implementation**: Follow phases 1-4 sequentially
2. **Test Locally**: Complete all test cases in section 4.3
3. **Update Documentation**: Add auth flow diagrams to docs
4. **Production Deploy**: Update env vars for production Convex/Resend
5. **Monitor**: Check Resend dashboard for email delivery rates

---

## References

- Better Auth Docs: https://www.better-auth.com/docs
- Better Auth UI: https://better-auth-ui.daveyplate.dev
- Email OTP Plugin: https://www.better-auth.com/docs/plugins/email-otp
- Convex Better Auth: https://labs.convex.dev/auth/config/better-auth
- Input OTP Component: https://input-otp.rodz.dev

---

## Notes

- **Why not use Better Auth UI components?**: No pre-built OTP flow components
- **Why keep AuthUIProvider?**: Provides auth context for SignedIn/SignedOut
- **Why custom OTP form?**: Need two-step flow (email → code) not in library
- **Why keep input-otp package?**: Best shadcn-compatible OTP input
- **Integration level**: Medium - uses auth client + some UI helpers, builds custom flow
