import {
  ConvexProvider as ConvexReactProvider,
  ConvexReactClient,
} from 'convex/react'
import { type ReactNode } from 'react'

/**
 * Convex Client Provider
 *
 * This provider wraps the application with the Convex client,
 * enabling real-time queries and mutations throughout the app.
 */

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

export function ConvexProvider({ children }: { children: ReactNode }) {
  return <ConvexReactProvider client={convex}>{children}</ConvexReactProvider>
}
