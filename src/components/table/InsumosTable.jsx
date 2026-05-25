import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import DataTable from './DataTable'
import TableActionButton from './TableActionButton'
import { Input, Select } from '../ui'

// Opciones de unidades válidas para los materiales/insumos
export const UNIDADES = [
  { value: 'metro', label: 'Metro' },
  { value: 'm2', label: 'm2' },
  { value: 'litro', label: 'Litro' },
  { value: 'kilo', label: 'Kilo' },
  { value: 'cantidad', label: 'Cantidad' },
]

/**
 * Componente CostoInput
 * Maneja el estado de texto local del costo unitario para permitir la entrada fluida de decimales.
 */
function CostoInput({ value, onChange }) {
  const [localText, setLocalText] = useState(() => {
    if (value === 0 || isNaN(value) || value === undefined) return ''
    return value.toString().replace('.', ',')
  })

  // Sincronizar remotamente solo si cambia numéricamente a nivel externo
  useEffect(() => {
    const parsedLocal = parseFloat(localText.replace(',', '.'))
    const parsedVal = parseFloat(value)
    if (parsedLocal !== parsedVal && !isNaN(parsedVal)) {
      setLocalText(value.toString().replace('.', ','))
    } else if (value === 0 && localText !== '') {
      setLocalText('')
    }
  }, [value])

  const handleChange = (e) => {
    const text = e.target.value
    setLocalText(text)
    
    const parsed = parseFloat(text.replace(',', '.'))
    if (!isNaN(parsed)) {
      onChange(parsed)
    } else {
      onChange(0)
    }
  }

  return (
    <Input
      value={localText}
      onChange={handleChange}
      numericMode="decimal"
      placeholder="0,00"
      className="w-full"
    />
  )
}

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
      <Input
        value={row.material}
        onChange={(e) => onFieldChange(row.id, 'material', e.target.value)}
        maxLength={50}
        showCounter={true}
        placeholder="Ej. Caño estructural 40x40"
      />
    ),
    unidad: (
      <Select
        value={row.unidad}
        onChange={(e) => onFieldChange(row.id, 'unidad', e.target.value)}
        className="w-full min-w-[120px]"
        placeholder="Unidad"
      >
        <option value="" disabled>Seleccionar unidad...</option>
        {UNIDADES.map((u) => (
          <option key={u.value} value={u.value}>
            {u.label}
          </option>
        ))}
      </Select>
    ),
    costo: (
      <CostoInput
        value={row.costo}
        onChange={(val) => onFieldChange(row.id, 'costo', val)}
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
