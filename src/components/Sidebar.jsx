import { useState } from 'react'
import { LayoutGrid, PlusCircle, Settings, HelpCircle, Menu } from 'lucide-react'
import SidebarButton from './SidebarButton'

// Listado de ítems de navegación parametrizados de acuerdo con la guía de diseño
const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid, vista: 'presupuestos' },
  { label: 'Creador', icon: PlusCircle, vista: 'creador' },
  { label: 'Configuración', icon: Settings, vista: 'costos' },
  { label: 'Centro de Ayuda', icon: HelpCircle, vista: 'manual' },
]

// Componente Sidebar principal con soporte de panel colapsable Fluent
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`
        h-screen flex flex-col bg-[var(--color-sidebar-bg)] border-r border-outline-variant/40 shrink-0
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16 px-1' : 'w-60 px-2'}
      `}
    >
      {/* Cabecera del panel con botón Menu hamburguesa */}
      {!isCollapsed ? (
        <div className="px-4 pt-7 pb-5 border-b border-outline-variant/40 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-base font-bold text-primary leading-tight">
              Techno Fuegos
            </h1>
            <p className="text-[9px] font-medium uppercase tracking-widest text-on-surface-variant mt-0.5">
              Gestión de Presupuestos
            </p>
          </div>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-sm hover:bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors shrink-0"
            title="Colapsar menú"
          >
            <Menu size={16} />
          </button>
        </div>
      ) : (
        <div className="px-0 pt-7 pb-5 border-b border-outline-variant/40 flex flex-col items-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 rounded-sm hover:bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors"
            title="Expandir menú"
          >
            <Menu size={16} />
          </button>
        </div>
      )}

      {/* Listado de navegación central (ritmo vertical optimizado con gap exacto) */}
      <nav className="flex-1 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <SidebarButton key={item.vista} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Pie de página con versión */}
      {!isCollapsed ? (
        <div className="px-6 py-4 border-t border-outline-variant/40">
          <p className="text-[11px] text-on-surface-variant text-center select-none">
            Versión {__APP_VERSION__}
          </p>
        </div>
      ) : (
        <div className="px-0 py-4 border-t border-outline-variant/40 flex justify-center">
          <p className="text-[10px] font-mono font-bold text-on-surface-variant/80 select-none">
            v{__APP_VERSION__.split('.')[0]}
          </p>
        </div>
      )}
    </aside>
  )
}
