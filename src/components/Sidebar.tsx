'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface SidebarProps {
  role: string
}

interface MenuItem {
  name: string
  href: string
}

const roleMenus: Record<string, MenuItem[]> = {
  'Administrador': [
    { name: 'Usuarios', href: '/usuarios' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Configuración', href: '/configuracion' }
  ],
  'Gestor': [
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Tareas', href: '/tareas' },
    { name: 'Recursos', href: '/recursos' },
    { name: 'Informes', href: '/informes' },
    { name: 'Riesgos', href: '/riesgos' }
  ],
  'Colaborador': [
    { name: 'Mis Tareas', href: '/mis-tareas' },
    { name: 'Incidencias', href: '/incidencias' },
    { name: 'Progreso', href: '/progreso' }
  ],
  'Cliente': [
    { name: 'Estado del Proyecto', href: '/estado-proyecto' },
    { name: 'Informes', href: '/informes' }
  ]
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const menuItems = roleMenus[role] || []

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    window.location.href = '/auth'
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Gestión de Proyectos
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Rol: {role}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === '/dashboard'
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Dashboard
            </Link>
          </li>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500">
              No hay menús disponibles para este rol
            </li>
          )}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full"
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            ☰
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
