# Better-Auth-Ui - Integrations

**Pages:** 3

---

## Next.js

**URL:** https://better-auth-ui.com/integrations/next-js

**Contents:**
- Next.js
- Starter Project
- App Router
  - AuthUIProvider
  - Auth Pages
  - Account Pages
  - Organization Pages
- Pages Router
  - AuthUIProvider
  - Auth Pages

This guide covers integrating @daveyplate/better-auth-ui into your Next.js project.

Want to skip the installation? Check out the starter here:

App Router: GitHub - Demo

Pages Router: GitHub - Demo

Follow these steps to set up @daveyplate/better-auth-ui in your Next.js project using the App Router:

The first step is to set up the <AuthUIProvider /> client component with your authClient, wrapping your layout. This is required to provide the context & hooks to your authentication components across your application.

Note: Since the Next.js App Router caches routes by default, navigation to protected routes may fail until you perform a router.refresh() to clear the cache. To prevent this issue, you must use router.refresh() in the provided onSessionChange callback. This forces Next.js to clear the router cache and reload middleware-protected content, ensuring subsequent navigations accurately reflect the current auth state.

Once configured, wrap your layout component with the Providers component:

The <AuthUIProvider /> can be fully customized with plugins, styles, localization and more. For more information and all available props, see the <AuthUIProvider /> component documentation.

Create a dynamic route segment for authentication views in app/auth/[authView]/page.tsx.

The newly created dynamic route covers the following paths by default:

Ensure that any links to the authentication process utilize these routes accordingly. All routes will render the <AuthView /> component and automatically handle navigation and authentication flow.

If you prefer slug-based org URLs, set organization={{ pathMode: "slug", basePath: "/organization", slug: currentSlug }} in the AuthUIProvider and structure your routes accordingly:

Follow these steps to set up @daveyplate/better-auth-ui in your Next.js project using the Pages Router:

First set up the <AuthUIProvider /> within your custom App component in _app.tsx.

Now the authentication context is available across your entire application.

Create a page with a dynamic segment in your Pages directory in pages/auth/[authView].tsx

These routes match the list shown in the App Router section above.

**Examples:**

Example 1 (python):
```python
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => {
                // Clear router cache (protected routes)
                router.refr
...
```

Example 2 (python):
```python
import type { ReactNode } from "react"
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
```

Example 3 (python):
```python
import { AuthView } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"

export const dynamicParams = false

export function generateStaticParams() {
    return Object.values(authViewPaths).map((path) => ({ path }))
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params
    
    return (
        <main className="container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
            <AuthView path={path} />
        </main>
    )
}
```

Example 4 (python):
```python
import { AccountView } from "@daveyplate/better-auth-ui"
import { accountViewPaths } from "@daveyplate/better-auth-ui/server"

export const dynamicParams = false

export function generateStaticParams() {
    return Object.values(accountViewPaths).map((path) => ({ path }))
}

export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params

    return (
        <main className="container p-4 md:p-6">
            <AccountView path={path} />
        </main>
    )
}
```

---

## TanStack Start

**URL:** https://better-auth-ui.com/integrations/tanstack-start

**Contents:**
- TanStack Start
- Starter Project
- Installation
  - Set up the Auth Provider
  - Configure the Root Route
- Setting Up Routes
  - Auth Pages
  - Account Pages
  - Organization Pages

This guide covers integrating @daveyplate/better-auth-ui v3 with TanStack Start. We also install @daveyplate/better-auth-tanstack to handle the authentication state and queries.

Want to skip the installation? Check out the starter here:

TanStack Start requires setting up providers slightly differently than a standard React application. Create a root-level provider component:

Note how we use TanStack Router's useRouter hook and Link component to handle navigation.

Update your root route to use the Providers component:

TanStack Start uses a file-based routing system. Here's how to set up your authentication, account, and organization routes using the new v3 containers.

Create the following route for authentication views:

