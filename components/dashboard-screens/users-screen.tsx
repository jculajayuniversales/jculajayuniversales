"use client"

import { FirestoreUsers } from "@/components/firestore-users"

export function UsersScreen() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
      <FirestoreUsers />
    </div>
  )
}

