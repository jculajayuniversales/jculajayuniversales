"use client"

import { useEffect, useState } from "react"
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, UserPlus } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Timestamp
}

export function FirestoreUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" })

  useEffect(() => {
    // Crear una consulta ordenada por fecha de creación
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"))

    // Configurar el listener en tiempo real
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const usersList: User[] = []
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() } as User)
        })
        setUsers(usersList)
        setLoading(false)
      },
      (error) => {
        console.error("Error al obtener usuarios:", error)
        setLoading(false)
      },
    )

    // Limpiar el listener
    return () => unsubscribe()
  }, [])

  const addUser = async () => {
    try {
      await addDoc(collection(db, "users"), {
        ...newUser,
        createdAt: serverTimestamp(),
      })
      setNewUser({ name: "", email: "", role: "user" })
    } catch (error) {
      console.error("Error al añadir usuario:", error)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id))
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios (Firestore)</CardTitle>
        <CardDescription>Esta lista se actualiza en tiempo real usando Firestore</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Fecha de Creación</TableHead>
                <TableHead className="w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No se encontraron usuarios. Añade tu primer usuario abajo.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleString() : "Pendiente..."}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="grid w-full gap-2">
          <h3 className="text-sm font-medium">Añadir Nuevo Usuario</h3>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              placeholder="Nombre"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              className="rounded-md border border-input bg-background px-3 py-2"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
            </select>
            <Button onClick={addUser} disabled={!newUser.name || !newUser.email}>
              <UserPlus className="mr-2 h-4 w-4" />
              Añadir Usuario
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

