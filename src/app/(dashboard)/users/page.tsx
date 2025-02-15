import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"
import { UserTable } from "@/components/users/user-table"
import { CreateUserButton } from "@/components/users/create-user-button"
import { getUsers } from "@/lib/api/users"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage user accounts and permissions.">
        <CreateUserButton />
      </DashboardHeader>
      <div className="p-4">
        <UserTable users={users} />
      </div>
    </DashboardShell>
  )
}