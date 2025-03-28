"use client"

import type React from "react"

import { useUniapp } from "@/contexts/uniapp-context"
import { availableApps, contentTypes } from "@/types/uniapp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileType, Tag, Package } from "lucide-react"

export function ModelSelector() {
  const { currentModel, setCurrentModel, loadContent, isLoading } = useUniapp()

  // Obtener las versiones disponibles para la app seleccionada
  const getVersionsForApp = (appId: string) => {
    const app = availableApps.find((a) => a.id === appId)
    return app ? app.versions : []
  }

  // Manejadores de cambio para cada campo del modelo
  const handleAppChange = (value: string) => {
    const versions = getVersionsForApp(value)
    setCurrentModel({
      ...currentModel,
      app: value,
      version: versions.length > 0 ? versions[0] : "",
    })
  }

  const handleVersionChange = (value: string) => {
    setCurrentModel({
      ...currentModel,
      version: value,
    })
  }

  const handleTypeChange = (value: string) => {
    setCurrentModel({
      ...currentModel,
      type: Number.parseInt(value),
    })
  }

  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentModel({
      ...currentModel,
      filename: e.target.value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seleccionar Contenido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="app">Aplicación</Label>
            <Select value={currentModel.app} onValueChange={handleAppChange}>
              <SelectTrigger id="app" className="w-full">
                <Package className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seleccionar aplicación" />
              </SelectTrigger>
              <SelectContent>
                {availableApps.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="version">Versión</Label>
            <Select value={currentModel.version} onValueChange={handleVersionChange}>
              <SelectTrigger id="version" className="w-full">
                <Tag className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seleccionar versión" />
              </SelectTrigger>
              <SelectContent>
                {getVersionsForApp(currentModel.app).map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Contenido</Label>
            <Select value={currentModel.type.toString()} onValueChange={handleTypeChange}>
              <SelectTrigger id="type" className="w-full">
                <FileType className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filename">Nombre de Archivo (opcional)</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="filename"
                placeholder="Nombre del archivo"
                value={currentModel.filename}
                onChange={handleFilenameChange}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={loadContent} disabled={isLoading} className="w-full">
          {isLoading ? "Cargando..." : "Cargar Contenido"}
        </Button>
      </CardFooter>
    </Card>
  )
}

