import QueryBuilder from '@/pages/sql-query-builder/QueryBuilder'
import { createFileRoute } from '@tanstack/react-router'
import MongoQueryBuilder from '@/pages/mongo-query-builder/MongoQueryBuilder'
export const Route = createFileRoute('/query-builder')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MongoQueryBuilder />
}
