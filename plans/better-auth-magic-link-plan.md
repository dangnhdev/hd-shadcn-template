# Better Auth + Convex: Magic Link Only with Resend

## Objective
Implement Better Auth with **magic-link only** authentication using Resend email service, integrated with Convex backend.

---

## Why Magic Link + Resend?

### Magic Link Benefits:
- ✅ **Passwordless**: No password management overhead
- ✅ **Secure**: One-time tokens, no password leaks
- ✅ **Better UX**: No password reset flows needed
- ✅ **Simple**: Users just click email link to sign in
- ✅ **Mobile-friendly**: Works seamlessly across devices

### Resend Benefits:
- ✅ **Developer-first**: Modern API, great DX
- ✅ **React Email integration**: Type-safe email templates
- ✅ **Free tier**: 100 emails/day, 3,000/month
- ✅ **Deliverability**: Built-in SPF/DKIM
- ✅ **Simple pricing**: $20/month for 50k emails

### Better Auth UI Benefits:
- ✅ **Shadcn-styled**: Matches your design system
- ✅ **Ready-to-use**: Pre-built auth components
- ✅ **Customizable**: Full control over appearance
- ✅ **Dark mode**: Built-in theme support
- ✅ **Responsive**: Mobile-first design
- ✅ **Type-safe**: Full TypeScript support

---

## Architecture

```
User enters email → Better Auth sends magic link via Resend
→ User clicks link → Authenticated → Session created in Convex
```

**Stack:**
- Frontend: React + Vite + TanStack Router
- Backend: Convex (serverless + real-time DB)
- Auth: Better Auth (magic-link plugin only)
- Email: Resend (for magic link delivery)

---

## Installation

### 1. Install Packages

```bash
# Core dependencies (already installed)
# bun add convex

# Convex Resend Component (official integration)
bun add @convex-dev/resend

# Better Auth with magic-link
bun add better-auth

# Better Auth UI components (shadcn-styled)
bun add @daveyplate/better-auth-ui

# React Email for templates (optional but recommended)
bun add react-email @react-email/components
```

**Note**: We're using `@convex-dev/resend` instead of the standalone `resend` package because it provides:
- ✅ Built-in queueing and batching
- ✅ Durable execution (retries on failure)
- ✅ Idempotency management
- ✅ Rate limiting
- ✅ Native Convex integration

### 2. Get Resend API Key

1. Sign up at https://resend.com
2. Verify your domain (or use onboarding@resend.dev for testing)
3. Create API key from dashboard
4. Copy webhook secret (for delivery tracking)

---

## Configuration

### 1. Configure Convex Resend Component

**`convex/convex.config.ts`** (UPDATE or CREATE)
```typescript
import { defineApp } from "convex/server";
import resend from "@convex-dev/resend/convex.config";

const app = defineApp();
app.use(resend);

export default app;
```

This registers the Resend component with your Convex app, enabling email functionality across your backend.

---

### 2. Environment Variables

**`.env.local`**
```env
# Convex (already configured)
VITE_CONVEX_URL=https://friendly-bear-949.convex.cloud
CONVEX_DEPLOYMENT=dev:friendly-bear-949

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here # generate: openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:5173

# App settings
VITE_APP_NAME=HD Shadcn Template
VITE_APP_URL=http://localhost:5173
```

**Set Convex environment variables:**
```bash
# Required: Resend API Key
bunx convex env set RESEND_API_KEY re_your_api_key_here

# Optional: Webhook secret for delivery tracking
bunx convex env set RESEND_WEBHOOK_SECRET whsec_your_webhook_secret

# Better Auth configuration
bunx convex env set BETTER_AUTH_SECRET $(openssl rand -base64 32)
bunx convex env set BETTER_AUTH_URL http://localhost:5173
bunx convex env set VITE_APP_NAME "HD Shadcn Template"
```

**Note**: Environment variables for Convex components must be set via `bunx convex env set`, not in `.env.local`.

---

### 3. Create Email Sending Function

