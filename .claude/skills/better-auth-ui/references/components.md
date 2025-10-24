# Better-Auth-Ui - Components

**Pages:** 31

---

## <PasskeysCard />

**URL:** https://better-auth-ui.com/components/passkeys-card

**Contents:**
- <PasskeysCard />
- Import
- Usage
- Props
- Example
- Features

Displays and manages user's passkeys/WebAuthn credentials

**Examples:**

Example 1 (python):
```python
import { PasskeysCard } from "@better-auth/ui-react/components"
```

Example 2 (unknown):
```unknown
<PasskeysCard />
```

Example 3 (python):
```python
import { PasskeysCard } from "@better-auth/ui-react/components"

export function SecuritySettings() {
    return (
        <div className="space-y-4">
            <PasskeysCard />
        </div>
    )
}
```

---

## <RedirectToSignIn />

**URL:** https://better-auth-ui.com/components/redirect-to-sign-in

**Contents:**
- <RedirectToSignIn />
- Usage
- Example

The <RedirectToSignIn /> component automatically redirects unauthenticated users to the sign-in page. If the user is already authenticated, this component will render nothing and allow the user to view the content normally.

Useful for wrapping pages or routes that require users to be signed in.

Here's a practical example of enforcing authentication for private routes:

In this example, we're ensuring that the user is redirected to the sign-in page if they are not logged in.

**Examples:**

Example 1 (python):
```python
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"

export default function ProtectedPage() {
    return (
        <>
            <RedirectToSignIn />

            <SignedIn>
                You can see this content only if you are authenticated.
            </SignedIn>
        </>
    )
}
```

Example 2 (python):
```python
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RedirectToSignIn />
      
      <SignedIn>
        {children}
      </SignedIn>
    </>
  )
}
```

---

## <EmailTemplate />

**URL:** https://better-auth-ui.com/components/email-template

**Contents:**
- <EmailTemplate />
- Usage
- Reference

The <EmailTemplate /> component lets you easily build responsive HTML emails with consistent styling for your authentication flows. It's specifically designed to integrate seamlessly with Better Auth.

This example demonstrates implementing the email verification notification with the <EmailTemplate />:

This example demonstrates using the component specifically to send email verification messages. You can easily adapt it to suit other use cases like password reset, magic links, and more, by adjusting the content, action, and heading.

The following props can be passed to the <EmailTemplate /> component:

**Examples:**

Example 1 (python):
```python
import { Resend } from "resend"
import { EmailTemplate } from "@daveyplate/better-auth-ui/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const name = user.name || user.email.split("@")[0]

            await resend.emails.send({
                from: fromEmail,
                to: user.email,
                subject: "Verify your email address"
...
```

---

## <SettingsCards />

**URL:** https://better-auth-ui.com/components/settings-cards

**Contents:**
- <SettingsCards />
- Default Settings Page Behavior
- Overriding Built-in Settings URL
- Using <SettingsCards /> on Your Custom Page
- Customization Options
  - Customizing Styles with classNames
  - All available settings included in SettingsCards:
    - Custom Additional Fields

The <SettingsCards /> component provides a convenient plug-and-play UI for managing user account settings. It includes a comprehensive suite of manageable account settings, such as changing passwords and email addresses, updating avatars, managing linked providers, handling active sessions, and more.

This component automatically leverages all the features you have enabled via the <AuthUIProvider /> and provides a seamless user settings UI out of the box.

By default, the built-in <AuthView /> component automatically displays <SettingsCards /> when the /auth/settings route is accessed. If you prefer to handle user settings on a custom route or component, you can override this behavior using the settings.url prop.

To use your own custom settings route and avoid using the default included settings card, you can specify the settings.url prop within your <AuthUIProvider /> configuration:

By setting the settings.url as shown above, the built-in /auth/settings page will also automatically redirect users to your specified /dashboard/settings page.

You can then easily utilize the provided <SettingsCards /> component directly in your custom settings route within your app's layout. Here's how you might set up a properly protected custom settings route in your framework of choice:

This will provide users a customizable, fully-styled settings experience without requiring you to create all components yourself.

You can customize the UI extensively by passing TailwindCSS classes or customizing provided class names through the classNames prop.

Using Tailwind utility classes, you can fully customize all card states. Here's an example to illustrate significant styling customization:

The <SettingsCards /> also supports displaying any custom additionalFields you've provided via the settings.fields prop of the <AuthUIProvider />:

These fields appear alongside the existing provided setting cards automatically.

<AcceptInvitationCard />

<AccountSettingsCards />

A collection of account management cards for user profile settings

**Examples:**

Example 1 (python):
```python
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
                url: "/dashboard/settings"  // Your custom settings page URL
            }}

...
```

Example 2 (python):
```python
import { SettingsCards } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
  return (
    <div className="flex justify-center py-12 px-4">
      <SettingsCards className="max-w-xl" />
    </div>
  )
}
```

Example 3 (unknown):
```unknown
<SettingsCards
  className="max-w-xl mx-auto"
  classNames={{
    card: {
      base: "border-blue-500",
      header: "bg-blue-50",
      title: "text-blue-600 text-xl",
      description: "text-muted-foreground",
      content: "bg-blue-50",
      footer: "bg-blue-500/5",
      button: "text-white bg-blue-600 hover:bg-blue-700",
      input: "bg-background placeholder:text-muted-foreground/50"
    }
  }}
/>
```

