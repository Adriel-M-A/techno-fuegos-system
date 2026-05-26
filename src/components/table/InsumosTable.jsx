import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import DataTable from './DataTable'
import TableActionButton from './TableActionButton'
import { Input, Select, ConfirmationModal } from '../ui'

// Opciones de unidades válidas para los materiales/insumos
export const UNIDADES = [
  { value: 'metro', label: 'Metro' },
  { value: 'm2', label: 'm²' },
  { value: 'litro', label: 'Litro' },
  { value: 'kilo', label: 'Kilo' },
  { value: 'cantidad', label: 'Cantidad' },
]

/**
 * Componente CostoInput
 *
 * Maneja la conversión entre centavos enteros (SAFE MONEY) y la representación
 * visual con coma decimal para el usuario.
 *
 * - Recibe: costo_centavos (INTEGER)
 * - Muestra: pesos con coma (ej: "1.450,00" → visible en el input)
 * - Emite: costo_centavos (INTEGER) vía onChange al guardar
 */
function CostoInput({ value, onChange }) {
  // Convertir centavos a string de pesos con coma para el display inicial
  const centavosToDisplay = (centavos) => {
    if (!centavos || isNaN(centavos)) return ''
    const pesos = centavos / 100
    return pesos.toFixed(2).replace('.', ',')
  }

  const [localText, setLocalText] = useState(() => centavosToDisplay(value))

  // Sincronizar remotamente si cambia externamente (ej: al descartar cambios)
  useEffect(() => {
    const displayVal = centavosToDisplay(value)
    const parsedLocal = Math.round(parseFloat(localText.replace(',', '.')) * 100)
    if (parsedLocal !== value && !isNaN(value)) {
      setLocalText(displayVal)
    } else if (value === 0 && localText !== '') {
      setLocalText('')
    }
  }, [value])

  const handleChange = (e) => {
    const text = e.target.value
    setLocalText(text)

    // Convertir pesos con coma → centavos enteros para emitir
    const pesosFloat = parseFloat(text.replace(',', '.'))
    if (!isNaN(pesosFloat)) {
      // Redondear para evitar errores de punto flotante antes de convertir a entero
      onChange(Math.round(pesosFloat * 100))
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
 * Tabla CRUD interactiva para administrar la lista de insumos.
 * Todos los campos de costo operan con costo_centavos (INTEGER) — SAFE MONEY.
 */
export default function InsumosTable({ rows, onFieldChange, onDeleteRow }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

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
        maxLength={100}
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
          <option key={u.value} value={u.value}>{u.label}</option>
        ))}
      </Select>
    ),
    costo: (
      <CostoInput
        // costo_centavos: campo SAFE MONEY — INTEGER en SQLite
        value={row.costo_centavos}
        onChange={(centavos) => onFieldChange(row.id, 'costo_centavos', centavos)}
      />
    ),
    acciones: (
      <TableActionButton
        icon={Trash2}
        title="Eliminar insumo"
        variant="danger"
        onClick={() => setConfirmDeleteId(row.id)}
      />
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
