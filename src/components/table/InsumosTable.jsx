import { useState } from 'react'
import { Trash2, Pencil } from 'lucide-react'
import DataTable from './DataTable'
import TableActionButton from './TableActionButton'
import { ConfirmationModal } from '../ui'
import { formatARS } from '../../utils/currencyFormatters'
import { CATEGORIAS_INSUMOS } from '../ui/InsumoFormModal'

// Opciones de unidades válidas para los materiales/insumos
export const UNIDADES = [
  { value: 'metro', label: 'Metro' },
  { value: 'm2', label: 'm²' },
  { value: 'litro', label: 'Litro' },
  { value: 'kilo', label: 'Kilo' },
  { value: 'cantidad', label: 'Cantidad' },
]

/**
 * Componente InsumosTable
 * Tabla de solo lectura interactiva para visualizar la lista de insumos.
 * Lanza modales de confirmación para eliminar y notifica a la vista madre para editar.
 */
export default function InsumosTable({ rows, onEditRow, onDeleteRow }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  // Columnas estructuradas para DataTable
  const columns = [
    { key: 'material', label: 'MATERIAL' },
    { key: 'categoria', label: 'CATEGORÍA' },
    { key: 'unidad', label: 'UNIDAD', align: 'center' },
    { key: 'costo', label: 'COSTO UNITARIO ($)', align: 'right' },
    { key: 'acciones', label: 'ACCIONES', align: 'right' },
  ]

  // Encontrar etiqueta descriptiva para categorías y unidades
  const getCategoriaLabel = (val) => {
    const cat = CATEGORIAS_INSUMOS.find(c => c.value === val)
    return cat ? cat.label : 'Varios'
  }

  const getUnidadLabel = (val) => {
    const uni = UNIDADES.find(u => u.value === val)
    return uni ? uni.label : 'Cantidad'
  }

  // Mapear cada fila a componentes de solo lectura compatibles con DataTable
  const dataTableRows = rows.map((row) => ({
    id: row.id,
    material: (
      <span className="font-semibold text-on-surface select-text">
        {row.material}
      </span>
    ),
    categoria: (
      <span className="text-on-surface-variant/80 text-xs font-medium uppercase tracking-wider">
        {getCategoriaLabel(row.categoria)}
      </span>
    ),
    unidad: (
      <span className="text-on-surface-variant font-medium">
        {getUnidadLabel(row.unidad)}
      </span>
    ),
    costo: (
      <span className="font-mono text-on-surface font-bold">
        {/* costo_centavos: campo SAFE MONEY — INTEGER en SQLite */}
        {formatARS(row.costo_centavos)}
      </span>
    ),
    acciones: (
      <div className="flex items-center justify-end gap-2">
        <TableActionButton
          icon={Pencil}
          title="Editar insumo"
          variant="primary"
          onClick={() => onEditRow(row)}
        />
        <TableActionButton
          icon={Trash2}
          title="Eliminar insumo"
          variant="danger"
          onClick={() => setConfirmDeleteId(row.id)}
        />
      </div>
    ),
  }))

  return (
    <>
      <DataTable
        columns={columns}
        rows={dataTableRows}
        emptyMessage="No hay insumos registrados. Añadí un nuevo insumo para comenzar."
      />

      <ConfirmationModal
        isOpen={confirmDeleteId !== null}
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar este insumo? Esta acción es destructiva y modificará la planilla actual de materiales."
        variant="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={() => {
          onDeleteRow(confirmDeleteId)
          setConfirmDeleteId(null)
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </>
  )
}
