"use client"

import { useUniapp } from "@/contexts/uniapp-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Info, Clock, Settings } from "lucide-react"

export function ContentViewer() {
  const { contentData, isLoading, currentModel } = useUniapp()

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!contentData) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No hay contenido para mostrar</h3>
            <p className="text-muted-foreground">Selecciona los parámetros y haz clic en "Cargar Contenido"</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Renderizar el contenido según el tipo
  const renderContent = () => {
    switch (currentModel.type) {
      case 1: // Documentación
        return (
          <div className="prose max-w-none dark:prose-invert">
            <h2>{contentData.title}</h2>
            <p>{contentData.content}</p>
          </div>
        )
      case 2: // Configuración
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{contentData.title}</h2>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    app: currentModel.app,
                    version: currentModel.version,
                    settings: {
                      debug: true,
                      environment: "production",
                      features: ["feature1", "feature2"],
                      limits: {
                        maxUsers: 1000,
                        maxStorage: "5GB",
                      },
                    },
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        )
      case 3: // Estadísticas
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">{contentData.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Usuarios", value: "1,234", change: "+12%" },
                { label: "Sesiones", value: "5,678", change: "+8%" },
                { label: "Tiempo Promedio", value: "4m 32s", change: "-3%" },
              ].map((stat, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={`text-xs ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {stat.change} desde la última versión
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case 4: // Logs
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{contentData.title}</h2>
            <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="py-1">
                  [{new Date(Date.now() - i * 60000).toISOString()}]{" "}
                  {i % 3 === 0 ? "ERROR: " : i % 3 === 1 ? "WARNING: " : "INFO: "}
                  {contentData.content} (línea {Math.floor(Math.random() * 1000)})
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return <p>{contentData.content}</p>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{contentData.title}</CardTitle>
            <CardDescription>
              Versión {contentData.version} • {contentData.type}
            </CardDescription>
          </div>
          <Badge variant="outline">{currentModel.filename || "Archivo principal"}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="metadata">Metadatos</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="pt-4">
            {renderContent()}
          </TabsContent>
          <TabsContent value="metadata" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Autor:</span>
                  <span>{contentData.metadata.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Última modificación:</span>
                  <span>{new Date(contentData.metadata.lastModified).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Tipo:</span>
                  <span>{contentData.type}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Tamaño:</span>
                  <span>{contentData.metadata.size}</span>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-md mt-4">
                <h3 className="text-sm font-medium mb-2">Modelo Completo:</h3>
                <pre className="text-xs overflow-auto">{JSON.stringify(currentModel, null, 2)}</pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

