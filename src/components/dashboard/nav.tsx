import Link from "next/link"
import { UserNav } from "./user-nav"

interface DashboardNavProps {
  user: any // Replace with proper user type
}

export function DashboardNav({ user }: DashboardNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold">
            RBAC Platform
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/users"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Users
            </Link>
            <Link
              href="/dashboard/roles"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Roles
            </Link>
          </nav>
        </div>
        <UserNav user={user} />
      </div>
    </header>
  )
}