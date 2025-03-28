"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDashboard, type DashboardScreen } from "@/contexts/dashboard-context"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Users, Settings, BarChart2, FileText, Database, Layers, X } from "lucide-react"

// Definir los items del sidebar con sus iconos y pantallas correspondientes
const sidebarItems = [
  { name: "Panel General", screen: "overview" as DashboardScreen, icon: Home },
  { name: "Usuarios", screen: "users" as DashboardScreen, icon: Users },
  { name: "Firestore", screen: "firestore" as DashboardScreen, icon: Database },
  { name: "Realtime DB", screen: "realtime" as DashboardScreen, icon: FileText },
  { name: "Analíticas", screen: "analytics" as DashboardScreen, icon: BarChart2 },
  { name: "Configuración", screen: "settings" as DashboardScreen, icon: Settings },
]

export function DashboardSidebar() {
  const { currentScreen, setCurrentScreen } = useDashboard()
  const { isSidebarOpen, closeSidebar } = useSidebar()
  const pathname = usePathname()

  return (
    <>
      {/* Overlay para cerrar el sidebar en móvil */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 border-r bg-white flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <span className="text-lg font-semibold">Admin</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={closeSidebar}>
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = currentScreen === item.screen && pathname === "/dashboard"
            return (
              <Button
                key={item.screen}
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", isActive ? "bg-secondary" : "")}
                onClick={() => {
                  setCurrentScreen(item.screen)
                  closeSidebar() // Cerrar el sidebar en móvil al hacer clic en un elemento
                }}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Button>
            )
          })}

          {/* Enlace a la página Uniapp */}
          <Link href="/uniapp" onClick={closeSidebar}>
            <Button
              variant={pathname === "/uniapp" ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === "/uniapp" ? "bg-secondary" : "")}
            >
              <Layers className="mr-2 h-5 w-5" />
              Visor Unificado
            </Button>
          </Link>
        </nav>
      </aside>
    </>
  )
}

