import { createFileRoute } from '@tanstack/react-router'
import { authMiddleware } from '@/middlewares/auth-middleware'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: ({ location }) => authMiddleware({ location }),
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}
