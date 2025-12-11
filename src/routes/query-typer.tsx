import { getThemeServerFn } from '@/lib/theme'
import { TypingTest } from '@/pages/query-writer/typing-test'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/query-typer')({
  component: RouteComponent,
  loader:()=>getThemeServerFn()
})

function RouteComponent() {
  return <TypingTest />
}
