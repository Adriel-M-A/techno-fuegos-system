// Componente DataTable: tabla de datos industrial con soporte para alineación y formato mono
export default function DataTable({ columns = [], rows = [], emptyMessage = 'Sin datos disponibles.' }) {
  return (
    <div className="w-full rounded-md border border-outline-variant/40 shadow-card bg-surface-container-lowest overflow-visible">
      <table className="w-full border-collapse text-sm text-left">

        {/* Encabezado de la tabla */}
        <thead>
          <tr className="bg-surface-container-low/70 border-b border-outline-variant/40">
            {columns.map((col, index) => {
              const isFirst = index === 0
              const isLast = index === columns.length - 1
              
              // Alineación según la regla estricta: extremos izquierdo a la izquierda, extremos derecho a la derecha, demás centradas
              const alignmentClass = isFirst
                ? 'text-left'
                : isLast
                  ? 'text-right'
                  : 'text-center'

              return (
                <th
                  key={col.key}
                  className={`
                    px-4 py-2.5 label-lg text-on-surface uppercase tracking-wide
                    border-b border-outline-variant/40
                    ${alignmentClass}
                  `}
                >
                  {col.label}
                </th>
              )
            })}
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center body-md text-on-surface-variant"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id || i}
                className="border-b border-outline-variant/30 hover:bg-primary-container/5 transition-colors duration-200 relative focus-within:z-30 hover:z-20"
              >
                {columns.map((col, index) => {
                  const isFirst = index === 0
                  const isLast = index === columns.length - 1
                  
                  // Alineación igualitaria según la posición de la celda
                  const alignmentClass = isFirst
                    ? 'text-left'
                    : isLast
                      ? 'text-right'
                      : 'text-center'

                  return (
                    <td
                      key={col.key}
                      className={`
                        px-4 py-3 text-on-surface
                        ${col.mono ? 'mono-data' : 'body-md'}
                        ${alignmentClass}
                      `}
                    >
                      {row[col.key]}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  )
}