Example 4 (unknown):
```unknown
<AuthUIProvider
  authClient={authClient}
  additionalFields={{
    age: {
      label: "Age",
      placeholder: "Your age",
      description: "Please enter your age",
      required: true,
      type: "number",
    },
    newsletter: {
      label: "Receive our newsletter",
      description: "Subscribe to receive newsletters.",
      required: false,
      type: "boolean",
    }
  }}
  settings={{
    fields: ["age", "newsletter"]
  }}
>
  {children}
</AuthUIProvider>
```

---

## <UpdateAvatarCard />

**URL:** https://better-auth-ui.com/components/update-avatar-card

**Contents:**
- <UpdateAvatarCard />
- Usage
- Reference
- Styling
- Notes

The <UpdateAvatarCard /> component is a pre-built UI element for users to easily manage and update their avatar image. It seamlessly integrates with the AuthUIProvider and utilizes either a custom or built-in avatar upload implementation.

Here's how to include the <UpdateAvatarCard /> component within your custom settings page. If you don't provide an avatar.upload function, the component will store the avatar image as a base64 string in database.

You can optionally provide avatar.upload prop within your AuthUIProvider. You can also provide an optional avatar.delete function that will be called when the user deletes their avatar so you can clean up your storage/CDN:

These are the available props for <UpdateAvatarCard />:

The classNames prop is useful for customizing inner elements using Tailwind classes:

Avatars are auto-cropped, optimized, and resized before uploading:

Displays and manages user's passkeys/WebAuthn credentials

<UpdateUsernameCard />

**Examples:**

Example 1 (python):
```python
import { UpdateAvatarCard } from "@daveyplate/better-auth-ui"

export default function CustomSettings() {
    return (
        <div className="flex flex-col gap-6">
            <UpdateAvatarCard />
        </div>
    )
}
```

Example 2 (python):
```python
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            avatar={{
                upload: async (file: File) => {
                    const for
...
```

Example 3 (unknown):
```unknown
<UpdateAvatarCard
    classNames={{
        base: "border-blue-500",
        avatar: {
            base: "border-4 border-blue-400",
            fallback: "bg-blue-400 text-white"
        },
        footer: "bg-blue-50"
    }}
/>
```

---

## <AcceptInvitationCard />

**URL:** https://better-auth-ui.com/components/accept-invitation-card

**Contents:**
- <AcceptInvitationCard />
- Usage
- Features
- URL Parameters
- Reference
- Examples
  - Basic Usage
  - With Custom Class Names
  - With Custom Localization
- Invitation Flow

The <AcceptInvitationCard /> component handles the organization invitation acceptance flow. It displays invitation details and allows users to accept or reject organization invitations.

This component is typically used on a dedicated invitation acceptance page:

The component expects an invitationId in the URL query parameters:

The component handles various error scenarios:

Set up the invitation route in your auth configuration:

<OrganizationMembersCard />

**Examples:**

Example 1 (python):
```python
import { AcceptInvitationCard } from '@daveyplate/better-auth-ui'

export function AcceptInvitationPage() {
  return (
    <AcceptInvitationCard />
  )
}
```

Example 2 (unknown):
```unknown
/auth/accept-invitation?invitationId=inv_123456
```

Example 3 (python):
```python
// app/auth/accept-invitation/page.tsx
import { AcceptInvitationCard } from '@daveyplate/better-auth-ui'

export default function AcceptInvitationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AcceptInvitationCard />
    </div>
  )
}
```

Example 4 (unknown):
```unknown
<AcceptInvitationCard 
  classNames={{
    base: "max-w-md",
    header: "text-center",
    button: "rounded-full"
  }}
/>
```

---

## <SignedOut />

**URL:** https://better-auth-ui.com/components/signed-out

**Contents:**
- <SignedOut />
- Usage
- Example

The <SignedOut /> component conditionally renders its children only when the user is not authenticated. It is a simple helper for handling UI components or pages that should only be accessible by guests (unauthenticated users).

Use this component to conditionally hide or show content based on the user's authentication status.

Wrap any content that should be displayed only to signed-out (unauthenticated) users within the <SignedOut> component:

A practical view managing authentication states using both <SignedIn> and <SignedOut> components together:

**Examples:**

Example 1 (python):
```python
import { SignedOut } from "@daveyplate/better-auth-ui"

export default function Example() {
    return (
        <SignedOut>
            <div>You need to log in to access this feature.</div>
        </SignedOut>
    )
}
```

Example 2 (python):
```python
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui"

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-4 h-14 border-b">
            <h1 className="text-lg font-semibold">
                Better Auth UI
            </h1>

            <div className="flex gap-3 items-center">
                <SignedOut>
                    <a href="/auth/sign-in" className="text-sm font-medium">
                        Sign In
                    </a>
                </SignedOut>

                <SignedOut>
                    
...
```

---

## <UserButton />

**URL:** https://better-auth-ui.com/components/user-button

**Contents:**
- <UserButton />
- Usage
- Reference
- Examples
  - Icon Size Button
  - Full Width Button
  - Styling

