import { Trash2 } from 'lucide-react'
import DataTable from './DataTable'
import TableActionButton from './TableActionButton'
import { formatARS } from '../../utils/currencyFormatters'

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

  // Preparar filas para DataTable
  const dataTableRows = rows.map((row) => ({
    id: row.id,
    producto: (
      <select
        value={row.productId}
        onChange={(e) => onProductChange(row.id, e.target.value)}
        className="w-full px-2 py-1.5 text-sm text-on-surface bg-transparent border border-transparent hover:border-border-iron focus:border-primary-container focus:bg-surface-container-lowest focus:outline-none transition-colors cursor-pointer"
      >
        <option value="" disabled>Seleccionar producto...</option>
        {CATALOGO_PRODUCTOS.map(p => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>
    ),
    cantidad: (
      <input
        type="number"
        min="1"
        step="1"
        value={row.quantity}
        onChange={(e) => onQuantityChange(row.id, e.target.value)}
        className="w-20 px-2 py-1.5 text-sm text-center text-on-surface bg-transparent border border-transparent hover:border-border-iron focus:border-primary-container focus:bg-surface-container-lowest focus:outline-none transition-colors"
      />
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
