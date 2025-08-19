import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    console.log("beforeLoad", context.auth);
    if (context.auth.doesTenantExist === false) {
      console.warn("Tenant does not exist, redirecting externally.");

      window.location.assign("/fail");
    }

    if (context.auth.pingResponse === null) {
      return;
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>This is where you should end up.</div>
}
