# Better-Auth-Ui - Advanced

**Pages:** 6

---

## Localization

**URL:** https://better-auth-ui.com/advanced/localization

**Contents:**
- Localization
- Localization Overview
- Modifying Strings
- Customizing Strings Per Component

You can fully customize the text strings displayed across all @daveyplate/better-auth-ui components through the provided localization prop. The library ships with a full default localization object AuthLocalization, but you can override any of these defaults easily with custom strings.

To modify default strings, you need to provide your custom localization object within your <AuthUIProvider /> or individual components.

Here's an example of modifying some default strings globally across your application using <AuthUIProvider />:

You can also provide overridden strings on an individual component basis. Here's how you can override strings for just one instance, such as the <AuthCard>:

You can find all available strings to override in the AuthLocalization reference.

**Examples:**

Example 1 (python):
```python
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            Link={Link}
            localization={{
                SIGN_IN: "Log in",
               
...
```

Example 2 (python):
```python
import { AuthCard } from "@daveyplate/better-auth-ui"

export default function AuthPage({ params }: { params: { pathname: string } }) {
    return (
        <div className="flex justify-center items-center">
            <AuthCard
                pathname={params.pathname}
                localization={{
                    SIGN_IN: "Log In",
                    SIGN_UP: "Register an Account",
                    FORGOT_PASSWORD: "Forgot Your Password?",
                    SIGN_IN_DESCRIPTION: "Log in and start using your account.",
                    MAGIC_LINK: "Log in via Email",
         
...
```

---

## Additional Fields

**URL:** https://better-auth-ui.com/advanced/additional-fields

**Contents:**
- Additional Fields
- Advanced Configuration
  - Create Custom Authentication Flow

You may use additionalFields to define extra fields required during signup or settings:

**Examples:**

Example 1 (javascript):
```javascript
<AuthUIProvider
  authClient={authClient}
  additionalFields={{
    company: {
      label: "Company",
      placeholder: "Your company name",
      description: "Enter your company name",
      required: true,
      type: "string"
    },
    age: {
      label: "Age",
      placeholder: "Your age",
      description: "Enter your age",
      instructions: "You must be 18 or older",
      required: true,
      type: "number",
      validate: (value: string) => parseInt(value) >= 18
    }
  }}
  settings={{
    fields: ["company", "age"]
  }}
  signUp={{
    fields: ["company", "age"]
  }}
>
  {
...
```

---

## Organizations

**URL:** https://better-auth-ui.com/advanced/organizations

**Contents:**
- Organizations
- Overview
- Enabling Organizations
- Key Components
  - OrganizationSwitcher
  - SettingsCards with Organization View
  - Organization-Specific Components
- Built-in Roles
- Custom Roles
- Organization Hooks

Organizations allow users to create and manage teams, workspaces, or companies within your application. This feature provides a complete multi-tenant system with role-based access control, member management, and invitation workflows.

The organization system in Better Auth UI provides:

To enable organizations, configure the organization prop in your AuthUIProvider:

The main component for switching between organizations and personal accounts:

The settings component automatically shows organization options when enabled:

Organizations come with three built-in roles:

You can define additional roles for your specific needs:

Access organization data programmatically:

**Examples:**

Example 1 (javascript):
```javascript
<AuthUIProvider
  authClient={authClient}
  organization={{
    logo: {
      upload: async (file) => {
        // Your upload logic
        return uploadedUrl
      },
      size: 256,
      extension: "png"
    },
    customRoles: [
      { role: "developer", label: "Developer" },
      { role: "viewer", label: "Viewer" }
    ]
  }}
>
  {children}
</AuthUIProvider>
```

Example 2 (python):
```python
import { OrganizationSwitcher } from '@daveyplate/better-auth-ui'

<OrganizationSwitcher />
```

Example 3 (python):
```python
import { SettingsCards } from '@daveyplate/better-auth-ui'

// Shows organization settings when view="ORGANIZATION"
<SettingsCards view="ORGANIZATION" />

// Shows organization members when view="MEMBERS"
<SettingsCards view="MEMBERS" />

// Shows all organizations when view="ORGANIZATIONS"
<SettingsCards view="ORGANIZATIONS" />
```

Example 4 (unknown):
```unknown
organization={{
  customRoles: [
    { role: "developer", label: "Developer" },
    { role: "viewer", label: "View Only" },
    { role: "billing", label: "Billing Administrator" }
  ]
}}
```

---

## Custom Auth Paths

**URL:** https://better-auth-ui.com/advanced/custom-auth-paths

**Contents:**
- Custom Auth Paths
  - Step 1: Customize Auth View Paths
- Adjusting Dynamic Auth Route
  - Example usage across your app:
    - Linking to new auth views:
  - Summary of Steps (Recap):

Here's a complete guide on how to customize view paths using the AuthUIProvider component. This example will show you how to change the auth routes from /auth/sign-in and /auth/sign-out to use custom paths such as /auth/login and /auth/logout, respectively.

First, customize the default built-in paths by providing your custom routes through the viewPaths prop on the <AuthUIProvider /> component.

Now your newly configured viewPaths object is as follows:

Next, your authentication page route can dynamically handle these paths. Set up your dynamic authentication page based on these custom routes.

Using Next.js App Router (app router):

You have now successfully customized all your authentication URLs using the shipped customization options while preserving all the other features and integrations seamlessly.

