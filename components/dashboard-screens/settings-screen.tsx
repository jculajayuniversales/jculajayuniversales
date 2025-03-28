"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsScreen() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Mi Admin Panel",
    siteDescription: "Panel de administración con Firebase",
    enableNotifications: true,
    darkMode: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    allowMultipleSessions: true,
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Configuración</h2>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Gestiona la configuración básica de tu panel de administración</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nombre del Sitio</Label>
                <Input
                  id="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descripción</Label>
                <Input
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableNotifications">Habilitar Notificaciones</Label>
                <Switch
                  id="enableNotifications"
                  checked={generalSettings.enableNotifications}
                  onCheckedChange={(checked) =>
                    setGeneralSettings({ ...generalSettings, enableNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Modo Oscuro</Label>
                <Switch
                  id="darkMode"
                  checked={generalSettings.darkMode}
                  onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, darkMode: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Gestiona la configuración de seguridad de tu panel de administración</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactorAuth">Autenticación de Dos Factores</Label>
                <Switch
                  id="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allowMultipleSessions">Permitir Múltiples Sesiones</Label>
                <Switch
                  id="allowMultipleSessions"
                  checked={securitySettings.allowMultipleSessions}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({ ...securitySettings, allowMultipleSessions: checked })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

