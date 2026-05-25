import useNavigationStore from '../stores/navigationStore'

// Componente SidebarButton: botón de navegación lateral con soporte de visualización colapsada
export default function SidebarButton({ label, icon: Icon, vista, isCollapsed = false }) {
  const { vistaActiva, setVista } = useNavigationStore()
  const isActive = vistaActiva === vista

  return (
    <button
      onClick={() => setVista(vista)}
      title={isCollapsed ? label : undefined}
      className={`
        w-full flex items-center transition-all duration-200 rounded-md cursor-pointer
        ${isCollapsed
          ? 'justify-center py-2.5 px-0 text-center'
          : 'gap-3 pl-4 pr-4 py-2.5 text-left text-sm font-medium'
        }
        ${isActive
          ? 'bg-[var(--color-sidebar-active)] text-primary-container font-semibold'
          : 'text-on-surface hover:bg-surface-container-high/60 hover:text-on-surface'
        }
      `}
    >
      <Icon
        size={18}
        className={`transition-transform duration-200 ${isActive ? 'text-primary-container scale-105' : 'text-on-surface-variant'}`}
      />
      {!isCollapsed && <span>{label}</span>}
    </button>
  )
}