**`convex/emails.ts`** (NEW)
```typescript
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Initialize Resend component
export const resend = new Resend(components.resend, {});

// Send magic link email
export const sendMagicLinkEmail = internalMutation({
  args: {
    to: v.string(),
    url: v.string(),
    appName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const appName = args.appName || "HD Shadcn Template";

    await resend.sendEmail(ctx, {
      from: "onboarding@resend.dev", // Use your verified domain
      to: args.to,
      subject: `Sign in to ${appName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 40px 20px;
              }
              .button {
                display: inline-block;
                background: #000;
                color: #fff !important;
                padding: 12px 32px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
                margin: 16px 0;
              }
              .footer {
                margin-top: 32px;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Sign in to ${appName}</h1>
              <p>Click the button below to sign in to your account:</p>
              <p>
                <a href="${args.url}" class="button">Sign In</a>
              </p>
              <p class="footer">
                This link will expire in 5 minutes.<br>
                If you didn't request this email, you can safely ignore it.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  },
});
```

---

### 4. Convex Auth Configuration

**`convex/auth.ts`** (NEW)
```typescript
import { convexAuth } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    {
      id: "magic-link",
      type: "email",
      // Send magic link via Convex Resend component
      async sendVerificationRequest({ identifier: email, token, url }) {
        // Call our internal mutation to send email
        await ctx.runMutation(internal.emails.sendMagicLinkEmail, {
          to: email,
          url,
          appName: process.env.VITE_APP_NAME,
        });
      },
      maxAge: 300, // 5 minutes
    },
  ],
});
```

**Benefits of using `@convex-dev/resend`**:
- ✅ **Automatic retries**: Failed emails are retried automatically
- ✅ **Queueing**: Emails are queued and sent reliably
- ✅ **Rate limiting**: Built-in rate limiting prevents API overuse
- ✅ **Idempotency**: Duplicate emails are prevented
- ✅ **Tracking**: Optional webhook integration for delivery status

---

### 5. Convex HTTP Routes (with Webhook Support)

**`convex/http.ts`** (UPDATE or CREATE)
```typescript
import { httpRouter } from "convex/server";
import { components } from "./_generated/api";
import { auth } from "./auth";

const http = httpRouter();

// Better Auth routes
http.route({
  path: "/auth",
  method: "POST",
  handler: auth.handler,
});

http.route({
  path: "/auth",
  method: "GET",
  handler: auth.handler,
});

// Resend webhook for email delivery tracking (optional but recommended)
http.route({
  path: "/resend/webhook",
  method: "POST",
  handler: components.resend.webhook,
});

export default http;
```

**Webhook Setup (Optional)**:
1. Go to Resend dashboard → Webhooks
2. Create webhook with URL: `https://your-deployment.convex.site/resend/webhook`
3. Copy webhook secret
4. Set environment variable:
   ```bash
   bunx convex env set RESEND_WEBHOOK_SECRET whsec_your_webhook_secret
   ```

**Webhook Benefits**:
- Track email delivery status
- Monitor bounces and spam complaints
- Debug email issues in production
- Get real-time delivery confirmations

---

### 4. Update Convex Schema

**`convex/schema.ts`** (UPDATE)
```typescript
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  // Better Auth tables (users, sessions, accounts, etc.)
  ...authTables,

  // Your custom tables
  // Example: Keep existing users table structure but let Better Auth manage it
  // Remove the old users table definition since Better Auth provides it
});

export default schema;
```

---

### 5. Better Auth Client

**`src/lib/auth-client.ts`** (NEW)
```typescript
import { ConvexAuthClient } from "@convex-dev/auth/react";

export const authClient = new ConvexAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_URL,

  // Magic link configuration
  providers: {
    magicLink: {
      id: "magic-link",
      name: "Email",
    },
  },
});

// Export convenience methods
export const {
  useAuthActions,
  useAuth,
  Authenticated,
  Unauthenticated
} = authClient;
```

---

### 6. Update React Providers

**`src/main.tsx`** (UPDATE)
```typescript
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { queryClient } from './lib/query-client'
import { authClient } from './lib/auth-client'
import { ThemeProvider } from './context/theme-provider'
import { FontProvider } from './context/font-provider'
import { routeTree } from './routeTree.gen'
import './styles/index.css'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const router = createRouter({
  routeTree,
  context: { convex },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ConvexProvider client={convex}>
        <ConvexAuthProvider client={convex}>
          <AuthUIProvider
            authClient={authClient}
            navigate={(path) => router.navigate({ to: path })}
          >
            <QueryClientProvider client={queryClient}>
              <ThemeProvider>
                <FontProvider>
                  <RouterProvider router={router} />
                </FontProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </AuthUIProvider>
        </ConvexAuthProvider>
      </ConvexProvider>
    </StrictMode>
  )
}
```

