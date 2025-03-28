"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { UniappProvider } from "@/contexts/uniapp-context"
import { ModelSelector } from "@/components/uniapp/model-selector"
import { ContentViewer } from "@/components/uniapp/content-viewer"

export default function UniappPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (!user) {
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <UniappProvider>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Visor Unificado de Aplicaciones</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-1">
            <ModelSelector />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <ContentViewer />
          </div>
        </div>
      </DashboardLayout>
    </UniappProvider>
  )
}

