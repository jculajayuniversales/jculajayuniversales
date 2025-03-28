"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type UniappModel, availableApps, contentTypes } from "@/types/uniapp"

interface UniappContextType {
  currentModel: UniappModel
  setCurrentModel: (model: UniappModel) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  contentData: any
  loadContent: () => Promise<void>
}

const defaultModel: UniappModel = {
  app: availableApps[0].id,
  filename: "",
  type: contentTypes[0].id,
  version: availableApps[0].versions[0],
}

const UniappContext = createContext<UniappContextType | undefined>(undefined)

export function UniappProvider({ children }: { children: ReactNode }) {
  const [currentModel, setCurrentModel] = useState<UniappModel>(defaultModel)
  const [isLoading, setIsLoading] = useState(false)
  const [contentData, setContentData] = useState<any>(null)

  // Función para cargar el contenido basado en el modelo actual
  const loadContent = async () => {
    setIsLoading(true)
    try {
      // Simulamos una carga de datos desde Firebase
      // En un caso real, aquí harías una consulta a Firestore o Realtime Database
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Datos simulados basados en el modelo actual
      const mockData = {
        title: `Contenido de ${getAppName(currentModel.app)}`,
        version: currentModel.version,
        type: getTypeName(currentModel.type),
        content: `Este es el contenido para ${currentModel.filename || "archivo principal"} 
                  de la aplicación ${getAppName(currentModel.app)} 
                  versión ${currentModel.version} 
                  tipo ${getTypeName(currentModel.type)}`,
        timestamp: new Date().toISOString(),
        metadata: {
          author: "Sistema",
          lastModified: new Date().toISOString(),
          size: Math.floor(Math.random() * 1000) + "KB",
        },
      }

      setContentData(mockData)
    } catch (error) {
      console.error("Error al cargar el contenido:", error)
      setContentData(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Funciones auxiliares para obtener nombres basados en IDs
  const getAppName = (appId: string) => {
    const app = availableApps.find((a) => a.id === appId)
    return app ? app.name : appId
  }

  const getTypeName = (typeId: number) => {
    const type = contentTypes.find((t) => t.id === typeId)
    return type ? type.name : `Tipo ${typeId}`
  }

  return (
    <UniappContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        isLoading,
        setIsLoading,
        contentData,
        loadContent,
      }}
    >
      {children}
    </UniappContext.Provider>
  )
}

export function useUniapp() {
  const context = useContext(UniappContext)
  if (context === undefined) {
    throw new Error("useUniapp must be used within a UniappProvider")
  }
  return context
}

