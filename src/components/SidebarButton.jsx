import useNavigationStore from '../stores/navigationStore'

// Componente de botón para los ítems de navegación lateral de la sidebar
export default function SidebarButton({ label, icon: Icon, vista }) {
  const { vistaActiva, setVista } = useNavigationStore()
  const isActive = vistaActiva === vista

  return (
    <button
      onClick={() => setVista(vista)}
      className={`
        w-full flex items-center gap-3 pl-6 pr-4 py-3 text-sm font-medium
        transition-colors duration-150 rounded-none cursor-pointer
        border-r-[3px] border-solid text-left
        ${isActive
          ? 'bg-primary/10 border-primary text-primary'
          : 'border-r-transparent text-on-surface hover:bg-surface-container-high hover:text-on-surface'
        }
      `}
    >
      <Icon
        size={18}
        className={isActive ? 'text-primary' : 'text-on-surface-variant'}
      />
      <span>{label}</span>
    </button>
  )
}
