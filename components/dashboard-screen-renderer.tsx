"use client"

import { useDashboard } from "@/contexts/dashboard-context"
import { OverviewScreen } from "./dashboard-screens/overview-screen"
import { UsersScreen } from "./dashboard-screens/users-screen"
import { FirestoreScreen } from "./dashboard-screens/firestore-screen"
import { RealtimeScreen } from "./dashboard-screens/realtime-screen"
import { AnalyticsScreen } from "./dashboard-screens/analytics-screen"
import { SettingsScreen } from "./dashboard-screens/settings-screen"

export function DashboardScreenRenderer() {
  const { currentScreen } = useDashboard()

  // Renderizar la pantalla correspondiente basada en currentScreen
  switch (currentScreen) {
    case "overview":
      return <OverviewScreen />
    case "users":
      return <UsersScreen />
    case "firestore":
      return <FirestoreScreen />
    case "realtime":
      return <RealtimeScreen />
    case "analytics":
      return <AnalyticsScreen />
    case "settings":
      return <SettingsScreen />
    default:
      return <OverviewScreen />
  }
}

