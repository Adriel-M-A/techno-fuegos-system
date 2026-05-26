// Componente Card con header y body separados por divisor
export default function Card({ title, headerActions, children, className = '' }) {
  return (
    <div className={`bg-surface-container-lowest border border-outline-variant/60 rounded-md shadow-card ${className}`}>

      {/* Header de la card: fondo gris claro con borde inferior */}
      {title && (
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low/70 rounded-t-md border-b border-outline-variant/60">
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