---

## Authentication Components with Better Auth UI

Better Auth UI provides ready-made, shadcn-styled components for authentication. These components are fully customizable and work seamlessly with Better Auth.

### Available Components

1. **`<SignIn />`** - Complete sign-in page with magic link
2. **`<SignedIn>`** - Show content only to authenticated users
3. **`<SignedOut>`** - Show content only to unauthenticated users
4. **`<UserButton />`** - User profile dropdown with avatar
5. **`<UserProfile />`** - Full user profile page

---

### 1. Magic Link Sign In Page

**`src/features/auth/sign-in/index.tsx`** (CREATE)
```typescript
import { SignIn } from '@daveyplate/better-auth-ui'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignIn
        callbackURL="/dashboard"
        appearance={{
          elements: {
            card: "w-full max-w-md",
          }
        }}
      />
    </div>
  )
}
```

**That's it!** The `<SignIn />` component automatically handles:
- Email input with validation
- Magic link sending
- Loading states
- Error handling
- Success messages
- Responsive design
- Dark mode support

---

### 2. User Button Component

**`src/components/user-button.tsx`** (CREATE)
```typescript
import { UserButton } from '@daveyplate/better-auth-ui'

export function UserNav() {
  return (
    <UserButton
      afterSignOutUrl="/auth/sign-in"
      appearance={{
        elements: {
          avatarBox: "h-8 w-8",
          userButtonTrigger: "focus:ring-2 focus:ring-offset-2",
        }
      }}
    />
  )
}
```

The `<UserButton />` component provides:
- User avatar with initials
- Dropdown menu with user info
- Sign out button
- Profile navigation
- Fully styled with shadcn/ui

---

### 3. Conditional Rendering

**`src/components/layout/header.tsx`** (EXAMPLE)
```typescript
import { SignedIn, SignedOut } from '@daveyplate/better-auth-ui'
import { UserButton } from '@/components/user-button'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          HD Template
        </Link>

        <nav className="flex items-center gap-4">
          <SignedOut>
            <Button asChild variant="ghost">
              <Link to="/auth/sign-in">Sign In</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button asChild variant="ghost">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
```

---

### 4. Protected Route Component

**`src/components/auth/protected-route.tsx`** (CREATE)
```typescript
import { ReactNode } from 'react'
import { SignedIn, SignedOut } from '@daveyplate/better-auth-ui'
import { Navigate } from '@tanstack/react-router'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/auth/sign-in" />
      </SignedOut>
    </>
  )
}
```

**Usage in routes:**
```typescript
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>This is protected content</p>
      </div>
    </ProtectedRoute>
  )
}
```

---

### 5. Custom Sign In with Better Auth UI

If you need more customization:

**`src/features/auth/custom-sign-in.tsx`**
```typescript
import { useState } from 'react'
import { useAuth } from '@daveyplate/better-auth-ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Loader2 } from 'lucide-react'

export default function CustomSignIn() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn.magicLink({
        email,
        callbackURL: '/dashboard',
      })
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center">Check your email</CardTitle>
            <CardDescription className="text-center">
              We sent a magic link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Click the link in the email to sign in. The link will expire in 5 minutes.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSent(false)
                setEmail('')
              }}
            >
              Use a different email
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your email to receive a magic link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send magic link
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Using Convex with Auth

### Example Query with Auth

**`convex/posts.ts`** (EXAMPLE)
```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

// Get current user's posts
export const myPosts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .collect();
  },
});

// Create a post
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: userId,
      createdAt: Date.now(),
    });
  },
});
```

---

## React Email Template (Optional but Recommended)

### Setup React Email with Convex Resend

**`emails/magic-link.tsx`** (NEW)
```tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface MagicLinkEmailProps {
  url: string;
  appName: string;
}

