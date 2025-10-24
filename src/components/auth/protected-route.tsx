import { useSession } from '@/lib/auth-client'
import { Navigate } from '@tanstack/react-router'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to="/auth/sign-in" />
  }

  return <>{children}</>
}
