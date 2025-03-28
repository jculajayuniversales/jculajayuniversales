import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to access your admin dashboard</p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <Link href="/login" className="w-full">
            <Button className="w-full" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