**Examples:**

Example 1 (python):
```python
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            Link={Link}
            viewPaths={{
                SIGN_IN: "login",
                SIG
...
```

Example 2 (python):
```python
import { AuthCard } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"

export function generateStaticParams() {
    return Object.values({
        ...authViewPaths,
        SIGN_IN: "login",
        SIGN_OUT: "logout",
        SIGN_UP: "register",
        FORGOT_PASSWORD: "forgot",
        RESET_PASSWORD: "reset",
        MAGIC_LINK: "magic",
        SETTINGS: "config"
    }).map((pathname) => ({ pathname }))
}

export default async function AuthPage({ params }: { params: Promise<{ pathname: string }> }) {
    const { pathname } = await params

...
```

Example 3 (python):
```python
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex gap-4">
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
            <Link href="/auth/forgot">Forgot Password</Link>
            <Link href="/auth/config">Config</Link>
        </nav>
    )
}
```

---

## Custom Settings

**URL:** https://better-auth-ui.com/advanced/custom-settings

**Contents:**
- Custom Settings
- Overview
  - Quick Comparison
- Option 1: Moving Settings to a Different Base Path
  - Using SettingsCards with pathname
- Option 2: Completely Custom Settings Page
- Option 3: Building Custom Settings Layouts
  - Using Individual Settings Components
  - Individually Using Settings Components
- Handling Authentication for Settings Page

The default authentication components provided by @daveyplate/better-auth-ui include built-in settings pages accessible under the same base path as your auth views (e.g., /auth/settings, /auth/security, etc.).

However, for advanced use cases, you may want to:

You have three primary ways to customize the settings experience:

If you want to keep the built-in settings functionality but move it to a different location (e.g., from /auth/settings to /dashboard/settings), use the settings.basePath option:

With this configuration:

You can combine basePath with other settings options:

When using settings.basePath, you can pass the pathname prop to <SettingsCards /> to automatically determine the current view:

To replace the built-in settings with your own custom implementation, use settings.url:

Important: When settings.url is set, all built-in settings routes will redirect to your custom URL. You're responsible for implementing the entire settings functionality.

For maximum control, you can build your own settings page layouts using individual components.

The easiest way to get started is using the <SettingsCards /> component, which automatically handles displaying all enabled settings. This includes avatar, email, username, password, linked social providers, session management, delete account, and custom additional fields you've provided.

You can customize the appearance using TailwindCSS classes through classNames props as documented in SettingsCards documentation:

For finer-grained control, selectively import the components you want:

Here's a complete example demonstrating an individually composed user settings page:

This example assumes additionalFields are configured via your <AuthUIProvider />:

It's essential that your custom settings page is protected and accessible only by authenticated users. There's a built-in helper useAuthenticate to ensure your settings pages are secured:

**Examples:**

Example 1 (python):
```python
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            settings={{
                basePath: "/dashboard" // Settings views will be at /dashboard
...
```

Example 2 (unknown):
```unknown
settings={{
    basePath: "/dashboard",
    fields: ["image", "name", "age"] // Specify which fields to show
}}
```

Example 3 (python):
```python
import { SettingsCards } from "@daveyplate/better-auth-ui"

export default function SettingsPage({ 
    params 
}: { 
    params: { settings: string[] } 
}) {
    const pathname = `/dashboard/${params.settings?.join("/") || "settings"}`
    
    return (
        <div className="mx-auto max-w-4xl py-12 px-4">
            <SettingsCards pathname={pathname} />
        </div>
    )
}
```

Example 4 (python):
```python
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            settings={{
                url: "/my-custom-settings" // Redirects to your custom setting
...
```

---

## API Keys

**URL:** https://better-auth-ui.com/advanced/api-keys

**Contents:**
- API Keys
- Overview
- Enabling API Keys
  - Advanced Configuration
- Key Components
  - ApiKeysCard
  - In SettingsCards
- API Key Structure
- Using API Keys
  - Client-Side Generation

API Keys provide a secure way for applications and services to authenticate with your API programmatically. Better Auth UI includes a complete API key management system with creation, expiration, and revocation capabilities.

The API key system provides:

To enable API keys, configure the apiKey prop in your AuthUIProvider:

The main component for managing API keys:

API keys automatically appear in settings when enabled:

Generated API keys follow this structure:

Example: app_sk_live_a1b2c3d4e5f6g7h8i9j0

Environment Separation

Attach metadata to track key usage:

Implement rate limiting based on metadata:

Common API key errors:

**Examples:**

Example 1 (unknown):
```unknown
<AuthUIProvider
  authClient={authClient}
  apiKey={true} // Simple enable
>
  {children}
</AuthUIProvider>
```

Example 2 (unknown):
```unknown
<AuthUIProvider
  authClient={authClient}
  apiKey={{
    prefix: "app_",  // Custom prefix for all keys
    metadata: {      // Default metadata for new keys
      environment: "production",
      version: "v1"
    }
  }}
>
  {children}
</AuthUIProvider>
```

Example 3 (python):
```python
import { ApiKeysCard } from '@daveyplate/better-auth-ui'

<ApiKeysCard />
```

Example 4 (python):
```python
import { SettingsCards } from '@daveyplate/better-auth-ui'

// Shows API keys management when view="API_KEYS"
<SettingsCards view="API_KEYS" />
```

---
