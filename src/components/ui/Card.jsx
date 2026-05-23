// Componente Card con header y body separados por divisor
export default function Card({ title, headerActions, children, className = '' }) {
  return (
    <div className={`bg-surface-container-lowest border border-border-iron rounded-lg overflow-hidden ${className}`}>

      {/* Header de la card: fondo gris claro con borde inferior */}
      {title && (
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low border-b border-border-iron">
          <span className="label-lg text-on-surface uppercase tracking-wide">
            {title}
          </span>
          {headerActions && (
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Body de la card */}
      <div className="p-4">
        {children}
      </div>

    </div>
  )
}
