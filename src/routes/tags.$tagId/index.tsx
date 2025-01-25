import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tags/$tagId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tags/$tagId/"!</div>
}
