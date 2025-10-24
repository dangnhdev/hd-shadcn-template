import {
  convexClient,
  crossDomainClient,
} from '@convex-dev/better-auth/client/plugins'
import { emailOTPClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

const baseURL = import.meta.env.VITE_CONVEX_SITE_URL!
console.log(baseURL)

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  plugins: [emailOTPClient(), crossDomainClient(), convexClient()],
  // WARN: MUST include this to allow cross-domain requests
  fetchOptions: {
    credentials: 'include',
  },
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
