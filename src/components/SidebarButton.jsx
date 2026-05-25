import useNavigationStore from '../stores/navigationStore'

// Componente de botón para los ítems de navegación lateral de la sidebar
export default function SidebarButton({ label, icon: Icon, vista }) {
  const { vistaActiva, setVista } = useNavigationStore()
  const isActive = vistaActiva === vista

  return (
    <button
      onClick={() => setVista(vista)}
      className={`
        w-full flex items-center gap-3 pl-4 pr-4 py-2.5 text-sm font-medium
        transition-all duration-200 rounded-md cursor-pointer text-left
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
      <span>{label}</span>
    </button>
  )
}