The <UserButton /> component provides an easy-to-use dropdown menu button that displays user account information and session management actions. It includes an avatar, provides quick access to user settings, linked accounts, and session management actions.

These are the available props for the <UserButton /> component:

The size="icon" prop turns the UserButton into a small button, showing only the user's avatar. This is the default size.

The size="full" prop turns the UserButton into a wide button, showing the user's avatar, name or email, and dropdown arrow. Recommended for desktop user menus.

You can fully customize the appearance of the UserButton component with UserButtonClassNames using the classNames prop.

Here's an example that drastically customizes the styling:

<OrganizationSwitcher />

**Examples:**

Example 1 (python):
```python
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return <UserButton />;
}
```

Example 2 (python):
```python
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return (
    <UserButton />
  )
}
```

Example 3 (python):
```python
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return <UserButton size="full" />
}
```

Example 4 (python):
```python
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return (
    <UserButton
      className="border-destructive w-64 bg-destructive/30"
      classNames={{
        content: {
          avatar: {
            fallback: "bg-destructive text-white"
          }
        }
      }}
      size="full"
    />
  )
}
```

---

## <AuthView />

**URL:** https://better-auth-ui.com/components/auth-view

**Contents:**
- <AuthView />
- Reference
- Examples
  - Specifying Initial View
  - Custom Redirect After Authentication
- Localization
- Styling

The <AuthView /> component provides an interactive and customizable authentication interface that seamlessly integrates with your authentication flow. It supports multiple authentication methods, including email/password, magic links, passkey (WebAuthn), and social providers.

The following props can be passed to <AuthView /> for customization:

Below are practical usage examples demonstrating common scenarios:

You can specify the current view manually using the view prop:

Customize the navigation after successful authentication using the redirectTo prop:

You can pass custom localization texts to fit different languages or contexts:

You can thoroughly customize <AuthView /> components using TailwindCSS utility classes and the provided classNames prop:

**Examples:**

Example 1 (unknown):
```unknown
<AuthView view="SIGN_IN" />
```

Example 2 (unknown):
```unknown
<AuthView redirectTo="/dashboard" />
```

Example 3 (unknown):
```unknown
<AuthView
    localization={{
        SIGN_IN: "Log in",
        SIGN_UP: "Register",
        MAGIC_LINK: "Sign in with Email",
    }}
/>
```

Example 4 (unknown):
```unknown
<AuthView
    classNames={{
        base: "border-2 border-destructive max-w-xs",
        header: "bg-destructive/30",
        title: "text-xl text-destructive font-semibold",
        footerLink: "text-destructive hover:text-foreground",
    }}
/>
```

---

## <AccountsCard />

**URL:** https://better-auth-ui.com/components/accounts-card

**Contents:**
- <AccountsCard />
- Import
- Usage
- Props
- Example
- Features

Displays and manages linked social accounts

Generic settings card for updating custom user fields

**Examples:**

Example 1 (python):
```python
import { AccountsCard } from "@better-auth/ui-react/components"
```

Example 2 (unknown):
```unknown
<AccountsCard />
```

Example 3 (python):
```python
import { AccountsCard } from "@better-auth/ui-react/components"

export function AccountSettings() {
    return (
        <div className="space-y-4">
            <AccountsCard />
        </div>
    )
}
```

---

## <UpdateNameCard />

**URL:** https://better-auth-ui.com/components/update-name-card

**Contents:**
- <UpdateNameCard />
- Import
- Usage
- Props
- Example
- Features

Settings card for updating user's display name

<UpdateUsernameCard />

Generic settings card for updating custom user fields

**Examples:**

Example 1 (python):
```python
import { UpdateNameCard } from "@better-auth/ui-react/components"
```

Example 2 (unknown):
```unknown
<UpdateNameCard />
```

Example 3 (python):
```python
import { UpdateNameCard } from "@better-auth/ui-react/components"

export function AccountSettings() {
    return (
        <div className="space-y-4">
            <UpdateNameCard />
        </div>
    )
}
```

---

## <AccountSettingsCards />

**URL:** https://better-auth-ui.com/components/account-settings-cards

**Contents:**
- <AccountSettingsCards />
- Import
- Usage
- Props
- Example
- Custom Styling
- Features
  - Included Cards
  - Conditional Rendering
- Localization

A collection of account management cards for user profile settings

The AccountSettingsCards component automatically renders relevant account management cards based on your Better Auth configuration:

Cards are conditionally rendered based on your Better Auth configuration. For example:

The component supports full localization through the localization prop:

<SecuritySettingsCards />

A collection of security-related settings cards for user account protection

**Examples:**

Example 1 (python):
```python
import { AccountSettingsCards } from "@daveyplate/better-auth-ui"
```

Example 2 (unknown):
```unknown
<AccountSettingsCards />
```

Example 3 (python):
```python
import { AccountSettingsCards } from "@daveyplate/better-auth-ui"

export function AccountSettings() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            <AccountSettingsCards />
        </div>
    )
}
```

Example 4 (unknown):
```unknown
<AccountSettingsCards
    className="space-y-8"
    classNames={{
        cards: "gap-6",
        card: {
            base: "border-2",
            header: "bg-gray-50"
        }
    }}
/>
```

---

## <SessionsCard />

**URL:** https://better-auth-ui.com/components/sessions-card

