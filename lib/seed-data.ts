"use client"

import { ref, set } from "firebase/database"
import { database } from "./firebase"

export async function seedInitialData() {
  // Seed stats
  await set(ref(database, "stats"), {
    activeUsers: 42,
    totalUsers: 1234,
    totalOrders: 573,
    revenue: 45231,
  })

  // Seed some sample users
  const users = {
    user1: {
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      lastActive: new Date().toISOString(),
    },
    user2: {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "editor",
      lastActive: new Date().toISOString(),
    },
    user3: {
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      lastActive: new Date().toISOString(),
    },
  }

  await set(ref(database, "users"), users)

  console.log("Initial data seeded successfully")
  return { success: true }
}