export default function MagicLinkEmail({
  url,
  appName = "HD Shadcn Template"
}: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Sign in to {appName}</Text>
            <Text style={paragraph}>
              Click the button below to sign in to your account. This link will
              expire in 5 minutes.
            </Text>
            <Button style={button} href={url}>
              Sign In
            </Button>
            <Hr style={hr} />
            <Text style={footer}>
              If you didn't request this email, you can safely ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const box = {
  padding: '48px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  margin: '0 0 16px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#525252',
  margin: '0 0 24px',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 32px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  color: '#737373',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};
```

---

### Update Email Function to Use React Email

**`convex/emails.ts`** (UPDATE) - Add `'use node'` directive for React Email
```typescript
'use node'; // Required for React Email rendering

import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalAction } from "./_generated/server"; // Use internalAction with 'use node'
import { v } from "convex/values";
import { render } from "@react-email/render";
import MagicLinkEmail from "../emails/magic-link";

// Initialize Resend component
export const resend = new Resend(components.resend, {});

// Send magic link email with React Email template
export const sendMagicLinkEmail = internalAction({
  args: {
    to: v.string(),
    url: v.string(),
    appName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const appName = args.appName || "HD Shadcn Template";

    // Render React Email component
    const emailHtml = await render(
      MagicLinkEmail({
        url: args.url,
        appName,
      })
    );

    await resend.sendEmail(ctx, {
      from: "onboarding@resend.dev", // Use your verified domain
      to: args.to,
      subject: `Sign in to ${appName}`,
      html: emailHtml,
    });
  },
});
```

**Important Notes**:
- ✅ Use `'use node'` directive when using React Email
- ✅ Change from `internalMutation` to `internalAction`
- ✅ React Email provides better email client compatibility
- ✅ Templates are type-safe and reusable

---

## Migration Checklist

### Phase 1: Setup ✅
- [x] Convex already installed and configured
- [ ] Install `@convex-dev/resend`, Better Auth, Better Auth UI packages
- [ ] Get Resend API key (and optional webhook secret)
- [ ] Configure `convex/convex.config.ts` with Resend component
- [ ] Set Convex environment variables (RESEND_API_KEY, etc.)
- [ ] Create `convex/emails.ts` with sendMagicLinkEmail function
- [ ] Set up `convex/auth.ts` with Better Auth configuration
- [ ] Update `convex/http.ts` with auth and webhook routes
- [ ] Update Convex schema with authTables

### Phase 2: Client Setup
- [ ] Create Better Auth client
- [ ] Add AuthUIProvider to main.tsx
- [ ] Create sign-in page using `<SignIn />` component
- [ ] Add `<UserButton />` to header/navigation
- [ ] Create protected route wrapper using `<SignedIn />`

### Phase 3: UI Components
- [ ] Set up `<SignedIn>` and `<SignedOut>` components
- [ ] Configure `<UserButton />` appearance
- [ ] Add conditional navigation (signed in vs signed out)
- [ ] Test responsive design
- [ ] Test dark mode support

### Phase 4: Testing
- [ ] Test magic link email delivery in Resend dashboard
- [ ] Test sign-in flow end-to-end
- [ ] Test session persistence across page reloads
- [ ] Test sign-out functionality
- [ ] Test protected routes redirect correctly
- [ ] Test `<SignedIn>` and `<SignedOut>` components

### Phase 5: Email Templates (Optional)
- [ ] Install React Email
- [ ] Create magic link email template
- [ ] Update auth config to use template
- [ ] Test rendered email in various clients

### Phase 6: Cleanup
- [ ] Remove old auth code (if any)
- [ ] Update all auth-related imports
- [ ] Fix TypeScript errors
- [ ] Test production build
- [ ] Update documentation
- [ ] Verify all Better Auth UI components work correctly

---

## Key Differences

### Password Auth vs Magic Link

| Feature | Password Auth | Magic Link |
|---------|--------------|------------|
| **Sign Up** | Email + Password | Just email |
| **Sign In** | Email + Password | Email → Click link |
| **Security** | Password leaks possible | One-time tokens |
| **UX** | Remembering passwords | No passwords to remember |
| **Reset Flow** | Forgot password flow | No reset needed |
| **Complexity** | Higher | Lower |

### Custom Components vs Better Auth UI

| Feature | Custom Components | Better Auth UI |
|---------|------------------|----------------|
| **Setup Time** | Hours | Minutes |
| **Code Lines** | 200+ lines | 10 lines |
| **Styling** | Manual shadcn setup | Pre-styled |
| **Loading States** | Implement yourself | Built-in |
| **Error Handling** | Manual | Automatic |
| **Dark Mode** | Configure yourself | Automatic |
| **Responsive** | Test and fix | Built-in |
| **Maintenance** | Update yourself | Package updates |
| **Customization** | Full control | Via appearance prop |

---

## Testing Magic Link Locally

### 1. Using Resend Test Mode

```bash
# Use onboarding@resend.dev for testing
# All emails go to your Resend dashboard logs
```

### 2. Check Email Logs

1. Go to https://resend.com/emails
2. View all sent emails
3. Copy magic link URL
4. Test in browser

### 3. Local Development Tips

```typescript
// In development, log the magic link URL
if (process.env.NODE_ENV === 'development') {
  console.log('Magic Link:', url);
}
```

---

## Production Deployment

### 1. Verify Domain with Resend

1. Add domain in Resend dashboard
2. Add DNS records (SPF, DKIM)
3. Wait for verification
4. Update `from` email in auth config

### 2. Update Environment Variables

```env
# Production
BETTER_AUTH_URL=https://yourdomain.com
RESEND_API_KEY=re_prod_xxxxxxxxxx
```

### 3. Configure Convex Production

```bash
bunx convex deploy
bunx convex env set BETTER_AUTH_SECRET $(openssl rand -base64 32) --prod
bunx convex env set BETTER_AUTH_URL https://yourdomain.com --prod
bunx convex env set RESEND_API_KEY re_prod_xxx --prod
```

---

## Troubleshooting

### Magic Link Not Sending

1. Check Resend API key is valid
2. Verify `from` email domain
3. Check Convex logs: `bunx convex logs`
4. Check Resend dashboard for errors

### Magic Link Not Working

1. Check link hasn't expired (5 min default)
2. Verify `BETTER_AUTH_URL` matches your app URL
3. Check Convex HTTP routes are configured
4. Ensure ConvexAuthProvider wraps app

### Session Not Persisting

1. Check cookies are enabled
2. Verify auth configuration in Convex
3. Check browser console for errors
4. Ensure schema includes authTables

---

## Resources

- Better Auth Docs: https://www.better-auth.com
- Better Auth Magic Link Plugin: https://www.better-auth.com/docs/plugins/magic-link
- Convex Docs: https://docs.convex.dev
- Convex Auth: https://docs.convex.dev/auth
- Resend Docs: https://resend.com/docs
- React Email: https://react.email

---

## Next Steps After Implementation

1. **Add User Profile Page**: Let users update their information
2. **Add Email Preferences**: Let users control notification settings
3. **Add Session Management**: Show active sessions, allow revocation
4. **Add Rate Limiting**: Prevent magic link spam
5. **Add Analytics**: Track sign-in success rates
6. **Add Webhooks**: React to auth events (sign-in, sign-out)
7. **Add Multi-tenancy**: If needed using Better Auth organizations plugin

---

## Cost Breakdown

### Free Tier
- Convex: 1GB storage, 1M function calls/month
- Resend: 3,000 emails/month, 100/day
- Better Auth: Free (open source)

### Paid Tier (if needed)
- Convex Pro: $25/month (5GB, 10M calls)
- Resend: $20/month (50k emails)
- Total: ~$45/month for production app

---

## Security Best Practices

1. **Use HTTPS in production**: Required for secure cookies
2. **Set secure cookie flags**: httpOnly, secure, sameSite
3. **Implement rate limiting**: Prevent magic link spam
4. **Log authentication events**: Monitor suspicious activity
5. **Expire tokens quickly**: 5 minutes default is good
6. **Verify email domains**: Block disposable emails if needed
7. **Use Resend webhooks**: Track email delivery status

---

## Notes

- Magic links are **single-use tokens** that expire in 5 minutes
- No password management complexity
- Users can sign in from any device by clicking email link
- Better for B2C apps where convenience > strict security
- Consider adding 2FA plugin later if needed
- Convex handles session storage automatically
- Resend provides excellent deliverability out of the box
