// Componente DataTable: tabla de datos con soporte para columnas numéricas
export default function DataTable({ columns = [], rows = [], emptyMessage = 'Sin datos disponibles.' }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">

        {/* Encabezado de la tabla */}
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`
                  px-4 py-2.5 label-lg text-on-surface uppercase tracking-wide
                  border-b border-outline-variant text-left
                  ${col.align === 'right' ? 'text-right' : ''}
                  ${col.align === 'center' ? 'text-center' : ''}
                `}
              >
                {col.label}
              </th>
            ))}
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
                className="border-b border-outline-variant hover:bg-surface-container-low transition-colors duration-100"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-4 py-3 text-on-surface
                      ${col.mono ? 'mono-data' : 'body-md'}
                      ${col.align === 'right' ? 'text-right' : ''}
                      ${col.align === 'center' ? 'text-center' : ''}
                    `}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  )
}
