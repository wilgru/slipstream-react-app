import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/flagged/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/flagged/"!</div>
}