**Contents:**
- <SessionsCard />
- Usage
- Reference
- Styling
- Localization

The <SessionsCard /> component provides users with an intuitive interface for viewing and managing their active authentication sessions. Users can easily revoke active sessions, enhancing security by maintaining control over their account access across multiple devices and browsers.

Include the <SessionsCard /> component within your account settings page or security settings page:

Below are the available props for customizing <SessionsCard />:

You can customize the appearance of <SessionsCard /> using Tailwind CSS classes provided via the classNames prop:

The text within <SessionsCard /> can be customized through the localization prop, allowing you to adapt it to different languages or contexts:

**Examples:**

Example 1 (python):
```python
import { SessionsCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <SessionsCard />
        </div>
    )
}
```

Example 2 (unknown):
```unknown
<SessionsCard
    classNames={{
        base: "border-blue-500",
        header: "bg-blue-50",
        title: "text-xl text-blue-600",
        description: "text-muted-foreground",
        content: "bg-background space-y-3",
        footer: "bg-blue-300",
        button: "bg-blue-600 hover:bg-blue-700 text-white"
    }}
/>
```

Example 3 (unknown):
```unknown
<SessionsCard
    localization={{
        SESSIONS: "Active Devices",
        SESSIONS_DESCRIPTION: "Review and revoke access from active devices and sessions.",
        CURRENT_SESSION: "This Device",
        REVOKE: "Remove Access"
    }}
/>
```

---

## <OrganizationMembersCard />

**URL:** https://better-auth-ui.com/components/organization-members-card

**Contents:**
- <OrganizationMembersCard />
- Usage
- Features
- Reference
- Examples
  - Basic Usage
  - With Custom Class Names
  - With Custom Localization
- Member Management Features
  - Member Display

The <OrganizationMembersCard /> component provides a comprehensive interface for managing organization members, including inviting new members, updating roles, and removing members.

Actions are permission-based:

Enable organization plugin with proper configuration:

<OrganizationSettingsCards />

<AcceptInvitationCard />

**Examples:**

Example 1 (python):
```python
import { OrganizationMembersCard } from '@daveyplate/better-auth-ui'

export function OrganizationMembersPage() {
  return (
    <OrganizationMembersCard />
  )
}
```

Example 2 (unknown):
```unknown
<OrganizationMembersCard />
```

Example 3 (unknown):
```unknown
<OrganizationMembersCard 
  classNames={{
    base: "shadow-lg",
    cell: "hover:bg-accent",
    button: "rounded-full"
  }}
/>
```

Example 4 (unknown):
```unknown
<OrganizationMembersCard 
  localization={{
    MEMBERS: "Team Members",
    INVITE_MEMBER: "Add Team Member",
    OWNER: "Team Owner",
    ADMIN: "Team Admin",
    MEMBER: "Team Member"
  }}
/>
```

---

## <AuthUIProvider />

**URL:** https://better-auth-ui.com/components/auth-ui-provider

**Contents:**
- <AuthUIProvider />
- Usage
- Reference
- Example

The <AuthUIProvider /> wraps your application with authentication context, providing essential hooks, settings, and methods required by authentication-related components and hooks throughout your app.

The following props can be passed to the <AuthUIProvider /> component:

A minimal Next.js layout file using the AuthUIProvider:

**Examples:**

Example 1 (python):
```python
"use client"

import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  )
}
```

Example 2 (python):
```python
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <html lang="en">
      <body>
        <AuthUIProvider
          authClient={authClient}
          navigate={router.push}
          replace={router.replace}
          onSessionChange={() => router.refresh()}
          social={{
            provider
...
```

---

## <SecuritySettingsCards />

**URL:** https://better-auth-ui.com/components/security-settings-cards

**Contents:**
- <SecuritySettingsCards />
- Import
- Usage
- Props
- Example
- Custom Styling
- Features
  - Included Cards
  - Conditional Rendering
- Localization

A collection of security-related settings cards for user account protection

The SecuritySettingsCards component automatically renders security-related cards based on your Better Auth configuration:

Cards are conditionally rendered based on:

The component supports full localization through the localization prop:

This component handles sensitive security settings. It includes:

<AccountSettingsCards />

A collection of account management cards for user profile settings

**Examples:**

Example 1 (python):
```python
import { SecuritySettingsCards } from "@daveyplate/better-auth-ui"
```

Example 2 (unknown):
```unknown
<SecuritySettingsCards />
```

Example 3 (python):
```python
import { SecuritySettingsCards } from "@daveyplate/better-auth-ui"

export function SecuritySettings() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
            <SecuritySettingsCards />
        </div>
    )
}
```

Example 4 (unknown):
```unknown
<SecuritySettingsCards
    className="space-y-8"
    classNames={{
        cards: "gap-6",
        card: {
            base: "border-dashed",
            header: "bg-red-50 dark:bg-red-950"
        }
    }}
/>
```

---

## <RedirectToSignUp />

**URL:** https://better-auth-ui.com/components/redirect-to-sign-up

**Contents:**
- <RedirectToSignUp />
- Usage

The <RedirectToSignUp /> component ensures users are redirected to the sign-up page if they are not authenticated. If the user is signed in, it does nothing. It's useful for protected pages in your application, specifically when you want unauthenticated users to immediately register instead of logging in.

