import { createFileRoute } from '@tanstack/react-router'
import { AuthView } from '@daveyplate/better-auth-ui'

export const Route = createFileRoute('/(auth)/auth/$pathname')({
  component: AuthPage
})

function AuthPage() {
  const { pathname } = Route.useParams()

  return (
    <main className="container flex min-h-screen items-center justify-center p-4">
      <AuthView pathname={pathname} />
    </main>
  )
}
