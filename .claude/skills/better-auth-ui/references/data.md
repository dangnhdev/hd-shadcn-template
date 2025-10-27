# Better-Auth-Ui - Data

**Pages:** 3

---

## Triplit

**URL:** https://better-auth-ui.com/data/triplit

**Contents:**
- Triplit
- Prerequisites
- Integration with Auth UI Providers

Triplit is a simple and powerful database solution that works well with Better Auth UI.

Set up your project with the @daveyplate/better-auth-triplit package.

You can pass the Triplit hooks to both the AuthUIProvider and AuthUIProviderTanstack components:

The same pattern works for AuthUIProviderTanstack as well. This is recommended for use with a Persist Client for offline authentication.

**Examples:**

Example 1 (python):
```python
import { useTriplitHooks } from "@daveyplate/better-auth-ui/triplit"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { useSession } from "@/lib/auth-client"
import { triplit } from "@/lib/triplit"

function Providers({ children }) {
    const { data: sessionData, isPending } = useSession()
    const { hooks } = useTriplitHooks({ 
        triplit, 
        sessionData, 
        isPending, 
        usePlural: true 
    })
    
    return (
        <AuthUIProvider
            // ...other props
            hooks={hooks}
        >
            {children}
        </AuthUIProvider>

...
```

---

## InstantDB

**URL:** https://better-auth-ui.com/data/instantdb

**Contents:**
- InstantDB
- Prerequisites
- Integration with Auth UI Providers

InstantDB is a simple and powerful database solution that works well with Better Auth UI.

Set up your project with the @daveyplate/better-auth-instantdb package.

You can pass the InstantDB hooks and mutators to both the AuthUIProvider and AuthUIProviderTanstack components:

The same pattern works for AuthUIProviderTanstack as well. This is the recommended for use with a Persist Client for offline authentication.

**Examples:**

Example 1 (python):
```python
import { useInstantAuth } from "@daveyplate/better-auth-instantdb"
import { useInstantOptions } from "@daveyplate/better-auth-ui/instantdb"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { useSession } from "@/lib/auth-client"
import { db } from "@/lib/db"

function Providers({ children }) {
    const { data: sessionData, isPending } = useSession()
    useInstantAuth({ db, sessionData, isPending })
    const { user } = db.useAuth()
    const { hooks, mutators } = useInstantOptions({ 
        db, 
        sessionData, 
        isPending, 
        user, 
        usePlural: tr
...
```

---

## TanStack Query

**URL:** https://better-auth-ui.com/data/tanstack-query

**Contents:**
- TanStack Query

In order to use @daveyplate/better-auth-ui with the @daveyplate/better-auth-tanstack package, all you need to do is change your <AuthUIProvider /> into an <AuthUIProviderTanstack /> component. It accepts all of the same props and configuration options.

The main difference is the persistClient prop which is only required if you are using a persistQueryClient for offline Authentication. This prop will tell the authentication methods to use the /auth/callback path for all authentication methods that leave the site, which will clear your query cache for you automatically.

**Examples:**

Example 1 (python):
```python
"use client"

import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack"
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthQueryProvider>
            <AuthUIProviderTanstack
                authClient={authClient}
                navigate={router.push}
                persistClient={false}
                rep
...
```

---
