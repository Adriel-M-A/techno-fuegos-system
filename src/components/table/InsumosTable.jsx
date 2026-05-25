import { Trash2 } from 'lucide-react'
import DataTable from './DataTable'
import TableActionButton from './TableActionButton'

// Opciones de unidades válidas para los materiales/insumos
export const UNIDADES = [
  { value: 'metro', label: 'Metro' },
  { value: 'm2', label: 'm2' },
  { value: 'litro', label: 'Litro' },
  { value: 'kilo', label: 'Kilo' },
  { value: 'cantidad', label: 'Cantidad' },
]

/**
 * Componente InsumosTable
 * Representa una tabla CRUD interactiva para administrar la lista de insumos.
 * Todos los campos de cada fila son editables directamente.
 */
export default function InsumosTable({ rows, onFieldChange, onDeleteRow }) {
  // Columnas estructuradas para DataTable
  const columns = [
    { key: 'material', label: 'MATERIAL' },
    { key: 'unidad', label: 'UNIDAD', align: 'center' },
    { key: 'costo', label: 'COSTO UNITARIO ($)', align: 'right' },
    { key: 'acciones', label: 'ACCIONES', align: 'center' },
  ]

  // Mapear cada fila a componentes interactivos compatibles con DataTable
  const dataTableRows = rows.map((row) => ({
    id: row.id,
    material: (
      <input
        type="text"
        value={row.material}
        onChange={(e) => onFieldChange(row.id, 'material', e.target.value)}
        className="w-full px-2 py-1.5 text-sm text-on-surface bg-transparent border border-transparent hover:border-border-iron focus:border-primary-container focus:bg-surface-container-lowest focus:outline-none transition-colors"
        placeholder="Ej. Caño estructural 40x40"
      />
    ),
    unidad: (
      <select
        value={row.unidad}
        onChange={(e) => onFieldChange(row.id, 'unidad', e.target.value)}
        className="w-full px-2 py-1.5 text-sm text-center text-on-surface bg-transparent border border-transparent hover:border-border-iron focus:border-primary-container focus:bg-surface-container-lowest focus:outline-none transition-colors cursor-pointer"
      >
        <option value="" disabled>Seleccionar unidad...</option>
        {UNIDADES.map((u) => (
          <option key={u.value} value={u.value}>
            {u.label}
          </option>
        ))}
      </select>
    ),
    costo: (
      <input
        type="number"
        min="0"
        step="0.01"
        value={row.costo}
        onChange={(e) => {
          const val = parseFloat(e.target.value)
          onFieldChange(row.id, 'costo', isNaN(val) ? 0 : val)
        }}
        className="w-full px-2 py-1.5 text-sm text-right text-on-surface bg-transparent border border-transparent hover:border-border-iron focus:border-primary-container focus:bg-surface-container-lowest focus:outline-none transition-colors font-mono"
        placeholder="0.00"
      />
    ),
    acciones: (
      <TableActionButton
        icon={Trash2}
        title="Eliminar insumo"
        variant="danger"
        onClick={() => onDeleteRow(row.id)}
      />
    ),
  }))

  return (
    <DataTable
      columns={columns}
      rows={dataTableRows}
      emptyMessage="No hay insumos registrados. Añade un nuevo insumo para comenzar."
    />
  )
}
