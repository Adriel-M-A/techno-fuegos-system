import { LayoutGrid, PlusCircle, Settings, HelpCircle } from 'lucide-react'
import SidebarButton from './SidebarButton'

// Listado de ítems de navegación parametrizados de acuerdo con la guía de diseño
const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid, vista: 'presupuestos' },
  { label: 'Creador', icon: PlusCircle, vista: 'creador' },
  { label: 'Configuración', icon: Settings, vista: 'costos' },
  { label: 'Centro de Ayuda', icon: HelpCircle, vista: 'manual' },
]

// Componente Sidebar principal rediseñado bajo la estética Modern Industrial
export default function Sidebar() {
  return (
    <aside className="w-60 h-screen flex flex-col px-2 bg-surface-container-low border-r border-outline-variant shrink-0">

      {/* Cabecera del panel (alineada a px-6 para coincidir exactamente con el pl-6 de los botones) */}
      <div className="px-6 pt-7 pb-5 border-b border-outline-variant">
        <h1 className="text-lg font-bold text-primary leading-tight">
          Techno Fuegos
        </h1>
        <p className="text-[10px] font-medium uppercase tracking-widest text-on-surface-variant mt-0.5">
          Gestión de Presupuestos
        </p>
      </div>

      {/* Listado de navegación central (sin padding horizontal, ritmo vertical optimizado con gap exacto) */}
      <nav className="flex-1 py-4 flex flex-col gap-[1px]">
        {NAV_ITEMS.map((item) => (
          <SidebarButton key={item.vista} {...item} />
        ))}
      </nav>

      {/* Pie de página con versión (alineado a px-6 para conservar la consistencia vertical) */}
      <div className="px-6 py-4 border-t border-outline-variant">
        <p className="text-[11px] text-on-surface-variant text-center">
          Versión {__APP_VERSION__}
        </p>
      </div>

    </aside>
  )
}
