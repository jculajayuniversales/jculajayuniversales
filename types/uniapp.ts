export interface UniappModel {
  app: string
  filename: string
  type: number
  version: string
}

export interface AppOption {
  id: string
  name: string
  versions: string[]
}

export interface ContentType {
  id: number
  name: string
}

// Datos simulados para las aplicaciones disponibles
export const availableApps: AppOption[] = [
  {
    id: "app1",
    name: "Aplicación 1",
    versions: ["1.0.0", "1.1.0", "1.2.0"],
  },
  {
    id: "app2",
    name: "Aplicación 2",
    versions: ["2.0.0", "2.1.0"],
  },
  {
    id: "app3",
    name: "Aplicación 3",
    versions: ["1.0.0", "1.5.0", "2.0.0"],
  },
]

// Tipos de contenido disponibles
export const contentTypes: ContentType[] = [
  { id: 1, name: "Documentación" },
  { id: 2, name: "Configuración" },
  { id: 3, name: "Estadísticas" },
  { id: 4, name: "Logs" },
]

