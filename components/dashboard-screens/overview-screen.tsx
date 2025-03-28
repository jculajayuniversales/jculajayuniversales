"use client"

import { DashboardStats } from "@/components/dashboard-stats"
import { Button } from "@/components/ui/button"
import { seedInitialData } from "@/lib/seed-data"
import { seedFirestoreData } from "@/lib/seed-firestore"

export function OverviewScreen() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold">Resumen General</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => {
              seedInitialData().then(() => {
                alert("¡Datos de muestra de Realtime Database creados correctamente!")
              })
            }}
          >
            Inicializar Realtime DB
          </Button>
          <Button
            onClick={() => {
              seedFirestoreData().then((result) => {
                if (result.success) {
                  alert("¡Datos de muestra de Firestore creados correctamente!")
                } else {
                  alert("Error al crear datos de muestra de Firestore")
                }
              })
            }}
          >
            Inicializar Firestore
          </Button>
        </div>
      </div>
      <DashboardStats />
    </div>
  )
}

