/**
 * TabBar
 * Selector de pestañas con estética industrial y bordes rectos (0px).
 * 
 * @param {Object} props
 * @param {Array} props.tabs - Lista de pestañas [{ id, label }]
 * @param {string} props.activeTab - ID de la pestaña activa
 * @param {Function} props.onChange - Callback al cambiar de pestaña
 */
export default function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex items-center border-b border-outline-variant">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2.5 label-lg text-sm transition-all duration-200
              border-b-2 -mb-px cursor-pointer rounded-t-sm
              ${isActive
                ? 'border-primary-container text-primary-container font-semibold bg-primary-container/[0.04]'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40'
              }
            `}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
