"use client"

import { useEffect, useState } from "react"
import { ref, onValue, set, remove } from "firebase/database"
import { database } from "@/lib/firebase"
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
  lastActive: string
}

export function RealtimeUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" })

  useEffect(() => {
    const usersRef = ref(database, "users")

    // Set up real-time listener
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const usersList = Object.entries(data).map(([id, userData]) => ({
          id,
          ...(userData as Omit<User, "id">),
        }))
        setUsers(usersList)
      } else {
        setUsers([])
      }
      setLoading(false)
    })

    // Clean up listener
    return () => {
      unsubscribe()
    }
  }, [])

  const addUser = () => {
    const id = Date.now().toString()
    const userRef = ref(database, `users/${id}`)
    set(userRef, {
      ...newUser,
      lastActive: new Date().toISOString(),
    }).then(() => {
      setNewUser({ name: "", email: "", role: "user" })
    })
  }

  const deleteUser = (id: string) => {
    const userRef = ref(database, `users/${id}`)
    remove(userRef)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users (Real-time)</CardTitle>
        <CardDescription>This list updates in real-time as data changes in the database</CardDescription>
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No users found. Add your first user below.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleString()}</TableCell>
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
          <h3 className="text-sm font-medium">Add New User</h3>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              placeholder="Name"
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
            <Button onClick={addUser} disabled={!newUser.name || !newUser.email}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