This dynamic route covers all authentication paths, such as sign-in, sign-up, magic-link, forgot-password, two-factor, recover-account, reset-password, sign-out, and the internal callback.

Create a dynamic route for account settings using the AccountView container (defaults to the /account base path):

You can customize the base path via the provider using account={{ basePath: "/account" }} if needed.

Create a dynamic route for organization settings using the OrganizationView container (defaults to the /organization base path):

If you prefer slug-based org URLs, set organization={{ pathMode: "slug", basePath: "/organization", slug: currentSlug }} in the provider and structure your routes accordingly:

This setup provides a solid foundation for integrating Better Auth UI v3 with TanStack Start. You'll get all the benefits of TanStack's powerful routing system along with Better Auth UI's new container-based authentication and settings experiences.

**Examples:**

Example 1 (python):
```python
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack"
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack"
import { Link, useRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

import { authClient } from "./lib/auth-client"

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60
        }
    }
})

export function Providers({ children }: { children: ReactNode }) {
    const router =
...
```

Example 2 (python):
```python
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"
import type { ReactNode } from "react"

import { Header } from "@/components/header"
import globalsCss from "@/styles/globals.css?url"
import { Providers } from "../providers"

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                title: "Better Auth TanStack Starter"
      
...
```

Example 3 (python):
```python
import { cn } from "@/lib/utils"
import { AuthView } from "@daveyplate/better-auth-ui"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/$authView")({
    component: RouteComponent
})

function RouteComponent() {
    const { authView } = Route.useParams()

    return (
        <main className="container flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
            <AuthView pathname={authView} />

            <p className={cn(["callback", "sign-out"].includes(authView) && "hidden", "text-muted-foreground text-xs")}
...
```

Example 4 (python):
```python
import { AccountView } from "@daveyplate/better-auth-ui"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/account/$accountView")({
    component: RouteComponent
})

function RouteComponent() {
    const { accountView } = Route.useParams()
    return (
        <main className="container p-4 md:p-6">
            <AccountView pathname={accountView} />
        </main>
    )
}
```

---

## React

**URL:** https://better-auth-ui.com/integrations/react

**Contents:**
- React
- Setting up AuthUIProvider
- Creating Auth Pages

This guide covers integrating @daveyplate/better-auth-ui into your React project.

First, set up <AuthUIProvider /> as it provides context and hooks required by all subsequent authentication components. Create a top-level provider to encapsulate your app:

Wrap your root component with the newly created Providers component in your main app entry point, typically in src/main.tsx or src/index.tsx.

Configure routes to render <AuthView> for authentication views using React Router.

Create a dynamic authentication route such as auth/[pathname].tsx inside your src directory. Here's a recommended setup:

Use React Router to configure these dynamic authentication routes:

The dynamic segment [pathname] covers the following default authentication views:

Your authentication flow is now completely set up and supporting full customization capabilities.

**Examples:**

Example 1 (python):
```python
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useNavigate, NavLink } from "react-router-dom"

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
      <AuthUIProvider
        authClient={authClient}
        navigate={navigate}
        Link={NavLink}
      >
          {children}
      </AuthUIProvider>
    )
}
```

Example 2 (python):
```python
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
import { Providers } from "./Providers"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Providers>
      <App />
    </Providers>
  </BrowserRouter>
)
```

Example 3 (python):
```python
import { useParams } from "react-router-dom"
import { AuthView } from "@daveyplate/better-auth-ui"

export default function AuthPage() {
  const { pathname } = useParams()

  return (
    <main className="container flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AuthView pathname={pathname} />
    </main>
  )
}
```

Example 4 (python):
```python
import { Routes, Route } from "react-router-dom"
import AuthPage from "./pages/auth/AuthPage"

function App() {
  return (
    <Routes>
      <Route path="/auth/:pathname" element={<AuthPage />} />
    </Routes>
  )
}
```

---
