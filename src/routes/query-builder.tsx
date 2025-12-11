import QueryBuilder from '@/pages/query-builder/QueryBuilder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/query-builder')({
  component: RouteComponent,
})

function RouteComponent() {
  return <QueryBuilder />
}
