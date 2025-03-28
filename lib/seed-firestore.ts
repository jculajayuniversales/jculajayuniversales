"use client"

import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"

export async function seedFirestoreData() {
  try {
    // Inicializar estadísticas
    await setDoc(doc(db, "stats", "dashboard"), {
      activeUsers: 42,
      totalUsers: 1234,
      totalOrders: 573,
      revenue: 45231,
    })

    // Inicializar algunos usuarios de ejemplo
    const usersCollection = collection(db, "users")

    await setDoc(doc(usersCollection, "user1"), {
      name: "Juan Pérez",
      email: "juan@ejemplo.com",
      role: "admin",
      createdAt: new Date(),
    })

    await setDoc(doc(usersCollection, "user2"), {
      name: "María García",
      email: "maria@ejemplo.com",
      role: "editor",
      createdAt: new Date(),
    })

    await setDoc(doc(usersCollection, "user3"), {
      name: "Carlos López",
      email: "carlos@ejemplo.com",
      role: "user",
      createdAt: new Date(),
    })

    console.log("Datos iniciales de Firestore creados correctamente")
    return { success: true }
  } catch (error) {
    console.error("Error al inicializar datos:", error)
    return { success: false, error }
  }
}

