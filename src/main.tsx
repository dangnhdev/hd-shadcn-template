import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  notifyManager,
} from '@tanstack/react-query'
import { Link, RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack'
import { AuthUIProviderTanstack } from '@daveyplate/better-auth-ui/tanstack'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { toast } from 'sonner'
import { handleServerError } from '@/lib/handle-server-error'
import { FontProvider } from './context/font-provider'
import { ThemeProvider } from './context/theme-provider'
import { authClient } from './lib/auth-client'
// Generated Routes
import { routeTree } from './routeTree.gen'
// Styles
import './styles/index.css'

if (typeof document !== 'undefined') {
  notifyManager.setScheduler(window.requestAnimationFrame)
}
const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL as string,
  { expectAuth: false }
)
const convexQueryClient = new ConvexQueryClient(convex)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
      retry: (failureCount, error) => {
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) console.log({ failureCount, error })

        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false

        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error)

        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast.error('Content not modified!')
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error('Session expired!')
          router.navigate({ to: '/auth/sign-in', replace: true })
        }
        if (error.response?.status === 500) {
          toast.error('Internal Server Error!')
          router.navigate({ to: '/500' })
        }
        if (error.response?.status === 403) {
          // router.navigate("/forbidden", { replace: true });
        }
      }
    },
  }),
})

convexQueryClient.connect(queryClient)

// Create a new router instance
const router = routerWithQueryClient(
  createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    context: { queryClient },
    // Wrap: ({ children }) => (
    //   <ConvexProvider client={convexQueryClient.convexClient}>
    //     {children}
    //   </ConvexProvider>
    // ),
  }),
  queryClient
)

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof createRouter
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ConvexBetterAuthProvider client={convex} authClient={authClient}>
        <QueryClientProvider client={queryClient}>
          <AuthQueryProvider>
            <ThemeProvider>
              <AuthUIProviderTanstack
                emailOTP={true}
                credentials={false}
                signUp={false}
                persistClient={false}
                redirectTo='/'
                authClient={authClient}
                //onSessionChange={() => router.refresh()}
                navigate={(href) => router.navigate({ href })}
                replace={(href) => router.navigate({ href, replace: true })}
                Link={({ href, ...props }) => <Link to={href} {...props} />}
              >
                <FontProvider>
                  <RouterProvider router={router} />
                </FontProvider>
              </AuthUIProviderTanstack>
            </ThemeProvider>
          </AuthQueryProvider>
        </QueryClientProvider>
      </ConvexBetterAuthProvider>
    </StrictMode>
  )
}
