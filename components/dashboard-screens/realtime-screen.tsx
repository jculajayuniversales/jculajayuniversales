"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ref, onValue } from "firebase/database"
import { database } from "@/lib/firebase"
import { Activity, Users, ShoppingCart, DollarSign } from "lucide-react"
import { RealtimeUsers } from "@/components/realtime-users"

export function RealtimeScreen() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  })

  useEffect(() => {
    const statsRef = ref(database, "stats")

    const unsubscribe = onValue(statsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setStats(data)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Datos de Realtime Database</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">En línea ahora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Actualizado en tiempo real</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Conteo de pedidos en vivo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Ingresos en tiempo real</p>
          </CardContent>
        </Card>
      </div>

      <RealtimeUsers />
    </div>
  )
}

