import useNavigationStore from '../stores/navigationStore'

// Componente de botón para los ítems de navegación lateral de la sidebar
export default function SidebarButton({ label, icon: Icon, vista }) {
  const { vistaActiva, setVista } = useNavigationStore()
  const isActive = vistaActiva === vista

  return (
    <button
      onClick={() => setVista(vista)}
      style={isActive ? {
        backgroundColor: 'rgba(179, 71, 0, 0.12)',
        borderRightColor: '#b34700',
        color: '#b34700',
      } : {}}
      className={`
        w-full flex items-center gap-3 pl-6 pr-4 py-3 text-sm font-medium
        transition-colors duration-150 rounded-none cursor-pointer
        border-r-[3px] border-solid text-left
        ${isActive
          ? 'border-r-[3px]'
          : 'border-r-transparent text-[#1a1c1c] hover:bg-[#e2dfde] hover:text-[#1a1c1c]'
        }
      `}
    >
      <Icon
        size={18}
        style={isActive ? { color: '#b34700' } : { color: '#1a1c1c' }}
      />
      <span>{label}</span>
    </button>
  )
}
