import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fail')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>You shouldn't be here!</div>
}
