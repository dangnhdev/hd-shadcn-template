import {
  convexClient,
  crossDomainClient,
} from '@convex-dev/better-auth/client/plugins'
import { emailOTPClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  plugins: [emailOTPClient(), crossDomainClient(), convexClient()],
})

// Export commonly-used methods and hooks for convenient imports
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  updateUser,
  changeEmail,
  changePassword,
} = authClient
