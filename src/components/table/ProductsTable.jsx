import { Trash2 } from 'lucide-react'
import DataTable from './DataTable'
import TableActionButton from './TableActionButton'
import { formatARS } from '../../utils/currencyFormatters'
import { SearchableSelect, QuantityInput } from '../ui'

// Catálogo mockeado de productos/servicios con sus precios base
export const CATALOGO_PRODUCTOS = [
  { id: 'prod-1', nombre: 'Reja de Seguridad Estándar', precio: 150000 },
  { id: 'prod-2', nombre: 'Portón Corredizo 3x2m', precio: 450000 },
  { id: 'prod-3', nombre: 'Baranda de Balcón (ml)', precio: 85000 },
  { id: 'serv-1', nombre: 'Instalación Básica', precio: 50000 },
]

export default function ProductsTable({ rows, onProductChange, onQuantityChange, onDeleteRow }) {
  // Columnas para DataTable
  const columns = [
    { key: 'producto', label: 'PRODUCTO/SERVICIO' },
    { key: 'cantidad', label: 'CANTIDAD', align: 'center' },
    { key: 'precio_unitario', label: 'PRECIO UNITARIO (ARG)', align: 'right' },
    { key: 'subtotal', label: 'SUBTOTAL', align: 'right' },
    { key: 'acciones', label: 'ACCIONES', align: 'center' },
  ]

  // Formatear las opciones del catálogo para el buscador interactivo
  const productOptions = CATALOGO_PRODUCTOS.map(p => ({
    value: p.id,
    label: p.nombre
  }))

  // Preparar filas para DataTable
  const dataTableRows = rows.map((row) => ({
    id: row.id,
    producto: (
      <SearchableSelect
        options={productOptions}
        value={row.productId}
        onChange={(e) => onProductChange(row.id, e.target.value)}
        placeholder="Seleccionar producto..."
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
      <span className="text-on-surface-variant">
        {formatARS(row.unitPrice)}
      </span>
    ),
    subtotal: (
      <span className="font-medium text-on-surface">
        {formatARS(row.unitPrice * row.quantity)}
      </span>
    ),
    acciones: (
      <TableActionButton
        icon={Trash2}
        title="Eliminar fila"
        variant="danger"
        onClick={() => onDeleteRow(row.id)}
      />
    )
  }))

  return (
    <DataTable 
      columns={columns} 
      rows={dataTableRows} 
      emptyMessage="No hay productos en la lista."
    />
  )
}
