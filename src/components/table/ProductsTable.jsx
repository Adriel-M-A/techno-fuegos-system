import { Trash2 } from 'lucide-react'
import DataTable from './DataTable'
import TableActionButton from './TableActionButton'
import { formatARS } from '../../utils/currencyFormatters'
import { SearchableSelect, QuantityInput } from '../ui'

export default function ProductsTable({ rows, catalogo = [], onProductChange, onQuantityChange, onDeleteRow }) {
  // Columnas para DataTable
  const columns = [
    { key: 'producto', label: 'MATERIAL' },
    { key: 'cantidad', label: 'CANTIDAD', align: 'center' },
    { key: 'precio_unitario', label: 'PRECIO UNITARIO', align: 'right' },
    { key: 'subtotal', label: 'SUBTOTAL', align: 'right' },
    { key: 'acciones', label: 'ACCIONES', align: 'right' },
  ]

  // Opciones del catálogo para el selector interactivo
  const productOptions = catalogo.map(p => ({
    value: p.id,
    label: p.nombre || p.material, // Soporta productos_base o insumos_base
  }))

  // Preparar filas para DataTable
  const dataTableRows = rows.map((row) => ({
    id: row.id,
    producto: (
      <SearchableSelect
        options={productOptions}
        value={row.product_id}
        onChange={(e) => onProductChange(row.id, e.target.value)}
        placeholder="Seleccionar material..."
      />
    ),
    cantidad: (
      <div className="flex justify-center">
        <QuantityInput
          value={row.quantity}
          onChange={(newVal) => onQuantityChange(row.id, newVal)}
          min={1}
        />
      </div>
    ),
    precio_unitario: (
      <span className="text-on-surface-variant mono-data">
        {/* formatARS recibe centavos enteros — SAFE MONEY */}
        {formatARS(row.unit_price_centavos)}
      </span>
    ),
    subtotal: (
      <span className="font-medium text-on-surface mono-data">
        {/* Operación entera: centavos × cantidad, sin riesgo de punto flotante */}
        {formatARS(row.unit_price_centavos * row.quantity)}
      </span>
    ),
    acciones: (
      <div className="flex justify-end">
        <TableActionButton
          icon={Trash2}
          title="Eliminar fila"
          variant="danger"
          onClick={() => onDeleteRow(row.id)}
        />
      </div>
    ),
  }))

  return (
    <DataTable
      columns={columns}
      rows={dataTableRows}
      emptyMessage="No hay materiales en la lista. Añadí una fila para comenzar."
    />
  )
}