**Examples:**

Example 1 (python):
```python
import { RedirectToSignUp, SignedIn } from "@daveyplate/better-auth-ui"

export default function ProtectedPage() {
  return (
    <>
      <RedirectToSignUp />

      <SignedIn>
        Welcome! You are signed in.
      </SignedIn>
    </div>
  )
}
```

---

## <ApiKeysCard />

**URL:** https://better-auth-ui.com/components/api-keys-card

**Contents:**
- <ApiKeysCard />
- Usage
- Features
- Reference
- Examples
  - Basic Usage
  - With Custom Class Names
  - With Custom Localization
- API Key Creation
- Security Features

The <ApiKeysCard /> component provides a complete interface for managing API keys, including creating, viewing, and deleting API keys for programmatic access to your application.

When creating a new API key, users can:

The API Key plugin must be enabled in your auth configuration:

Shows all active API keys with:

Modal for creating new keys with:

Shows newly created key with:

Displays and manages linked social accounts

**Examples:**

Example 1 (python):
```python
import { ApiKeysCard } from '@daveyplate/better-auth-ui'

export function ApiKeysSettingsPage() {
  return (
    <ApiKeysCard />
  )
}
```

Example 2 (unknown):
```unknown
<ApiKeysCard />
```

Example 3 (unknown):
```unknown
<ApiKeysCard 
  classNames={{
    base: "shadow-md",
    button: "rounded-full",
    cell: "hover:bg-accent"
  }}
/>
```

Example 4 (unknown):
```unknown
<ApiKeysCard 
  localization={{
    API_KEYS: "Developer Keys",
    CREATE_API_KEY: "Generate New Key",
    DELETE: "Revoke"
  }}
/>
```

---

## <OrganizationSettingsCards />

**URL:** https://better-auth-ui.com/components/organization-settings-cards

**Contents:**
- <OrganizationSettingsCards />
- Usage
- Features
- Reference
- Examples
  - Basic Usage
  - With Custom Class Names
  - With Custom Localization
- Included Cards
  - Organization Logo Card

The <OrganizationSettingsCards /> component provides a comprehensive set of cards for managing organization settings, including organization details, logo, and deletion options.

The organization plugin must be enabled with proper configuration:

<OrganizationSwitcher />

<OrganizationMembersCard />

**Examples:**

Example 1 (python):
```python
import { OrganizationSettingsCards } from '@daveyplate/better-auth-ui'

export function OrganizationSettingsPage() {
  return (
    <OrganizationSettingsCards />
  )
}
```

Example 2 (unknown):
```unknown
<OrganizationSettingsCards />
```

Example 3 (unknown):
```unknown
<OrganizationSettingsCards 
  classNames={{
    cards: "gap-8",
    card: {
      base: "shadow-lg",
      title: "text-2xl",
      button: "rounded-full"
    }
  }}
/>
```

Example 4 (unknown):
```unknown
<OrganizationSettingsCards 
  localization={{
    ORGANIZATION_NAME: "Team Name",
    ORGANIZATION_SLUG: "Team URL",
    DELETE_ORGANIZATION: "Delete Team"
  }}
/>
```

---

## <ChangePasswordCard />

**URL:** https://better-auth-ui.com/components/change-password-card

**Contents:**
- <ChangePasswordCard />
- Usage
- Reference
- Styling
  - Using with linked social accounts (Set Password)
- Localization

The <ChangePasswordCard /> provides a secure and user-friendly interface for users to update their account passwords, seamlessly integrated with your authentication flow. It supports verification workflows to ensure passwords are securely updated, revoking other active sessions when the password changes.

Here's how you can include <ChangePasswordCard /> in your user account settings page:

This component automatically utilizes the context provided by the AuthUIProvider and manages password update workflows seamlessly, including revoking other active sessions upon successful password changes.

The following props can be utilized to further customize <ChangePasswordCard />:

Customize the component styles extensively by providing Tailwind CSS utility classes through the classNames prop:

If a user's account was initially created via a social provider without setting a password, the card automatically transforms into a convenient "Set Password" button. Clicking this button triggers sending the user an email with a link to set their password securely.

You don't have to configure anything extra; this behavior is automatic based on your account setup.

You can easily adjust the displayed texts via the localization prop:

<DeleteAccountCard />

**Examples:**

Example 1 (python):
```python
import { ChangePasswordCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <ChangePasswordCard />
        </div>
    )
}
```

Example 2 (unknown):
```unknown
<ChangePasswordCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground",
        title: "text-primary font-semibold text-xl",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        input: "bg-background placeholder:text-muted-foreground",
        button: "bg-primary hover:bg-primary-foreground text-white"
    }}
/>
```

Example 3 (unknown):
```unknown
<ChangePasswordCard
    localization={{
        CHANGE_PASSWORD: "Update your password",
        CHANGE_PASSWORD_DESCRIPTION: "Set a new password for your account",
        CURRENT_PASSWORD: "Current Password",
        NEW_PASSWORD: "New Password",
        CHANGE_PASSWORD_SUCCESS: "Password successfully updated!",
        SET_PASSWORD: "Set Password",
        SET_PASSWORD_DESCRIPTION: "Add a password to your social account for easy future logins.",
        SET_PASSWORD_EMAIL_SENT: "Check your mailbox to set your new password!"
    }}
/>
```

