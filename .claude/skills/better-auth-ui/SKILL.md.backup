---
name: better-auth-ui
description: Better Auth UI component library documentation and guides
---

# Better-Auth-Ui Skill

Comprehensive assistance with better-auth-ui development, generated from official documentation.

## When to Use This Skill

This skill should be triggered when:
- Working with better-auth-ui
- Asking about better-auth-ui features or APIs
- Implementing better-auth-ui solutions
- Debugging better-auth-ui code
- Learning better-auth-ui best practices

## Quick Reference

### Common Patterns

**Pattern 1:** Import import { AccountSettingsCards } from "@daveyplate/better-auth-ui" Usage <AccountSettingsCards /> Props NameTypeDefaultDescriptionclassNamestringundefinedAdditional CSS classes for the containerclassNamesSettingsCardsClassNamesundefinedClass names for individual componentslocalizationPartial<AuthLocalization>undefinedLocalization object for translations Example import { AccountSettingsCards } from "@daveyplate/better-auth-ui" export function AccountSettings() { return ( <div className="container mx-auto p-6"> <h1 className="text-2xl font-bold mb-6">Account Settings</h1> <AccountSettingsCards /> </div> ) } Custom Styling <AccountSettingsCards className="space-y-8" classNames={{ cards: "gap-6", card: { base: "border-2", header: "bg-gray-50" } }} /> Features The AccountSettingsCards component automatically renders relevant account management cards based on your Better Auth configuration: Included Cards Update Avatar Card - If avatar support is enabled Update Username Card - If username credentials are enabled Update Name Card - If name field is included in settings Change Email Card - If email changes are enabled Custom Fields - Any additional fields configured in your auth setup Accounts Card - If multi-session support is enabled Conditional Rendering Cards are conditionally rendered based on your Better Auth configuration. For example: Avatar card only appears if avatar is configured Username card only appears if credentials.username is enabled Custom fields are rendered dynamically based on additionalFields Localization The component supports full localization through the localization prop: <AccountSettingsCards localization={{ accountSettings: { title: "Paramètres du compte", updateAvatar: "Mettre à jour l'avatar", updateName: "Mettre à jour le nom" // ... other translations } }} /> Related Components <SettingsCards /> - Parent component with navigation <UpdateAvatarCard /> - Individual avatar update card <UpdateNameCard /> - Individual name update card <AccountsCard /> - Linked accounts management

```
import { AccountSettingsCards } from "@daveyplate/better-auth-ui"
```

**Pattern 2:** Cards are conditionally rendered based on your Better Auth configuration. For example:

```
avatar
```

**Pattern 3:** The default authentication components provided by @daveyplate/better-auth-ui include built-in settings pages accessible under the same base path as your auth views (e.g., /auth/settings, /auth/security, etc.). However, for advanced use cases, you may want to: Move the built-in settings views to a different base path (using settings.basePath) Replace the settings with a completely custom implementation (using settings.url) Build your own settings page using individual components Overview You have three primary ways to customize the settings experience: Move settings to a different path: Use settings.basePath to relocate all built-in settings views while keeping their functionality Replace with custom settings: Use settings.url to redirect to your completely custom settings implementation Build custom layouts: Import individual settings components to create your own layouts Quick Comparison OptionUse CaseConfigurationResultsettings.basePathKeep built-in settings but move to different pathsettings: { basePath: "/dashboard" }Settings at /dashboard/settings, /dashboard/security, etc.settings.urlReplace with completely custom settingssettings: { url: "/my-settings" }All settings routes redirect to /my-settingsIndividual componentsBuild custom layouts with specific componentsImport components directlyFull control over layout and functionality Option 1: Moving Settings to a Different Base Path If you want to keep the built-in settings functionality but move it to a different location (e.g., from /auth/settings to /dashboard/settings), use the settings.basePath option: app/providers.tsx"use client" import { AuthUIProvider } from "@daveyplate/better-auth-ui" import { authClient } from "@/lib/auth-client" import { useRouter } from "next/navigation" import Link from "next/link" export function Providers({ children }: { children: React.ReactNode }) { const router = useRouter() return ( <AuthUIProvider authClient={authClient} navigate={router.push} replace={router.replace} onSessionChange={() => router.refresh()} settings={{ basePath: "/dashboard" // Settings views will be at /dashboard/settings, /dashboard/security, etc. }} Link={Link} > {children} </AuthUIProvider> ) } With this configuration: Auth views remain at: /auth/sign-in, /auth/sign-up, etc. Settings views move to: /dashboard/settings, /dashboard/security, /dashboard/api-keys, /dashboard/organization, etc. The <UserButton /> and <SettingsCards /> components automatically use the new base path You can combine basePath with other settings options: settings={{ basePath: "/dashboard", fields: ["image", "name", "age"] // Specify which fields to show }} Using SettingsCards with pathname When using settings.basePath, you can pass the pathname prop to <SettingsCards /> to automatically determine the current view: app/dashboard/[...settings]/page.tsximport { SettingsCards } from "@daveyplate/better-auth-ui" export default function SettingsPage({ params }: { params: { settings: string[] } }) { const pathname = `/dashboard/${params.settings?.join("/") || "settings"}` return ( <div className="mx-auto max-w-4xl py-12 px-4"> <SettingsCards pathname={pathname} /> </div> ) } Option 2: Completely Custom Settings Page To replace the built-in settings with your own custom implementation, use settings.url: app/providers.tsx"use client" import { AuthUIProvider } from "@daveyplate/better-auth-ui" import { authClient } from "@/lib/auth-client" import { useRouter } from "next/navigation" import Link from "next/link" export function Providers({ children }: { children: React.ReactNode }) { const router = useRouter() return ( <AuthUIProvider authClient={authClient} navigate={router.push} replace={router.replace} onSessionChange={() => router.refresh()} settings={{ url: "/my-custom-settings" // Redirects to your custom settings page }} Link={Link} > {children} </AuthUIProvider> ) } Important: When settings.url is set, all built-in settings routes will redirect to your custom URL. You're responsible for implementing the entire settings functionality. Option 3: Building Custom Settings Layouts For maximum control, you can build your own settings page layouts using individual components. Using Individual Settings Components The easiest way to get started is using the <SettingsCards /> component, which automatically handles displaying all enabled settings. This includes avatar, email, username, password, linked social providers, session management, delete account, and custom additional fields you've provided. app/dashboard/settings/page.tsximport { SettingsCards } from "@daveyplate/better-auth-ui" export default function UserSettingsPage() { return ( <div className="mx-auto max-w-xl py-12 px-4"> <SettingsCards /> </div> ) } You can customize the appearance using TailwindCSS classes through classNames props as documented in SettingsCards documentation: <SettingsCards className="mx-auto max-w-xl" classNames={{ card: { base: "border-primary/50", header: "bg-primary/10", content: "bg-background", footer: "bg-primary/10", button: "bg-primary hover:bg-primary/80", input: "bg-transparent placeholder-muted-foreground/50" } }} /> Individually Using Settings Components For finer-grained control, selectively import the components you want: ComponentDescription<UpdateAvatarCard />User avatar management<UpdateNameCard />Update user's name<UpdateUsernameCard />Manage username (if applicable/username set via plugin)<ChangeEmailCard />Changing the user's email address<ChangePasswordCard />Allow user to securely update password<ProvidersCard />Linking/Unlinking social provider accounts<SessionsCard />Active session management<DeleteAccountCard />Deleting the user account securely<UpdateFieldCard />Add or update additional custom user fields Here's a complete example demonstrating an individually composed user settings page: app/dashboard/settings/page.tsximport { UpdateAvatarCard, UpdateNameCard, UpdateUsernameCard, ChangeEmailCard, ChangePasswordCard, ProvidersCard, SessionsCard, DeleteAccountCard, UpdateFieldCard } from "@daveyplate/better-auth-ui" export default function CustomSettingsPage() { return ( <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4"> <UpdateAvatarCard /> <UpdateNameCard /> <UpdateUsernameCard /> <ChangeEmailCard /> <ChangePasswordCard /> <ProvidersCard /> <SessionsCard /> <DeleteAccountCard /> <UpdateFieldCard field="age" label="Age" description="Update your age" placeholder="Enter your current age" type="number" /> </div> ) } This example assumes additionalFields are configured via your <AuthUIProvider />: app/providers.tsx<AuthUIProvider authClient={authClient} additionalFields={{ age: { label: "Age", placeholder: "Your age", description: "Enter your age", required: false, type: "number" } }} settings={{ fields: ["age"], url: "/dashboard/settings" }} > {children} </AuthUIProvider> Handling Authentication for Settings Page It's essential that your custom settings page is protected and accessible only by authenticated users. There's a built-in helper useAuthenticate to ensure your settings pages are secured: Example: app/dashboard/settings/page.tsximport { RedirectToSignIn, SignedIn, SettingsCards } from "@daveyplate/better-auth-ui" export default function CustomSettingsPage() { return ( <> <RedirectToSignIn /> <SignedIn> <SettingsCards /> </SignedIn> </> ) }

```
@daveyplate/better-auth-ui
```

**Pattern 4:** Import import { SecuritySettingsCards } from "@daveyplate/better-auth-ui" Usage <SecuritySettingsCards /> Props NameTypeDefaultDescriptionclassNamestringundefinedAdditional CSS classes for the containerclassNamesSettingsCardsClassNamesundefinedClass names for individual componentslocalizationPartial<AuthLocalization>undefinedLocalization object for translations Example import { SecuritySettingsCards } from "@daveyplate/better-auth-ui" export function SecuritySettings() { return ( <div className="container mx-auto p-6"> <h1 className="text-2xl font-bold mb-6">Security Settings</h1> <SecuritySettingsCards /> </div> ) } Custom Styling <SecuritySettingsCards className="space-y-8" classNames={{ cards: "gap-6", card: { base: "border-dashed", header: "bg-red-50 dark:bg-red-950" } }} /> Features The SecuritySettingsCards component automatically renders security-related cards based on your Better Auth configuration: Included Cards Change Password Card - For updating account password (if credentials are enabled) Providers Card - Manage linked social accounts (if social providers are configured) Two-Factor Authentication Card - Enable/disable 2FA (if two-factor is enabled and credentials are linked) Passkeys Card - Manage passkeys for passwordless authentication (if passkeys are enabled) Sessions Card - View and manage active sessions Delete Account Card - Allow users to delete their account (if delete user is enabled) Conditional Rendering Cards are conditionally rendered based on: Your Better Auth configuration User's current authentication state Available authentication methods For example: Password card only appears if credentials is enabled Two-factor card requires both twoFactor enabled and a credential-linked account Providers card appears if either social.providers or genericOAuth.providers are configured Localization The component supports full localization through the localization prop: <SecuritySettingsCards localization={{ security: { title: "Sécurité", changePassword: "Changer le mot de passe", twoFactorAuth: "Authentification à deux facteurs", sessions: "Sessions actives" // ... other translations } }} /> Security Considerations This component handles sensitive security settings. It includes: Session freshness checks for critical operations Proper authentication state validation Secure password change flows Safe account deletion with confirmation Related Components <SettingsCards /> - Parent component with navigation <ChangePasswordCard /> - Individual password change card <TwoFactorCard /> - Two-factor authentication management <SessionsCard /> - Active sessions management <DeleteAccountCard /> - Account deletion

```
import { SecuritySettingsCards } from "@daveyplate/better-auth-ui"
```

**Pattern 5:** For example:

```
credentials
```

**Pattern 6:** API Keys provide a secure way for applications and services to authenticate with your API programmatically. Better Auth UI includes a complete API key management system with creation, expiration, and revocation capabilities. Overview The API key system provides: Secure Generation: Cryptographically secure key generation Expiration Management: Set expiration dates for keys Custom Prefixes: Add custom prefixes to identify key types Metadata Support: Attach metadata to keys for tracking One-Time Display: Keys are shown only once after creation Secure Storage: Keys are hashed before storage Enabling API Keys To enable API keys, configure the apiKey prop in your AuthUIProvider: providers.tsx<AuthUIProvider authClient={authClient} apiKey={true} // Simple enable > {children} </AuthUIProvider> Advanced Configuration providers.tsx<AuthUIProvider authClient={authClient} apiKey={{ prefix: "app_", // Custom prefix for all keys metadata: { // Default metadata for new keys environment: "production", version: "v1" } }} > {children} </AuthUIProvider> Key Components ApiKeysCard The main component for managing API keys: import { ApiKeysCard } from '@daveyplate/better-auth-ui' <ApiKeysCard /> In SettingsCards API keys automatically appear in settings when enabled: import { SettingsCards } from '@daveyplate/better-auth-ui' // Shows API keys management when view="API_KEYS" <SettingsCards view="API_KEYS" /> API Key Structure Generated API keys follow this structure: [prefix][random_string] Example: app_sk_live_a1b2c3d4e5f6g7h8i9j0 Using API Keys Client-Side Generation const { authClient } = useContext(AuthUIContext) // Create a new API key const { key } = await authClient.apiKey.create({ name: "Production API Key", expiresIn: 30 * 24 * 60 * 60, // 30 days in seconds prefix: "prod_", metadata: { service: "payment-processor" } }) console.log(key) // This is the only time you'll see the full key Server-Side Validation // In your API endpoint import { auth } from '@/lib/auth' export async function POST(request: Request) { const apiKey = request.headers.get('x-api-key') if (!apiKey) { return new Response('API key required', { status: 401 }) } const session = await auth.api.validateApiKey({ apiKey }) if (!session) { return new Response('Invalid API key', { status: 401 }) } // Access user and metadata console.log(session.user) console.log(session.apiKey.metadata) // Process request... } Security Features One-Time Display Keys are shown in full only once after creation Users must copy the key immediately Lost keys cannot be recovered Secure Storage Keys are hashed using bcrypt before storage Original keys are never stored in the database Only the first few characters are stored for identification Expiration Keys can have expiration dates Expired keys are automatically rejected No expiration option available for long-lived keys Best Practices Naming Convention "Production - Payment Service" "Development - Local Testing" "CI/CD - GitHub Actions" Expiration Policy Development keys: 7-30 days Production keys: 90-365 days CI/CD keys: No expiration with rotation Key Rotation Rotate production keys every 90 days Implement overlap period for smooth transition Log key usage for audit trails Access Control Limit who can create API keys Log all key operations Monitor key usage patterns Environment Separation apiKey={{ prefix: process.env.NODE_ENV === 'production' ? 'pk_' : 'sk_test_' }} Metadata Usage Attach metadata to track key usage: await authClient.apiKey.create({ name: "Analytics Service", metadata: { service: "analytics", environment: "production", permissions: ["read:analytics", "write:reports"], rateLimit: 1000 } }) Rate Limiting Implement rate limiting based on metadata: // Server-side const session = await auth.api.validateApiKey({ apiKey }) const rateLimit = session.apiKey.metadata.rateLimit || 100 // Apply rate limiting logic Monitoring Track API key usage: Usage Metrics: Track requests per key Error Rates: Monitor failed authentications Expiration Alerts: Notify before keys expire Anomaly Detection: Detect unusual usage patterns Error Handling Common API key errors: API_KEY_INVALID: Key doesn't exist or is malformed API_KEY_EXPIRED: Key has passed expiration date API_KEY_REVOKED: Key has been manually revoked API_KEY_RATE_LIMITED: Key has exceeded rate limits

```
apiKey
```

**Pattern 7:** Example: app_sk_live_a1b2c3d4e5f6g7h8i9j0

```
app_sk_live_a1b2c3d4e5f6g7h8i9j0
```

**Pattern 8:** Attach metadata to track key usage:

```
await authClient.apiKey.create({
  name: "Analytics Service",
  metadata: {
    service: "analytics",
    environment: "production",
    permissions: ["read:analytics", "write:reports"],
    rateLimit: 1000
  }
})
```

### Example Code Patterns

**Example 1** (python):
```python
import { PasskeysCard } from "@better-auth/ui-react/components"
```

**Example 2** (python):
```python
import { OrganizationSwitcher } from '@daveyplate/better-auth-ui'

<OrganizationSwitcher />
```

## Reference Files

This skill includes comprehensive documentation in `references/`:

- **advanced.md** - Advanced documentation
- **api-reference.md** - Api-Reference documentation
- **components.md** - Components documentation
- **data.md** - Data documentation
- **integrations.md** - Integrations documentation
- **other.md** - Other documentation

Use `view` to read specific reference files when detailed information is needed.

## Working with This Skill

### For Beginners
Start with the getting_started or tutorials reference files for foundational concepts.

### For Specific Features
Use the appropriate category reference file (api, guides, etc.) for detailed information.

### For Code Examples
The quick reference section above contains common patterns extracted from the official docs.

## Resources

### references/
Organized documentation extracted from official sources. These files contain:
- Detailed explanations
- Code examples with language annotations
- Links to original documentation
- Table of contents for quick navigation

### scripts/
Add helper scripts here for common automation tasks.

### assets/
Add templates, boilerplate, or example projects here.

## Notes

- This skill was automatically generated from official documentation
- Reference files preserve the structure and examples from source docs
- Code examples include language detection for better syntax highlighting
- Quick reference patterns are extracted from common usage examples in the docs

## Updating

To refresh this skill with updated documentation:
1. Re-run the scraper with the same configuration
2. The skill will be rebuilt with the latest information
