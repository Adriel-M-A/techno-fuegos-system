// Componente TablePagination: Paginador unificado e industrial para listas extensas
export default function TablePagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  showingStart = 0,
  showingEnd = 0,
  itemType = 'presupuestos',
}) {
  // Generar la lista de números de páginas
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="px-5 py-4 border-t border-outline-variant/40 bg-surface-container-low/40 flex items-center justify-between">
      {/* Resumen del conteo actual a la izquierda */}
      <span className="text-xs text-on-surface-variant font-medium select-none">
        Mostrando <span className="font-mono">{showingStart}</span>-
        <span className="font-mono">{showingEnd}</span> de{' '}
        <span className="font-mono">{totalItems}</span> {itemType} registrados
      </span>

      {/* Botones del paginador a la derecha */}
      <div className="flex items-center gap-1.5">
        
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-xs font-semibold text-on-surface bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container hover:shadow-sm transition-all duration-200 cursor-pointer rounded-sm select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-container-lowest"
        >
          Anterior
        </button>

        {/* Botones numéricos de página */}
        {pages.map((p) => {
          const isActive = p === currentPage
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`
                px-3 py-1.5 text-xs font-mono select-none rounded-sm cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? 'font-bold text-white bg-primary-container border border-primary-container shadow-sm'
                    : 'font-semibold text-on-surface bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container hover:shadow-sm'
                }
              `}
            >
              {p}
            </button>
          )
        })}

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-xs font-semibold text-on-surface bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container hover:shadow-sm transition-all duration-200 cursor-pointer rounded-sm select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface-container-lowest"
        >
          Siguiente
        </button>

      </div>
    </div>
  )
}
