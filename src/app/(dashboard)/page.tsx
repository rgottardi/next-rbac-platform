import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { getCurrentUser } from "@/lib/auth/actions"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome back${user?.email ? `, ${user.email}` : ''}`}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Dashboard cards will go here */}
      </div>
    </DashboardShell>
  )
}