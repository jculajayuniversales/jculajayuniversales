"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { usePathname } from "next/navigation"

// Definir los tipos de pantallas disponibles
export type DashboardScreen = "overview" | "users" | "firestore" | "realtime" | "analytics" | "settings"

type DashboardContextType = {
  currentScreen: DashboardScreen
  setCurrentScreen: (screen: DashboardScreen) => void
  screenTitle: string
  screenIcon: ReactNode
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<DashboardScreen>("overview")
  const pathname = usePathname()

  // Actualizar el título basado en la ruta actual
  useEffect(() => {
    if (pathname === "/uniapp") {
      // No cambiar la pantalla actual, solo actualizar el título
    } else {
      // Restablecer a la pantalla predeterminada si volvemos al dashboard
      if (pathname === "/dashboard") {
        setCurrentScreen("overview")
      }
    }
  }, [pathname])

  // Obtener el título y el icono basado en la pantalla actual
  const getScreenInfo = (screen: DashboardScreen): { title: string; icon: ReactNode } => {
    switch (screen) {
      case "overview":
        return { title: "Panel General", icon: null }
      case "users":
        return { title: "Gestión de Usuarios", icon: null }
      case "firestore":
        return { title: "Datos Firestore", icon: null }
      case "realtime":
        return { title: "Datos Realtime", icon: null }
      case "analytics":
        return { title: "Analíticas", icon: null }
      case "settings":
        return { title: "Configuración", icon: null }
      default:
        return { title: "Dashboard", icon: null }
    }
  }

  // Si estamos en la página de Uniapp, usar un título específico
  let screenTitle = "Dashboard"
  let screenIcon = null

  if (pathname === "/uniapp") {
    screenTitle = "Visor Unificado de Aplicaciones"
  } else {
    const { title, icon } = getScreenInfo(currentScreen)
    screenTitle = title
    screenIcon = icon
  }

  return (
    <DashboardContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        screenTitle,
        screenIcon,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