---

## <TwoFactorCard />

**URL:** https://better-auth-ui.com/components/two-factor-card

**Contents:**
- <TwoFactorCard />
- Usage
- Styling

The <TwoFactorCard /> provides a secure interface for managing two-factor authentication (2FA), allowing users to enable or disable 2FA with password confirmation. It handles the complete setup flow including QR code scanning and backup codes generation.

Here's how you can include <TwoFactorCard /> in your settings page:

Customize the component appearance using Tailwind CSS classes through the classNames prop:

Displays and manages user's passkeys/WebAuthn credentials

**Examples:**

Example 1 (python):
```python
import { TwoFactorCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <TwoFactorCard />
        </div>
    )
}
```

Example 2 (unknown):
```unknown
<TwoFactorCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground",
        title: "text-primary font-semibold text-xl",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        button: "bg-primary hover:bg-primary-foreground",
        instructions: "text-muted-foreground"
    }}
/>
```

---

## <UpdateFieldCard />

**URL:** https://better-auth-ui.com/components/update-field-card

**Contents:**
- <UpdateFieldCard />
- Import
- Usage
- Props
- Examples
  - Text Field
  - Number Field
  - Boolean Field
- Features

Generic settings card for updating custom user fields

Settings card for updating user's display name

Displays and manages linked social accounts

**Examples:**

Example 1 (python):
```python
import { UpdateFieldCard } from "@better-auth/ui-react/components"
```

Example 2 (unknown):
```unknown
<UpdateFieldCard 
    name="phoneNumber"
    label="Phone Number"
    type="text"
    placeholder="Enter your phone number"
/>
```

Example 3 (unknown):
```unknown
<UpdateFieldCard 
    name="bio"
    label="Bio"
    type="text"
    placeholder="Tell us about yourself"
    description="A short description about you"
/>
```

Example 4 (javascript):
```javascript
<UpdateFieldCard 
    name="age"
    label="Age"
    type="number"
    required
    validate={(value) => Number(value) >= 18}
/>
```

---

## <ChangeEmailCard />

**URL:** https://better-auth-ui.com/components/change-email-card

**Contents:**
- <ChangeEmailCard />
- Usage
- Reference
- Styling
- Localization

The <ChangeEmailCard /> component provides a simple and secure UI that allows users to change their account email address, including verification emails sent to the updated address, if email verification is enabled.

Here's how to implement <ChangeEmailCard /> on your custom settings page:

The component automatically integrates with your AuthUIProvider context and handles email verification workflows seamlessly.

These are the available props for <ChangeEmailCard />:

You can customize the styles using the provided classNames prop:

You can pass custom text via the localization prop:

<SecuritySettingsCards />

A collection of security-related settings cards for user account protection

<ChangePasswordCard />

**Examples:**

Example 1 (python):
```python
import { ChangeEmailCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <ChangeEmailCard />
        </div>
    )
}
```

Example 2 (unknown):
```unknown
<ChangeEmailCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground text-primary",
        title: "text-xl font-semibold",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        input: "bg-transparent border-primary placeholder:text-muted-foreground"
    }}
/>
```

Example 3 (unknown):
```unknown
<ChangeEmailCard
    localization={{
        EMAIL: "Your Email",
        EMAIL_DESCRIPTION: "You can update your email here.",
        EMAIL_INSTRUCTIONS: "We'll send you a verification link to your new email address.",
        EMAIL_PLACEHOLDER: "you@example.com",
        EMAIL_VERIFY_CHANGE: "Check your inbox for the verification link!"
    }}
/>
```

---

## <ProvidersCard />

**URL:** https://better-auth-ui.com/components/providers-card

**Contents:**
- <ProvidersCard />
- Usage
- Reference
- Styling
- Localization
- Usage in Settings Page

The <ProvidersCard /> component provides a simple interface for managing linked social providers. It allows users to link or unlink third-party social accounts with a clean, customizable UI out of the box.

Note: You must configure the providers option in your AuthUIProvider context to use this component.

Here's how you can include <ProvidersCard /> on your user settings or account management page:

This component seamlessly pulls in settings from your AuthUIProvider context, automatically handling provider link and unlink workflows.

You can use the following props to further customize <ProvidersCard />:

Customize the styling of your <ProvidersCard /> through the classNames prop:

Adjust displayed texts via the localization prop to fit your application's localization:

You usually integrate the <ProvidersCard /> with other settings components. Here's a typical example configuration:

This complete implementation shows how you can use <ProvidersCard /> along with other available settings cards to build a comprehensive, managed user settings experience quickly.

<DeleteAccountCard />

**Examples:**

Example 1 (python):
```python
import { ProvidersCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <ProvidersCard />
        </div>
    )
}
```

Example 2 (unknown):
```unknown
<ProvidersCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground",
        title: "text-xl font-semibold text-primary",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        button: "bg-primary hover:bg-primary-foreground text-white"
    }}
/>
```

Example 3 (unknown):
```unknown
<ProvidersCard
    localization={{
        PROVIDERS: "Social Accounts",
        PROVIDERS_DESCRIPTION: "Link or unlink your third-party social accounts.",
        LINK: "Link Account",
        UNLINK: "Unlink",
    }}
/>
```

