import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Next.js RBAC Platform</h1>
      <div className="space-x-4">
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
        <Link href="/register" className="text-blue-500 hover:text-blue-700">
          Register
        </Link>
      </div>
    </main>
  )
}