Example 4 (python):
```python
import {
    ProvidersCard,  
    ChangeEmailCard,
    SettingsCards,
} from "@daveyplate/better-auth-ui";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6 mx-auto max-w-xl">
            <UpdateAvatarCard />
            <UpdateUsernameCard />
            <ChangeEmailCard />
            <ChangePasswordCard />
            <ProvidersCard />
            <SessionsCard />
            <DeleteAccountCard />
        </div>
    )
}
```

---

## <SignedIn />

**URL:** https://better-auth-ui.com/components/signed-in

**Contents:**
- <SignedIn />
- Usage
- Example

The <SignedIn /> component conditionally renders its child components based on whether a user is authenticated.

Use it to display content only visible to logged-in users.

Here's an example demonstrating <SignedIn /> in a practical scenario:

In this example, the <UserButton /> component is displayed only if the user has an active session. Otherwise, visitors are prompted with a sign-in link.

**Examples:**

Example 1 (python):
```python
import { SignedIn } from "@daveyplate/better-auth-ui"

export default function UserDashboard() {
    return (
        <SignedIn>
            <p>
                Only signed-in users will see this!
            </p>
        </SignedIn>
    )
}
```

Example 2 (python):
```python
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui"

export default function Navbar() {
    return (
        <nav className="h-16 flex justify-between items-center px-4">
            <Link href="/">
                Home
            </Link>

            <SignedIn>
                <UserButton />
            </SignedIn>

            <SignedOut>
                <Link href="/auth/sign-in">
                    Sign In
                </Link>
            </SignedOut>
        </nav>
    )
}
```

---

## <UserAvatar />

**URL:** https://better-auth-ui.com/components/user-avatar

**Contents:**
- <UserAvatar />
- Usage
- Reference
- Example

The <UserAvatar /> component renders a user's avatar image based on the provided user object. If the user does not have an avatar image, a fallback with the first 2 letters of their name or email will be displayed.

The following props can be passed to the <UserAvatar /> component:

Here is a practical example demonstrating customized styles and fallback customization:

**Examples:**

Example 1 (python):
```python
import { UserAvatar } from "@daveyplate/better-auth-ui"

export default function Example() {
    const user = {
        name: "Seto",
        email: "seto@better-auth.dev",
        image: "https://better-auth-ui.com/avatars/seto.png"
    }

    return <UserAvatar user={user} />
}
```

Example 2 (python):
```python
import { UserAvatar } from "@daveyplate/better-auth-ui"

export default function Example() {
    const user = {
        name: "Seto",
        email: "seto@better-auth.dev",
        image: "https://better-auth-ui.com/avatars/seto.png"
    }

    return (
        <UserAvatar
            user={user}
            className="size-12 border-2 border-destructive"
            classNames={{
                fallback: "bg-black text-white",
            }}
        />
    )
}
```

---

## useAuthenticate()

**URL:** https://better-auth-ui.com/components/use-authenticate

**Contents:**
- useAuthenticate()
- Usage
- Options
- Example with Options
- Disabling the Redirect

The useAuthenticate() hook automatically redirects unauthenticated users to the sign-in page. If the user is already authenticated, this hook does nothing and allows the user to view the content normally.

This is a hook alternative to the <RedirectToSignIn /> component, useful for redirecting users programmatically.

The hook accepts an options object with the following properties:

You can conditionally disable the redirection with the enabled option:

**Examples:**

Example 1 (python):
```python
import { useAuthenticate } from "@daveyplate/better-auth-ui"

export default function ProtectedPage() {
    // Will redirect to sign-in if user is not authenticated
    useAuthenticate()
    
    return <div>Protected content visible only to authenticated users</div>
}
```

Example 2 (unknown):
```unknown
interface AuthenticateOptions {
    authView?: "signIn" | "signUp" // Default: "signIn"
    enabled?: boolean // Default: true
}
```

Example 3 (python):
```python
import { useAuthenticate } from "@daveyplate/better-auth-ui"

export default function ProtectedSignUpPage() {
    // Will redirect to sign-up instead of sign-in if user is not authenticated
    useAuthenticate({
        authView: "signUp",
    })
    
    return <div>Protected content</div>
}
```

Example 4 (python):
```python
import { useAuthenticate } from "@daveyplate/better-auth-ui"

export default function ConditionalProtectedPage({ isProtected }: { isProtected: boolean }) {
    // Only redirect if isProtected is true
    useAuthenticate({
        enabled: isProtected
    })
    
    return <div>This content may or may not be protected</div>
}
```

---

## <UpdateUsernameCard />

**URL:** https://better-auth-ui.com/components/update-username-card

**Contents:**
- <UpdateUsernameCard />
- Usage
- Reference
- Styling

The <UpdateUsernameCard /> component provides a simple, intuitive UI that enables users to update their account username within the authentication system. This component automatically integrates with the AuthUIProvider context, leveraging the username configuration set by your authentication framework.

Include the <UpdateUsernameCard /> in your custom settings or profile page:

These are the available props for <UpdateUsernameCard />:

The styles can be customized precisely with Tailwind classes via the classNames prop:

Settings card for updating user's display name

**Examples:**

Example 1 (python):
```python
import { UpdateUsernameCard } from "@daveyplate/better-auth-ui"

export default function CustomSettings() {
    return (
        <div className="flex flex-col gap-6">
            <UpdateUsernameCard />
        </div>
    )
}
```

Example 2 (unknown):
```unknown
<UpdateUsernameCard
    classNames={{
        base: "border-blue-500",
        header: "bg-blue-50",
        title: "text-blue-500",
        description: "text-muted-foreground",
        content: "bg-blue-50",
        footer: "bg-blue-50",
        input: "bg-background border-blue-500 placeholder:text-muted",
    }}
/>
```

---

## <DeleteAccountCard />

**URL:** https://better-auth-ui.com/components/delete-account-card

**Contents:**
- <DeleteAccountCard />
- Usage
- Reference
- Styling
- Localization

The <DeleteAccountCard /> component provides users a streamlined UI to delete their account. It supports verification flows, such as password confirmation or email verification, before account deletion.

Include the <DeleteAccountCard /> component on your user settings page:

This component leverages the AuthUIProvider context to handle account deletion (and optional verification) seamlessly.

These are the available props for <DeleteAccountCard />:

You can customize styling using the provided classNames prop with TailwindCSS classes:

Adjust the text within the component for specific requirements or languages:

<ChangePasswordCard />

**Examples:**

Example 1 (python):
```python
import { DeleteAccountCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <DeleteAccountCard />
        </div>
    )
}
```

Example 2 (unknown):
```unknown
<DeleteAccountCard
    classNames={{
        base: "border-destructive",
        header: "bg-destructive/10",
        title: "text-destructive text-xl font-semibold",
        description: "text-destructive",
        footer: "bg-destructive/30",
        button: "bg-destructive hover:bg-destructive/80 text-white"
    }}
/>
```

Example 3 (unknown):
```unknown
<DeleteAccountCard
    localization={{
        DELETE_ACCOUNT: "Delete My Account",
        DELETE_ACCOUNT_DESCRIPTION: "This action permanently deletes your account and is irreversible.",
        DELETE_ACCOUNT_INSTRUCTIONS: "Please provide your password to confirm deletion.",
        DELETE_ACCOUNT_NOT_FRESH: "Sign out and back in to delete your account.",
    }}
/>
```

---

## <OrganizationSwitcher />

**URL:** https://better-auth-ui.com/components/organization-switcher

**Contents:**
- <OrganizationSwitcher />
- Usage
- Features
- Reference
- Examples
  - Basic Usage
  - With Custom Size
  - With Custom Alignment
  - With Custom Trigger
  - With onSetActive Callback

The <OrganizationSwitcher /> is a comprehensive component that provides organization and personal account switching functionality. It displays the currently active organization or personal account and allows users to switch between them, create new organizations, and manage their organization settings.

For applications that require users to always work within an organization context, you can hide the personal account option:

When hidePersonal is set to true:

The OrganizationSwitcher requires the organization plugin to be configured in your auth client:

<OrganizationSettingsCards />

**Examples:**

Example 1 (python):
```python
import { OrganizationSwitcher } from '@daveyplate/better-auth-ui'

export function Header() {
  return (
    <nav>
      <OrganizationSwitcher />
    </nav>
  )
}
```

Example 2 (unknown):
```unknown
<OrganizationSwitcher />
```

Example 3 (unknown):
```unknown
<OrganizationSwitcher size="icon" />
```

Example 4 (unknown):
```unknown
<OrganizationSwitcher align="start" />
```

---

## <AuthLoading />

**URL:** https://better-auth-ui.com/components/auth-loading

**Contents:**
- <AuthLoading />
- Usage
- Example
  - Explanation
- Skeleton Loaders

The <AuthLoading /> component renders its children only during an authentication session loading. This provides an easy way for you to insert loading states or skeleton loaders into your UI, enhancing user experience during data fetching.

Wrap loading placeholders or loader components with <AuthLoading /> to conditionally render them whenever authentication session data is being fetched.

Here's a complete example of using <AuthLoading /> with loading skeletons and managing unauthenticated user sessions using the <RedirectToSignIn /> and <SignedIn /> components.

This combined approach offers seamless handling of loading states, authentication redirection, and conditional rendering based on user authentication state, greatly improving the overall user experience.

In practice, your skeleton loader will likely be customized. Here's a basic example you can easily customize to fit your use-case:

This example skeleton provides placeholder components resembling the size and shape of loaded content, greatly reducing UI flicker and enhancing user-perceived loading performance.

**Examples:**

Example 1 (python):
```python
import { AuthLoading } from "@daveyplate/better-auth-ui"

export default function LoadingExample() {
  return (
    <AuthLoading>
      <YourLoadingSkeleton />
    </AuthLoading>
  )
}
```

Example 2 (python):
```python
import { AuthLoading, RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"
import { YourCustomSkeleton } from "@/components/your-custom-skeleton"
import { DashboardContent } from "@/components/dashboard-content"

export default function ProtectedPage() {
  return (
    <>
      <AuthLoading>
        <YourCustomSkeleton />
      </AuthLoading>

      <RedirectToSignIn />

      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </>
  )
}
```

Example 3 (python):
```python
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function YourCustomSkeleton() {
  return (
    <Card className="w-full mx-auto max-w-md">
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </CardContent>
    </Card>
  )
}
```

---
